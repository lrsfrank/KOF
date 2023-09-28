import { Controller } from '../controller/base.js';
import { GAMEOBJECTS } from '../game_object/base.js';

class GameMap extends GAMEOBJECTS {
    constructor(root) {
        super();
        this.root = root;
        this.$canvas = $('<canvas tabindex=0 width=1280 height=720></canvas>');
        this.ctx = this.$canvas[0].getContext('2d');
        this.root.$kof.append(this.$canvas);
        this.$canvas.focus();
        this.controller = new Controller(this.$canvas);
    }
    start() {

    }
    update() {
        this.render();
    }
    render() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    }
}

export {
    GameMap
}
