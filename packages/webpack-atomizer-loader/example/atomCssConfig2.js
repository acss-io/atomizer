module.exports = {
    cssDest: './main2.css',
    options: {
        namespace: '#atomic-blue',
    },
    configs: {
        breakPoints: {
            sm: '@media screen(min-width=750px)',
            md: '@media(min-width=1000px)',
            lg: '@media(min-width=1200px)',
        },
        custom: {
            'primary-bg': 'blue',
        },
        classNames: [],
    },
};
