import {Request, Response} from 'express'
import BottlesDao from '../dao/bottles'
import BottlesService from '../services/bottles'
import { PlayCooperativeGameInteractor } from '../useCases/bottles'

const playBottlesCooperative = async (req:Request, res:Response) => {
    try {
        const {playerId} = req.body
        const bottlesDao = new BottlesDao()
        const bottlesService = new BottlesService()
        const interactor = new PlayCooperativeGameInteractor(bottlesDao, bottlesService)

        const game = await interactor.play(playerId)

        res.status(200).json(game)

    } catch (error:any) {
        res.status(400).json({ message:`${error.message}`})
    }
}

export {playBottlesCooperative}