import React, { useState, useContext } from "react";
import moment from "moment";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Fab from "@material-ui/core/Fab";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import { db } from "../../index";

import "./Dashboard.scss";
import AddServicio from "./AddServicio/AddServicio";
import EditServicio from "../Historial/EditServicio/EditServicio";

import { ServiciosContext } from "../../Store";

function Dashboard() {
  moment.locale("es");
  const [addDrawerState, setAddDrawerState] = useState(false);
  const [editDrawerState, setEditDrawerState] = useState(false);
  const [servtoedit, setServtoedit] = useState({});
  const [servicios] = useContext(ServiciosContext);

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

  const toggleAddDrawer = open => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setAddDrawerState(open);
  };
  const toggleEditDrawer = open => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setEditDrawerState(open);
  };

  let buttonPressTimer;
  function btnPress(ser) {
    buttonPressTimer = setTimeout(() => {
      setServtoedit(ser);
      setEditDrawerState(true);
    }, 1000);
  }

  function btnRelease() {
    clearTimeout(buttonPressTimer);
  }

  function confirmDelete(ser) {
    if (
      window.confirm(
        "Desea eliminar las " +
          ser.horasextras +
          " horas extra del día " +
          moment(ser.fecha).format("DD MMM")
      )
    ) {
      // eliminar
      db.collection("servicios")
        .doc(ser.uid)
        .delete()
        .then(() => {
          console.log(ser.wo + " deleted!");
        });
    }
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
              <h3 className="oculto">Eliminar</h3>
            </div>
            <ul>
              {delmes.map((serv, index) => {
                return (
                  <li
                    key={index}
                    className={index % 2 ? "odd" : "even"}
                    onTouchStart={e => btnPress(serv)}
                    onTouchEnd={e => btnRelease()}
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
                      <div className="oculto">
                        <Button
                          onClick={e => confirmDelete(serv)}
                          variant="contained"
                          color="primary"
                        >
                          <i className="material-icons">delete</i>
                        </Button>
                      </div>
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
      <Fab
        color="secondary"
        aria-label="add"
        className="addBtn"
        onClick={toggleAddDrawer(true)}
      >
        <i className="material-icons">add</i>
      </Fab>
      <SwipeableDrawer
        anchor="top"
        open={addDrawerState}
        onClose={toggleAddDrawer(false)}
        onOpen={toggleAddDrawer(true)}
      >
        <AddServicio
          title={"Nuevo"}
          servicio={{}}
          onClose={toggleAddDrawer(false)}
        />
      </SwipeableDrawer>
      <SwipeableDrawer
        anchor="top"
        open={editDrawerState}
        onClose={toggleEditDrawer(false)}
        onOpen={toggleEditDrawer(true)}
      >
        <EditServicio
          title={"Editar"}
          serv={servtoedit}
          onClose={toggleEditDrawer(false)}
        />
      </SwipeableDrawer>
    </div>
  );
}

export default Dashboard;
