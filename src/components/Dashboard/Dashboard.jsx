import React, { useState, useContext } from "react";
import moment from "moment";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Fab from "@material-ui/core/Fab";
import Paper from "@material-ui/core/Paper";

import { db } from "../../index";

import "./Dashboard.scss";
import AddServicio from "./AddServicio/AddServicio";

import { ServiciosContext, UserContext } from "../../Store";
import { createCoverageSummary } from "istanbul-lib-coverage";

function Dashboard() {
  moment.locale("es");
  const [state, setState] = useState(false);
  const [servicios] = useContext(ServiciosContext);
  const [user] = useContext(UserContext);
  // const [delmes, setDelMes] = useState([]);

  let d = new Date();
  let meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ];
  let mes = meses[d.getMonth()];
  let year = d.getFullYear();

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

  let delmes = filterByProperty(
    [...servicios],
    "periodo",
    mes + " " + year
  ).sort(function(a, b) {
    return a.fecha - b.fecha;
  });

  const toggleDrawer = open => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  let buttonPressTimer;
  function btnPress(ser) {
    buttonPressTimer = setTimeout(() => {
      let res = window.confirm("Desea eliminar " + ser.wo);
      if (res == true) {
        // eliminar
        db.collection("servicios")
          .doc(ser.uid)
          .delete()
          .then(() => {
            console.log(ser.wo + " deleted!");
          });
      } else {
        alert("culo");
      }
    }, 1000);
  }

  function btnRelease() {
    clearTimeout(buttonPressTimer);
  }

  return (
    <div className="dashboard">
      <h2 className="periodo">
        {mes} {year}
      </h2>
      <Paper className="paperList">
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
                  <li
                    key={index}
                    className={index % 2 ? "odd" : "even"}
                    onTouchStart={e => btnPress(serv)}
                    onTouchEnd={btnRelease}
                  >
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
          <p>
            No hay horas extras aún para <strong>{mes}</strong> de{" "}
            <strong>{year}</strong>
          </p>
        )}
      </Paper>

      {/*  */}
      <Fab
        color="secondary"
        aria-label="add"
        className="addBtn"
        onClick={toggleDrawer(true)}
      >
        <i className="material-icons">add</i>
      </Fab>
      <SwipeableDrawer
        anchor="top"
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <AddServicio onClose={toggleDrawer(false)} />
      </SwipeableDrawer>
    </div>
  );
}

export default Dashboard;
