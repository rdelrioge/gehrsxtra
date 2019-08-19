import React, { useState, useContext } from "react";

import { UserContext } from "../../../Store";

import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

import { db } from "../../../index";
import "./AddServicio.scss";

function AddServicio(props) {
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  const d = new Date();
  const h = addZero(d.getHours());
  const m = addZero(d.getMinutes());
  const end = h + ":" + m;

  const [user] = useContext(UserContext);
  const [caso, setCase] = useState("");
  const [wo, setWo] = useState("");
  const [cliente, setCliente] = useState("");
  const [fecha, setFecha] = useState(d.toISOString().substr(0, 10));
  const [actividad, setActividad] = useState("");

  const handleSubmit = ev => {
    let created = new Date();
    ev.preventDefault();
    db.collection("servicios")
      .add({
        caso,
        cliente,
        actividad,
        created: created.getTime(),
        owner: user
      })
      .then(docRef => console.log("Doc written with ID: ", docRef.id))
      .catch(err => console.log("Error addign doc: ", err));
  };

  const reset = () => {
    props.onClose();
  };

  return (
    <div className="addServicio">
      <div className="header">
        <h3 id="form-dialog-caso"> Nuevo Servicio </h3>
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
        </div>
        <TextField
          className="fecha"
          label="fecha"
          type="date"
          defaultValue={fecha}
          InputLabelProps={{
            shrink: true
          }}
          onChange={e => {
            setFecha(e.target.value);
          }}
        />
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
