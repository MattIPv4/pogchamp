module.exports = `<svg viewBox="0 0 2400 2800" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="glitch-full-outer-mask" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="2400" height="2800">
<path id="glitch-full-outer" d="M500 0L0 500V2300H600V2800L1100 2300H1500L2400 1400V0H500Z" fill="black"/>
</mask>
<g mask="url(#glitch-full-outer-mask)">
<path d="M500 0L0 500V2300H600V2800L1100 2300H1500L2400 1400V0H500Z" fill="black"/>
</g>
<mask id="glitch-full-inner-mask" mask-type="alpha" maskUnits="userSpaceOnUse" x="200" y="200" width="2000" height="1900">
<path d="M600 200L200 600V2100H1400L2200 1300V200H600Z" fill="black"/>
</mask>
<g mask="url(#glitch-full-inner-mask)">
<path id="glitch-full-inner" d="M2200 1300L1800 1700H1400L1050 2050V1700H600V200H2200V1300Z" fill="white"/>
</g>
<g id="glitch-full-eyes">
<path d="M1900 550H1700V1150H1900V550Z" fill="black"/>
<path d="M1350 550H1150V1150H1350V550Z" fill="black"/>
</g>
</svg>
`
