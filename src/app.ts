
import TWEEN from '@tweenjs/tween.js';
import { Application, Loader, settings, Sprite, Text } from 'pixi.js';
import { CardScene } from './app/CardScene';
import { RichTextScene } from './app/RichTextScene';


const loader = Loader.shared;
class Game {
  private app: Application;

  private cardScene: CardScene | undefined;
  private richTextScene: RichTextScene | undefined;

  constructor() {
    // instantiate app
    this.app = new Application({
      width: 900,
      height: 1600,
      resizeTo: document.documentElement,
      backgroundColor: 0x1099bb, // light blue
    });

    settings.SORTABLE_CHILDREN = true;

    // create view in DOM
    document.body.appendChild(this.app.view);

    // preload needed assets
    loader.add('card', '/assets/img/card.png');
    loader.add('fb', '/assets/img/fb.png');
    loader.add('twitter', '/assets/img/twitter.png');
    loader.add('youtube', '/assets/img/youtube.png');
    loader.add('btn', '/assets/img/btn.png');

    // then launch app on loader ready
    loader.load(this.setup.bind(this));

  }

  setup(): void {

    this.cardScene = new CardScene(loader.resources.card.texture);
    this.app.stage.addChild(this.cardScene);

    this.richTextScene = new RichTextScene([
      loader.resources.fb.texture,
      loader.resources.youtube.texture,
      loader.resources.twitter.texture
    ]);
    this.app.stage.addChild(this.richTextScene);

    const scenes = [this.cardScene, this.richTextScene];

    scenes.forEach(item => item.visible = false);
    scenes[0].visible = true;

    const titles = ['CARDS', 'Rich Text', "VFX"];
    for (let i = 0; i < 3; i++) {
      const btn = new Sprite(loader.resources.btn.texture);
      btn.x = 250*i+15;
      btn.y = 15;
      btn.interactive = true;
      btn.buttonMode = true;
      btn.on('pointerdown', () => {
        scenes.forEach(item => item.visible = false);
        if (i < scenes.length) {
          scenes[i].visible = true;        
        }
      })

      const title = new Text(titles[i]);
      btn.addChild(title);
      title.anchor.set(.5, .5);
      title.position.set(btn.width/2, btn.height/2);
      this.app.stage.addChild(btn);
    }

    this.app.ticker.add(() => {
      TWEEN.getAll().forEach(item => item.update());
      this.cardScene?.update(this.app.ticker);
    });
  }
}

// eslint-disable-next-line no-new
new Game();
