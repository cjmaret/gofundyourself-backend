import { value fundraisers } from './new-data';

export async function insertSeedData(ks: any) {
  // check for both versions of Keystone API to get keystone
  const keystone = ks.keystone || ks;
  const adapter = keystone.adapters?.MongooseAdapter || keystone.adapter;

  console.log(`🌱 Inserting Seed Data: ${fundraisers.length} Fundraisers`);
  const { mongoose } = adapter;
  for (const fundraiser of fundraisers) {
    console.log(`  🛍️ Adding Fundraiser: ${fundraiser.name}`);
    const { _id } = await mongoose
      .model('FundraiserImage')
      .create({ image: fundraiser.photo, altText: fundraiser.description });
    fundraiser.photo = _id;
    await mongoose.model('Fundraiser').create(fundraiser);
  }
  console.log(`✅ Seed Data Inserted: ${fundraisers.length} Fundraisers`);
  console.log(
    `👋 Please start the process with \`yarn dev\` or \`npm run dev\``
  );
  process.exit();
}
