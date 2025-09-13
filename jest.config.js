/** @type {import('jest').Config} */
module.exports = {
  verbose: true,
  testEnvironment: "node",
  testMatch: ["**/src/**/*.test.ts", "**/src/**/*.spec.ts"],
  preset: "ts-jest"
};
