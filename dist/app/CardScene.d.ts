import { Container, Ticker, Texture } from "pixi.js";
export declare class CardScene extends Container {
    private _fpsText;
    constructor(texture: Texture);
    update(ticker: Ticker): void;
}
