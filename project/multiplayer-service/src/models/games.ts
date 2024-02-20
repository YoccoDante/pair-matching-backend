import mongoose from 'mongoose';
import { Bottle } from "./bottle"

export interface BottlesCooperativeGameInterface {
    _id: string,  // ID de la sala
    hostId: string,  // ID del jugador que creó la sala
    guestId: string,  // ID del jugador invitado
    turn: string,  // ID del jugador cuyo turno es
    state: Bottle[],  // Representación actual del tablero
    winnerId: string,  // ID del jugador ganador, si hay alguno
    trueOrder: Bottle[],  // Orden correcto de las botellas para verificar la victoria
    lastPlayerId: string  // ID del último jugador que hizo un movimiento
    hasStarted: boolean // Indica si la partida ha empezado
}

const { Schema } = mongoose;

const bottleSchema = new Schema({
  _id: Number,
  color: String,
  isWhiteFont: Boolean,
  order: Number
}, { _id: false });

const bottlesCooperativeGameSchema = new Schema<BottlesCooperativeGameInterface>({
  hostId: {type:String, required:true},
  guestId: {type: String, required: false, default: null},
  turn: {type: String, required: false, default: null},
  state: [bottleSchema],
  winnerId: {type: String, required: false, default: null},
  trueOrder: [bottleSchema],
  lastPlayerId: {type:String, required: false, default: null},
  hasStarted: { type: Boolean, default: false },
});

const BottlesCooperativeGameModel = mongoose.model('BottlesCooperativeGame', bottlesCooperativeGameSchema);

export default BottlesCooperativeGameModel