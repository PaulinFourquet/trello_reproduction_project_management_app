/** @type {import('@jest/types').Config.InitialOptions} */
export const rootDir = '..';
export const testMatch = ['<rootDir>/e2e/**/*.test.js'];
export const testTimeout = 120000;
export const maxWorkers = 1;
export const globalSetup = 'detox/runners/jest/globalSetup';
export const globalTeardown = 'detox/runners/jest/globalTeardown';
export const reporters = ['detox/runners/jest/reporter'];
export const testEnvironment = 'detox/runners/jest/testEnvironment';
export const verbose = true;
