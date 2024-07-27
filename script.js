const sketchContainer = document.querySelector('.sketchContainer');
const slider = document.querySelector('.slider');
const sliderValueDisplay = document.querySelector('.value');
const holdBtn = document.getElementById('hold'); 
let mode = 'mouseenter'; 
let drawing = false;

holdBtn.addEventListener('click', () => {
    mode = (mode === 'mouseenter') ? 'mousedown' : 'mouseenter';
    holdBtn.textContent = (mode === 'mouseenter') ? 'Hold' : 'Hover';
    createItems(slider.value);
});

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

    drawOnGrid(mode); 
};

const drawOnGrid = (mode) => {
    if (mode === 'mouseenter') {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.addEventListener('mouseenter', () => {
                cell.classList.add('hovered');
            });
        });
    } else if (mode === 'mousedown') {
        const startDrawing = () => { drawing = true; };
        const stopDrawing = () => { drawing = false; };

        document.addEventListener('mousedown', startDrawing);
        document.addEventListener('mouseup', stopDrawing);
        document.addEventListener('mousemove', (e) => {
            if (drawing) {
                const cell = document.elementFromPoint(e.clientX, e.clientY);
                if (cell && cell.classList.contains('cell')) {
                    cell.classList.add('hovered');
                }
            }
        });

        document.addEventListener('mouseup', () => {
            drawing = false;
        }, { once: true });
    }
};

const clearGrid = () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.classList.remove('hovered');
    });
};
