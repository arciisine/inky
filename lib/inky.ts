import { ComponentFactory, COMPONENT_DEFAULTS } from './componentFactory';
import { notEqual } from 'assert';

interface Options {
  columnCount?: number;
  components?: Partial<typeof COMPONENT_DEFAULTS>;
}

/**
 * Creates a new instance of the Inky parser.
 */
export class Inky {
  private factory: ComponentFactory;

  constructor(options: Options) {
    options = options || {};

    // HTML tags for custom components
    this.factory = new ComponentFactory(options.columnCount || 12, {
      ...COMPONENT_DEFAULTS,
      ...(options.components || {})
    });
  }

  /**
   * Awww yiss. Kickstarts the whole parser. Takes in HTML as a string, checks if there are any custom components. If there are, it replaces the nested components, traverses the DOM and replaces them with email markup.
   * @param {string} $ - Input HTML as a string
   * @returns {object} Modified HTML as a string
   */
  releaseTheKraken(text: string) {
    const raws: string[] = [];
    const html = text.replace(/\< *raw *\>(.*?)\<\/ *raw *\>/gi, (all, inner) => raws.push(inner) ? `###RAW${raws.length - 1}###` : all);
    const out = this.factory.convertAll(html);

    return out.replace(/###RAW(\d+)###/g, (all, i) => raws[parseInt(i, 10)]);
  }
}