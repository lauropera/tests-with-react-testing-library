import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const types = [
  'Electric',
  'Fire',
  'Bug',
  'Poison',
  'Psychic',
  'Normal',
  'Dragon',
];

const PKMN_NAME_ID = 'pokemon-name';
const getPkmnName = () => screen.getByTestId(PKMN_NAME_ID).textContent;
const nextPkmnBtn = () => screen.getByRole('button', {
  name: /próximo pokémon/i,
});

describe('Pokedex page content', () => {
  beforeEach(() => renderWithRouter(<App />));
  it('Expects to render a title with "Encountered pokémons" ', () => {
    const title = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });
    expect(title).toBeInTheDocument();
  });

  it('Expect to render one pokémon at a time', () => {
    const pokemons = screen.getAllByTestId(PKMN_NAME_ID);
    expect(pokemons).toHaveLength(1);
  });
});

describe('Next pokémon button functions', () => {
  beforeEach(() => renderWithRouter(<App />));
  it('Expects to show the next pokemon after clicking the button', () => {
    expect(getPkmnName()).toBe('Pikachu');

    expect(nextPkmnBtn()).toBeInTheDocument();
    userEvent.click(nextPkmnBtn());

    expect(getPkmnName()).toBe('Charmander');
  });

  it('Expects to show the first pokemon again after passing by all', () => {
    const pkmnName = screen.getByTestId(PKMN_NAME_ID).textContent;
    expect(pkmnName).toBe('Pikachu');

    userEvent.click(nextPkmnBtn());
    while (pkmnName !== 'Pikachu') {
      userEvent.click(nextPkmnBtn());
    }

    expect(pkmnName).toBe('Pikachu');
  });
});

describe('Type filter buttons', () => {
  beforeEach(() => renderWithRouter(<App />));

  it('Expects to have a type button for each pokemon type', () => {
    types.forEach((type) => {
      const btn = screen.getByRole('button', { name: type });
      expect(btn).toBeInTheDocument();
      expect(btn).toHaveAttribute('data-testid', 'pokemon-type-button');
    });
  });

  it('Expects to show pokemons of that type after a filter is selected', () => {
    expect(getPkmnName()).toBe('Pikachu');

    const psychicBtn = screen.getByRole('button', { name: /psychic/i });
    expect(psychicBtn).toBeInTheDocument();
    userEvent.click(psychicBtn);

    const pkmnType = screen.getByTestId('pokemon-type').textContent;

    expect(getPkmnName()).toBe('Alakazam');
    expect(psychicBtn.textContent).toBe(pkmnType);
  });

  it('Expects the "All" button is always visible', () => {
    const allTypesBtn = screen.getByRole('button', { name: /all/i });
    expect(allTypesBtn).toBeInTheDocument();

    const bugBtn = screen.getByRole('button', { name: /bug/i });
    userEvent.click(bugBtn);

    expect(allTypesBtn).toBeInTheDocument();
  });

  it('Expects the "All" button reset the type filter selection', () => {
    expect(getPkmnName()).toBe('Pikachu');

    const allTypesBtn = screen.getByRole('button', { name: /all/i });
    const normalBtn = screen.getByRole('button', { name: /normal/i });
    expect(allTypesBtn).toBeInTheDocument();
    expect(normalBtn).toBeInTheDocument();

    userEvent.click(normalBtn);
    expect(getPkmnName()).toBe('Snorlax');

    userEvent.click(allTypesBtn);
    expect(getPkmnName()).toBe('Pikachu');
  });
});
