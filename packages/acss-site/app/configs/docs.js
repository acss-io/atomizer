module.exports = [
    {
        category: '',
        children: [
            {
                label: 'Quick Start',
                routeName: 'docs',
                navParams: {
                    key: 'quick-start'
                }
            },
            {
                label: 'FAQ',
                routeName: 'docs',
                navParams: {
                    key: 'frequently-asked-questions'
                }
            }
        ]
    },
    {
        category: 'GUIDES',
        children: [
            {
                label: 'Atomizer tool',
                routeName: 'docs',
                navParams: {
                    type: 'guides',
                    key: 'atomizer'
                }
            },
            {
                label: 'Atomic classes',
                routeName: 'docs',
                navParams: {
                    type: 'guides',
                    key: 'atomic-classes'
                }
            },
            {
                label: 'Helper classes',
                routeName: 'docs',
                navParams: {
                    type: 'guides',
                    key: 'helper-classes'
                }
            },
            {
                label: 'The syntax',
                routeName: 'docs',
                navParams: {
                    type: 'guides',
                    key: 'syntax'
                }
            }
        ]
    },
    {
        category: 'TUTORIALS',
        children: [
            {
                label: 'Grid system',
                routeName: 'docs',
                navParams: {
                    type: 'tutorials',
                    key: 'grid'
                }
            },
            {
                label: 'RWD',
                routeName: 'docs',
                navParams: {
                    type: 'tutorials',
                    key: 'responsive-web-design'
                }
            }
        ]
    }
];
