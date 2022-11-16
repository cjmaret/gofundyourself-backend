function timestamp() {
  // sometime in the last 30 days
  const stampy =
    Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30);
  return new Date(stampy).toISOString();
}

export const fundraisers = [
  {
    name: 'Save Allisons Social Life',
    description:
      'Allisons friends are all doing coke but she cant afford it, find it in your heart to help her',
    status: 'AVAILABLE',
    price: 3423,
    photo: {
      id: '5dfbed262849d7961377c2c0',
      filename: 'brown-hair-girl.jpg',
      originalFilename: 'brown-hair-girl.jpg',
      mimetype: 'image/jpeg',
      encoding: '7bit',
      _meta: {
        public_id: 'fundeserved-keystone/5dfbed262849d7961377c2c0',
        version: 1576791335,
        signature: '9f7d5115788b7677307a39214f9684dd827ea5f9',
        width: 750,
        height: 457,
        format: 'jpg',
        resource_type: 'image',
        created_at: timestamp(),
        tags: [],
        bytes: 27871,
        type: 'upload',
        etag: 'e1fdf84d5126b6ca2e1c8ef9532be5a5',
        placeholder: false,
        url:
          'https://res.cloudinary.com/dxq9nqdbd/image/upload/v1662799226/fundeserved/seed-photos/pexels-photo-1239291_i6mpya.jpg',
        secure_url:
          'https://res.cloudinary.com/dxq9nqdbd/image/upload/v1662799226/fundeserved/seed-photos/pexels-photo-1239291_i6mpya.jpg',
        original_filename: 'file',
      },
    },
  },
  {
    name: 'Jason Is Committing Medical Fraud, Needs Your Help ',
    description: 'Jason pretends to be sick for the insurance payout',
    status: 'AVAILABLE',
    price: 5234,
    photo: {
      id: '5e2a13f0689b2835ae71d1a5',
      filename: 'medical-fraud.jpg',
      originalFilename: 'medical-fraud.jpg',
      mimetype: 'image/jpeg',
      encoding: '7bit',
      _meta: {
        public_id: 'fundeserved-keystone/5e2a13f0689b2835ae71d1a5',
        version: 1579815920,
        signature: 'a430b2d35f6a03dc562f6f56a474deb6810e393f',
        width: 960,
        height: 640,
        format: 'jpg',
        resource_type: 'image',
        created_at: timestamp(),
        tags: [],
        bytes: 45455,
        type: 'upload',
        etag: 'aebe8e9cc98ee4ad71682f19af85745b',
        placeholder: false,
        url:
          'https://res.cloudinary.com/dxq9nqdbd/image/upload/v1662799164/fundeserved/seed-photos/sick-person-picture-id152169976_prnfk0.jpg',
        secure_url:
          'https://res.cloudinary.com/dxq9nqdbd/image/upload/v1662799164/fundeserved/seed-photos/sick-person-picture-id152169976_prnfk0.jpg',
        original_filename: 'file',
      },
    },
  },
  {
    name: 'Shes just... covered in it...',
    description: 'Massive waste of spaghetti',
    status: 'AVAILABLE',
    price: 23562,
    photo: {
      id: '5e2a13ff689b2835ae71d1a7',
      filename: 'spaghetti.jpg',
      originalFilename: 'spaghetti.jpg',
      mimetype: 'image/jpeg',
      encoding: '7bit',
      _meta: {
        public_id: 'fundeserved-keystone/5e2a13ff689b2835ae71d1a7',
        version: 1579815935,
        signature: '360df116020320a14845cf235b87a4a5cdc23f86',
        width: 2000,
        height: 2000,
        format: 'jpg',
        resource_type: 'image',
        created_at: timestamp(),
        tags: [],
        bytes: 202924,
        type: 'upload',
        etag: 'b6fbc18b196c68e2b87f51539b849e70',
        placeholder: false,
        url:
          'https://res.cloudinary.com/dxq9nqdbd/image/upload/v1662799237/fundeserved/seed-photos/what-your-favorite-stock-photo-spaghetti-person-s-2-7471-1432142821-2_dblbig_ldjvee.jpg',
        secure_url:
          'https://res.cloudinary.com/dxq9nqdbd/image/upload/v1662799237/fundeserved/seed-photos/what-your-favorite-stock-photo-spaghetti-person-s-2-7471-1432142821-2_dblbig_ldjvee.jpg',
        original_filename: 'file',
      },
    },
  },
];
