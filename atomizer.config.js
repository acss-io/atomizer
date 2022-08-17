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
        'Fz(RWD-fontSize)': {
            xs: '40px',
            sm: '19px',
            md: '28px',
            lg: '55px',
        },
        replBorder: '2px solid #1a1821',
        tocEnd: 'max(0px,calc(50% - 40rem))',
        'Tsh(1)': '0 1px 0 rgba(0, 0, 0, 0.8)',
    },
};
