import 'dotenv/config';
import { list } from '@keystone-next/keystone/schema';
import { text, relationship } from '@keystone-next/fields';
import { cloudinaryImage } from '@keystone-next/cloudinary';

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiSecret: process.env.CLOUDINARY_SECRET,
  apiKey: process.env.CLOUDINARY_KEY,
  folder: 'sickfits',
};

export const ProductImage = list({
  fields: {
    image: cloudinaryImage({
      cloudinary,
      label: 'Source',
    }),
    altText: text(),
    product: relationship({
      ref: 'Product.photo',
    }),
  },
});
