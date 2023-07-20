const canvas = document.getElementById('canvas');
const blackModeBtn = document.getElementById('black-mode-btn');
const rainbowModeBtn = document.getElementById('rainbow-mode-btn');
const eraserBtn = document.getElementById('eraser-btn');
const clearBtn = document.getElementById('clear-btn');
const gridSizeSlider = document.getElementById('grid-size-slider');
const gridSizeLabel = document.getElementById('grid-size-label');

let currentColor = '';
let isRainbowMode = false;
let isEraserMode = false;
let darknessLevel = 0.1;

function createGrid(size) {
  canvas.innerHTML = '';
  canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement('div');
    gridElement.classList.add('grid-element');
    gridElement.addEventListener('mouseover', paintGrid);
    canvas.appendChild(gridElement);
  }
  updateGridSizeLabel(size);
}

function updateGridSizeLabel(size) {
  gridSizeLabel.textContent = `Grid Size: ${size}x${size}`;
}

function paintGrid(event) {
  if (event.buttons === 1) {
    const gridElement = event.target;
    if (isRainbowMode) {
      const randomColor = getRandomColor();
      gridElement.style.backgroundColor = randomColor;
    } else if (isEraserMode) {
      gridElement.style.backgroundColor = '#fff';
      gridElement.style.opacity = 1;
    } else if (currentColor === 'black') {
      const currentOpacity = parseFloat(gridElement.style.opacity) || 1;
      gridElement.style.backgroundColor = 'black';
      gridElement.style.opacity = Math.max(currentOpacity - darknessLevel, 0);
    } else {
      gridElement.style.backgroundColor = currentColor;
      gridElement.style.opacity = 1;
    }
  }
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}

function resetButtonStates() {
  blackModeBtn.classList.remove('active');
  rainbowModeBtn.classList.remove('active');
  eraserBtn.classList.remove('active');
}

function setButtonState(button, color) {
  resetButtonStates();
  button.classList.add('active');
  currentColor = color;
  isRainbowMode = button === rainbowModeBtn;
  isEraserMode = button === eraserBtn;
}

blackModeBtn.addEventListener('click', () => {
  if (currentColor !== 'black') {
    setButtonState(blackModeBtn, 'black');
  } else {
    resetButtonStates();
    currentColor = '';
  }
});

rainbowModeBtn.addEventListener('click', () => {
  if (!isRainbowMode) {
    setButtonState(rainbowModeBtn, '');
  } else {
    resetButtonStates();
    currentColor = '';
  }
});

eraserBtn.addEventListener('click', () => {
  if (!isEraserMode) {
    setButtonState(eraserBtn, '');
  } else {
    resetButtonStates();
    currentColor = '';
  }
});

clearBtn.addEventListener('click', () => {
  const gridElements = canvas.querySelectorAll('.grid-element');
  gridElements.forEach(gridElement => {
    gridElement.style.backgroundColor = '#fff';
    gridElement.style.opacity = 1;
  });
});

gridSizeSlider.addEventListener('input', () => {
  const newSize = gridSizeSlider.value;
  createGrid(newSize);
});

createGrid(16);