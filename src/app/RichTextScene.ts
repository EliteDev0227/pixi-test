import { Container, Sprite, Texture, Text } from "pixi.js";

export class RichTextScene extends Container {
    private images: Sprite[];
    private texts: Text[];

    constructor(private textures: Texture[]) {
        super();

        this.images = [];
        this.texts = [];

        for (let i = 0; i < 3; i++) {
            const img = new Sprite(this.textures[0]);
            this.addChild(img);
            this.images.push(img);

            const txt = new Text('');
            this.addChild(txt);
            this.texts.push(txt);
        }

        setInterval(() => this.generate(), 2000);
        this.generate();
    }

    generate(): void {
        this.images.forEach(item => item.visible = false);
        this.texts.forEach(item => item.visible = false);

        const visibleObjects = [];
        for (let i = 0; i < 3; i++) {
            if (Math.random() < 0.5) {
                this.images[i].texture = this.textures[Math.floor(100 * Math.random() % this.textures.length)]
                visibleObjects.push(this.images[i]);
            }
            else {
                this.texts[i].style = {
                    fontSize: Math.random() * 50 + 30,
                    fill: "#" + ((1<<24)*Math.random() | 0).toString(16)
                }
                this.texts[i].text = Math.random().toString(36).substring(5);                
                visibleObjects.push(this.texts[i]);
            }
        }
        let sumX = 0;
        for (let i = 0; i < visibleObjects.length; i++) {
            visibleObjects[i].x = sumX;
            visibleObjects[i].y = 200;
            visibleObjects[i].anchor.y = .5;
            sumX += visibleObjects[i].width;
            visibleObjects[i].visible = true;
        }
    }
}