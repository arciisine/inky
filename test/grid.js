var compare = require('./lib/compare');

describe('Container', () => {
  it('creates a container table', () => {
    var input = '<container></container>';
    var expected = `
      <table class="container">
        <tbody>
          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>
    `;

    compare(input, expected);
  });
});

describe('Grid', () => {
  it('creates a row', () => {
    var input = '<row></row>';
    var expected =  `
      <table class="row">
        <tbody>
          <tr></tr>
        </tbody>
      </table>
    `;

    compare(input, expected);
  });

  it('creates a single column with first and last classes', function () {
    var input = '<columns large="12" small="12"></columns>';
    var expected = `
      <th class="small-12 large-12 columns first last">
        <table>
          <tr>
            <th class="expander"></th>
          </tr>
        </table>
      </th>
    `;

    compare(input, expected);
  });

  it('creates two columns, one first, one last', function () {
    var input = `
      <columns large="6" small="12"></columns>
      <columns large="6" small="12"></columns>
    `;
    var expected = `
      <th class="small-12 large-6 columns first">
        <table>
          <tr>
            <th class="expander"></th>
          </tr>
        </table>
      </th>
      <th class="small-12 large-6 columns last">
        <table>
          <tr>
            <th class="expander"></th>
          </tr>
        </table>
      </th>
    `;

    compare(input, expected);
  });

  it('creates 3+ columns, first is first, last is last', () => {
    var input = `
      <columns large="4" small="12"></columns>
      <columns large="4" small="12"></columns>
      <columns large="4" small="12"></columns>
    `;
    var expected = `
      <th class="small-12 large-4 columns first">
        <table>
          <tr>
            <th class="expander"></th>
          </tr>
        </table>
      </th>
      <th class="small-12 large-4 columns">
        <table>
          <tr>
            <th class="expander"></th>
          </tr>
        </table>
      </th>
      <th class="small-12 large-4 columns last">
        <table>
          <tr>
            <th class="expander"></th>
          </tr>
        </table>
      </th>
    `;

    compare(input, expected);
  });

  it('offsets a column', () => {
    var input = '<columns class="small-offset-8"></columns>';
    var expected = `
      <th class="small-offset-8 small-12 large-12 columns first last">
        <table>
          <tr>
            <th class="expander"></th>
          </tr>
        </table>
      </th>
    `;

    compare(input, expected)
  });

  //if it just has small, borrow from small for large
  it('automatically assigns large columns if no large attribute is assigned', () => {
    var input = `
      <columns small="4"></columns>
      <columns small="8"></columns>
    `;
    var expected = `
      <th class="small-4 large-4 columns first">
        <table>
          <tr>
            <th class="expander"></th>
          </tr>
        </table>
      </th>
      <th class="small-8 large-8 columns last">
        <table>
          <tr>
            <th class="expander"></th>
          </tr>
        </table>
      </th>
    `;

    compare(input, expected);
  });

  it('automatically assigns small columns as full width if only large defined', () => {
    var input = `
      <columns large="4"></columns>
      <columns large="8"></columns>
    `;
    var expected = `
      <th class="small-12 large-4 columns first">
        <table>
          <tr>
            <th class="expander"></th>
          </tr>
        </table>
      </th>
      <th class="small-12 large-8 columns last">
        <table>
          <tr>
            <th class="expander"></th>
          </tr>
        </table>
      </th>
    `;

    compare(input, expected);

    // ?
    // var opts = {
    //   grid: 15
    // }
    // $ = inky.releaseTheKraken($, opts);
  });
});

describe('Block Grid', () => {
  it('returns the correct block grid syntax', () => {
    var input = '<block-grid up="4"></block-grid>';
    var expected = `
      <table class="block-grid up-4">
        <tr></tr>
      </table>
    `;

    compare(input, expected);
  });
});
