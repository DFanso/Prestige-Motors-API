import { Request, Response } from 'express';
import Restoration, { IRestoration } from '../models/Restoration';
import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';
dotenv.config();


const s3 = new S3Client({
  region: process.env.Vultr_REGION,
  endpoint: process.env.Vultr_ENDPOINT,
  credentials: {
    accessKeyId: process.env.Vultr_ACCESS_KEY_ID || ' ' ,
    secretAccessKey: process.env.Vultr_SECRET_ACCESS_KEY || ' ',
  },
});

export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'prestige',
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '_' + file.originalname);
    },
  }),
});

export async function createRestoration(req: Request, res: Response) {
  try {
    const {
      carName,
      smallDescription,
      largeDescription,
      transmission,
      mileage,
      interiorColor,
      exteriorColor,
      
    } = req.body;

    // The URLs of the uploaded images in the S3 bucket
    const pictures: string[] = [];

    if (!Array.isArray(req.files)) {
      throw new Error('No files found in the request.');
    }

    // Upload four photos to S3
    const files: any[] = req.files as any[];
    for (const file of files) {
      const photoURL = file.location;
      pictures.push(photoURL);
    }

    const newRestoration: IRestoration = new Restoration({
      carName,
      smallDescription,
      largeDescription,
      transmission,
      mileage,
      interiorColor,
      exteriorColor,
      pictures,
    });

    await newRestoration.save();
    res.status(201).json(newRestoration);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create restoration vehicle' });
  }
}
