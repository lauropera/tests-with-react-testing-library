import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Favorite pokémons page content', () => {
  beforeEach(() => renderWithRouter(<App />));

  it('Expects to render "No favorite pokemon found" when has 0 favorites', () => {
    const goToFavsLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(goToFavsLink).toBeInTheDocument();
    userEvent.click(goToFavsLink);

    const noFavText = screen.getByText('No favorite pokemon found');
    expect(noFavText).toBeInTheDocument();
  });

  it('Expects to show a favorite pokémon', () => {
    const detailsLink = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);

    const addToFavBtn = screen.getByLabelText(/pokémon favoritado/i);
    expect(addToFavBtn).toBeInTheDocument();
    userEvent.click(addToFavBtn);

    const goToFavsLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(goToFavsLink).toBeInTheDocument();
    userEvent.click(goToFavsLink);

    const pkmnName = screen.getByTestId('pokemon-name');

    expect(pkmnName).toBeInTheDocument();
    expect(pkmnName).toHaveTextContent(/pikachu/i);
  });
});
