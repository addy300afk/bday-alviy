const playBtn = document.getElementById('playBtn');
const music = document.getElementById('music');
const puzzleSection = document.getElementById('puzzleSection');
const secretSection = document.getElementById('secretSection');
const puzzleCanvas = document.getElementById('puzzleCanvas');
const ctx = puzzleCanvas.getContext('2d');

const rows = 3, cols = 3;
const pieceWidth = puzzleCanvas.width / cols;
const pieceHeight = puzzleCanvas.height / rows;

let pieces = [];
let currentPiece = null;
let offsetX, offsetY;
let solved = false;

// 🎲 Randomly choose one of the images
let images = ['images/alviya.png', 'images/alviya2.png'];
let puzzleImg = new Image();
puzzleImg.src = images[Math.floor(Math.random() * images.length)];

playBtn.addEventListener('click', () => {
  music.classList.remove('hidden');
  playBtn.classList.add('hidden');
  setTimeout(() => {
    puzzleSection.classList.remove('hidden');
  }, 2000);
});

// Create puzzle pieces
puzzleImg.onload = () => {
  pieces = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      pieces.push({
        sx: x * pieceWidth,
        sy: y * pieceHeight,
        x: Math.random() * (puzzleCanvas.width - pieceWidth),
        y: Math.random() * (puzzleCanvas.height - pieceHeight),
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
    ctx.drawImage(puzzleImg, p.sx, p.sy, p.w, p.h, p.x, p.y, p.w, p.h);
    ctx.strokeStyle = "#fff";
    ctx.strokeRect(p.x, p.y, p.w, p.h);
  });
}

// 🖱️ Mouse Controls
puzzleCanvas.addEventListener('mousedown', e => {
  if (solved) return;
  const mousePos = getMousePos(e);
  currentPiece = pieces.find(p => 
    mousePos.x > p.x && mousePos.x < p.x + p.w &&
    mousePos.y > p.y && mousePos.y < p.y + p.h
  );
  if (currentPiece) {
    offsetX = mousePos.x - currentPiece.x;
    offsetY = mousePos.y - currentPiece.y;
  }
});

puzzleCanvas.addEventListener('mousemove', e => {
  if (!currentPiece) return;
  const mousePos = getMousePos(e);
  currentPiece.x = mousePos.x - offsetX;
  currentPiece.y = mousePos.y - offsetY;
  drawPuzzle();
});

puzzleCanvas.addEventListener('mouseup', () => {
  if (!currentPiece) return;

  // Snap into place if close enough
  if (Math.abs(currentPiece.x - currentPiece.correctX) < 20 &&
      Math.abs(currentPiece.y - currentPiece.correctY) < 20) {
    currentPiece.x = currentPiece.correctX;
    currentPiece.y = currentPiece.correctY;
  }

  currentPiece = null;
  drawPuzzle();

  checkSolved();
});

function getMousePos(evt) {
  const rect = puzzleCanvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

// ✅ Check if puzzle is solved
function checkSolved() {
  solved = pieces.every(p => p.x === p.correctX && p.y === p.correctY);
  if (solved) {
    document.getElementById('puzzleMessage').classList.remove('hidden');
    setTimeout(() => {
      secretSection.classList.remove('hidden');
    }, 1500);
  }
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
