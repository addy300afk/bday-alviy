const playBtn = document.getElementById('playBtn');
const music = document.getElementById('music');
const puzzleSection = document.getElementById('puzzleSection');
const secretSection = document.getElementById('secretSection');
const puzzleCanvas = document.getElementById('puzzleCanvas');
const ctx = puzzleCanvas.getContext('2d');
const rows = 3, cols = 3;
let pieces = [];
let puzzleImg = new Image();
puzzleImg.src = 'images/alviya.png'; // Default first image

let solved = false;

playBtn.addEventListener('click', () => {
  music.classList.remove('hidden');
  playBtn.classList.add('hidden');
  setTimeout(() => {
    puzzleSection.classList.remove('hidden');
  }, 2000);
});

// Puzzle logic
puzzleImg.onload = () => {
  const pieceWidth = puzzleCanvas.width / cols;
  const pieceHeight = puzzleCanvas.height / rows;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      pieces.push({
        sx: x * pieceWidth,
        sy: y * pieceHeight,
        dx: Math.random() * (puzzleCanvas.width - pieceWidth),
        dy: Math.random() * (puzzleCanvas.height - pieceHeight),
        correctX: x * pieceWidth,
        correctY: y * pieceHeight,
        w: pieceWidth,
        h: pieceHeight
      });
    }
  }

  drawPuzzle();
};

function drawPuzzle() {
  ctx.clearRect(0, 0, puzzleCanvas.width, puzzleCanvas.height);
  pieces.forEach(p => {
    ctx.drawImage(puzzleImg, p.sx, p.sy, p.w, p.h, p.dx, p.dy, p.w, p.h);
  });
}

// Secret Message
const secretBtn = document.getElementById('secretBtn');
const revealBtn = document.getElementById('revealBtn');
const finalMessage = document.getElementById('finalMessage');

secretBtn.addEventListener('click', () => {
  revealBtn.classList.remove('hidden');
});

revealBtn.addEventListener('click', () => {
  finalMessage.classList.remove('hidden');
});
