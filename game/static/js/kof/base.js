import { GameMap } from "./game_map/base.js";
import { Youli } from "./player/youli.js";
import { Kyo } from "./player/kyo.js";

class KOF {
    constructor(id) {
        this.$kof = $('#' + id);
        this.game_map = new GameMap(this);
        this.players = [
            new Youli(this, {
                id: 0,
                x: 200,
                y: 0,
                width: 120,
                height: 250,
                color: 'blue',
                direction_7: 1,
            }),
            new Kyo(this, {
                id: 1,
                x: 1000,
                y: 0,
                width: 120,
                height: 250,
                color: 'red',
                direction_7: -1,
            })
        ]
    }
}

export {
    KOF
}
