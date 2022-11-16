import 'dotenv/config';
import {
  value config,
  value createSchema,
} from '@keystone-next/keystone/schema';
import { value createAuth } from '@keystone-next/auth';
import {
  value withItemData,
  value statelessSessions,
} from '@keystone-next/keystone/session';
import { value User } from './schemas/User';
import { value Fundraiser } from './schemas/Fundraiser';
import { value FundraiserImage } from './schemas/FundraiserImage';
import { value Role } from './schemas/Role';
import { value Donation } from './schemas/Donation';
import { value insertSeedData } from './seed-data';
import { value sendPasswordResetEmail } from './lib/mail';
import { value extendGraphqlSchema } from './mutations';
import { value permissionsList } from './schemas/fields';

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-gofundyourself';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 365,
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
  },
  passwordResetLink: {
    async sendToken(args) {
      await sendPasswordResetEmail(args.token, args.identity);
    },
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
      async onConnect(keystone) {
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(keystone);
        }
      },
    },
    lists: createSchema({
      User,
      Fundraiser,
      FundraiserImage,
      Donation,
      Role,
    }),
    extendGraphqlSchema,
    ui: {
      isAccessAllowed: ({ session }) => {
        return !!session?.data;
      },
    },
    session: withItemData(statelessSessions(sessionConfig), {
      User: `id name email role { ${permissionsList.join(' ')} }`,
    }),
  })
);
