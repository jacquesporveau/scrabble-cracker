# Scrabble Cracker

A TypeScript CLI tool that finds the highest-scoring word you can make from your available Scrabble letters.

## Features

- Finds all possible words from your available letters
- Scores words using standard Scrabble letter values
- Displays the top-scoring word

## Installation

```bash
yarn install
```

## Usage

### Development

Run the project directly with TypeScript:

```bash
yarn dev
```

### Production

Build and run:

```bash
yarn build
yarn start
```

## How It Works

1. Enter your available letters when prompted
2. The tool searches through a dictionary to find all possible words
3. Each word is scored using standard Scrabble letter values
4. The highest-scoring word is displayed

## Scripts

- `yarn build` - Compile TypeScript to JavaScript
- `yarn dev` - Run the project in development mode
- `yarn start` - Run the compiled JavaScript
