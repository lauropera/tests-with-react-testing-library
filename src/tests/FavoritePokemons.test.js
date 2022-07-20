import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Favorite pokémons page content', () => {
  it('Expects to render "No favorite pokemon found" when has 0 favorites', () => {
    renderWithRouter(<App />);
    const goToFavsLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(goToFavsLink).toBeInTheDocument();
    userEvent.click(goToFavsLink);

    const noFavText = screen.getByText('No favorite pokemon found');
    expect(noFavText).toBeInTheDocument();
  });

  it('Expects to show a favorite pokémon', () => {
    renderWithRouter(<App />);
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

    const goToFavsLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(goToFavsLink).toBeInTheDocument();
    userEvent.click(goToFavsLink);

    const pkmnName = screen.getByTestId('pokemon-name');

    expect(pkmnName).toBeInTheDocument();
    expect(pkmnName).toHaveTextContent(/pikachu/i);
  });

  it('Expects to remove a favorite pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');

    const pkmnName = screen.queryByTestId('pokemon-name');

    expect(pkmnName).toBeInTheDocument();
    expect(pkmnName).toHaveTextContent(/pikachu/i);

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

    const goToFavsLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(goToFavsLink).toBeInTheDocument();
    userEvent.click(goToFavsLink);

    expect(pkmnName).not.toBeInTheDocument();
  });
});
