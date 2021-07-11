
import { Container, Texture } from "pixi.js";

import particles = require('pixi-particles');

export class VfxScene extends Container {

    private elapsed: number;
    private emitter: particles.Emitter;

    constructor(textures: Texture[]) {
        super();

        this.emitter = new particles.Emitter(
            this,
            textures,
            {
                "alpha": {
                    "list": [
                        {"value":0.62, "time":0},
                        {"value":0, "time":0.6},
                        {"value":0, "time":0.7},
                        {"value":0.8, "time":0.71},
                        {"value":0, "time":1}
                    ],
                    "isStepped": false
                },
                "scale": {
                    "list": [
                        {"value":0.25, "time":0},
                        {"value":0.75, "time":1}
                    ],
                    "isStepped": false
                },
                "color": {
                    "list": [
                        {"value":"fff191", "time":0},
                        {"value":"ff622c", "time":0.6},
                        {"value":"111111", "time":0.7},
                        {"value":"333333", "time":1},
                    ],
                    "isStepped": false
                },
                "speed": {
                    "list": [
                        {"value":500, "time":0},
                        {"value":450, "time":0.7},
                        {"value":450, "time":1},
                    ],
                    "isStepped": true
                },
                "startRotation": {
                    "min": 265,
                    "max": 275
                },
                "rotationSpeed": {
                    "min": 50,
                    "max": 50
                },
                "lifetime": {
                    "min": 0.5,
                    "max": 0.7
                },
                "blendMode": "normal",
                "frequency": 0.001,
                "emitterLifetime": 0,
                "maxParticles": 1000,
                "pos": {
                    "x": 400,
                    "y": 600
                },
                "addAtBack": false,
                "spawnType": "circle",
                "spawnCircle": {
                    "x": 0,
                    "y": 0,
                    "r": 10
                }
            }
        );

        this.elapsed = Date.now();

        this.emitter.emit = true;
    }

    update(): void {
        const now = Date.now();

        this.emitter.update((now - this.elapsed) * 0.001);
        this.elapsed = now;
    }
}