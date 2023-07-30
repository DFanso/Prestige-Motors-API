import { Router } from 'express';
import { createCarForSale, upload, getCarForSaleById, getAllCarsForSale, updateCarForSale, deleteCarForSale } from '../controllers/CarForSaleController';

const router = Router();

router.post('/', upload.array('photos', 4), createCarForSale);
router.get('/:id', getCarForSaleById);
router.get('/', getAllCarsForSale);
router.put('/:id', updateCarForSale);
router.delete('/:id', deleteCarForSale);

export default router;
