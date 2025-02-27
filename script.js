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
