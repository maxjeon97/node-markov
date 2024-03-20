"use strict";

const { MarkovMachine } = require("./markov");

describe("MarkovMachine tests", function () {

  test("getChains method returns correct chain", function () {
    let text = "The cat in the hat.";
    const machine = new MarkovMachine(text);
    let chains = machine.getChains();

    expect(chains).toEqual({
      "The": ["cat"],
      "cat": ["in"],
      "in": ["the"],
      "the": ["hat."],
      "hat.": [null]
    });
  });

  test("getText method with no branches", function () {
    let text = "The cat in the hat.";
    const machine = new MarkovMachine(text);
    let result = machine.getText();

    expect(result).toEqual('The cat in the hat.');
  });

  test("getText method with branches", function () {
    let text = "The cat is in the hat. The cat is the cat. The hat is a cat.";
    const machine = new MarkovMachine(text);
    let result = machine.getText();

    expect(result.endsWith("cat.")).toBeTruthy();
  });

});