const sketchContainer = document.querySelector('.sketchContainer');
const slider = document.querySelector('.slider');
let sliderValue = slider.value
const sliderValueDisplay = document.querySelector('.value');

slider.addEventListener('input', function() {
    const sliderValue = Number(slider.value);
    localStorage.setItem('sliderValue', sliderValue);
    sliderValueDisplay.textContent = `Grid Size: ${sliderValue} x ${sliderValue}`;
    createItems(sliderValue);
});

window.addEventListener('load', function() {
    const savedValue = localStorage.getItem('sliderValue'); 
    if (savedValue) {
        slider.value = savedValue;
        sliderValueDisplay.textContent = `Grid Size: ${savedValue} x ${savedValue}`;
        createItems(savedValue);
    } else {
        const defaultSize = 16;
        slider.value = defaultSize;
        sliderValueDisplay.textContent = `Grid Size: ${defaultSize} x ${defaultSize}`;
        createItems(defaultSize);
    }
});

const createItems = (gridSize) => {
    sketchContainer.innerHTML = '';

    sketchContainer.style.display = 'flex';
    sketchContainer.style.flexWrap = 'wrap';
    
    const containerSize = Math.min(sketchContainer.clientWidth, sketchContainer.clientHeight);
    const cellSize = containerSize / gridSize;

    sketchContainer.style.width = `${cellSize * gridSize}px`;
    sketchContainer.style.height = `${cellSize * gridSize}px`;

    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.width = `${cellSize}px`;
        cell.style.height = `${cellSize}px`;
        sketchContainer.appendChild(cell);
    }

    drawOnGrid(); 
};

const drawOnGrid = () => {
    const cells = document.querySelectorAll('.cell');

    cells.forEach(cell => {
        cell.addEventListener('mouseenter', () => {
            cell.classList.add('hovered');
        });
    });
};

const clearGrid = () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.classList.remove('hovered');
    });
};

