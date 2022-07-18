import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Checking App navbar', () => {
  it('Expects to exist a "Home" link', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
  });

  it('Expects to exist an "About" link', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
  });

  it('Expects to exist a "Favorite Pokémons" link', () => {
    renderWithRouter(<App />);
    const favPkmnsLink = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    expect(favPkmnsLink).toBeInTheDocument();
  });
});
