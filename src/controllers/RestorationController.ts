import { Request, Response } from 'express';
import Restoration, { IRestoration } from '../models/Restoration';
import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
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
      const uniqueID = uuidv4(); // Generate a unique ID for the file
      const fileExtension = path.extname(file.originalname); // Get the original file extension
      const uniqueFilename = uniqueID + fileExtension;
      cb(null, uniqueFilename);
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


export async function getRestorationById(req: Request, res: Response) {
  try {
    const restorationId = req.params.id;

    const restoration: IRestoration | null = await Restoration.findById(restorationId);

    if (!restoration) {
      return res.status(404).json({ message: 'Restoration not found' });
    }

    res.json(restoration);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch restoration vehicle' });
  }
}

export async function getAllRestorations(req: Request, res: Response) {
  try {
    const restorations: IRestoration[] = await Restoration.find().sort({ _id: -1 });

    res.json(restorations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch restoration vehicles' });
  }
}

export async function updateRestoration(req: Request, res: Response) {
  try {
    const restorationId = req.params.id;
    const updateFields: Partial<IRestoration> = {}; // Partial<IRestoration> allows us to update only selected fields

    const {
      carName,
      smallDescription,
      largeDescription,
      transmission,
      mileage,
      interiorColor,
      exteriorColor,
    } = req.body;

    // Check each field in req.body and add it to updateFields if it is not empty
    if (carName !== undefined && carName.trim() !== '') {
      updateFields.carName = carName;
    }
    if (smallDescription !== undefined && smallDescription.trim() !== '') {
      updateFields.smallDescription = smallDescription;
    }
    if (largeDescription !== undefined && largeDescription.trim() !== '') {
      updateFields.largeDescription = largeDescription;
    }
    if (transmission !== undefined && transmission.trim() !== '') {
      updateFields.transmission = transmission;
    }
    if (mileage !== undefined) {
      updateFields.mileage = mileage;
    }
    if (interiorColor !== undefined && interiorColor.trim() !== '') {
      updateFields.interiorColor = interiorColor;
    }
    if (exteriorColor !== undefined && exteriorColor.trim() !== '') {
      updateFields.exteriorColor = exteriorColor;
    }

    // Perform the update using the updateFields object
    const restoration: IRestoration | null = await Restoration.findByIdAndUpdate(
      restorationId,
      updateFields,
      { new: true } // Return the updated document
    );

    if (!restoration) {
      return res.status(404).json({ message: 'Restoration not found' });
    }

    res.json(restoration);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update restoration vehicle' });
  }
}

export async function deleteRestoration(req: Request, res: Response) {
  try {
    const restorationId = req.params.id;

    const restoration: IRestoration | null = await Restoration.findByIdAndDelete(restorationId);

    if (!restoration) {
      return res.status(404).json({ message: 'Restoration not found' });
    }

    res.json({ message: 'Restoration deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete restoration vehicle' });
  }
}