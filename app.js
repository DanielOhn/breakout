const canvas = document.getElementById("mycanvas");

let type = "WebGL";
PIXI.settings.SPRITE_MAX_TEXTURES = Math.min(
  PIXI.settings.SPRITE_MAX_TEXTURES,
  16
);

if (!PIXI.utils.isWebGLSupported()) {
  type = "canvas";
}

let _w = window.innerWidth;
let _h = window.innerHeight;

const app = new PIXI.Application({
  view: canvas,
  width: _w,
  height: _h,
  resolution: window.devicePixelRatio,
  autoDensity: true
});

window.addEventListener("resize", resize);

function resize() {
  _w = window.innerWidth;
  _h = window.innerHeight;

  app.renderer.resize(_w, _h);
}

let loader = PIXI.Loader.shared;
let sprite = PIXI.Sprite;
loader.add("bar", "img/bar.png").load(setup);

let player;

let bricks = [];
let walls = [];

let row = 5;
let col = 5;

function makeBricks() {

}

function setup() {
  let bar_texture = loader.resources.bar.texture;

  let stage = new PIXI.Container();
  app.stage.addChild(stage);

  stage.x = app.screen.width / 2;
  stage.y = app.screen.height / 2;

  player = new sprite(bar_texture);
  stage.addChild(player);

  player.y = 300;

  // ROTATION IS DETERMINED IN RADIANS
  // 90 degree is pi/2
  player.rotation = 1.57079632679;
  player.anchor.set(.5);

  // Brick Bois
  {
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        let brick = new sprite(bar_texture);
        stage.addChild(brick);

        brick.x = (-row/2) * 64 + 32 + (66 * i);
        brick.y = (col/2) * 16 + (-18 * j);
        brick.anchor.set(.5);
        brick.rotation = 1.57079632679;
        bricks.push(brick);
      }
    }
  }

  // Wallie Palies
  {
    
  }

  app.ticker.add(delta => game(delta));
}

function game(delta) {
}
