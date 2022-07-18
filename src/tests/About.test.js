import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../pages/About';

describe('Checking about page content', () => {
  it('Expects to have an "About Pokédex" title', () => {
    render(<About />);

    const title = screen.getByRole('heading', {
      name: 'About Pokédex',
    });
    expect(title).toBeInTheDocument();
  });

  it('Expects to have text details about the Pokédex', () => {
    render(<About />);

    const firstInfo = screen.getByText(/digital encyclopedia/i);
    expect(firstInfo).toBeInTheDocument();

    const secondInfo = screen.getByText(/see more details/i);
    expect(secondInfo).toBeInTheDocument();
  });

  it('Expects to have an image of the Pokédex', () => {
    render(<About />);

    const URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const pokedexImage = screen.getByAltText('Pokédex');

    expect(pokedexImage).toBeInTheDocument();
    expect(pokedexImage).toHaveProperty('src', URL);
  });
});
