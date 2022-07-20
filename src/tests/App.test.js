import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Checking App navbar content', () => {
  beforeEach(() => renderWithRouter(<App />));
  it('Expects to exist a "Home" link', () => {
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
  });

  it('Expects to exist an "About" link', () => {
    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
  });

  it('Expects to exist a "Favorite Pokémons" link', () => {
    const favPkmnsLink = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    expect(favPkmnsLink).toBeInTheDocument();
  });
});

describe('Navbar redirect links tests', () => {
  it('Redirect to home page when the "Home" is clicked', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();

    userEvent.click(homeLink);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
  it('Redirect to to about page when the "About" is clicked', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();

    userEvent.click(aboutLink);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });
  it('Redirect to favorites page when "Favorite Pokémons" is clicked', () => {
    const { history } = renderWithRouter(<App />);
    const favPkmnsLink = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    expect(favPkmnsLink).toBeInTheDocument();

    userEvent.click(favPkmnsLink);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });
  it('Redirect to a not found page when a random route is typed', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/aaaaaaaaaa');

    const notFoundWarn = screen.getByRole('heading', {
      name: /page requested not found/i,
    });
    expect(notFoundWarn).toBeInTheDocument();
  });
});
