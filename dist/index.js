import prompts from "prompts";
import { readFileSync } from "fs";
import { letterMap } from "./letterMap.js";
const getLetters = async () => {
    const response = await prompts({
        type: "text",
        name: "letters",
        message: "What letters do you have?",
    });
    return String(response.letters).trim().toUpperCase();
};
const countLetters = (letters) => {
    const counts = {};
    for (const letter of letters) {
        if (letter >= "A" && letter <= "Z") {
            counts[letter] = (counts[letter] || 0) + 1;
        }
    }
    return counts;
};
const canFormWord = (word, availableLetters) => {
    const wordCounts = countLetters(word);
    for (const [letter, count] of Object.entries(wordCounts)) {
        if ((availableLetters[letter] || 0) < count) {
            return false;
        }
    }
    return true;
};
const scoreWord = (word) => {
    let score = 0;
    for (const letter of word) {
        if (letter >= "A" && letter <= "Z") {
            score += letterMap[letter] || 0;
        }
    }
    return score;
};
const findPossibleWords = (letters, dictionary) => {
    const availableLetters = countLetters(letters);
    const possibleWords = [];
    for (const word of dictionary) {
        const upperWord = word.toUpperCase();
        if (canFormWord(upperWord, availableLetters)) {
            possibleWords.push({
                word: upperWord,
                score: scoreWord(upperWord),
            });
        }
    }
    possibleWords.sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score;
        }
        if (b.word.length !== a.word.length) {
            return b.word.length - a.word.length;
        }
        return a.word.localeCompare(b.word);
    });
    return possibleWords;
};
(async () => {
    const letters = await getLetters();
    const dictionary = JSON.parse(readFileSync(new URL("./dictionary.json", import.meta.url), "utf-8"));
    const possibleWords = findPossibleWords(letters, dictionary);
    if (possibleWords.length === 0) {
        console.log("\nNo words can be formed with those letters.");
    }
    else {
        const topWord = possibleWords[0];
        if (topWord) {
            console.log(`\nTop word: ${topWord.word} (${topWord.score} points)`);
        }
    }
})();
//# sourceMappingURL=index.js.map