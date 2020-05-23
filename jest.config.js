const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
    moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{ts,js}'],
    transform: {
        '\\.ts$': '<rootDir>/node_modules/ts-jest/preprocessor.js',
    },
    coverageThreshold: {
        global: {
            branches: 0,
            functions: 0,
            lines: 0,
            statements: 0,
        },
    },
    coverageReporters: ['text', 'text-summary'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)x?$',
    testPathIgnorePatterns: ['/node_modules/', '/build/', '/coverage/'],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/',
    }),
};
