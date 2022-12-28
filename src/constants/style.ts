import type {Palette} from 'props';

type DaisyUIColorMap = {
  [K in Palette]: string;
};

export const DaisyUIColorMap = {
  primary: 'hsl(var(--p) / var(--tw-bg-opacity))',
  secondary: 'hsl(var(--s) / var(--tw-bg-opacity))',
  success: 'hsl(var(--su) / var(--tw-bg-opacity))',
  error: 'hsl(var(--er) / var(--tw-bg-opacity))',
  warning: 'hsl(var(--wa) / var(--tw-bg-opacity))',
  info: 'hsl(var(--in) / var(--tw-bg-opacity))',
  neutral: 'hsl(var(--n) / var(--tw-bg-opacity))',
  accent: 'hsl(var(--a) / var(--tw-bg-opacity))',
  'base-100': 'hsl(var(--b1) / var(--tw-bg-opacity))',
  'base-200': 'hsl(var(--b2, var(--b1)) / var(--tw-bg-opacity))',
  'base-300': 'hsl(var(--b3, var(--b2)) / var(--tw-bg-opacity))',
} as const satisfies DaisyUIColorMap;
