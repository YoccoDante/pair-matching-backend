import express from 'express';
import { playBottlesCooperative } from '../controllers/bottles';

const bottlesRouter = express.Router()

bottlesRouter.post('/cooperative', playBottlesCooperative)

export default bottlesRouter