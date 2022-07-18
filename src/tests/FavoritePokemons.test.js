import React from 'react';
import { render, screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import FavoritePokemons from '../pages/FavoritePokemons';
import data from '../data';

describe('Checking the fav pokémons page content', () => {
  it('Expects to render "No favorite pokemon found" when has 0 favorites', () => {
    render(<FavoritePokemons pokemons={ [] } />);

    const noFavText = screen.getByText('No favorite pokemon found');
    expect(noFavText).toBeInTheDocument();
  });

  it('Expects to show a favorite pokémon', () => {
    const PKMN = [data[0]];
    renderWithRouter(<FavoritePokemons pokemons={ PKMN } />);

    const pkmnName = screen.getByTestId('pokemon-name');
    const pkmnType = screen.getByTestId('pokemon-type');
    const pkmnWeight = screen.getByTestId('pokemon-weight');
    const pkmnImage = screen.getByAltText(/pikachu sprite/i);

    expect(pkmnName).toBeInTheDocument();
    expect(pkmnType).toBeInTheDocument();
    expect(pkmnWeight).toBeInTheDocument();
    expect(pkmnImage).toBeInTheDocument();
  });
});
