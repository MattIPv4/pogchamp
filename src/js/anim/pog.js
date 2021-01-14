const { waitForMillis, waitForFrame } = require('../utils');

const setPogGridSize = (grid, size, ems) => {
    const sizeStr = `max(min(${size}vh, ${size}vw), calc(${ems}em * 9))`;
    grid.style.width = sizeStr;
    grid.style.minWidth = sizeStr;
    grid.style.height = sizeStr;
    grid.style.minHeight = sizeStr;
};

const getPogGrid = (sourceImg, zoomTransition) => {
    const outer = document.createElement('div');
    outer.style.width = '100vw';
    outer.style.maxWidth = '100vw';
    outer.style.height = '100vh';
    outer.style.maxHeight = '100vh';
    outer.style.overflow = 'hidden';
    outer.style.display = 'flex';
    outer.style.justifyContent = 'center';
    outer.style.alignItems = 'center';
    outer.style.position = 'absolute';
    outer.style.top = '0';
    outer.style.left = '0';

    const wrapper = document.createElement('div');
    outer.appendChild(wrapper);
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.justifyContent = 'space-between';
    wrapper.style.transition = ['width', 'minWidth', 'height', 'minHeight']
        .map(prop => `${prop} ${zoomTransition}`).join(', ') + ', transform 1350ms linear';
    wrapper.style.transform = 'rotate(0deg)';
    setPogGridSize(wrapper, 215, 8);

    for (let i = 0; i < 5; i++) {
        const row = document.createElement('div');
        wrapper.appendChild(row);
        row.style.display = 'flex';
        row.style.flexDirection = 'row';
        row.style.justifyContent = 'space-between';
        row.style.flexWrap = 'nowrap';

        for (let j = 0; j < 5; j++) {
            const img = document.createElement('img');
            row.appendChild(img);
            img.src = sourceImg.src;
            img.style.transition = `transform 1000ms linear, width ${zoomTransition}, height ${zoomTransition}`;
            img.style.transform = 'rotate(0deg)';
            img.style.width = '8em';
            img.style.height = '8em';
            if (i === 2 && j === 2) img.style.opacity = '0'; // Hide the center
        }
    }

    return outer;
};

module.exports = async (pog, content) => {
    // Poggers time (1150ms)
    await waitForMillis(50);
    const gridZoomTransition = '350ms linear';
    pog.style.display = '';
    pog.firstElementChild.style.transition = `transform 675ms cubic-bezier(.1, 0, .9, 1), width ${gridZoomTransition}, height ${gridZoomTransition}`;
    const grid = getPogGrid(pog.firstElementChild, gridZoomTransition);
    content.appendChild(grid);
    await waitForFrame();
    await waitForFrame();
    pog.firstElementChild.style.transform = 'rotate(-45deg)'; // Ends at 1825ms
    grid.firstElementChild.style.transform = 'rotate(100deg)'; // Ends at 2500ms

    // Zoom out (1500ms)
    await waitForMillis(350);
    setPogGridSize(grid.firstElementChild, 150, 6);
    for (const img of grid.firstElementChild.getElementsByTagName('img')) {
        img.style.width = '6em';
        img.style.height = '6em';
        img.style.transform = 'rotate(100deg)';
    }
    pog.firstElementChild.style.width = '6em';
    pog.firstElementChild.style.height = '6em';

    // Center rotation back to normal (1825ms)
    await waitForMillis(325);
    pog.firstElementChild.style.transform = 'rotate(0deg)'; // Ends at 2500ms

    // Zoom in and solo (2500ms)
    await waitForMillis(675);
    document.body.classList.remove('dark');
    grid.style.display = 'none';
    grid.parentElement.removeChild(grid);
    pog.firstElementChild.style.transition = `width 600ms cubic-bezier(.6, 0, .4, 1), height 600ms cubic-bezier(.6, 0, .4, 1)`;
    await waitForFrame();
    pog.firstElementChild.style.width = '14em'; // Ends at 3100ms
    pog.firstElementChild.style.height = '14em';

    // Zoom back out (3500ms)
    await waitForMillis(1000);
    pog.firstElementChild.style.width = '8em'; // Ends at 4100ms
    pog.firstElementChild.style.height = '8em';
}
