module.exports = {
    breakPoints: {
        xs: '@media screen and (max-width:700px)',
        sm: '@media screen and (min-width:700px)',
        md: '@media screen and (min-width:999px)',
        lg: '@media screen and (min-width:1200px)',
    },
    content: ['app/components/', 'app/assets/js', 'docs/'],
    custom: {
        borderTopLight: '1px solid rgba(2, 128, 174, 0.3)',
        boxShadowLight: '0 2px 3px rgba(0, 0, 0, 0.2)',
        brandColor: '#0280ae',
        columnWidth: '20px',
        hamburgerImage: 'url(https://s.yimg.com/os/acss/images/menu.d6610eea.png)',
        replBorder: '2px solid #1a1821',
        'RWD-fontSize': {
            xs: '40px',
            sm: '19px',
            md: '28px',
            lg: '55px',
        },
        textShadowLight: '0 1px 0 rgba(0, 0, 0, 0.8)',
        tocEnd: 'max(0px,calc(50% - 40rem))',
    },
};
