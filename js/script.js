const playBtn = document.getElementById('playBtn');
const music = document.getElementById('music');
const puzzleSection = document.getElementById('puzzleSection');
const secretSection = document.getElementById('secretSection');
const puzzleCanvas = document.getElementById('puzzleCanvas');
const ctx = puzzleCanvas.getContext('2d');

const rows = 3, cols = 3;
const pieceWidth = puzzleCanvas.width / cols;
const pieceHeight = puzzleCanvas.height / rows;

let board = [];
let firstClick = null;
let solved = false;

// 🎲 Random image
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

puzzleImg.onload = () => {
  initBoard();
  shuffleBoard();
  drawBoard();
};

function initBoard() {
  board = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      board.push({x, y, correctX: x, correctY: y});
    }
  }
}

function shuffleBoard() {
  for (let i = board.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [board[i], board[j]] = [board[j], board[i]];
  }
}

function drawBoard() {
  ctx.clearRect(0, 0, puzzleCanvas.width, puzzleCanvas.height);
  for (let i = 0; i < board.length; i++) {
    let piece = board[i];
    let drawX = (i % cols) * pieceWidth;
    let drawY = Math.floor(i / cols) * pieceHeight;
    ctx.drawImage(
      puzzleImg,
      piece.correctX * pieceWidth,
      piece.correctY * pieceHeight,
      pieceWidth,
      pieceHeight,
      drawX,
      drawY,
      pieceWidth,
      pieceHeight
    );
    ctx.strokeStyle = "#fff";
    ctx.strokeRect(drawX, drawY, pieceWidth, pieceHeight);
  }
}

puzzleCanvas.addEventListener('click', e => {
  if (solved) return;
  const pos = getMousePos(e);
  const col = Math.floor(pos.x / pieceWidth);
  const row = Math.floor(pos.y / pieceHeight);
  const index = row * cols + col;

  if (firstClick === null) {
    firstClick = index;
  } else {
    // Swap pieces
    [board[firstClick], board[index]] = [board[index], board[firstClick]];
    firstClick = null;
    drawBoard();
    checkSolved();
  }
});

function getMousePos(evt) {
  const rect = puzzleCanvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function checkSolved() {
  solved = board.every((p, i) => 
    p.correctX === (i % cols) && p.correctY === Math.floor(i / cols)
  );
  if (solved) {
    document.getElementById('puzzleMessage').classList.remove('hidden');
    setTimeout(() => {
      secretSection.classList.remove('hidden');
    }, 1500);
  }
}

// Secret message logic
const secretBtn = document.getElementById('secretBtn');
const revealBtn = document.getElementById('revealBtn');
const finalMessage = document.getElementById('finalMessage');

secretBtn.addEventListener('click', () => {
  revealBtn.classList.remove('hidden');
});

revealBtn.addEventListener('click', () => {
  finalMessage.classList.remove('hidden');
});
