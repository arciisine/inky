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
    render(text: string): string;
}
export { };
