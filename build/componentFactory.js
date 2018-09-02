"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const parse5_1 = require("parse5");
const util_1 = require("./util");
exports.COMPONENT_DEFAULTS = {
    button: 'button',
    row: 'row',
    columns: 'columns',
    container: 'container',
    callout: 'callout',
    inky: 'inky',
    'block-grid': 'blockGrid',
    menu: 'menu',
    item: 'menuItem',
    center: 'center',
    spacer: 'spacer',
    wrapper: 'wrapper',
    'h-line': 'hLine'
};
class ComponentFactory {
    constructor(columnCount = 12, componentTags = exports.COMPONENT_DEFAULTS) {
        this.columnCount = columnCount;
        this.componentTags = componentTags;
    }
    columns(element) {
        const attrs = util_1.getAttrMap(element);
        const inner = util_1.getInner(element);
        let expander = '';
        // Add 1 to include current column
        const colCount = util_1.Adapter.getChildNodes(element).length;
        // Check for sizes. If no attribute is provided, default to small-12. Divide evenly for large columns
        const smallSize = parseInt(attrs.small || '0', 10) || this.columnCount;
        const largeSize = parseInt(attrs.large || attrs.small || '0', 10) || Math.trunc(this.columnCount / colCount);
        const noExpander = 'no-expander' in attrs && attrs['no-expander'] !== 'false';
        attrs.class = util_1.classes(`small-${smallSize}`, `large-${largeSize}`, 'columns', attrs.class);
        delete attrs.large;
        delete attrs.small;
        delete attrs['no-expander'];
        // If the column contains a nested row, the .expander class should not be used
        if (largeSize === this.columnCount && !noExpander) {
            let hasRow = false;
            util_1.visit(element, (node, descend) => {
                if (util_1.Adapter.getTagName(node) === 'row') {
                    hasRow = true;
                }
                else if (/\brow\b/.test(util_1.getAttrMap(node).class || '')) {
                    hasRow = true;
                }
                else {
                    descend();
                }
            });
            if (!hasRow) {
                expander = '\n<th class="expander"></th>';
            }
        }
        // Final HTML output
        return `
      <th ${util_1.toStr(attrs)}>
        <table>
          <tbody>
            <tr>
              <th>${inner}</th>${expander}
            </tr>
          </tbody>
        </table>
      </th>`;
    }
    hLine(element) {
        const attrs = util_1.getAttrMap(element);
        return `
    <table class="${util_1.classes('h-line', attrs.class)}">
      <tr><th>&nbsp;</th></tr>
    </table>`;
    }
    row(element) {
        const attrs = util_1.getAttrMap(element);
        const inner = util_1.getInner(element);
        attrs.class = util_1.classes('row', attrs.class);
        return `
    <table ${util_1.toStr(attrs)}>
      <tbody>
        <tr>${inner}</tr>
      </tbody>
    </table>`;
    }
    button(element) {
        const attrs = util_1.getAttrMap(element);
        let inner = util_1.getInner(element);
        const { href, target, class: cls } = attrs, parentAttrs = __rest(attrs, ["href", "target", "class"]);
        let expander = '';
        // If we have the href attribute we can create an anchor for the inner of the button;
        if (href) {
            inner = `<a ${util_1.toStr({ href, target })}>${inner}</a>`;
        }
        // If the button is expanded, it needs a <center> tag around the content
        if (/\bexpand(ed)?\b/.test(cls || '')) {
            inner = this.convertAll(`<center>
        ${inner}
      </center>`);
            expander = `\n<td class="expander"></td>`;
        }
        // The .button class is always there, along with any others on the <button> element
        return `
      <table class="${util_1.classes('button', cls)}">
        <tbody>
          <tr>
            <td>
              <table>
                <tbody>
                  <tr>
                    <td>
                      ${inner}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>${expander}
          </tr>
        </tbody>
      </table>`;
    }
    container(element) {
        const attrs = util_1.getAttrMap(element);
        const inner = util_1.getInner(element);
        attrs.class = util_1.classes('container', attrs.class);
        attrs.align = 'center';
        return `
    <table ${util_1.toStr(attrs)}>
      <tbody>
        <tr><td>${inner}</td></tr>
      </tbody>
    </table>`;
    }
    inky(element) {
        return `
    <tr>
      <td>
        <img src="https://raw.githubusercontent.com/arvida/emoji-cheat-sheet.com/master/public/graphics/emojis/octopus.png" />
      </tr>
    </td>`;
    }
    blockGrid(element) {
        const attrs = util_1.getAttrMap(element);
        const inner = util_1.getInner(element);
        return `
    <table class="${util_1.classes('block-grid', attrs.up ? `up-${attrs.up}` : '', attrs.class)}">
      <tbody>
        <tr>${inner}</tr>
      </tbody>
    </table>`;
    }
    menu(element) {
        const attrs = util_1.getAttrMap(element);
        let inner = util_1.getInner(element);
        if (inner.trim() && !/<(th|td)/.test(inner)) {
            inner = `<th class="menu-item">${inner}</th>`;
        }
        attrs.class = util_1.classes('menu', attrs.class);
        return `
      <table ${util_1.toStr(attrs)}>
        <tbody>
          <tr>
            <td>
              <table>
                <tbody>
                  <tr>
                    ${inner}
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>`;
    }
    menuItem(element) {
        const attrs = util_1.getAttrMap(element);
        const inner = util_1.getInner(element);
        // Prepare optional target attribute for the <a> element
        attrs.class = util_1.classes('menu-item', attrs.class);
        const { href, target } = attrs, parentAttrs = __rest(attrs, ["href", "target"]);
        return `
       <th ${util_1.toStr(parentAttrs)}>
         <a ${util_1.toStr({ href, target })}>${inner}</a>
       </th>`;
    }
    center(element) {
        for (const child of (util_1.Adapter.getChildNodes(element) || [])) {
            if (util_1.Adapter.isElementNode(child)) {
                util_1.setDomAttribute(child, 'align', 'center');
                util_1.setDomAttribute(child, 'class', 'float-center');
            }
        }
        util_1.visit(element, (node, descend) => {
            descend();
            if (util_1.Adapter.getTagName(node) === 'item') {
                util_1.setDomAttribute(node, 'class', 'float-center');
            }
            else if (/\bmenu-item\b/.test(util_1.getAttrMap(node).class || '')) {
                util_1.setDomAttribute(node, 'class', 'float-center');
            }
        });
        const df = util_1.Adapter.createDocumentFragment();
        util_1.Adapter.appendChild(df, element);
        return parse5_1.serialize(df);
    }
    callout(element) {
        const attrs = util_1.getAttrMap(element);
        const inner = util_1.getInner(element);
        const cls = util_1.classes('callout-inner', attrs.class);
        delete attrs.class;
        return `
      <table ${util_1.toStr(attrs)} class="callout">
        <tbody>
          <tr>
            <th class="${cls}">
              ${inner}
            </th>
            <th class="expander"></th>
          </tr>
        </tbody>
      </table>`;
    }
    spacer(element) {
        const attrs = util_1.getAttrMap(element);
        const html = [];
        attrs.class = util_1.classes('spacer', attrs.class);
        const smAttr = attrs['size-sm'];
        const lgAttr = attrs['size-lg'];
        const sm = smAttr ? parseInt(smAttr, 10) : undefined;
        const lg = lgAttr ? parseInt(lgAttr, 10) : undefined;
        const buildSpacer = (size, extraClass = '') => {
            const newAttrs = Object.assign({}, attrs);
            delete newAttrs['size-sm'];
            delete newAttrs['size-lg'];
            delete newAttrs['size'];
            if (extraClass) {
                newAttrs.class += ` ${extraClass}`;
            }
            return `
        <table ${util_1.toStr(newAttrs)}>
          <tbody>
            <tr>
              <td height="${size}px" style="font-size:${size}px;line-height:${size}px;">&nbsp;</td>
            </tr>
          </tbody>
        </table>
      `;
        };
        if (sm || lg) {
            if (sm) {
                html.push(buildSpacer(sm, 'hide-for-large'));
            }
            if (lg) {
                html.push(buildSpacer(lg, 'show-for-large'));
            }
        }
        else {
            html.push(buildSpacer(attrs.size || 16));
        }
        return html.join('\n');
    }
    wrapper(element) {
        const attrs = util_1.getAttrMap(element);
        const inner = util_1.getInner(element);
        attrs.class = util_1.classes('wrapper', attrs.class);
        attrs.align = 'center';
        return `
      <table ${util_1.toStr(attrs)}>
        <tbody>
          <tr>
            <td class="wrapper-inner">
              ${inner}
            </td>
          </tr>
        </tbody>
      </table>`;
    }
    generate(element) {
        const tagName = util_1.Adapter.getTagName(element);
        if (tagName in this.componentTags) {
            const fnName = this.componentTags[tagName];
            const text = this[fnName](element);
            return text.trim();
        }
        else {
            // If it's not a custom component, return it as-is
            return `<tr><td>${parse5_1.serialize(element)}</td></tr>`;
        }
    }
    convertAll(document) {
        const traverse = (node) => {
            const children = util_1.Adapter.getChildNodes(node) || [];
            let i = -1;
            for (const child of children.slice(0)) {
                i = i + 1;
                const tagName = util_1.Adapter.getTagName(child);
                if (!tagName) {
                    continue;
                }
                traverse(child);
                if (tagName in this.componentTags) {
                    if (tagName === this.componentTags.columns && !('hasColumns' in node)) {
                        node.hasColumns = true;
                        const all = children.filter(x => util_1.Adapter.isElementNode(x));
                        util_1.setDomAttribute(all[0], 'class', 'first');
                        util_1.setDomAttribute(all[all.length - 1], 'class', 'last');
                    }
                    const text = this.generate(child);
                    const newFrag = parse5_1.parseFragment(text);
                    const newNodes = (util_1.Adapter.getChildNodes(newFrag).filter(x => util_1.Adapter.isElementNode(x)));
                    children.splice(i, 1, ...newNodes);
                }
            }
            return node;
        };
        if (typeof document === 'string') {
            const node = document.includes('<html') ? parse5_1.parse(document) : parse5_1.parseFragment(document);
            const ret = traverse(node);
            const out = parse5_1.serialize(ret);
            return out;
        }
        else {
            return traverse(document);
        }
    }
}
exports.ComponentFactory = ComponentFactory;
//# sourceMappingURL=componentFactory.js.map