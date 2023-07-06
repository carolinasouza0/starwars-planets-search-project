import React from 'react';
import { act, cleanup, render, screen } from '@testing-library/react';
import App from '../App';
import dataTest from './data';

// Talvez a função mockFetch não esteja mockando de forma correta, continuo tendo erro no teste. Preciso rever.
const mockFetch = () => {
  jest.spyOn(global, 'fetch')
  .mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve(dataTest),
  });
}



describe('Testa a requisição para o endpoint e preenche a tabela corretamente', () => {
  beforeAll(mockFetch);
  beforeEach(cleanup);

  test('Testa a requisição para o endpoint', async () => {
    await act(async () => {
      render(<App />);
    });

    const planets = dataTest.results;
    for (let index in planets) {
      const planetName = await screen.findByText(planets[index].name);
      expect(planetName).toBeInTheDocument();
      const planetRotation = await screen.findByText(planets[index].rotation_period);
      expect(planetRotation.length).toBeGreaterThanOrEqual(1);
      const planetOrbital = await screen.findByText(planets[index].orbital_period);
      expect(planetOrbital.length).toBeGreaterThanOrEqual(1);
      const planetDiameter = await screen.findByText(planets[index].diameter);
      expect(planetDiameter.length).toBeGreaterThanOrEqual(1);
      const planetClimate = await screen.findByText(planets[index].climate);
      expect(planetClimate.length).toBeGreaterThanOrEqual(1);
      const planetGravity = await screen.findByText(planets[index].gravity);
      expect(planetGravity.length).toBeGreaterThanOrEqual(1);
      const planetTerrain = await screen.findByText(planets[index].terrain);
      expect(planetTerrain.length).toBeGreaterThanOrEqual(1);
      const planetWater = await screen.findByText(planets[index].surface_water);
      expect(planetWater.length).toBeGreaterThanOrEqual(1);
      const planetPopulation = await screen.findByText(planets[index].population);
      expect(planetPopulation.length).toBeGreaterThanOrEqual(1);
    };
    });

    test('Testa se a tabela tem 13 colunas', async () => {
      await act(async () => {
        render(<App />);
      });
      const tableColumn = await screen.findAllByRole('columnheader');
      expect(tableColumn).toHaveLength(13);
    });

    test('Testa se a tabela tem uma linha para cada planeta', async () => {
      await act(async () => {
        render(<App />);
      });
      const tableRow = await screen.findAllByRole('row');
      expect(tableRow).toHaveLength(11);
    });
});
