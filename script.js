// 필요한 수학 함수와 변수 선언
let { sqrt, cos, sin, random: rnd } = Math;

// 캔버스 설정
let cnv = document.getElementById('canvas');
let c = cnv.getContext('2d');
let w = cnv.width = window.innerWidth;
let h = cnv.height = window.innerHeight;
document.body.appendChild(cnv);

// 이름 배열 초기화
let texts = ['March', '4', '2e', 'Tfa'];

// 이름 추가 함수
function addName() {
    let input = document.getElementById('nameInput');
    if (input.value.trim() !== '') {
        texts.push(input.value.trim());
        input.value = '';  // 입력 필드 초기화
    }
}

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
        // 반사 로직...

        vy += g;
        if (!intersect) {
            ox = x;
            oy = y;
        }
        c.fillStyle = 'red';
        c.font = 'bold 48px Sans-Serif';
        let text = texts[Math.floor(Math.abs(off) / 50) % texts.length];
        c.fillText(text, x, y);
    };
}

// 이벤트 리스너 등록
document.onpointerdown = e => {
    shoot = true;
};

// 초기 설정 실행
function mount() {
    // 초기 설정
}

// 애니메이션 루프 실행
function loop() {
    c.clearRect(0, 0, w, h);
    // 점 그리기...
    requestAnimationFrame(loop);
}

loop();
