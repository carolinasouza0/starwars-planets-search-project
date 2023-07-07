import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { dataTest } from './data';
import userEvent from '@testing-library/user-event';

const ROW_ROLE_SELECTOR = 'row';
const COLUMN_ROLE_SELECTOR = 'columnheader';
const INPUT_FILTER_NAME_SELECTOR = 'name-filter';
const COLUMN_FILTER_SELECTOR = 'column-filter';
const COMPARISON_FILTER_SELECTOR = 'comparison-filter';
const VALUE_FILTER_SELECTOR = 'value-filter';
const BUTTON_FILTER_SELECTOR = 'button-filter';
const REMOVE_FILTER_SELECTOR = 'filter';
const REMOVE_ALL_FILTERS_SELECTOR = 'button-remove-filters';
const SORT_COLUMN_SELECTOR = 'column-sort';
const SORT_ORDER_ASC_SELECTOR = 'column-sort-input-asc';
const SORT_ORDER_DESC_SELECTOR = 'column-sort-input-desc';
const SORT_APPLY_SELECTOR = 'column-sort-button';
const PLANET_NAME_SELECTOR = 'planet-name';

describe('Testa a requisição para o endpoint `/planets` da API de Star Wars', () => {
  beforeEach(() => {
    global.fetch = jest.fn(dataTest);
  });

  it('Realiza uma requisição para a API', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(global.fetch).toHaveBeenCalled();
  });

  it('Preenche a tabela com os dados retornados', async () => {
    await act(async () => {
      render(<App />);
    });
    const planets = dataTest.results;
    for(let planetIndex in planets) {
      const name = await screen.findByText(planets[planetIndex].name);
      const rotationPeriod = await screen.findAllByText(planets[planetIndex].rotation_period);
      const orbitalPeriod = await screen.findAllByText(planets[planetIndex].orbital_period);
      const diameter = await screen.findAllByText(planets[planetIndex].diameter);
      const climate = await screen.findAllByText(planets[planetIndex].climate);
      const gravity = await screen.findAllByText(planets[planetIndex].gravity);
      const terrain = await screen.findAllByText(planets[planetIndex].terrain);
      const surfaceWater = await screen.findAllByText(planets[planetIndex].surface_water);
      const population = await screen.findAllByText(planets[planetIndex].population);

      expect(name).toBeInTheDocument();
      expect(rotationPeriod.length).toBeGreaterThanOrEqual(1);
      expect(orbitalPeriod.length).toBeGreaterThanOrEqual(1);
      expect(diameter.length).toBeGreaterThanOrEqual(1);
      expect(climate.length).toBeGreaterThanOrEqual(1);
      expect(gravity.length).toBeGreaterThanOrEqual(1);
      expect(terrain.length).toBeGreaterThanOrEqual(1);
      expect(surfaceWater.length).toBeGreaterThanOrEqual(1);
      expect(population.length).toBeGreaterThanOrEqual(1);
    };
  });

  it('A tabela deve ter 13 colunas', async () => {
    await act(async () => {
      render(<App />);
    });
    
    expect(await screen.findAllByRole(COLUMN_ROLE_SELECTOR)).toHaveLength(13);
  });

  it('A tabela deve ter uma linha para cada planeta retornado', async () => {
    await act(async () => {
      render(<App />);
    });
    
    expect(await screen.findAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(11);
  });
});

