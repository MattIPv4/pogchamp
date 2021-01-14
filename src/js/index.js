const { waitForMillis } = require('./utils');
const titleAnim = require('./anim/title');
const pogAnim = require('./anim/pog');
const glitchAnim = require('./anim/glitch');

const main = async () => {
    // Get the base elms
    document.body.classList.add('anim-active');
    const content = document.getElementById('content');
    const title = document.getElementById('title');
    const pog = document.getElementById('pog');

    // Do the title animation
    // Resolves at 1000ms, ends at 1200ms
    await titleAnim(title, pog);

    // Blackout (1100ms)
    await waitForMillis(100);
    document.body.classList.add('dark');
    title.style.display = 'none';
    title.parentElement.removeChild(title);

    // Do the pog animation
    // Resolves at 3500ms, ends at 4100ms
    await pogAnim(pog, content);

    // Transition to Glitch (4000ms)
    await waitForMillis(500);
    pog.style.display = 'none';
    pog.style.transition = '';
    pog.firstElementChild.style.transition = '';

    // Do the Glitch animation
    // Resolves at 5500ms, ends at 7500ms
    const glitch = await glitchAnim(pog, content);

    // TODO: Below this point (transfer a lot of this to HTML/CSS, only anim stuff here)

    // Build out the new sections
    pog.style.display = '';
    pog.style.opacity = '';
    const topHalf = document.createElement('div');
    topHalf.style.opacity = '0';
    topHalf.style.transition = 'opacity 2000ms cubic-bezier(.5, 0, 1, 1)';
    topHalf.appendChild(pog);
    const bottomHalf = document.createElement('div');
    bottomHalf.style.opacity = '0';
    bottomHalf.style.transition = 'opacity 1000ms cubic-bezier(.5, 0, 1, 1)';

    // Add the text to the bottom section
    const closingTopRow = document.createElement('h2');
    bottomHalf.appendChild(closingTopRow);
    const closingBottomRow = document.createElement('h2');
    bottomHalf.appendChild(closingBottomRow);
    const closingBottomRowLink = document.createElement('a');
    closingBottomRowLink.href = 'https://www.twitch.tv/';
    closingBottomRow.appendChild(closingBottomRowLink);

    // Insert the text
    const closingTopRowOne = getSubSpan('Start', 0);
    closingTopRow.appendChild(closingTopRowOne);
    const closingTopRowTwo = getSubSpan('chatting.', 0);
    closingTopRow.appendChild(closingTopRowTwo);
    const closingBottomRowOne = getSubSpan('Watch', 0);
    closingBottomRowLink.appendChild(closingBottomRowOne);
    const closingBottomRowTwo = getSubSpan('now', 0);
    closingBottomRowLink.appendChild(closingBottomRowTwo);
    const closingBottomRowLinkArrows = document.createElement('span');
    closingBottomRowLink.appendChild(closingBottomRowLinkArrows);
    closingBottomRowLinkArrows.appendChild(getElementFromString(linkSvg));
    closingBottomRowLinkArrows.appendChild(getElementFromString(linkSvg));

    // Fade in Pog & dark bg (7600ms)
    await waitForMillis(2100);
    document.body.classList.remove('anim-active');
    document.body.classList.add('post-anim');
    content.appendChild(topHalf);
    content.appendChild(bottomHalf);
    glitch.style.display = 'none';
    glitch.parentElement.removeChild(glitch);
    pog.firstElementChild.style.transition = 'width 5000ms cubic-bezier(.3, 0, .7, 1), height 5000ms cubic-bezier(.3, 0, .7, 1)';
    pog.firstElementChild.style.width = '8em';
    pog.firstElementChild.style.height = '8em';
    closingBottomRowLinkArrows.firstElementChild.style.top = '1em';
    closingBottomRowLinkArrows.firstElementChild.style.right = '1em';
    await waitForFrame();
    await waitForFrame();
    topHalf.style.opacity = '1'; // Ends at 9600ms
    bottomHalf.style.opacity = '1'; // Ends at 8600ms
    pog.firstElementChild.style.width = '12em'; // Ends at 12100ms
    pog.firstElementChild.style.height = '12em';

    // Display the top row part one (8600ms)
    await waitForMillis(1000);
    closingTopRowOne.style.opacity = '1';
    closingTopRowOne.style.position = 'relative';
    closingTopRowOne.style.top = '1em';

    // Display the top row part one (8700ms)
    await waitForMillis(100);
    closingTopRowTwo.style.opacity = '1';
    closingTopRowTwo.style.position = 'relative';
    closingTopRowTwo.style.top = '1em';

    // Begin the top row part one movement (8850ms)
    await waitForMillis(50);
    closingTopRowOne.style.transition = 'top 500ms ' + timingFunction; // Ends at 9350ms
    await waitForFrame();
    closingTopRowOne.style.top = '0';

    // Begin the top row part two movement (8950ms)
    await waitForMillis(100);
    closingTopRowTwo.style.transition = 'top 500ms ' + timingFunction; // Ends at 9450ms
    await waitForFrame();
    closingTopRowTwo.style.top = '0';

    // Display the bottom row part one (9150ms)
    await waitForMillis(200);
    closingBottomRowOne.style.opacity = '1';
    closingBottomRowOne.style.position = 'relative';
    closingBottomRowOne.style.top = '1em';

    // Display the bottom row part one (9250ms)
    await waitForMillis(100);
    closingBottomRowTwo.style.opacity = '1';
    closingBottomRowTwo.style.position = 'relative';
    closingBottomRowTwo.style.top = '1em';

    // Begin the bottom row part one movement (9300ms)
    await waitForMillis(50);
    closingBottomRowOne.style.transition = 'top 500ms ' + timingFunction; // Ends at 9800ms
    await waitForFrame();
    closingBottomRowOne.style.top = '0';

    // Begin the bottom row part two movement (9400ms)
    await waitForMillis(100);
    closingBottomRowTwo.style.transition = 'top 500ms ' + timingFunction; // Ends at 9900ms
    await waitForFrame();
    closingBottomRowTwo.style.top = '0';

    // Begin the bottom row arrow movement (9600ms)
    await waitForMillis(200);
    closingBottomRowLinkArrows.firstElementChild.style.top = ''; // Ends at 9900ms
    closingBottomRowLinkArrows.firstElementChild.style.right = '';
};

document.addEventListener('DOMContentLoaded', main);
