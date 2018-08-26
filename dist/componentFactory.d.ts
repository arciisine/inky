import { Node } from 'parse5';
export declare const COMPONENT_DEFAULTS: {
    button: string;
    row: string;
    columns: string;
    container: string;
    callout: string;
    inky: string;
    'block-grid': string;
    menu: string;
    item: string;
    center: string;
    spacer: string;
    wrapper: string;
    'h-line': string;
};
export declare class ComponentFactory {
    private columnCount;
    private componentTags;
    constructor(columnCount?: number, componentTags?: typeof COMPONENT_DEFAULTS);
    columns(element: Node): string;
    hLine(element: Node): string;
    row(element: Node): string;
    button(element: Node): string;
    container(element: Node): string;
    inky(element: Node): string;
    blockGrid(element: Node): string;
    menu(element: Node): string;
    menuItem(element: Node): string;
    center(element: Node): string;
    callout(element: Node): string;
    spacer(element: Node): string;
    wrapper(element: Node): string;
    generate(element: Node): string;
    convertAll(document: Node): Node;
    convertAll(document: string): string;
}
