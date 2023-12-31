import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { newArray } = useContext(PlanetsContext);
  console.log(newArray);
  return (
    <section>
      <table>
        <thead className="thead">
          <tr className="tr">
            <th className="th">Name</th>
            <th className="th">Climate</th>
            <th className="th">Terrain</th>
            <th className="th">Gravity</th>
            <th className="th">Surface Water</th>
            <th className="th">Rotation Period</th>
            <th className="th">Orbital Period</th>
            <th className="th">Diameter</th>
            <th className="th">Population</th>
            <th className="th">Films</th>
            <th className="th">Created</th>
            <th className="th">Edited</th>
            <th className="th">Url</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {newArray.map(
            ({
              name,
              climate,
              terrain,
              gravity,
              surface_water: surfaceWater,
              rotation_period: rotationPeriod,
              orbital_period: orbitalPeriod,
              diameter,
              population,
              films,
              created,
              edited,
              url,
            }) => (
              <tr className="tr" key={ name }>
                <td className="td" data-testid="planet-name">{name}</td>
                <td className="td">{climate}</td>
                <td className="td">{terrain}</td>
                <td className="td">{gravity}</td>
                <td className="td">{surfaceWater}</td>
                <td className="td">{rotationPeriod}</td>
                <td className="td">{orbitalPeriod}</td>
                <td className="td">{diameter}</td>
                <td className="td">{population}</td>
                <td className="td">{films}</td>
                <td className="td">{created}</td>
                <td className="td">{edited}</td>
                <td className="td">{url}</td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </section>
  );
}
export default Table;
