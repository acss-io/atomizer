module.exports = {
    extensionsToTreatAsEsm: ['.ts'],
    globals: {
        'ts-jest': {
            isolatedModules: true,
            useESM: true,
        },
    },
    preset: 'ts-jest',
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
    },
};
