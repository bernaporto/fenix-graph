import { readFileSync } from 'fs';
import { pathsToModuleNameMapper } from 'ts-jest';

const { compilerOptions } = JSON.parse(readFileSync('tsconfig.json', 'utf8'));

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
