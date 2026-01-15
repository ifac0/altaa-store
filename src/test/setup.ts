import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

// Mock do next/image
// Isso substitui o componente <Image> complexo por um <img> simples HTML durante os testes
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return React.createElement('img', { ...props, priority: undefined });
  },
}));