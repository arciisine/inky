"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parse5_1 = require("parse5");
exports.Adapter = require('parse5/lib/tree-adapters/default');
function visit(root, visitor) {
    function traverse(node) {
        const children = exports.Adapter.getChildNodes(node) || [];
        for (const child of children) {
            if (child) {
                visitor(child, traverse.bind(null, child));
            }
        }
    }
    traverse(root);
}
exports.visit = visit;
function getAttrMap(el) {
    const attrs = exports.Adapter.getAttrList(el);
    if (!attrs) {
        return {};
    }
    else {
        return attrs.reduce((acc, val) => {
            acc[val.name] = val.value;
            return acc;
        }, {});
    }
}
exports.getAttrMap = getAttrMap;
function toStr(o) {
    if (Array.isArray(o)) {
        return o.join(' ');
    }
    else {
        return Object.keys(o).filter(x => x && o[x] !== undefined).sort().map(x => `${x}="${o[x]}"`).join(' ');
    }
}
exports.toStr = toStr;
function classes(...args) {
    return args.reduce((acc, v) => {
        if (v) {
            acc.push(...v.split(' '));
        }
        return acc;
    }, []).join(' ');
}
exports.classes = classes;
function setDomAttribute(node, attrName, value) {
    let attrList = exports.Adapter.getAttrList(node);
    if (!attrList) {
        attrList = node.attrs = [];
    }
    const attr = attrList.find(x => x.name === attrName);
    if (!attr) {
        attrList.push({
            name: attrName,
            value
        });
    }
    else {
        attr.value = attrName === 'class' ? classes(attr.value, value) : value;
    }
}
exports.setDomAttribute = setDomAttribute;
function getInner(node) {
    return parse5_1.serialize(node);
}
exports.getInner = getInner;
//# sourceMappingURL=util.js.map