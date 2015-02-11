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
            }
        ]
    },
    {
        category: 'Guides',
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
                label: 'Class names',
                routeName: 'docs',
                navParams: {
                    type: 'guides',
                    key: 'class-names'
                }
            }
        ]
    },
    {
        category: 'Tutorials',
        children: [
            {
                label: 'Grid system',
                routeName: 'docs',
                navParams: {
                    type: 'tutorials',
                    key: 'grid'
                }
            }
        ]
    }
];
