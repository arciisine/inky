import { COMPONENT_DEFAULTS } from './componentFactory';
interface Options {
    columnCount?: number;
    components?: Partial<typeof COMPONENT_DEFAULTS>;
}
/**
 * Creates a new instance of the Inky parser.
 */
export declare class Inky {
    private factory;
    constructor(options: Options);
    /**
     * Awww yiss. Kickstarts the whole parser. Takes in HTML as a string, checks if there are any custom components. If there are, it replaces the nested components, traverses the DOM and replaces them with email markup.
     * @param {string} $ - Input HTML as a string
     * @returns {object} Modified HTML as a string
     */
    releaseTheKraken(text: string): string;
}
export {};
