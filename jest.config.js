import { pathsToModuleNameMapper } from 'ts-jest';
import tsconfig from './tsconfig.json' with { type: 'json' };

const { compilerOptions } = tsconfig;

export default {
  preset: 'ts-jest',
  roots: ['<rootDir>'],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  transform: {
    '^.+\\.ts?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
      },
    ],
  },
};
