import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../services/fetchPlanets';

function PlanetsProvider({ children }) {
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [planets, setPlanets] = useState([]);
  const [newArray, setNewArray] = useState([]);
  const [filterByNumber, setFilterByNumber] = useState([]);
  const [sortOrder, setSortOrder] = useState({
    column: 'name',
    sort: 'ASC',
  });

  const [filters, setFilters] = useState({
    filterByName: { name: '' },
    filterByNumber: [],
    order: sortOrder,
  });

  const filteredPlanets = (inputChange) => {
    const filtered = (planets.filter((planet) => planet.name.includes(inputChange)));
    setNewArray(filtered);
  };

  const filterPlanets = (allPlanets, { column, comparison, value }) => {
    const filterMap = {
      'maior que': (planet) => Number(planet[column]) > Number(value),
      'menor que': (planet) => Number(planet[column]) < Number(value),
      'igual a': (planet) => Number(planet[column]) === Number(value),
    };

    return allPlanets.filter(filterMap[comparison]);
  };

  const compareColumns = (a, b, column, sort) => {
    const numericColumns = [
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
    const negative = -1;
    const getValue = (value) => (numericColumns.includes(value) ? Number(value) : value);

    const columnValueA = getValue(a[column]);
    const columnValueB = getValue(b[column]);

    if (columnValueA === 'unknown') {
      return columnValueB === 'unknown' ? 0 : 1;
    }

    if (columnValueB === 'unknown') {
      return negative;
    }

    const comparison = (columnValueA - columnValueB) * (sort === 'ASC' ? 1 : negative);

    return comparison;
  };

  const sortPlanets = (planet, order) => planet.sort(
    (a, b) => compareColumns(a, b, order.column, order.sort),
  );

  const settingFilters = (results) => {
    let filteredArray = [...results];

    if (filterByNumber.length > 0) {
      filterByNumber.forEach((item) => {
        filteredArray = filterPlanets(filteredArray, item);
      });
    }

    filteredArray = sortPlanets(filteredArray, sortOrder);
    setNewArray(filteredArray);
  };

  useEffect(() => {
    const getPlanets = async () => {
      const { results } = await fetchPlanets();
      setPlanets(results);
      setNewArray(results);
    };

    getPlanets();
  }, []);

  useEffect(() => {
    settingFilters(newArray);
  }, [filterByNumber, sortOrder]);

  const context = {
    planets,
    setPlanets,
    filters,
    setFilters,
    filterByName,
    setFilterByName,
    filteredPlanets,
    newArray,
    setNewArray,
    filterByNumber,
    setFilterByNumber,
    settingFilters,
    sortOrder,
    setSortOrder,
  };

  return (
    <PlanetsContext.Provider value={ context }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
