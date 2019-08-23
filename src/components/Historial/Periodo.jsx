import React, { useContext } from "react";
import moment from "moment";

import { ServiciosContext } from "../../Store";

import "../Dashboard/Dashboard.scss";

function Periodo(props) {
  const [servicios] = useContext(ServiciosContext);

  const filterByProperty = (array, prop, value) => {
    var filtered = [];
    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      if (obj[prop].indexOf(value) >= 0) {
        filtered.push(obj);
      }
    }
    return filtered;
  };

  let delmes = filterByProperty([...servicios], "periodo", props.periodo).sort(
    function(a, b) {
      return a.fecha - b.fecha;
    }
  );

  return (
    <div className="periodoHis">
      {delmes.length > 0 ? (
        <>
          <div className="gridHead">
            <h3>Fecha</h3>
            <h3>Horario</h3>
            <h3 className="oculto">Caso</h3>
            <h3>WO</h3>
            <h3 className="oculto">Cliente</h3>
            <h3 className="oculto">Actividad</h3>
            <h3>Total</h3>
            <h3>Dobles</h3>
            <h3>Triples</h3>
          </div>
          <ul>
            {delmes.map((serv, index) => {
              return (
                <li key={index} className={index % 2 ? "odd" : "even"}>
                  <div className="gridBody">
                    <span>{moment(serv.fecha).format("DD MMM")}</span>
                    <span>{serv.horario}</span>
                    <span className="oculto"> {serv.caso} </span>
                    <span> {serv.wo} </span>
                    <span className="oculto"> {serv.cliente} </span>
                    <span className="oculto">
                      {" "}
                      {serv.actividad} - {serv.descripcion}{" "}
                    </span>
                    <span> {serv.horasextras} </span>
                    <span> {serv.dobles} </span>
                    <span> {serv.triples ? serv.triples : "0"} </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <p>No hay horas extras aún para</p>
      )}
    </div>
  );
}

export default Periodo;
