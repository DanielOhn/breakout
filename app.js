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
loader
  .add("bar", "img/bar.png")
  .add('ball', 'img/ball.png')
  .load(setup);

let player;

let bricks = [];
let walls = [];

let row = 5;
let col = 5;

let left = keyboard('a');
let right = keyboard('d');
let active = keyboard('space');

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

  player.vx = 0;

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

  left.press = () => {
    player.vx = -1;
  }

  left.release = () => {
    player.vx = 0;
  }

  right.press = () => {
    player.vx = 1;
  }

  right.release = () => {
    player.vx = 0;
  }

  app.ticker.add(delta => game(delta));
}

function game(delta) {
  let speed = 5 * delta;

  player.x += player.vx * speed;

}

function check_collid(r1, r2) {
  // Define variables we'll use to calculate
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

  // hit will determine whether there's a collision
  hit = false;

  // Find the center points of each sprite
  r1.centerX = r1.x;
  r1.centerY = r1.y;

  r2.centerX = r2.x;
  r2.centerY = r2.y;

  // Find the half-widths and half-heights of each sprite
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  // Calculate the distance vectors between sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  // Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  // Check collision on x axis
  if (Math.abs(vx) < combinedHalfWidths) {
    // A collisoin might be occuring.  Check for it on y axis
    if (Math.abs(vy) < combinedHalfHeights) {
      // There's definitely a collision happening
      hit = true;
    } else {
      hit = false;
    }
  } else {
    hit = false;
  }

  return hit;
}

function keyboard(value) {
  let key = {};
  key.value = value;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;

  key.downHandler = event => {
    if (event.key === key.value) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
      event.preventDefault();
    }
  };

  key.upHandler = event => {
    if (event.key === key.value) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
      event.preventDefault();
    }
  };

  // Attach Event listeners
  const downListener = key.downHandler.bind(key);
  const upListener = key.upHandler.bind(key);

  window.addEventListener("keydown", downListener, false);
  window.addEventListener("keyup", upListener, false);

  // Detach event listeners
  key.unsubscribe = () => {
    window.removeEventListener("keydown", downListener);
    window.removeEventListener("keyup", upListener);
  };

  return key;
};