# hw-podium

![Badge](https://github.com/lastnamehurt/cautious-broccoli/actions/workflows/ci.yml/badge.svg)

# Requirements

This project was built using Node.js 16.14.0

- [Node.js 12 or 14 and above](https://docs.cypress.io/guides/getting-started/installing-cypress#System-requirements)
- (Optional) Docker

# Install

- `npm i`

# Run Tests

Execute all, smoke, or regression tests using a single command

- full test suite: `npm test`
- smoke tests: `npm run test:smoke`
- regression tests: `npm run test:regression`
- full test suite in Docker: `npm run build`

...or to get even more specific, the `@failing` tag represents a test that is expected to pass

- run passing tests only: `npm run test:passing`
- run failing tests only: `npm run test:failing`
- run in "Open" mode: `npm run test:debug`

## Bugs

`npm run test:failing`
