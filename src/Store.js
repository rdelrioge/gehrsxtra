import React, { useState, useEffect } from "react";
import { fb, db } from "./index";

export const UserContext = React.createContext();
export const ServiciosContext = React.createContext();

const Store = ({ children }) => {
  const [user, setUser] = useState(fb.auth().currentUser.displayName);
  const [servicios, setServicios] = useState([]);

  // READ FOR servicios IN DB
  useEffect(() => {
    db.collection("servicios")
      .where("inge", "==", fb.auth().currentUser.displayName)
      .onSnapshot(data => {
        let myServicios = [];
        data.forEach(servicio => {
          let serv = { ...servicio.data(), uid: servicio.id };
          myServicios.push(serv);
        });
        console.log(myServicios);
        setServicios(myServicios);
      });
  }, []);

  db.collection("users")
    .where("displayName", "==", user)
    .onSnapshot(users => {
      users.forEach(uss => {
        let inge = { ...uss.data(), uid: uss.id };
        console.log(inge);
        setUser(inge);
      });
    });

  return (
    <UserContext.Provider value={[user, setUser]}>
      <ServiciosContext.Provider value={[servicios, setServicios]}>
        {children}
      </ServiciosContext.Provider>
    </UserContext.Provider>
  );
};

export default Store;
