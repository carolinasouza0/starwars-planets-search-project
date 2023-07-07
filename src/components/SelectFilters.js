import { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function SelectFilters() {
  const {
    setFilterByNumber,
    filterByNumber,
    setNewArray,
    planets,
    setSortOrder,
  } = useContext(PlanetsContext);

  console.log(filterByNumber);
  const [filterObj, setFilterObj] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const usedOptions = filterByNumber.map((item) => item.column);
  const options = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const [sortOption, setSortOption] = useState('ASC');
  const [sortColumn, setSortColumn] = useState('population');

  const disponibleOptions = () => {
    const optDisp = options.filter((item) => !usedOptions.includes(item));
    return optDisp
      .map((option) => (
        <option key={ option }>{option}</option>
      ));
  };

  const removeFilter = (column) => {
    const newFilter = filterByNumber.filter((item) => item.column !== column);
    setFilterByNumber(newFilter);
    setNewArray(planets);
  };

  const removeAllFilters = () => {
    setFilterByNumber([]);
    setNewArray(planets);
  };

  const handleClick = () => {
    setFilterByNumber([...filterByNumber, filterObj]);
    setFilterObj({
      column: 'population',
      comparison: 'maior que',
      value: 0,
    });
  };

  const orderColumn = () => {
    setSortOrder({ column: sortColumn, sort: sortOption });
  };

  return (
    <section>
      <form>
        <select
          name="column-filter"
          data-testid="column-filter"
          onChange={ (e) => setFilterObj({ ...filterObj, column: e.target.value }) }
        >
          {disponibleOptions()}
        </select>
        <select
          name="comparison-filter"
          data-testid="comparison-filter"
          onChange={ (e) => setFilterObj({ ...filterObj, comparison: e.target.value }) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
          value={ filterObj.value }
          onChange={ (e) => setFilterObj({ ...filterObj, value: e.target.value }) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClick }
        >
          Filtrar
        </button>
        <select
          name="column-filter"
          className="btn btn-dark"
          data-testid="column-sort"
          onChange={ (e) => setSortColumn(e.target.value) }
        >
          {options.map((option) => (
            <option key={ option }>{option}</option>
          ))}
        </select>
        <label htmlFor="ASC">
          Ascendente
          <input
            type="radio"
            data-testid="column-sort-input-asc"
            name="order"
            value="ASC"
            id="ASC"
            onChange={ (e) => setSortOption(e.target.value) }
          />
        </label>
        <label htmlFor="DESC">
          Descendente
          <input
            type="radio"
            data-testid="column-sort-input-desc"
            name="order"
            value="DESC"
            id="DESC"
            onChange={ (e) => setSortOption(e.target.value) }
          />
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ orderColumn }
        >
          Ordenar
        </button>
        { filterByNumber.map((item) => (
          <div key={ item.column } data-testid="filter">
            <p>
              { `Filtro: ${item.column} ${item.comparison} ${item.value}` }
            </p>
            <button
              type="button"
              onClick={ () => removeFilter(item.column) }
            >
              X
            </button>
          </div>
        ))}
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ removeAllFilters }
        >
          Remover filtros
        </button>
      </form>
    </section>
  );
}
