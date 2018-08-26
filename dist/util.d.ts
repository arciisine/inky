import { TreeAdapter, Node } from 'parse5';
export declare const Adapter: TreeAdapter;
export declare function visit<T>(root: Node, visitor: (node: Node, descend: () => void) => void): void;
export declare function getAttrMap(el: Node): {
    [key: string]: string;
};
export declare function toStr(o: string[] | {
    [key: string]: string;
}): string;
export declare function classes(...args: string[]): string;
export declare function setDomAttribute(node: Node, attrName: string, value: string): void;
export declare function getInner(node: Node): string;
