import { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function SelectFilters() {
  const {
    setFilterByNumber,
    filterByNumber,
  } = useContext(PlanetsContext);

  console.log(filterByNumber);
  const [filterObj, setFilterObj] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const options = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const handleClick = () => {
    setFilterByNumber([...filterByNumber, filterObj]);
  };

  return (
    <section>
      <form>
        <select
          name="column-filter"
          data-testid="column-filter"
          onChange={ (e) => setFilterObj({ ...filterObj, column: e.target.value }) }
        >
          {options.map((option) => (
            <option key={ option }>{option}</option>
          ))}
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
      </form>
    </section>
  );
}
