import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const moreDetailsClick = () => {
  const link = screen.getByRole('link', { name: /more details/i });
  userEvent.click(link);
};

describe('Pokemon details content', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    moreDetailsClick();
  });

  it('Checks if "Name Details" is rendered', () => {
    const title = screen.getByRole('heading', {
      name: /pikachu details/i,
    });
    expect(title).toBeInTheDocument();
  });

  it('Checks if the "more details" link is not rendered', () => {
    const detailsLink = screen.queryByRole('link', {
      name: /more details/i,
    });
    expect(detailsLink).not.toBeInTheDocument();
  });

  it('Checks if "Summary" is rendered', () => {
    const summaryTitle = screen.getByRole('heading', {
      name: /summary/i,
      leve: 2,
    });
    expect(summaryTitle).toBeInTheDocument();
  });

  it('Checks if a pokemon description is rendered', () => {
    const description = screen.getByText(/This intelligent Pokémon/i);
    expect(description).toBeInTheDocument();
  });

  it('Checks if an "add to favorites" checkbox is rendered', () => {
    const addToFavLabel = screen.getByLabelText('Pokémon favoritado?');
    const addToFavBox = screen.getByRole('checkbox', {
      name: /pokémon favoritado/i,
    });
    expect(addToFavLabel).toBeInTheDocument();
    expect(addToFavBox).toBeInTheDocument();
  });

  it('Checks if a click on the ch add to the favorites', () => {
    const addToFavBox = screen.getByRole('checkbox', {
      name: /pokémon favoritado/i,
    });
    const goToFavorites = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(addToFavBox).toBeInTheDocument();
    expect(goToFavorites).toBeInTheDocument();

    userEvent.click(addToFavBox);
    userEvent.click(goToFavorites);

    const pkmnName = screen.getByText('Pikachu');
    expect(pkmnName).toBeInTheDocument();
  });
});

describe('Pokemon map location details', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    moreDetailsClick();
  });

  it('Checks if a "Game Locations of Pikachu" is rendered', () => {
    const title = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
      level: 2,
    });
    expect(title).toBeInTheDocument();
  });

  it('Checks if the pokemon map location is rendered', () => {
    const mapName = screen.getByText(/kanto viridian forest/i);
    const mapImages = screen.getAllByAltText('Pikachu location');
    const URL = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';

    expect(mapName).toBeInTheDocument();
    mapImages.forEach((image) => expect(image).toBeInTheDocument());
    expect(mapImages[0]).toHaveAttribute('src', URL);
  });
});
