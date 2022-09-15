module.exports = {
    extensionsToTreatAsEsm: ['.ts'],
    transform: {
        '^.+\\.(ts|tsx)?$': [
            'ts-jest',
            {
                isolatedModules: true,
                useESM: true,
            },
        ],
    },
};
