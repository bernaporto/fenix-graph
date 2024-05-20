type StringMap = Record<string, boolean>;
type BemConfig = {
  block: string;
  element?: string;
  modifiers?: (string | StringMap)[];
};
type PossibleInput = BemConfig | null | string | StringMap | undefined;

const isValid = <T>(value: T | null | undefined): value is T =>
  !!value && value !== null && value !== undefined;

const isBemConfig = (value: PossibleInput): value is BemConfig =>
  isValid(value) && typeof value === 'object' && 'block' in value;

const parseBem = ({ block, element, modifiers = [] }: BemConfig) => {
  const root = element ? `${block}__${element}` : block;

  return classNames(
    root,
    ...parseInputs(modifiers).map((mod) => `${root}--${mod}`),
  );
};

const parseInputs = (inputs: PossibleInput[]): string[] =>
  inputs.filter(isValid).flatMap((c) => {
    if (typeof c !== 'object') return c;

    if (isBemConfig(c)) {
      return parseBem(c);
    }

    return Object.entries(c)
      .filter(([, v]) => !!v)
      .map(([k]) => k);
  });

export const classNames = (...classes: PossibleInput[]): string =>
  parseInputs(classes).join(' ');
