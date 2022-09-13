module.exports = {
    breakPoints: {
        xs: '@media screen and (max-width:700px)',
        sm: '@media screen and (min-width:700px)',
        md: '@media screen and (min-width:999px)',
        lg: '@media screen and (min-width:1200px)',
    },
    content: ['app/components/', 'app/assets/js', 'docs/'],
    custom: {
        hamburgerImage: 'url(https://s.yimg.com/os/acss/images/menu.d6610eea.png)',
        rwdFontSize: {
            xs: '12px',
            sm: '22px',
            md: '32px',
            lg: '42px',
        },

        // grid related custom variables
        colAside: 'aside',
        colMain: 'main',
        columnWidth: '20px',
        gridABC: `"a a a"
                 "b c c"
                 "b c c"`,
        gridABCUnit: `"a a a" 40px
                      "b c c" 40px
                      "b c c" 40px / 1fr 1fr 1fr;`,
        gridContent: 'c',
        gridHeader: 'a',
        gridMinMax: 'minmax(10px, 120px)',
        gridNav: 'b',
        rowOneFixed: '[col1] 100px [col1-end] repeat(auto-fit, [line3] 200px)',
        spanTwo: 'span 2',
        threeColEvenGrid: 'repeat(3, minmax(20px, 1fr))',
        twoCol: '1 / span 2',
        twoColEvenGrid: 'repeat(2, minmax(20px, 1fr))',
        twoColNamedGrid:
            '[#{colMain}-start] repeat(9,minmax(0,1fr)) [#{colMain}-end #{colAside}-start] repeat(3,minmax(0,1fr)) [#{colAside}-end]',
    },
};
