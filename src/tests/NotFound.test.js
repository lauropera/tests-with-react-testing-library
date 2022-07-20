import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../pages';

describe('Not found page content', () => {
  beforeEach(() => render(<NotFound />));
  it('Expects to render "Page requested not found" message', () => {
    const alertMsg = screen.getByRole('heading', {
      name: /page requested not found/i,
    });
    expect(alertMsg).toBeInTheDocument();
  });

  it('Expects to show a pikachu image', () => {
    const image = screen.getByAltText(/pikachu crying/i);
    const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', URL);
  });
});
