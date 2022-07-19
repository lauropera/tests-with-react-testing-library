import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Not found page content', () => {
  it('Expects to render "Page requested not found" message', () => {
    const { history } = renderWithRouter(<App />);
    history.push('./aaaaa');

    const alertMsg = screen.getByRole('heading', {
      name: /page requested not found/i,
    });
    expect(alertMsg).toBeInTheDocument();
  });

  it('Expects to show a pikachu image', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/aaaaa');

    const image = screen.getByAltText(/pikachu crying/i);
    const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', URL);
  });
});
