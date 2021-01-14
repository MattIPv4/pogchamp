const glitchSvg = require('../icons/glitch.svg');
const { getElementFromString, waitForMillis, waitForFrame } = require('../utils');
const { timingFunctionGlitch } = require('../constants');

module.exports = async (pog, content) => {
    // Show Glitch (4000ms)
    const glitch = getElementFromString(glitchSvg);
    content.appendChild(glitch);
    glitch.style.transition = `width 600ms ${timingFunctionGlitch}, height 600ms ${timingFunctionGlitch}`;
    glitch.style.width = '8.5em';
    glitch.style.height = '8.5em';
    const glitchOuter = glitch.getElementById('glitch-outer'); // Relies on mask to crop as we translate
    const glitchInner = glitch.getElementById('glitch-inner'); // Relies on mask to crop as we translate
    glitchOuter.style.transition = 'transform 150ms ' + timingFunctionGlitch;
    glitchOuter.style.transform = 'translate(-15%, 15%)';
    glitchInner.style.transition = 'transform 300ms ' + timingFunctionGlitch;
    glitchInner.style.transform = 'translate(-15%, 15%)';
    const glitchEyes = glitch.getElementById('glitch-eyes');
    glitchEyes.style.transition = 'transform 150ms ' + timingFunctionGlitch;
    glitchEyes.style.transformOrigin = '0 35%';
    glitchEyes.style.transform = 'scaleY(0)';
    await waitForFrame();
    await waitForFrame();
    glitchOuter.style.transform = 'translate(0%, 0%)'; // Ends at 4150ms
    glitchInner.style.transform = 'translate(0%, 0%)'; // Ends at 4300ms
    glitch.style.width = '8em'; // Ends at 4600ms
    glitch.style.height = '8em';

    // Open Glitch eyes (4400ms)
    await waitForMillis(400);
    glitchEyes.style.transform = 'scaleY(1)'; // Ends at 4550ms

    // Close Glitch eyes (4550ms)
    await waitForMillis(150);
    await waitForFrame();
    glitchEyes.style.transform = 'scaleY(0.05)'; // Ends at 4700ms

    // Open Glitch eyes again (4700ms)
    await waitForMillis(150);
    await waitForFrame();
    glitchEyes.style.transform = 'scaleY(1)'; // Ends at 4850ms

    // Close Glitch eyes again (4850ms)
    await waitForMillis(150);
    await waitForFrame();
    glitchEyes.style.transform = 'scaleY(0.05)'; // Ends at 5000ms

    // Open Glitch eyes slowly (5000ms)
    await waitForMillis(150);
    await waitForFrame();
    glitchEyes.style.transition = 'transform 600ms' + timingFunctionGlitch;
    await waitForFrame();
    glitchEyes.style.transform = 'scaleY(1)'; // Ends at 5600ms

    // Fade out Glitch (5500ms)
    await waitForMillis(500);
    glitch.style.transition = 'opacity 2000ms cubic-bezier(1, 0, .5, 1)';
    glitch.style.opacity = '0'; // Ends at 7500ms

    // Return the Glitch for other things
    return glitch;
}
