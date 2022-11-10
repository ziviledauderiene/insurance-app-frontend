import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const renderWithRouter = (ui, options) =>
  render(ui, { wrapper: BrowserRouter, ...options });

export * from '@testing-library/react';
export { renderWithRouter as render };
