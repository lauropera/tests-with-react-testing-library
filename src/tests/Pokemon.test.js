import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Pokemon card render', () => {
  beforeEach(() => renderWithRouter(<App />));
  it('Checks if the name is rendered', () => {
    const pkmnName = screen.getByTestId('pokemon-name');
    expect(pkmnName).toBeInTheDocument();
    expect(pkmnName).toHaveTextContent('Pikachu');
  });

  it('Checks if the type is rendered', () => {
    const pkmnType = screen.getByTestId('pokemon-type');
    expect(pkmnType).toBeInTheDocument();
    expect(pkmnType).toHaveTextContent('Electric');
  });

  it('Checks if the weight is rendered', () => {
    const pkmnWeight = screen.getByTestId('pokemon-weight');
    expect(pkmnWeight).toBeInTheDocument();
    expect(pkmnWeight).toHaveTextContent('Average weight: 6.0 kg');
  });

  it('Checks if the image is rendered', () => {
    const URL = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const pkmnImage = screen.getByAltText('Pikachu sprite');
    expect(pkmnImage).toBeInTheDocument();
    expect(pkmnImage).toHaveAttribute('src', URL);
  });

  it('Expects that the card has a "more details" link', () => {
    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(detailsLink).toBeInTheDocument();
  });

  it('Expects to render the correct details page', () => {
    const pkmnName = screen.getByTestId('pokemon-name');
    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(pkmnName).toBeInTheDocument();
    expect(detailsLink).toBeInTheDocument();

    userEvent.click(detailsLink);

    const title = screen.getByRole('heading', {
      name: /pikachu details/i,
    });
    expect(title).toBeInTheDocument();
  });

  it('Checks if a star icon is rendered at the favorite pokemons', () => {
    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(detailsLink).toBeInTheDocument();

    userEvent.click(detailsLink);

    const addToFavBox = screen.getByRole('checkbox', {
      name: /pokémon favoritado/i,
    });
    expect(addToFavBox).toBeInTheDocument();

    userEvent.click(addToFavBox);

    const favPkmn = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(favPkmn).toBeInTheDocument();
    expect(favPkmn).toHaveAttribute('src', '/star-icon.svg');
  });
});
