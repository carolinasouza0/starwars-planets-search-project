import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../services/fetchPlanets';

function PlanetsProvider({ children }) {
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [planets, setPlanets] = useState([]);
  const [newArray, setNewArray] = useState([]);
  const [filterByNumber, setFilterByNumber] = useState([]);

  const [filters, setFilters] = useState({
    filterByName: { name: '' },
    filterByNumber: [],
  });

  const filteredPlanets = (inputChange) => {
    const filtered = (planets.filter((planet) => planet.name.includes(inputChange)));
    setNewArray(filtered);
  };

  const settingFilters = (results) => {
    const ZERO = 0;
    let filteredArray = [...results];

    if (filterByNumber.length !== ZERO) {
      filterByNumber.forEach((item) => {
        const { column, comparison, value } = item;
        switch (comparison) {
        case 'maior que':
          filteredArray = filteredArray
            .filter((planet) => Number(planet[column]) > Number(value));
          break;
        case 'menor que':
          filteredArray = filteredArray
            .filter((planet) => Number(planet[column]) < Number(value));
          break;
        case 'igual a':
          filteredArray = filteredArray
            .filter((planet) => Number(planet[column]) === Number(value));
          break;
        default:
          break;
        }
      });
    }
    setNewArray(filteredArray);
  };

  useEffect(() => {
    const getPlanets = async () => {
      const { results } = await fetchPlanets();
      setPlanets(results);
      setNewArray(results);
    //   settingFilters(results);
    };

    getPlanets();
  }, []);

  useEffect(() => {
    settingFilters(planets);
  }, [filterByNumber]);

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
