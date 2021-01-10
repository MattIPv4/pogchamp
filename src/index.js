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

const waitForFrame = () => new Promise(resolve => window.requestAnimationFrame(resolve));

const waitForMillis = ms => new Promise(resolve => setTimeout(resolve, ms));

document.addEventListener('DOMContentLoaded', async () => {
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
    pog.style.display = '';
});
