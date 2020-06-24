/// <reference path="messageboard.ts"/>
class Main {

    private ships : PirateShip[] = []
    private messageboard : Messageboard

    constructor() {
        for (let i = 0; i < 10; i++) {
            this.ships.push(new PirateShip())
        }
   
        // Eventueel Messageboard aanmaken zodat deze zichtbaar wordt?
        this.messageboard = Messageboard.getInstance()
        console.log(this.messageboard)

        this.gameLoop()
    }

    gameLoop() {
        for (const ship of this.ships) {
            ship.update()

            for (const otherShip of this.ships) {
                if(ship !== otherShip) {
                    if(ship.hasCollision(otherShip)) {
                        ship.hit = true
                        // break inner loop to prevent overwriting the hit
                        break
                    } 
                    else {
                        ship.hit = false
                    }
                }
            }
        }

        requestAnimationFrame(() => this.gameLoop())
    }
}

window.addEventListener("load", () => new Main())