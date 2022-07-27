module.exports = {
    breakPoints: {
        xs: '@media screen and (max-width:700px)',
        sm: '@media screen and (min-width:700px)',
        md: '@media screen and (min-width:999px)',
        lg: '@media screen and (min-width:1200px)',
    },
    content: ['examples/*.html'],
    custom: {
        'Bdt(light)': '1px solid rgba(2, 128, 174, 0.3)',
        'Bgi(hamburger)': 'url(https://s.yimg.com/os/acss/images/menu.d6610eea.png)',
        brandColor: '#0280ae',
        'Bxsh(light)': '0 2px 3px rgba(0, 0, 0, 0.2)',
        columnWidth: '20px',
        'Bgc(selected)': '#e5e1ea!important',
        gridContent: 'c',
        gridHeader: 'a',
        gridNav: 'b',
        gridABC:`"a a a"
                 "b c c"
                 "b c c"`,
        gridABCUnit: `"a a a" 40px
                      "b c c" 40px
                      "b c c" 40px / 1fr 1fr 1fr;`,
        gridMinMax: 'minmax(10px, 120px)',
        lineHeight: '0.8',
        colAside: 'aside',
        colMain: 'main',
        primaryFontColor: '#{brandColor}',
        replBorder: '2px solid #1a1821',
        rowOneFixed: '[col1] 100px [col1-end] repeat(auto-fit, [line3] 200px)',
        spanTwo: 'span 2',
        twoColNamedGrid: '[#{colMain}-start] repeat(9,minmax(0,1fr)) [#{colMain}-end #{colAside}-start] repeat(3,minmax(0,1fr)) [#{colAside}-end]',
        threeColEvenGrid: 'repeat(3, minmax(20px, 1fr))',
        tocEnd: 'max(0px,calc(50% - 40rem))',
        'Fz(RWD-fontSize)': {
            xs: '40px',
            sm: '19px',
            md: '28px',
            lg: '55px',
        },
        'Tsh(1)': '0 1px 0 rgba(0, 0, 0, 0.8)',
        twoCol: '1 / span 2'
    },
};
