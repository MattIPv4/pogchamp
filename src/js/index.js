const { waitForMillis } = require('./utils');
const titleAnim = require('./anim/title');
const pogAnim = require('./anim/pog');
const glitchAnim = require('./anim/glitch');
const endAnim = require('./anim/end');

const main = async () => {
    // Get the base elms
    const content = document.getElementById('content');
    const title = document.getElementById('title');
    const pog = document.getElementById('pog');
    const history = document.getElementById('history');
    const footer = document.getElementById('footer');

    // Basic prep
    document.body.classList.add('anim-active');
    history.style.display = 'none';
    pog.style.display = 'none';

    // Do the title animation
    // Resolves at 1000ms, ends at 1200ms
    await titleAnim(title);

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

    // Do the end animation
    await endAnim(pog, content, history, footer, glitch);
};

document.addEventListener('DOMContentLoaded', main);
