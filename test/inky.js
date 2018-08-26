const { Inky } = require('../lib/inky');
const assert = require('assert');
const compare = require('./lib/compare');

describe('Inky', () => {
  it('can take in settings in the constructor', () => {
    const config = {
      components: { column: 'col' },
      columnCount: 16
    }

    const inky = new Inky(config);

    assert.equal(inky.factory.componentTags.column, 'col', 'Sets custom component tags');
    assert.equal(inky.factory.columnCount, 16, 'Sets a custom column count');
  });

  it(`doesn't choke on inline elements`, () => {
    const input = '<container>This is a link to <a href="#">ZURB.com</a>.</container>';
    const expected = `
      <table align="center" class="container">
        <tbody>
          <tr>
            <td>This is a link to <a href="#">ZURB.com</a>.</td>
          </tr>
        </tbody>
      </table>
    `;

    compare(input, expected);
  });

  it(`doesn't choke on special characters`, () => {
    const input = '<container>This is a link tö <a href="#">ZURB.com</a>.</container>';
    const expected = `
      <table align="center" class="container">
        <tbody>
          <tr>
            <td>This is a link tö <a href="#">ZURB.com</a>.</td>
          </tr>
        </tbody>
      </table>
    `;

    compare(input, expected);
  });

  it(`doesn't convert these characters into entities`, () => {
    const input = "<container>There's &nbsp; some amazing things here!</container>";
    const expected = `
      <table align="center" class="container">
        <tbody>
          <tr>
            <td>There's &nbsp; some amazing things here!</td>
          </tr>
        </tbody>
      </table>
    `;

    compare(input, expected);
  });

  it(`doesn't decode entities if non default cheerio config is given`, () => {
    const input = '<container>"should not replace quotes"</container>';
    const expected = `
      <table align="center" class="container">
        <tbody>
          <tr>
            <td>"should not replace quotes"</td>
          </tr>
        </tbody>
      </table>
    `;

    compare(input, expected, { decodeEntities: false });
  });

  it(`doesn't muck with stuff inside raw`, () => {
    const input = '<raw><%= test %></raw>';
    const expected = '<%= test %>';

    compare(input, expected);
  });

  it(`can handle multiple raw tags`, () => {
    const input = '<h1><raw><%= test %></raw></h1><h2>< raw >!!!</ raw ></h2>';
    const expected = '<h1><%= test %></h1><h2>!!!</h2>';

    compare(input, expected);
  });

});