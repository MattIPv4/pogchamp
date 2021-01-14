const getElementFromString = module.exports.getElementFromString = htmlString => {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
};

const getElmWithText = module.exports.getElmWithText = (elm, text) => {
    const domElm = document.createElement(elm);
    domElm.textContent = text;
    return domElm;
};

module.exports.getSubSpan = (text, opacity) => {
    const elm = getElmWithText('span', text);
    elm.style.opacity = opacity;
    elm.style.display = 'inline-block';
    elm.style.margin = '0 .15em';
    return elm;
};

module.exports.getSvgElm = svgString => {
    const svg = getElementFromString(svgString);
    svg.style.height = '.5em';
    svg.style.opacity = '0';
    return svg;
};

module.exports.waitForFrame = () => new Promise(resolve => window.requestAnimationFrame(resolve));

module.exports.waitForMillis = ms => new Promise(resolve => setTimeout(resolve, ms));
