import BottlesDao from "../dao/bottles"
import BottlesService from "../services/bottles"

class PlayCooperativeGameInteractor {
    bottlesDao:BottlesDao
    bottlesService:BottlesService
    constructor (bottleDao:BottlesDao, bottlesService:BottlesService) {
        this.bottlesDao = bottleDao
        this.bottlesService = bottlesService
    }

    async play (playerId:string) {
        const gameId = await this.bottlesDao.findFreeGame()
        if (!gameId) {
            const bottles = this.bottlesService.defineBottles(8)
            const shuffleBottles = this.bottlesService.shuffleBottles(bottles)
            const newGame = await this.bottlesDao.createCooperativeGame(playerId, bottles, shuffleBottles)
            return newGame
        } else {
            const game = await this.bottlesDao.joinGame(gameId, playerId)
            return game
        }
    }

} 

export {PlayCooperativeGameInteractor}