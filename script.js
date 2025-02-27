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
let num = 200; // 이 숫자를 조정하여 화면에 그려지는 텍스트의 전체 수를 조절할 수 있습니다.

// 캔버스에 텍스트 그리는 함수
function drawText(text, x, y) {
    c.fillStyle = 'red';
    c.font = '48px Arial';
    c.fillText(text, x, y);
}

// 메인 애니메이션 루프
function animate() {
    c.clearRect(0, 0, w, h); // 캔버스 클리어
    for (let i = 0; i < num; i++) {
        let x = (w / num) * i; // x 좌표는 화면 너비를 기준으로 계산
        let y = h / 2 + 100 * sin(i * 0.05); // y 좌표는 사인 함수를 이용하여 계산
        // 번갈아가면서 '3월'과 '4'를 그림
        drawText(i % 2 === 0 ? '' : '4', x, y);
    }
    requestAnimationFrame(animate); // 다음 애니메이션 프레임 요청
}

animate(); // 애니메이션 시작
