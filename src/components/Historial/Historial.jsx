import React, { useContext } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

import { ServiciosContext } from "../../Store";

import "./Historial.scss";
import Periodo from "./Periodo";

function Historial() {
  const [servicios] = useContext(ServiciosContext);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  // Buscar por los periodos en Servicios y pasarlo a un array
  const periodos = [
    ...new Set(
      servicios
        .sort(function(a, b) {
          return b.fecha - a.fecha;
        })
        .map(a => a["periodo"])
    )
  ];

  return (
    <div className="historial">
      <h2>Historial</h2>
      {periodos ? (
        <div className="periodos">
          {periodos.map((periodo, index) => {
            return (
              <ExpansionPanel
                key={index}
                expanded={expanded === index}
                onChange={handleChange(index)}
              >
                <ExpansionPanelSummary>{periodo}</ExpansionPanelSummary>
                <ExpansionPanelDetails className="details">
                  <Periodo periodo={periodo} />
                </ExpansionPanelDetails>
              </ExpansionPanel>
            );
          })}
        </div>
      ) : (
        <p>No hay horas extras anteriores</p>
      )}
    </div>
  );
}

export default Historial;
