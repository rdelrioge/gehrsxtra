import React, { useState, useContext } from "react";
import moment from "moment";

import { UserContext } from "../../../Store";

import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";

import { db } from "../../../index";
import "./AddServicio.scss";

function AddServicio(props) {
  const [user] = useContext(UserContext);
  const [caso, setCase] = useState("");
  const [wo, setWo] = useState("");
  const [cliente, setCliente] = useState("");
  const [modalidad, setModalidad] = useState("");
  const [sid, setSid] = useState("");
  const [actividad, setActividad] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const f = new Date();
  const y = f.getFullYear();
  const m = f.getMonth();
  const d = f.getDate();
  const h = f.getHours();
  let fechaIni;
  // Si se abre la aplicación despues de media noche, poner en fechaInicial el dia de ayer
  if (h < 6) {
    fechaIni = new Date(y, m, d - 1, 0);
  } else {
    fechaIni = new Date(y, m, d, 0);
  }
  const [startDate, setStartDate] = useState(fechaIni);
  const [startTime, setStartTime] = useState(new Date(y, m, d, 18)); // a las 18:00 hrs
  const [endDate, setEndDate] = useState(f);
  const [endTime, setEndTime] = useState(f);
  // Crear un nuevo Date Obj con las fechas y horas seleccionadas
  let yST = startDate.getFullYear();
  let moST = startDate.getMonth();
  let dST = startDate.getDate();
  let hST = startTime.getHours();
  let mST = startTime.getMinutes();
  let inicio = new Date(yST, moST, dST, hST, mST);
  let yET = endDate.getFullYear();
  let moET = endDate.getMonth();
  let dET = endDate.getDate();
  let hET = endTime.getHours();
  let mET = endTime.getMinutes();
  let final = new Date(yET, moET, dET, hET, mET);
  // pasarlo a momentObj para realizar el calculo de diferencia de horas
  let momST = moment(inicio);
  let momET = moment(final);
  let horasextras = momET.diff(momST, "hours");

  let dobles = 0;
  if (horasextras > 3) {
    dobles = 3;
  } else {
    dobles = horasextras;
  }
  let triples = horasextras - dobles;

  const handleSubmit = ev => {
    ev.preventDefault();
    if (horasextras < 1) {
      alert("Comprueba que la fecha y hora sean correctas");
    } else {
      // obterner nombre del mes de fecha de inicio (moST)
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
      let mes = meses[moST];
      // obtener dia de la semana
      let dias = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado"
      ];
      let dia = dias[inicio.getDay()];
      // TODO AQUI
      console.log({
        caso,
        wo,
        cliente,
        modalidad,
        sid,
        actividad,
        descripcion,
        inicio,
        final,
        fecha: inicio.getTime(),
        horasextras,
        dobles,
        triples,
        periodo: mes + " " + yST,
        dia,
        horario: hST + ":00-" + hET + ":00",
        inge: user.displayName,
        sso: user.sso
      });
      db.collection("servicios")
        .add({
          caso,
          wo,
          cliente,
          modalidad,
          sid,
          actividad,
          descripcion,
          inicio,
          final,
          fecha: inicio.getTime(),
          horasextras,
          dobles,
          triples,
          periodo: mes + " " + yST,
          dia,
          horario: hST + ":00-" + hET + ":00",
          inge: user.displayName,
          sso: user.sso
        })
        .then(docRef => console.log("Doc written with ID: ", docRef.id))
        .catch(err => console.log("Error addign doc: ", err));
      props.onClose();
    }
  };

  const reset = () => {
    props.onClose();
  };

  return (
    <div className="addServicio">
      <div className="header">
        <h3> Nuevo Servicio </h3>
      </div>
      <form className="form" onSubmit={handleSubmit} onReset={reset}>
        <div className="caseWO">
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="caso">Case</InputLabel>
            <Input
              id="caso"
              name="caso"
              autoComplete="caso"
              onChange={e => setCase(e.target.value)}
              value={caso}
            />
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="wo">Work Order</InputLabel>
            <Input
              id="wo"
              name="wo"
              autoComplete="wo"
              onChange={e => setWo(e.target.value)}
              value={wo}
            />
          </FormControl>
        </div>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="cliente">Cliente</InputLabel>
          <Input
            id="cliente"
            name="cliente"
            autoComplete="cliente"
            onChange={e => setCliente(e.target.value)}
            value={cliente}
          />
        </FormControl>
        <div className="equipo">
          <FormControl className="modalidad" required>
            <InputLabel htmlFor="modalidad">Modalidad</InputLabel>
            <Select
              value={modalidad}
              onChange={e => setModalidad(e.target.value)}
              input={
                <Input
                  id="modalidad"
                  name="modalidad"
                  autoComplete="modalidad"
                />
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="RM">RM</MenuItem>
              <MenuItem value="CT">CT</MenuItem>
              <MenuItem value="XR">XR</MenuItem>
              <MenuItem value="XM">XM</MenuItem>
            </Select>
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="sid">SID</InputLabel>
            <Input
              id="sid"
              name="sid"
              autoComplete="sid"
              onChange={e => setSid(e.target.value)}
              value={sid}
            />
          </FormControl>
        </div>
        <div className="actividad">
          <FormControl className="actividadSel" required>
            <InputLabel htmlFor="actividad">Actividad</InputLabel>
            <Select
              value={actividad}
              onChange={e => setActividad(e.target.value)}
              input={
                <Input
                  id="actividad"
                  name="actividad"
                  autoComplete="actividad"
                />
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="PM">PM</MenuItem>
              <MenuItem value="CM">CM</MenuItem>
              <MenuItem value="Instal">Install</MenuItem>
              <MenuItem value="FMI">FMI</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Descripción de actividad"
            multiline
            required
            rows="4"
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
          />
        </div>
        <div className="times">
          <div className="inicio">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                required
                margin="normal"
                id="startDate"
                label="fecha inicio"
                format="dd/MM/yyyy"
                value={startDate}
                onChange={e => {
                  setStartDate(e);
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
              <KeyboardTimePicker
                required
                margin="normal"
                id="startTime"
                label="hora inicio"
                value={startTime}
                onChange={e => {
                  setStartTime(e);
                }}
                KeyboardButtonProps={{
                  "aria-label": "change time"
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div className="final">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                required
                margin="normal"
                id="endDate"
                label="fecha fin"
                format="dd/MM/yyyy"
                value={endDate}
                onChange={e => {
                  setEndDate(e);
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
              <KeyboardTimePicker
                required
                margin="normal"
                id="endTime"
                label="hora fin"
                value={endTime}
                onChange={e => {
                  setEndTime(e);
                }}
                KeyboardButtonProps={{
                  "aria-label": "change time"
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
        </div>
        {horasextras < 1 ? null : (
          <div className="preview">
            <p>
              horas extra <br /> <strong>{horasextras}</strong>
            </p>
            <p>
              horas dobles <br /> <strong>{dobles}</strong>
            </p>
            <p>
              horas triples <br /> <strong>{triples}</strong>
            </p>
          </div>
        )}
        <div className="buttons">
          <Button type="reset" variant="contained" color="primary">
            Cancelar
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Agregar
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddServicio;
