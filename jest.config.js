export default {
    
    // Automatically clear mock calls, instances and results before every test
    clearMocks: true,
    transform: undefined,
    
    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: true,
    
    // Indicates whether each individual test should be reported during the run
    verbose: true,
    setupFilesAfterEnv: [ 'jest-extended/all' ]
    
    // An array of regexp patterns that are matched against all source file paths before re-running tests in watch mode
    // WatchPathIgnorePatterns: [],
    
    // Whether to use watchman for file crawling
    // Watchman: true,
}