describe('Testa a filtragem da tabela a partir do nome do planeta', () => {
    beforeEach(() => {
        global.fetch = jest.fn(dataTest);
      });
  
    it('Renderiza campo de texto para filtro de nomes', async () => {
      await act(async () => {
        render(<App />);
      });
      expect(await screen.findByTestId(INPUT_FILTER_NAME_SELECTOR)).toBeInTheDocument();
    });
  
    it('Filtra planetas que possuem a letra "o" no nome', async () => {
      await act(async () => {
        render(<App />);
      });
  
      const inputName = await screen.findByTestId(INPUT_FILTER_NAME_SELECTOR);
      userEvent.type(inputName, 'o');
      const hoth = await screen.findByText('Hoth');
        const endor = await screen.findByText('Endor');
        expect(hoth).toBeInTheDocument();
        expect(endor).toBeInTheDocument();
    });
  
    it('Filtra planetas que possuem a letra "oo" no nome', async () => {
      await act(async () => {
        render(<App />);
      });
  
      const inputName = await screen.findByTestId(INPUT_FILTER_NAME_SELECTOR);
      userEvent.type(inputName, 'oo');
      const naboo = await screen.findByText('Naboo');
        const tatooine = await screen.findByText('Tatooine');
        expect(naboo).toBeInTheDocument();
        expect(tatooine).toBeInTheDocument();
    });
  });

  describe('Testa a renderização dos selects, input e botão dos filtros númericos', () => {
    beforeEach(() => {
        global.fetch = jest.fn(dataTest);
      });
    
    it('Renderiza um select para filtro de coluna', async () => {
        await act(async () => {
            render(<App />);
        });
        expect(await screen.findByTestId(COLUMN_FILTER_SELECTOR)).toBeInTheDocument();
        
    });

    it('Renderiza um select para filtro de comparação', async () => {
        await act(async () => {
            render(<App />);
        });
        expect(await screen.findByTestId(COMPARISON_FILTER_SELECTOR)).toBeInTheDocument();
        
    });

    it('Renderiza um input para filtro de valor', async () => {
        await act(async () => {
            render(<App />);
        });
        expect(await screen.findByTestId(VALUE_FILTER_SELECTOR)).toBeInTheDocument();
        
    });

    it('Renderiza um botão para adicionar filtro', async () => {
        await act(async () => {
            render(<App />);
        });
        expect(await screen.findByTestId(BUTTON_FILTER_SELECTOR)).toBeInTheDocument();
        
    });
  });

  describe('Testa o botão de remover filtro', () => {
    beforeEach(() => {
        global.fetch = jest.fn(dataTest);
      });
    
      const removeFilter = async () => {
        const filters = await screen.findAllByTestId(REMOVE_FILTER_SELECTOR);
        userEvent.click(filters[0].querySelector('button'));
        };

        it('Adiciona um filtro, verifica se tabela foi atualiza e depois remove o filtro', async () => {
            await act(async () => {
                render(<App />);
            });
            
            expect(await screen.findAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(11);

            userEvent.selectOptions(await screen.findByTestId(COLUMN_FILTER_SELECTOR), 'population');
            userEvent.selectOptions(await screen.findByTestId(COMPARISON_FILTER_SELECTOR), 'maior que');
            userEvent.type(await screen.findByTestId(VALUE_FILTER_SELECTOR), '1000000');
            userEvent.click(await screen.findByTestId(BUTTON_FILTER_SELECTOR));

            expect(await screen.findAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(7);

            await removeFilter();

            expect(await screen.findAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(11);
        });

        it('Adiciona dois filtros, verifica se tabela foi atualiza e depois remove os filtros', async () => {
            await act(async () => {
                render(<App />);
            });
            
            expect(await screen.findAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(11);

            userEvent.selectOptions(await screen.findByTestId(COLUMN_FILTER_SELECTOR), 'population');
            userEvent.selectOptions(await screen.findByTestId(COMPARISON_FILTER_SELECTOR), 'maior que');
            userEvent.type(await screen.findByTestId(VALUE_FILTER_SELECTOR), '1000000');
            userEvent.click(await screen.findByTestId(BUTTON_FILTER_SELECTOR));

            userEvent.selectOptions(await screen.findByTestId(COLUMN_FILTER_SELECTOR), 'orbital_period');
            userEvent.selectOptions(await screen.findByTestId(COMPARISON_FILTER_SELECTOR), 'menor que');
            userEvent.type(await screen.findByTestId(VALUE_FILTER_SELECTOR), '300');
            userEvent.click(await screen.findByTestId(BUTTON_FILTER_SELECTOR));

            expect(await screen.findAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(1);

            await removeFilter();
            await removeFilter();

            expect(await screen.findAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(11);
        });

        it('Adiciona três filtros, verifica se tabela foi atualiza e depois remove os filtros', async () => {
            await act(async () => {
                render(<App />);
            });
            
            expect(await screen.findAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(11);

            userEvent.selectOptions(await screen.findByTestId(COLUMN_FILTER_SELECTOR), 'population');
            userEvent.selectOptions(await screen.findByTestId(COMPARISON_FILTER_SELECTOR), 'maior que');
            userEvent.type(await screen.findByTestId(VALUE_FILTER_SELECTOR), '1000000');
            userEvent.click(await screen.findByTestId(BUTTON_FILTER_SELECTOR));

            userEvent.selectOptions(await screen.findByTestId(COLUMN_FILTER_SELECTOR), 'diameter');
            userEvent.selectOptions(await screen.findByTestId(COMPARISON_FILTER_SELECTOR), 'menor que');
            userEvent.type(await screen.findByTestId(VALUE_FILTER_SELECTOR), '15000');
            userEvent.click(await screen.findByTestId(BUTTON_FILTER_SELECTOR));

            userEvent.selectOptions(await screen.findByTestId(COLUMN_FILTER_SELECTOR), 'orbital_period');
            userEvent.selectOptions(await screen.findByTestId(COMPARISON_FILTER_SELECTOR), 'igual a');
            userEvent.type(await screen.findByTestId(VALUE_FILTER_SELECTOR), '4900');
            userEvent.click(await screen.findByTestId(BUTTON_FILTER_SELECTOR));

            expect(await screen.findAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(1);

            await removeFilter();
            await removeFilter();
            await removeFilter();

            expect(await screen.findAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(11);
        });

        it('Ao adicionar 3 filtros, testa o botão de remover todos os filtros', async () => {
            await act(async () => {
                render(<App />);
            });
            
            expect(await screen.findAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(11);

            userEvent.selectOptions(await screen.findByTestId(COLUMN_FILTER_SELECTOR), 'population');
            userEvent.selectOptions(await screen.findByTestId(COMPARISON_FILTER_SELECTOR), 'maior que');
            userEvent.type(await screen.findByTestId(VALUE_FILTER_SELECTOR), '1000000');
            userEvent.click(await screen.findByTestId(BUTTON_FILTER_SELECTOR));

            userEvent.selectOptions(await screen.findByTestId(COLUMN_FILTER_SELECTOR), 'diameter');
            userEvent.selectOptions(await screen.findByTestId(COMPARISON_FILTER_SELECTOR), 'menor que');
            userEvent.type(await screen.findByTestId(VALUE_FILTER_SELECTOR), '15000');
            userEvent.click(await screen.findByTestId(BUTTON_FILTER_SELECTOR));

            userEvent.selectOptions(await screen.findByTestId(COLUMN_FILTER_SELECTOR), 'orbital_period');
            userEvent.selectOptions(await screen.findByTestId(COMPARISON_FILTER_SELECTOR), 'igual a');
            userEvent.type(await screen.findByTestId(VALUE_FILTER_SELECTOR), '4900');
            userEvent.click(await screen.findByTestId(BUTTON_FILTER_SELECTOR));

            expect(await screen.findAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(1);

            userEvent.click(await screen.findByTestId(REMOVE_ALL_FILTERS_SELECTOR));

            expect(await screen.findAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(11);
        });
  });

  describe('Testa a ordenação da tabela', () => {
    beforeEach(() => {
        global.fetch = jest.fn(dataTest);
      });

      it('Ordena a tabela pela em ordem crescente', async () => {
        await act(async () => {
            render(<App />);
        });
        
        expect(await screen.findAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(11);

        userEvent.selectOptions(await screen.findByTestId(SORT_COLUMN_SELECTOR), 'population');
        userEvent.click(await screen.findByTestId(SORT_ORDER_ASC_SELECTOR));
        userEvent.click(await screen.findByTestId(SORT_APPLY_SELECTOR));

        const expected = ['Yavin IV', 'Tatooine', 'Bespin', 'Endor', 'Kamino', 'Alderaan', 'Naboo', 'Coruscant', 'Hoth', 'Dagobah'];
        const planetNameSortedAscTable = await screen.findAllByTestId(PLANET_NAME_SELECTOR);
        const planetNameSortedAscTableText = planetNameSortedAscTable.map((planet) => planet.textContent);
        expect(planetNameSortedAscTableText).toEqual(expected);
      });
  
      it('Ordena a tabela pela em ordem decrescente', async () => {
        await act(async () => {
            render(<App />);
        });
        
        expect(await screen.findAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(11);

        userEvent.selectOptions(await screen.findByTestId(SORT_COLUMN_SELECTOR), 'orbital_period');
        userEvent.click(await screen.findByTestId(SORT_ORDER_DESC_SELECTOR));
        userEvent.click(await screen.findByTestId(SORT_APPLY_SELECTOR));

        const expected = ['Bespin', 'Yavin IV', 'Hoth', 'Kamino', 'Endor', 'Coruscant', 'Alderaan', 'Dagobah', 'Naboo', 'Tatooine'];
        const planetNameSortedDescTable = await screen.findAllByTestId(PLANET_NAME_SELECTOR);
        const planetNameSortedDescTableText = planetNameSortedDescTable.map((planet) => planet.textContent);
        expect(planetNameSortedDescTableText).toEqual(expected);
      });

      it('Ordena a tabela pela em ordem crescente e depois em ordem decrescente', async () => {
        await act(async () => {
            render(<App />);
        });
        
        expect(await screen.findAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(11);

        userEvent.selectOptions(await screen.findByTestId(SORT_COLUMN_SELECTOR), 'population');
        userEvent.click(await screen.findByTestId(SORT_ORDER_ASC_SELECTOR));
        userEvent.click(await screen.findByTestId(SORT_APPLY_SELECTOR));

        const expected = ['Yavin IV', 'Tatooine', 'Bespin', 'Endor', 'Kamino', 'Alderaan', 'Naboo', 'Coruscant', 'Hoth', 'Dagobah'];
        const planetNameSortedAscTable = await screen.findAllByTestId(PLANET_NAME_SELECTOR);
        const planetNameSortedAscTableText = planetNameSortedAscTable.map((planet) => planet.textContent);
        expect(planetNameSortedAscTableText).toEqual(expected);

        userEvent.selectOptions(await screen.findByTestId(SORT_COLUMN_SELECTOR), 'orbital_period');
        userEvent.click(await screen.findByTestId(SORT_ORDER_DESC_SELECTOR));
        userEvent.click(await screen.findByTestId(SORT_APPLY_SELECTOR));

        const expected2 = ['Bespin', 'Yavin IV', 'Hoth', 'Kamino', 'Endor', 'Coruscant', 'Alderaan', 'Dagobah', 'Naboo', 'Tatooine'];
        const planetNameSortedDescTable = await screen.findAllByTestId(PLANET_NAME_SELECTOR);
        const planetNameSortedDescTableText = planetNameSortedDescTable.map((planet) => planet.textContent);
        expect(planetNameSortedDescTableText).toEqual(expected2);
      });

      it('Ordena a tabela pela em ordem decrescente e depois em ordem crescente', async () => {
        await act(async () => {
            render(<App />);
        });
        
        expect(await screen.findAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(11);

        userEvent.selectOptions(await screen.findByTestId(SORT_COLUMN_SELECTOR), 'population');
        userEvent.click(await screen.findByTestId(SORT_ORDER_DESC_SELECTOR));
        userEvent.click(await screen.findByTestId(SORT_APPLY_SELECTOR));

        const expected = ['Dagobah', 'Hoth', 'Coruscant', 'Naboo', 'Alderaan', 'Kamino', 'Endor', 'Bespin', 'Tatooine', 'Yavin IV'];
        const planetNameSortedDescTable = await screen.findAllByTestId(PLANET_NAME_SELECTOR);
        const planetNameSortedDescTableText = planetNameSortedDescTable.map((planet) => planet.textContent);
        expect(planetNameSortedDescTableText).toEqual(expected);

        userEvent.selectOptions(await screen.findByTestId(SORT_COLUMN_SELECTOR), 'orbital_period');
        userEvent.click(await screen.findByTestId(SORT_ORDER_ASC_SELECTOR));
        userEvent.click(await screen.findByTestId(SORT_APPLY_SELECTOR));

        const expected2 = ['Tatooine', 'Naboo', 'Dagobah', 'Alderaan', 'Coruscant', 'Endor', 'Kamino', 'Hoth', 'Yavin IV', 'Bespin'];
        const planetNameSortedAscTable = await screen.findAllByTestId(PLANET_NAME_SELECTOR);
        const planetNameSortedAscTableText = planetNameSortedAscTable.map((planet) => planet.textContent);
        expect(planetNameSortedAscTableText).toEqual(expected2);
      });
  });
         
        