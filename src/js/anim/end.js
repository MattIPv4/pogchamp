const linkSvg = require('../icons/link.svg');
const { getElementFromString, getSubSpan, waitForMillis, waitForFrame } = require('../utils');
const { timingFunctionTitle, timingFunctionEndFade } = require('../constants');
const titleAnim = require('./title');

module.exports = async (pog, content, history, footer, glitch) => {
    // Fade out the footer to prep (7500ms)
    footer.style.opacity = '1';
    footer.style.transition = 'opacity 2000ms ' + timingFunctionEndFade;
    await waitForFrame();
    footer.style.opacity = '0';

    // Create the columns
    const left = document.createElement('div');
    const right = document.createElement('div');

    // Add the pog
    right.appendChild(pog);
    pog.firstElementChild.style.transition = 'transform 10000ms cubic-bezier(.3, 0, .7, 1)';
    pog.firstElementChild.style.width = '16em';
    pog.firstElementChild.style.height = '16em';
    pog.firstElementChild.style.transformOrigin = 'center';
    pog.firstElementChild.style.transform = 'scale(0.75)';
    pog.style.display = '';
    pog.style.opacity = '0';
    pog.style.transition = 'opacity 2000ms ' + timingFunctionEndFade;

    // Build out the left column
    const leftTop = document.createElement('div');
    left.appendChild(leftTop);
    const leftTopTitle = document.createElement('h1');
    leftTop.appendChild(leftTopTitle);
    leftTopTitle.style.opacity = '0';
    leftTopTitle.style.transition = 'opacity 2000ms ' + timingFunctionEndFade;
    const leftBottom = document.createElement('div');
    left.appendChild(leftBottom);
    leftBottom.style.opacity = '0';
    leftBottom.style.transition = 'opacity 2000ms ' + timingFunctionEndFade;

    // Build out the bottom half of the left column
    const leftBottomFirstRow = document.createElement('h2');
    leftBottom.appendChild(leftBottomFirstRow);
    const leftBottomSecondRow = document.createElement('h2');
    leftBottom.appendChild(leftBottomSecondRow);
    const leftBottomSecondRowLink = document.createElement('a');
    leftBottomSecondRowLink.href = 'https://www.twitch.tv/';
    leftBottomSecondRow.appendChild(leftBottomSecondRowLink);
    const leftBottomFirstRowOne = getSubSpan('Start', 0);
    leftBottomFirstRow.appendChild(leftBottomFirstRowOne);
    const leftBottomFirstRowTwo = getSubSpan('chatting.', 0);
    leftBottomFirstRow.appendChild(leftBottomFirstRowTwo);
    const leftBottomSecondRowOne = getSubSpan('Watch', 0);
    leftBottomSecondRowLink.appendChild(leftBottomSecondRowOne);
    const leftBottomSecondRowTwo = getSubSpan('now', 0);
    leftBottomSecondRowLink.appendChild(leftBottomSecondRowTwo);
    const leftBottomSecondRowLinkArrows = document.createElement('span');
    leftBottomSecondRowLink.appendChild(leftBottomSecondRowLinkArrows);
    leftBottomSecondRowLinkArrows.appendChild(getElementFromString(linkSvg));
    leftBottomSecondRowLinkArrows.appendChild(getElementFromString(linkSvg));
    leftBottomSecondRowLinkArrows.firstElementChild.style.top = '1em';
    leftBottomSecondRowLinkArrows.firstElementChild.style.right = '1em';

    // Hide the Glitch, fade in Pog & closing content (7600ms)
    await waitForMillis(2100);
    content.appendChild(left);
    content.appendChild(right);
    glitch.style.display = 'none';
    glitch.parentElement.removeChild(glitch);
    history.style.display = '';
    history.style.opacity = '0';
    history.style.transition = 'opacity 2000ms ' + timingFunctionEndFade;
    document.body.style.transition = 'background 2000ms ' + timingFunctionEndFade;
    await waitForFrame();
    await waitForFrame();
    document.body.classList.remove('anim-active');
    document.body.classList.add('post-anim');
    leftTopTitle.style.opacity = '1'; // Ends at 9600ms
    leftBottom.style.opacity = '1'; // Ends at 9600ms
    pog.style.opacity = '1'; // Ends at 9600ms
    footer.style.opacity = '1'; // Ends at 9600ms
    pog.firstElementChild.style.transform = 'scale(1)'; // Ends at 17600ms

    // Fade in the history (8000ms)
    await waitForMillis(400);
    history.style.opacity = '1'; // Ends at 10000ms

    // Do the title animation again
    // Resolves at 9000ms, ends at 9200ms
    await titleAnim(leftTopTitle);

    // Display the bottom first row part one (9000ms)
    leftBottomFirstRowOne.style.opacity = '1';
    leftBottomFirstRowOne.style.position = 'relative';
    leftBottomFirstRowOne.style.top = '1em';

    // Display the bottom first row part one (9100ms)
    await waitForMillis(100);
    leftBottomFirstRowTwo.style.opacity = '1';
    leftBottomFirstRowTwo.style.position = 'relative';
    leftBottomFirstRowTwo.style.top = '1em';

    // Begin the bottom first row part one movement (9150ms)
    await waitForMillis(50);
    leftBottomFirstRowOne.style.transition = 'top 500ms ' + timingFunctionTitle; // Ends at 9650ms
    await waitForFrame();
    leftBottomFirstRowOne.style.top = '0';

    // Begin the bottom first row part two movement (9250ms)
    await waitForMillis(100);
    leftBottomFirstRowTwo.style.transition = 'top 500ms ' + timingFunctionTitle; // Ends at 9750ms
    await waitForFrame();
    leftBottomFirstRowTwo.style.top = '0';

    // Display the bottom second row part one (9450ms)
    await waitForMillis(200);
    leftBottomSecondRowOne.style.opacity = '1';
    leftBottomSecondRowOne.style.position = 'relative';
    leftBottomSecondRowOne.style.top = '1em';

    // Display the bottom second row part one (9550ms)
    await waitForMillis(100);
    leftBottomSecondRowTwo.style.opacity = '1';
    leftBottomSecondRowTwo.style.position = 'relative';
    leftBottomSecondRowTwo.style.top = '1em';

    // Begin the bottom second row part one movement (9500ms)
    await waitForMillis(50);
    leftBottomSecondRowOne.style.transition = 'top 500ms ' + timingFunctionTitle; // Ends at 10000ms
    await waitForFrame();
    leftBottomSecondRowOne.style.top = '0';

    // Begin the bottom second row part two movement (9600ms)
    await waitForMillis(100);
    leftBottomSecondRowTwo.style.transition = 'top 500ms ' + timingFunctionTitle; // Ends at 11000ms
    await waitForFrame();
    leftBottomSecondRowTwo.style.top = '0';

    // Begin the bottom second row arrow movement (9800ms)
    await waitForMillis(200);
    leftBottomSecondRowLinkArrows.firstElementChild.style.top = ''; // Ends at 11000ms
    leftBottomSecondRowLinkArrows.firstElementChild.style.right = '';
};
