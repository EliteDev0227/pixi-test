import { Container, Texture } from "pixi.js";
export declare class RichTextScene extends Container {
    private textures;
    private images;
    private texts;
    constructor(textures: Texture[]);
    generate(): void;
}
