import { Player } from "./base.js";
import { GIF } from "../utils/gif.js";
export class Youli extends Player {
    constructor(root, info) {
        super(root, info);

        this.init_animations();
    }
    init_animations() {
        let outer = this;
        let offsets = [0, -12, 0, 150, 18, 0, 0, 130];
        for (let i = 0; i < 8; i++) {
            let gif = GIF();
            gif.load(`/static/images/kof/players/youli/${i}.gif`);
            this.animations.set(i, {
                gif: gif,
                frame_cnt: 0, //当前动画一共有几帧
                frame_rate: 10, //每5帧渲染下一张
                offset_y: offsets[i], //偏移量
                scale: 2,
                loaded: false,
            });

            gif.onload = function () {
                let obj = outer.animations.get(i);
                obj.frame_cnt = gif.frames.length;
                obj.loaded = true;
            }
        }
    }
}
