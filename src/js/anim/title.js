const arrowSvg = require('../icons/arrow.svg');
const chevronSvg = require('../icons/chevron.svg');
const { getSubSpan, getSvgElm, waitForMillis, waitForFrame } = require('../utils');
const { timingFunctionTitle, timingFunctionArrows } = require('../constants');

module.exports = async title => {
    // Insert the top row text
    title.innerHTML = '';
    const titleTopRow = document.createElement('span');
    title.appendChild(titleTopRow);
    const titleBottomRow = document.createElement('span');
    title.appendChild(titleBottomRow);

    // Insert the top row text
    const titleTopRowOne = getSubSpan('Your', 0);
    titleTopRow.appendChild(titleTopRowOne);
    const titleTopRowTwo = getSubSpan('new', 0);
    titleTopRow.appendChild(titleTopRowTwo);

    // Insert the bottom row text
    const titleBottomRowOne = getSubSpan('PogChamp', 0);
    titleBottomRow.appendChild(titleBottomRowOne);
    const titleBottomRowTwo = getSubSpan('is...', 0);
    titleBottomRow.appendChild(titleBottomRowTwo);

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

    // Display the top row part one (50ms)
    await waitForMillis(50);
    titleTopRowOne.style.opacity = '1';
    titleTopRowOne.style.position = 'relative';
    titleTopRowOne.style.top = '1em';

    // Display the top row part two (100ms)
    await waitForMillis(50);
    titleTopRowTwo.style.opacity = '1';
    titleTopRowTwo.style.position = 'relative';
    titleTopRowTwo.style.top = '1em';

    // Begin the top row part one movement (150ms)
    await waitForMillis(50);
    titleTopRowOne.style.transition = 'top 600ms ' + timingFunctionTitle; // Ends at 750ms
    await waitForFrame();
    titleTopRowOne.style.top = '0';

    // Display the bottom row part one (200ms)
    await waitForMillis(50);
    titleBottomRowOne.style.opacity = '1';
    titleBottomRowOne.style.position = 'relative';
    titleBottomRowOne.style.top = '1em';

    // Begin the top row part one movement (225ms)
    await waitForMillis(25);
    titleTopRowTwo.style.transition = 'top 625ms ' + timingFunctionTitle; // Ends at 850ms
    await waitForFrame();
    titleTopRowTwo.style.top = '0';

    // Display the bottom row part two (250ms)
    await waitForMillis(25);
    titleBottomRowTwo.style.opacity = '1';
    titleBottomRowTwo.style.position = 'relative';
    titleBottomRowTwo.style.top = '1em';

    // Begin the bottom row part one movement (275ms)
    await waitForMillis(25);
    titleBottomRowOne.style.transition = 'top 725ms ' + timingFunctionTitle; // Ends at 1000ms
    await waitForFrame();
    titleBottomRowOne.style.top = '0';

    // Begin the bottom row part two movement (325ms)
    await waitForMillis(50);
    titleBottomRowTwo.style.transition = 'top 675ms ' + timingFunctionTitle; // Ends at 1000ms
    await waitForFrame();
    titleBottomRowTwo.style.top = '0';

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
}
