"use strict";
/** Textual markov chain generator. */


class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns object of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */

  getChains() {
    // TODO: could refactor to use maps if we have time
    // Maps are always ordered, a map's keys can be of any type while obj's keys
    // need to be strings, maps can use .size to check how many elements are present
    const chains = {};

    for (let i = 0; i < this.words.length; i++) {
      const currWord = this.words[i];
      const nextWord = this.words[i + 1] || null;

      if (chains[currWord]) {
        chains[currWord].push(nextWord);
      }
      else {
        chains[currWord] = [nextWord];
      }
    }

    return chains;
  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {

    const results = [];
    let currWord = this.words[0];
    const chains = this.chains;

    while (currWord !== null) {
      const wordPool = chains[currWord];
      const randomIndex = MarkovMachine.getRandomIndex(wordPool.length);
      const nextWord = wordPool[randomIndex];

      results.push(currWord);
      currWord = nextWord;
    }

    return results.join(" ");
  }

  /* Given an maximum number, return a random integer between 0 and that number,
    inclusive of 0 and exclusive of maximum
  */

  static getRandomIndex(max) {
    return Math.floor(Math.random() * max);
  }

}

module.exports = {
  MarkovMachine,
};
