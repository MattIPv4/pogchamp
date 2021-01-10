const arrowSvg = require('./icons/arrow.svg');
const chevronSvg = require('./icons/chevron.svg');

const getElementFromString = htmlString => {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
};

const getElmWithText = (elm, text) => {
    const domElm = document.createElement(elm);
    domElm.textContent = text;
    return domElm;
};

const getSubSpan = text => {
    const elm = getElmWithText('span', text);
    elm.style.opacity = '0';
    elm.style.display = 'inline-block';
    elm.style.margin = '0 .15em';
    return elm;
};

const getSvgElm = svgString => {
    const svg = getElementFromString(svgString);
    svg.style.height = '.5em';
    svg.style.opacity = '0';
    return svg;
};

const setPogGridSize = (grid, size) => {
    // TODO: Replace with JS calc
    const sizeStr = `min(${size}vh,${size}vw)`;
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
    setPogGridSize(wrapper, 215);

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
            if (i === 2 && j === 2) img.style.opacity = '0'; // Hide the center
        }
    }

    return outer;
};

const waitForFrame = () => new Promise(resolve => window.requestAnimationFrame(resolve));

const waitForMillis = ms => new Promise(resolve => setTimeout(resolve, ms));

const main = async () => {
    const timingFunction = 'cubic-bezier(.7, 0, .3, 1)';
    const timingFunctionArrows = 'cubic-bezier(.5, .5, .5, .5)';

    // Get the base elms
    const title = document.getElementById('title');
    const pog = document.getElementById('pog');

    // Insert the top row text
    title.innerHTML = '';
    const titleTopRow = getElmWithText('span', 'PogChamp');
    title.appendChild(titleTopRow);
    const titleBottomRow = document.createElement('span');
    title.appendChild(titleBottomRow);

    // Insert the bottom row text
    const titleBottomRowOne = getSubSpan('of');
    titleBottomRow.appendChild(titleBottomRowOne);
    const titleBottomRowTwo = getSubSpan('the');
    titleBottomRow.appendChild(titleBottomRowTwo);
    const titleBottomRowThree = getSubSpan('Day');
    titleBottomRow.appendChild(titleBottomRowThree);

    // Insert the arrows
    const titleArrowRow = document.createElement('span');
    titleArrowRow.style.lineHeight = '0';
    title.appendChild(titleArrowRow);
    const titleArrowRowOne = getSvgElm(arrowSvg);
    titleArrowRow.appendChild(titleArrowRowOne);
    const titleArrowRowTwo = getSvgElm(chevronSvg);
    titleArrowRow.appendChild(titleArrowRowTwo);
    const titleArrowRowThree = getSvgElm(chevronSvg);
    titleArrowRow.appendChild(titleArrowRowThree);

    // Set some initial styling
    title.style.display = 'flex';
    title.style.flexDirection = 'column';
    title.style.alignItems = 'center';
    titleTopRow.style.opacity = '0';
    titleTopRow.style.display = 'inline-block';
    pog.style.display = 'none';

    // Display the top row (50ms)
    await waitForMillis(50);
    titleTopRow.style.opacity = '1';
    titleTopRow.style.position = 'relative';
    titleTopRow.style.top = '1em';

    // Display the bottom row part one (100ms)
    await waitForMillis(50);
    titleBottomRowOne.style.opacity = '1';
    titleBottomRowOne.style.position = 'relative';
    titleBottomRowOne.style.top = '1em';

    // Begin the top row movement (150ms)
    await waitForMillis(50);
    titleTopRow.style.transition = 'top 600ms ' + timingFunction; // Ends at 750ms
    await waitForFrame();
    titleTopRow.style.top = '0';

    // Display the bottom row part two (200ms)
    await waitForMillis(50);
    titleBottomRowTwo.style.opacity = '1';
    titleBottomRowTwo.style.position = 'relative';
    titleBottomRowTwo.style.top = '1em';

    // Begin the bottom row part one movement (225ms)
    await waitForMillis(25);
    titleBottomRowOne.style.transition = 'top 625ms ' + timingFunction; // Ends at 850ms
    await waitForFrame();
    titleBottomRowOne.style.top = '0';

    // Display the bottom row part three (250ms)
    await waitForMillis(25);
    titleBottomRowThree.style.opacity = '1';
    titleBottomRowThree.style.position = 'relative';
    titleBottomRowThree.style.top = '1em';

    // Begin the bottom row part two movement (275ms)
    await waitForMillis(25);
    titleBottomRowTwo.style.transition = 'top 725ms ' + timingFunction; // Ends at 1000ms
    await waitForFrame();
    titleBottomRowTwo.style.top = '0';

    // Begin the bottom row part three movement (325ms)
    await waitForMillis(50);
    titleBottomRowThree.style.transition = 'top 675ms ' + timingFunction; // Ends at 1000ms
    await waitForFrame();
    titleBottomRowThree.style.top = '0';

    // Show the first two arrow parts (600ms)
    await waitForMillis(275);
    titleArrowRowOne.style.opacity = '1';
    titleArrowRowTwo.style.transition = 'opacity 200ms ' + timingFunctionArrows; // Ends at 800ms
    await waitForFrame();
    titleArrowRowTwo.style.opacity = '1';

    // Show the third arrow part (700ms)
    await waitForMillis(100);
    titleArrowRowThree.style.transition = 'opacity 200ms ' + timingFunctionArrows; // Ends at 900ms
    await waitForFrame();
    titleArrowRowThree.style.opacity = '1';

    // Hide the first arrow part (800ms)
    await waitForMillis(100);
    titleArrowRowOne.style.transition = 'opacity 200ms ' + timingFunctionArrows; // Ends at 1000ms
    await waitForFrame();
    titleArrowRowOne.style.opacity = '0';

    // Hide the second arrow part (900ms)
    await waitForMillis(100);
    titleArrowRowTwo.style.transition = 'opacity 200ms ' + timingFunctionArrows; // Ends at 1100ms
    await waitForFrame();
    titleArrowRowTwo.style.opacity = '0';

    // Hide the third arrow part (1000ms)
    await waitForMillis(100);
    titleArrowRowThree.style.transition = 'opacity 200ms ' + timingFunctionArrows; // Ends at 1200ms
    await waitForFrame();
    titleArrowRowThree.style.opacity = '0';

    // Blackout (1100ms)
    await waitForMillis(100);
    document.body.style.background = '#000';
    title.style.display = 'none';

    // Poggers time (1150ms)
    await waitForMillis(50);
    const gridZoomTransition = '350ms linear';
    pog.style.display = '';
    pog.firstElementChild.style.transition = `transform 675ms cubic-bezier(.1, 0, .9, 1), width ${gridZoomTransition}, height ${gridZoomTransition}`;
    const grid = getPogGrid(pog.firstElementChild, gridZoomTransition);
    document.body.appendChild(grid);
    await waitForFrame();
    await waitForFrame();
    pog.firstElementChild.style.transform = 'rotate(-45deg)'; // Ends at 1825ms
    grid.firstElementChild.style.transform = 'rotate(100deg)'; // Ends at 2500ms

    // Zoom out (1500ms)
    await waitForMillis(350);
    setPogGridSize(grid.firstElementChild, 150);
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
    document.body.style.background = '';
    grid.style.display = 'none';
    pog.firstElementChild.style.transition = `width 500ms ${timingFunction}, height 500ms ${timingFunction}`; // Ends at 3000ms
    await waitForFrame();
    pog.firstElementChild.style.width = '10em';
    pog.firstElementChild.style.height = '10em';

    // TODO: Zoom back out

    // TODO: Show Glitch w/ blink

    // TODO: Show PogChamp again
};

document.addEventListener('DOMContentLoaded', main);
