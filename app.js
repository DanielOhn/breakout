const canvas = document.getElementById('mycanvas');

let type = 'WebGL';
PIXI.settings.SPRITE_MAX_TEXTURES = Math.min(PIXI.settings.SPRITE_MAX_TEXTURES, 16);

if (!PIXI.utils.isWebGLSupported()) {
  type='canvas';
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

window.addEventListener('resize', resize);

function resize() {
  _w = window.innerWidth;
  _h = window.innerHeight;

  app.renderer.resize(_w, _h);
}

