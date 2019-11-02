import React, { useContext, useState } from "react";
import moment from "moment";
import XLSX from "xlsx";
import FileSaver from "file-saver";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";

import { db } from "../../index";
import { ServiciosContext } from "../../Store";
import EditServicio from "./EditServicio/EditServicio";

import "../Historial/Historial.scss";

function Periodo(props) {
  const [drawerState, setDrawerstate] = useState(false);
  const [servtoedit, setServtoedit] = useState({});
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

  const toggleDrawer = open => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerstate(open);
  };
  let buttonPressTimer;
  function btnPress(ser) {
    buttonPressTimer = setTimeout(() => {
      setServtoedit(ser);
      setDrawerstate(true);
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

  function exportar() {
    let wb = XLSX.utils.book_new();
    wb.SheetNames.push(delmes[0].periodo);
    let newArray = [];
    for (let i = 0; i < delmes.length; i++) {
      newArray.push({
        SSO: delmes[i].sso,
        Nombre: delmes[i].inge,
        Fecha:
          delmes[i].dia + ", " + moment(delmes[i].fecha).format("DD MMM YYYY"),
        Dia: delmes[i].dia,
        "Horas extras": delmes[i].horasextras,
        Dobles: delmes[i].dobles,
        Triples: delmes[i].triples,
        "Día de descanso / festivo":
          delmes[i].dia == "Sábado" ? "día de descanso" : "NA",
        "Legal Entity": "GE International Servicios Administrativos SA de CV",
        Horario: delmes[i].horario,
        Cliente: delmes[i].cliente,
        Actividad: delmes[i].actividad + " - " + delmes[i].descripcion,
        Orden: delmes[i].wo,
        Case: delmes[i].caso
      });
    }
    let ws = XLSX.utils.json_to_sheet(newArray);
    console.log(JSON.parse(JSON.stringify(ws)));
    let newws = {};

    for (var key in ws) {
      let keytostring = key.toString() + ":";
      if (key == "!ref") {
        newws["!ref"] = ws["!ref"];
      } else {
        keytostring.includes("1:")
          ? (newws[key] = { ...ws[key], s: { font: { bold: true } } })
          : (newws[key] = ws[key]);
      }
    }
    console.log(newws);
    wb.Sheets[delmes[0].periodo] = newws;
    let wbOut = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

    function s2ab(s) {
      let buf = new ArrayBuffer(s.length);
      let view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) {
        view[i] = s.charCodeAt(i) & 0xff;
      }
      return buf;
    }

    FileSaver.saveAs(
      new Blob([s2ab(wbOut)], { type: "application/octet-stream" }),
      delmes[0].periodo + " " + delmes[0].sso + ".xlsx"
    );
  }

  function exportar1() {
    console.log("Exportar OK");
    console.log(delmes);
    let wb = XLSX.utils.book_new();
    wb.Props = {
      Title: "Overtime",
      Subject: "Test file",
      Author: "RDRP",
      CreatedDate: new Date()
    };
    wb.SheetNames.push(delmes[0].periodo);
    // TODO Ordenar JSON
    let newArray = [];
    for (let i = 0; i < delmes.length; i++) {
      newArray.push({
        SSO: delmes[i].sso,
        Nombre: delmes[i].inge,
        Fecha:
          delmes[i].dia + ", " + moment(delmes[i].fecha).format("DD MMM YYYY"),
        Dia: delmes[i].dia,
        "Horas extras": delmes[i].horasextras,
        Dobles: delmes[i].dobles,
        Triples: delmes[i].triples,
        "Día de descanso / festivo":
          delmes[i].dia == "Sábado" ? "día de descanso" : "NA",
        "Legal Entity": "GE International Servicios Administrativos SA de CV",
        Horario: delmes[i].horario,
        Cliente: delmes[i].cliente,
        Actividad: delmes[i].actividad + " - " + delmes[i].descripcion,
        Orden: delmes[i].wo,
        Case: delmes[i].caso
      });
    }
    let ws = XLSX.utils.json_to_sheet(newArray);
    wb.Sheets[delmes[0].periodo] = ws;
    let wbOut = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

    function s2ab(s) {
      let buf = new ArrayBuffer(s.length);
      let view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) {
        view[i] = s.charCodeAt(i) & 0xff;
      }
      return buf;
    }

    FileSaver.saveAs(
      new Blob([s2ab(wbOut)], { type: "application/octet-stream" }),
      delmes[0].periodo + " " + delmes[0].sso + ".xlsx"
    );
  }

  return (
    <div className="periodoHis">
      <div className="exportar">
        <Button onClick={exportar} color="secondary">
          <i className="material-icons">cloud_download</i>
        </Button>
      </div>
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
                  {serv.actividad} - {serv.descripcion}
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

      <SwipeableDrawer
        anchor="top"
        open={drawerState}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <EditServicio
          title={"Editar"}
          serv={servtoedit}
          onClose={toggleDrawer(false)}
        />
      </SwipeableDrawer>
    </div>
  );
}

export default Periodo;
