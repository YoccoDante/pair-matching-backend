import { Bottle } from "../models/bottle";

class BottlesService {
    private getLuminance(r: number, g: number, b: number) {
        try {
            const a = [r, g, b].map((v) => {
                v /= 255;
                return v <= 0.03928
                    ? v / 12.92
                    : Math.pow((v + 0.055) / 1.055, 2.4);
            });
            return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;

        } catch(error:any) {
            throw new Error(`Imposible obtener luminicencia. ${error.message}`)
        }
    }
    
    shuffleBottles(array:Bottle[]) {
        try {
            let newArray = [...array];
    
            const arraysAreEqual = (arr1:Bottle[], arr2:Bottle[]) => {
                return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
            }
        
            for (let i = newArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
            }
        
            while (arraysAreEqual(array, newArray)) {
                for (let i = newArray.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
                }
            }
        
            return newArray;

        } catch (error:any) {
            throw new Error(`Imposible barajear botellas. ${error.message}`)
        }
    }

    defineBottles (numBottles:number) {
        try {
            const newBottles:Bottle[] = []
            for(let i = 0; i < numBottles; i++){
                const randomNum1 = Math.floor(Math.random() * 256);
                const randomNum2 = Math.floor(Math.random() * 256);
                const randomNum3 = Math.floor(Math.random() * 256);
    
                const luminance = this.getLuminance(randomNum1, randomNum2, randomNum3);
                const isWhiteFont = luminance < 0.5;
        
                const newBottle:Bottle = {
                    _id:i,
                    color:`rgb(${randomNum1},${randomNum2},${randomNum3})`,
                    isWhiteFont:isWhiteFont,
                    order:i
                }
                newBottles.push(newBottle)
            }
            return newBottles
        } catch (error:any) {
            throw new Error(`Imposible definir botellas. ${error.message}`)
        }
    }

    move (gameState:Bottle[], selectedBottles:Bottle[]):Bottle[] {
        try {
            const index1 = gameState.findIndex(bottle => bottle._id === selectedBottles[0]._id)
            const index2 = gameState.findIndex(bottle => bottle._id === selectedBottles[1]._id)
            
            if (index1 === -1 || index2 === -1) {
                throw new Error('Una o ambas botella no existen en el estado')
            }
        
            // Switch positions
            [gameState[index1], gameState[index2]] = [gameState[index2], gameState[index1]]
    
            return gameState

        } catch (error:any) {
            throw new Error(`Imposible hacer Switch de las botellas. ${error.message}`)
        }
    }

    isVictory (gameState:Bottle[], trueOrder:Bottle[]): boolean {
        try {
            for (let i=0; i<gameState.length; i++) {
                if (gameState[i].order != trueOrder[i].order) return false
            }
            return true
        } catch (error:any) {
            throw new Error(`Imposible verificar victoria. ${error.message}`)
        }
    }
}

export default BottlesService