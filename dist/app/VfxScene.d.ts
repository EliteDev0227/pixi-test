import { Container, Texture } from "pixi.js";
export declare class VfxScene extends Container {
    private elapsed;
    private emitter;
    constructor(textures: Texture[]);
    update(): void;
}
