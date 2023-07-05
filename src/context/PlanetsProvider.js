import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../services/fetchPlanets';

function PlanetsProvider({ children }) {
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [planets, setPlanets] = useState([]);
  const [newArray, setNewArray] = useState([]);

  const [filters, setFilters] = useState({
    filterByName: { name: '' },
  });

  const filteredPlanets = (inputChange) => {
    const filtered = (planets.filter((planet) => planet.name.includes(inputChange)));
    setNewArray(filtered);
  };

  useEffect(() => {
    const getPlanets = async () => {
      const { results } = await fetchPlanets();
      setPlanets(results);
      setNewArray(results);
    };

    getPlanets();
  }, []);

  const context = {
    planets,
    setPlanets,
    filters,
    setFilters,
    filterByName,
    setFilterByName,
    filteredPlanets,
    newArray,

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
