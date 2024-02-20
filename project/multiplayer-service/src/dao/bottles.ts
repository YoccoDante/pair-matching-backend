import { Bottle } from '../models/bottle';
import BottlesCooperativeGameModel from '../models/games';

class BottlesDao {
  async createCooperativeGame(hostId: string, state: Bottle[], trueOrder: Bottle[]) {
    const newGame = new BottlesCooperativeGameModel({
      hostId: hostId,
      state: state,
      trueOrder: trueOrder,
    });

    try {
      const savedGame = await newGame.save();
      return savedGame;
    } catch (error:any) {
      console.error(error);
      throw new Error(`Imposible crear sala cooperativa. ${error.message}`);
    }
  }

  async findFreeGame ()  {
    try {
        const game = await BottlesCooperativeGameModel.findOne({guestId: null, hasStarted:null})
        return game? game._id : null
    } catch (error:any) {
        throw new Error(`Imposible buscar partida libre. ${error.message}`)
    }
  }

  async joinGame(gameId: string, guestId: string) {
    try {
      const game = await BottlesCooperativeGameModel.findById(gameId);

      if (!game) {
        throw new Error(`No game found with id: ${gameId}`);
      }

      if (game.guestId !== null) {
        throw new Error('Game already has a guest');
      }

      game.guestId = guestId;
      game.hasStarted = true;

      const updatedGame = await game.save();
      return updatedGame;
    } catch (error:any) {
      console.error(error);
      throw new Error(`Imposible unirse a la sala. ${error.message}`);
    }
  }
}

export default BottlesDao;