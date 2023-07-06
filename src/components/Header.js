import { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import SelectFilters from './SelectFilters';

function Header() {
  const { filteredPlanets } = useContext(PlanetsContext);
  return (
    <header>
      <form>
        <input
          type="text"
          placeholder="Search"
          data-testid="name-filter"
          onChange={ (e) => filteredPlanets(e.target.value) }
        />
      </form>
      <SelectFilters />
    </header>
  );
}

export default Header;
