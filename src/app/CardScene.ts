
import TWEEN, { Tween } from "@tweenjs/tween.js";
import { Container, Sprite, Text, Ticker, Texture } from "pixi.js";

export class CardScene extends Container {

    private _fpsText: Text;

    constructor(texture: Texture) {
        super();
        const cards: Container[] = [];
        const OFFSET_Y = 150;
        const CARDS_CNT = 144;
        for (let i = 0; i < CARDS_CNT; i++) {
            const card = new Sprite(texture);
            this.addChild(card);
            card.position.set(i, i*5+OFFSET_Y);
            cards.push(card);
        }

        for (let i = 0; i < CARDS_CNT; i++) {
            new Tween({
                x: cards[CARDS_CNT-1-i].position.x,
                y: cards[CARDS_CNT-1-i].position.y
            })
            .to({
                x: 500 + i,
                y: i*5+OFFSET_Y
            }, 2000)
            .delay(i*1000)
            .easing(TWEEN.Easing.Linear.None)
            .onStart(() => {
                cards[CARDS_CNT-1-i].zIndex = i;
            })
            .onUpdate(val => {
                cards[CARDS_CNT-1-i].position.set(val.x, val.y);
            })
            .start();
        }

        this._fpsText = new Text('');
        this.addChild(this._fpsText);
    }

    update(ticker: Ticker): void {
        this._fpsText.text = ticker.FPS.toFixed(2);
    }
}