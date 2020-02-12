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
  // COLORS
  // 355890
  // 7395cc
  // bccbe4
  // ded
  {
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        let brick = new sprite(bar_texture);
        stage.addChild(brick);

        brick.x = (-row/2) * 64 + 32 + (66 * i);
        brick.y = (col/2) * 16 + (-18 * j);
        brick.anchor.set(.5);
        brick.rotation = 1.57079632679;

        brick.hp = 3;
        brick.tint = 0x355890;
        bricks.push(brick);
      }
    }
  }

  // Wallie Palies
  {
    for (let i = 0; i < 7; i++) {
      let wall = new sprite(bar_texture);
      let wall2 = new sprite(bar_texture);

      stage.addChild(wall);
      stage.addChild(wall2);

      wall.tint = 0x909090;
      wall2.tint = 0x909090;

      wall.x = -300;
      wall.y = -148 + i * 64;
      
      wall2.x = 300;
      wall2.y = -148 + i * 64;

      walls.push(wall);
      walls.push(wall2);
    }
  }

    
  for (let i = 0; i < 9; i++) {
    let wall = new sprite(bar_texture);
    wall.tint = 0x909090;

    stage.addChild(wall);
    wall.y = -148;
    wall.x = -216 + i * 64;
    wall.rotation = 1.57079632679;

    walls.push(wall);
  }

  app.ticker.add(delta => game(delta));
}

function game(delta) {
}
