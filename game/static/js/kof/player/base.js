import { GAMEOBJECTS } from "../game_object/base.js";

export class Player extends GAMEOBJECTS {
    constructor(root, info) {
        super();
        this.id = info.id;    //角色通用属性
        this.root = root;
        this.x = info.x;
        this.y = info.y;
        this.width = info.width;
        this.height = info.height;
        this.color = info.color;
        this.direction = 1;
        this.vx = 0;
        this.vy = 0;
        this.speedx = 400;
        this.speedy = -1400;
        this.gravity = 35;

        this.ctx = this.root.game_map.ctx; //渲染

        this.status = 3; //0站立1前进2后退3跳跃4攻击5被打6死亡
        this.pressed_keys = this.root.game_map.controller.pressed_keys;
        this.animations = new Map();//存储动作
        this.frame_current_cnt = 0; //当前渲染到第几帧
        this.direction_7 = info.direction_7;
    }

    start() {

    }
    update_control() {
        let w, a, d, space;
        if (this.id === 0) {
            w = this.pressed_keys.has('w');
            a = this.pressed_keys.has('a');
            d = this.pressed_keys.has('d');
            space = this.pressed_keys.has(' ');
        }
        else if (this.id === 1) {
            w = this.pressed_keys.has('ArrowUp');
            a = this.pressed_keys.has('ArrowLeft');
            d = this.pressed_keys.has('ArrowRight');
            space = this.pressed_keys.has('Enter');
        }

        if (this.status === 0 || this.status === 1 || this.status === 2) {
            if (space) {
                this.vx = 0;
                this.frame_current_cnt = 0;
                this.status = 4;
            } else if (w) {
                this.status = 3;
                if (d) {
                    this.vx = this.speedx;
                    //if (this.direction == -1) this.status = 8;
                    if (this.direction === 1) {
                        this.status = 7;
                        this.direction_7 = 1;
                    }
                }
                else if (a) {
                    this.vx = -this.speedx;
                    if (this.direction === -1) {
                        this.status = 7;
                        this.direction_7 = -1;
                    }
                    //else this.status = 8;
                } else {
                    this.vx = 0;
                    this.direction_7 = 0;
                }
                this.vy = this.speedy;

                this.frame_current_cnt = 0;
            } else if (d) {
                this.vx = this.speedx;
                this.status = 1;
                if (this.direction === -1) this.status = 2;
                this.direction_7 = 0;

            } else if (a) {
                this.vx = -this.speedx;
                this.status = 2;
                if (this.direction === -1) this.status = 1;
                this.direction_7 = 0;

            } else {
                this.vx = 0;
                this.status = 0;
                this.direction_7 = 0;
            }


        }
    }
    update_move() {
        if (this.status === 3 || this.status === 7) {
            this.vy += this.gravity;
        }
        this.x += this.vx * this.timedelta / 1000;
        this.y += this.vy * this.timedelta / 1000;

        if (this.y >= 419) {
            this.y = 420;
            this.vy = 0;
            if (this.status === 3) this.status = 0;
            if (this.status === 7) {
                if (this.direction_7 === 1) this.x += 230;
                else this.x -= 230;
                this.status = 0;
            }
        }
        if (this.x < 0) this.x = 0;
        if (this.x > 1280 - this.width) this.x = 1280 - this.width;
    }
    update_direction() {
        let players = this.root.players;
        if (players[0] && players[1]) {
            let me = this, you = players[1 - this.id];
            if (me.x < you.x) me.direction = 1;
            else me.direction = -1;
        }
    }
    update() {
        this.update_control();
        this.update_move();
        this.update_direction();
        this.render();
    }
    render() {
        //this.ctx.fillStyle = this.color;
        //this.ctx.fillRect(this.x, this.y, this.width, this.height);
        let status = this.status;
        console.log(status);
        let obj = this.animations.get(status);
        if (obj && obj.loaded) {
            if (this.direction > 0 && this.direction_7 === 0 || this.direction_7 > 0) {
                if (this.status === 3) obj.frame_rate = 6;
                if (this.status === 7) {
                    obj.frame_rate = 6;
                }
                else obj.frame_rate = 10;
                let k = parseInt(this.frame_current_cnt / obj.frame_rate) % (obj.frame_cnt);

                let image = obj.gif.frames[k].image;
                this.ctx.drawImage(image, this.x, this.y - obj.offset_y, image.width * obj.scale, image.height * obj.scale);
            }
            else {
                this.ctx.save();
                this.ctx.scale(-1, 1);
                this.ctx.translate(-this.root.game_map.$canvas.width(), 0);
                let k = parseInt(this.frame_current_cnt / obj.frame_rate) % obj.frame_cnt;
                let image = obj.gif.frames[k].image;
                this.ctx.drawImage(image, this.root.game_map.$canvas.width() - this.x - this.width, this.y - obj.offset_y, image.width * obj.scale, image.height * obj.scale);
                this.ctx.restore();
            }
        }
        if (status === 4) {
            if (this.frame_current_cnt == obj.frame_rate * (obj.frame_cnt - 1)) {
                this.status = 0;

            }
        }
        this.frame_current_cnt++;
    }


}
