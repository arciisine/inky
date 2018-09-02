const { Inky } = require('../../lib/inky');
const assert = require('assert').equal;
const beautify = require('js-beautify').html;

const OPTS = {
  indent_size: 2,
  quiet: true,
  max_preserve_newlines: 0
}

/**
 * Takes HTML input, runs it through the Inky parser, and compares the output to what's expected.
 * @param {string} input - HTML input.
 * @param {string} expected - Expected HTML output.
 * @throws {Error} Throws an error if the output is not identical.
 */
module.exports = function compare(input, expected) {
  const inky = new Inky();
  let output = inky.render(input);

  output = beautify(output, OPTS);
  expected = beautify(expected, OPTS)

  assert(output, expected);
}