import Curvy from '../src/curvy.mjs';

const WIDTH = 800;
const HEIGHT = 600;

const generatePoint = function generatePoint() {
  return {
    x: Math.random() * WIDTH,
    y: Math.random() * HEIGHT
  };
};

const generateCurve = function generateCurve() {
  return {
    s: generatePoint(),
    e: generatePoint(),
    c_1: generatePoint(),
    c_2: generatePoint()
  };
};

const times = function times(n) {
  return [...Array(n).keys()];
};

const spreadCurve = function spreadCurve(curve, n) {
  return times(n).map( i => {
    return {
      x: Curvy.g(curve.s.x, curve.c_1.x, curve.c_2.x, curve.e.x, i / n),
      y: Curvy.g(curve.s.y, curve.c_1.y, curve.c_2.y, curve.e.y, i / n)
    }
  });
};

const POINT_SIZE = 4;
const POINT_HALF_SIZE = POINT_SIZE / 2;

const drawPoint = function drawPoint(ctx, point, style = '#000000') {
  ctx.save();
  ctx.fillStyle = style;
  ctx.fillRect(
    point.x - POINT_HALF_SIZE,
    point.y - POINT_HALF_SIZE,
    POINT_SIZE,
    POINT_SIZE);
  ctx.restore();
};

const drawCurve = function drawCurve(ctx, curve) {
  const points = spreadCurve(curve, 50);
  
  for (const point of points) {
    drawPoint(ctx, point);
  }
  
  drawPoint(ctx, curve.s, 'hsl(0deg 100% 50%)');
  // drawPoint(ctx, curve.c_1, 'hsl(120deg 100% 50%)');
  // drawPoint(ctx, curve.c_2, 'hsl(200deg 100% 30%)');
  drawPoint(ctx, curve.e, 'hsl(270deg 100% 50%)');
};

const TOLERANCE = 0.000001;

const nearEnough = function nearEnough(point_1, point_2) {
  return Math.abs(point_2.x - point_1.x) < TOLERANCE &&
  Math.abs(point_2.y - point_1.y) < TOLERANCE
}

const testEquations = function testEquations(ctx, curve) {
  const t_1 = 1 / 3;
  const t_2 = 2 / 3;

  const g_1 = {
    x: Curvy.g(curve.s.x, curve.c_1.x, curve.c_2.x, curve.e.x, t_1),
    y: Curvy.g(curve.s.y, curve.c_1.y, curve.c_2.y, curve.e.y, t_1)
  };

  const g_2 = {
    x: Curvy.g(curve.s.x, curve.c_1.x, curve.c_2.x, curve.e.x, t_2),
    y: Curvy.g(curve.s.y, curve.c_1.y, curve.c_2.y, curve.e.y, t_2)
  };
  
  const found_c_1 = {
    x: Curvy.findC1(curve.s.x, curve.e.x, g_1.x, g_2.x, t_1, t_2),
    y: Curvy.findC1(curve.s.y, curve.e.y, g_1.y, g_2.y, t_1, t_2)
  };
  
  const found_c_2 = {
    x: Curvy.findC2(curve.s.x, curve.e.x, g_1.x, t_1, found_c_1.x),
    y: Curvy.findC2(curve.s.y, curve.e.y, g_1.y, t_1, found_c_1.y)
  };
  
  ctx.save();
  if (nearEnough(found_c_1, curve.c_1) && nearEnough(found_c_2, curve.c_2)) {
    ctx.fillStyle = 'green';
  } else {
    ctx.fillStyle = 'red';
  }

  ctx.fillRect(5, 5, 20, 20);
  
  ctx.restore();
  drawPoint(ctx, found_c_1, 'hsl(120deg 100% 50%)');
  drawPoint(ctx, found_c_2, 'hsl(200deg 100% 30%)');
}

const moveCurve = function moveCurve(curve, velocities) {
  curve.s.x += velocities.s.x;
  if (curve.s.x <= 0 || curve.s.x >= WIDTH) {
    velocities.s.x *= -1;
  }
  if (curve.s.y <= 0 || curve.s.y >= HEIGHT) {
    velocities.s.y *= -1;
  }
  curve.s.y += velocities.s.y;
  curve.e.x += velocities.e.x;
  if (curve.e.x <= 0 || curve.e.x >= WIDTH) {
    velocities.e.x *= -1;
  }
  if (curve.e.y <= 0 || curve.e.y >= HEIGHT) {
    velocities.e.y *= -1;
  }
  curve.e.y += velocities.e.y;
  curve.c_1.x += velocities.c_1.x;
  if (curve.c_1.x <= 0 || curve.c_1.x >= WIDTH) {
    velocities.c_1.x *= -1;
  }
  if (curve.c_1.y <= 0 || curve.c_1.y >= HEIGHT) {
    velocities.c_1.y *= -1;
  }
  curve.c_1.y += velocities.c_1.y;
  curve.c_2.x += velocities.c_2.x;
  if (curve.c_2.x <= 0 || curve.c_2.x >= WIDTH) {
    velocities.c_2.x *= -1;
  }
  if (curve.c_2.y <= 0 || curve.c_2.y >= HEIGHT) {
    velocities.c_2.y *= -1;
  }
  curve.c_2.y += velocities.c_2.y;
}

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('mainView');
  const context = canvas.getContext('2d');
  
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  
  const curve = generateCurve();
  const velocities = {
    s: { x: Math.random(), y: -Math.random() },
    e: { x: Math.random(), y: Math.random() },
    c_1: { x: Math.random(), y: Math.random() },
    c_2: { x: Math.random(), y: -Math.random() }
  };
  
  const tick = () => {
    moveCurve(curve, velocities);

    context.clearRect(0, 0, WIDTH, HEIGHT);
    drawCurve(context, curve);
    testEquations(context, curve);
    
    requestAnimationFrame(tick);
  };
  
  tick();
});