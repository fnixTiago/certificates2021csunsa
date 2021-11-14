import { database, auth } from "../db/firebase";
import _ from "lodash";

export const getCertificado = (email,certificado) => {
  let newPromise = new Promise((resolve, reject) => {
    return database
      .ref(certificado)
      .child(email)
      .on("value", (dataPromesa) => {
        var dato = dataPromesa.val();
        if (dato != undefined) {
          resolve(dato);
        } else {
          var vacio = [];
          resolve(vacio);
        }
      });
  });
  return newPromise;
};
