"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const componentFactory_1 = require("./componentFactory");
/**
 * Creates a new instance of the Inky parser.
 */
class Inky {
    constructor(options) {
        options = options || {};
        // HTML tags for custom components
        this.factory = new componentFactory_1.ComponentFactory(options.columnCount || 12, Object.assign({}, componentFactory_1.COMPONENT_DEFAULTS, (options.components || {})));
    }
    render(text) {
        // Extract raws
        const raws = [];
        let html = text.replace(/\< *raw *\>(.*?)\<\/ *raw *\>/gi, (all, inner) => raws.push(inner) ? `###RAW${raws.length - 1}###` : all);
        // Inject inky specific directives before compilation to fix issues
        html = html
            .replace(/<\/button>/g, (all) => `${all}<spacer size="16"></spacer>`) // Insert spacers
            .replace(/<hr[^>]*>/g, (a, e) => {
            const classes = ['hr'];
            const woClasses = a.replace(/class="([^"]*)"/g, (b, c) => { classes.push(c); return ''; });
            return a
                .replace(/<hr/, `<div class="${classes.join(' ')}"`)
                .replace(/[/]?>/, '></div>');
        }); // Pull out hrs
        let out = this.factory.convertAll(html);
        // Take care of various minor fixes
        out = out
            .replace(/<(meta|img|link|hr|br)[^>]*>/g, a => a.replace('>', '/>')) // Fix self closing
            .replace(/&apos;/g, '&#39;') // Fix apostrophes, as outlook hates them
            .replace(/(background(?:-color)?:\s*)([#0-9a-fA-F]+)([^>]+)>/g, (all, p, col, rest) => `${p}${col}${rest} bgcolor="${col}">`) // Inline bg-color
            .replace(/<([^>]+vertical-align:\s*(top|bottom|middle)[^>]+)>/g, (a, tag, valign) => tag.indexOf('valign') ? `<${tag}>` : `<${tag} valign="${valign}">`) // Vertically align if it has the style
            .replace(/<(table[^>]+expand[^>]+width:\s*)(100%\s+!important)([^>]+)>/g, (a, left, size, right) => `<${left}100%${right}>`); // Drop important as a fix for outlook;
        // Re-inject raws
        const res = out
            .replace(/###RAW(\d+)###/g, (all, i) => raws[parseInt(i, 10)]);
        return res;
    }
}
exports.Inky = Inky;
