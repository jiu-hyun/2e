// 필요한 수학 함수와 변수 선언
let { sqrt, cos, sin, random: rnd } = Math;

// 캔버스 생성 및 설정
let cnv = document.createElement('canvas');
let c = cnv.getContext('2d');
let w = cnv.width = window.innerWidth * 2;
let h = cnv.height = window.innerHeight * 2;
cnv.style.width = `${window.innerWidth}px`;
cnv.style.height = `${window.innerHeight}px`;
document.body.appendChild(cnv);

// 점 위치와 개수 설정
let pnts = [];
let num = 23;

// 두 점 사이의 거리 계산 함수
function lineDist(x1, y1, x2, y2, x3, y3) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  if (dx === 0 && dy === 0) {
    dx = dy = 1;
  }

  let u = ((x3 - x1) * dx + (y3 - y1) * dy) / (dx * dx + dy * dy);
  let cx = u < 0 ? x1 : u > 1 ? x2 : x1 + u * dx;
  let cy = u < 0 ? y1 : u > 1 ? y2 : y1 + u * dy;
  return sqrt((cx - x3) ** 2 + (cy - y3) ** 2);
}

// 캔버스 초기 설정 함수
function mount() {
  c.beginPath();
  c.moveTo(0, h - 100);
  let step = w / num;
  for (let i = 0; i <= num; i++) {
    let x = step * i;
    let y = h - 600 - 450 * cos(2 + i / 8) + 50 * sin(i * 0xFFFFF);
    pnts[i] = [x, y];
    c.lineTo(x, y);
  }
  c.stroke();
}

// 벡터 반사 계산 함수
function reflect(vx, vy, ax, ay, bx, by) {
  let dx = bx - ax;
  let dy = by - ay;
  let len = sqrt(dx * dx + dy * dy);

  dx /= len;
  dy /= len;
  let nx = -dy;
  let ny = dx;
  let dot = vx * nx + vy * ny;
  vx = 0.5 * (vx - (1 + 0.99) * dot * nx);
  vy = 0.5 * (vy - (1 + 0.99) * dot * ny);
  return [vx, vy];
}

let shoot = false;

// 점 생성 및 애니메이션 함수
function dot(off) {
  let x = w / 2 - 140 + off;
  let y = h / 4;
  let ox = x;
  let oy = y;
  let vx = rnd() * 10 - 5;
  let vy = rnd() * -10;
  let s = 20;
  let g = 0.3 + rnd() * 0.2;
  let intersect;

  return () => {
    x += vx;
    y += vy;

    if (shoot) {
      vy = rnd() * -20;
      vx = rnd() * 10 - 5;
      x = ox;
      y = oy;
    }

    intersect = false;
    for (let i = 0; i < num - 1; i++) {
      let a = pnts[i];
      let b = pnts[i + 1];
      let d = lineDist(a[0], a[1], b[0], b[1], x, y);
      if (d < s) {
        [vx, vy] = reflect(vx, vy, a[0], a[1], b[0], b[1]);
        x = ox;
        y = oy;
        intersect = true;
        break;
      }
    }

    vy += g;
    if (!intersect) {
      ox = x;
      oy = y;
    }
    c.fillStyle = 'red';
    c.font = 'bold 48px Sans-Serif';
    // 번갈아가면서 텍스트를 선택하여 그림
    const texts = ['March', '4', '2e', 'Tfa'];
    let index = Math.floor(Math.abs(off) / 50) % texts.length;  // 수정된 부분: 배열 범위를 넘지 않도록 계산
    let text = texts[index];
    c.fillText(text, x, y);
  };
}

// 이벤트 리스너 등록
document.onpointerdown = e => {
  shoot = true;
};

// 초기 설정 실행
mount();

// 점 집합 생성
let ds = [];
let NUM = 200;
for (let i = 0; i < NUM; i++) {
  ds[i] = dot(i * 4 - 200);
}

// 애니메이션 루프 실행
function loop() {
  c.fillStyle = 'white';
  c.fillRect(0, 0, w, h);
  ds.forEach(d => d());
  shoot = false;
  requestAnimationFrame(loop);
}

loop();
