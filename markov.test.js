"use strict";

const { MarkovMachine } = require("./markov");

describe("MarkovMachine tests", function () {
  let machine;

  beforeEach(function () {
    let text = "The cat in the hat.";
    machine = new MarkovMachine(text);
  });

  test("getChains method returns correct chain", function () {
    let chains = machine.getChains();

    expect(chains).toEqual({
      "The": ["cat"],
      "cat": ["in"],
      "in": ["the"],
      "the": ["hat."],
      "hat.": [null]
    });
  });

  // test("getText method returns correct text", function () {

  // });

});