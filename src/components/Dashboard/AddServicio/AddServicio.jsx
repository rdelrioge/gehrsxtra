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
  const [actividad, setActividad] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const f = new Date();
  const y = f.getFullYear();
  const m = f.getMonth();
  const d = f.getDate();
  const h = f.getHours();
  let fechaIni;
  if (h < 6) {
    fechaIni = new Date(y, m, d - 1, 0);
  } else {
    fechaIni = new Date(y, m, d, 0);
  }
  const [startDate, setStartDate] = useState(fechaIni);
  const [startTime, setStartTime] = useState(new Date(y, m, d, 18));
  const [endDate, setEndDate] = useState(new Date(y, m, d, 0));
  const [endTime, setEndTime] = useState(f);

  let yST = startDate.getFullYear();
  let moST = startDate.getMonth();
  let dST = startDate.getDate();
  let hST = startTime.getHours();
  let mST = startTime.getMinutes();
  let objectST = new Date(yST, moST, dST, hST, mST);
  let yET = endDate.getFullYear();
  let moET = endDate.getMonth();
  let dET = endDate.getDate();
  let hET = endTime.getHours();
  let mET = endTime.getMinutes();
  let objectET = new Date(yET, moET, dET, hET, mET);

  let momST = moment(objectST);
  let momET = moment(objectET);
  let horasextras = momET.diff(momST, "hours");
  if (horasextras < 1) {
    alert("Comprueba que la fecha y hora sean correctas");
  }
  let dobles = 0;
  if (horasextras > 3) {
    dobles = 3;
  } else {
    dobles = horasextras;
  }
  let triples = horasextras - dobles;

  const handleSubmit = ev => {
    ev.preventDefault();
    // db.collection("servicios")
    //   .add({
    //     caso,
    //     cliente,
    //     actividad,
    //     descripcion,
    //     created: created.getTime(),
    //     owner: user
    //   })
    //   .then(docRef => console.log("Doc written with ID: ", docRef.id))
    //   .catch(err => console.log("Error addign doc: ", err));
  };

  const reset = () => {
    props.onClose();
  };

  return (
    <div className="addServicio">
      <div className="header">
        <h3> Nuevo Servicio </h3>
      </div>
      <form onSubmit={handleSubmit} onReset={reset}>
        <div className="caseWO">
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="caso">Case</InputLabel>
            <Input
              id="caso"
              name="caso"
              autoComplete="caso"
              onChange={e => setCase(e.target.value)}
              value={caso}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
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
