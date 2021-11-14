import { React, useState, useEffect } from "react";

import jsPDF from "jspdf";
import { Vivaldi } from "./Fuente.js";
import { getCertificado } from "../../actions/certificadoAction";
import fondo from "./images/asistente.png";
import { Card, CardBody, CardText, CardTitle, Button } from "reactstrap";
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText,
} from "reactstrap";

import "./estilos.css";
import { type } from "jquery";

const Certificates = () => {
  const [email, setEmail] = useState("");
  const [typecerti, setTypecerti] = useState("Asistente");
  const [aceptado, setAceptado] = useState(false);

  const getDatos = async (correo, certificado) => {
    let data = await getCertificado(correo, certificado);
    return data;
  };
  const limpiarEmail = (email) => {
    console.log("limpiarEmail", email);
    let str = email.split("@");
    return str[0];
  };
  const capitalize = (str) => {
    str = str.toLowerCase();
    const arr = str.split(" ");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }

    //Join all the elements of the array back into a string
    //using a blankspace as a separator
    return arr.join(" ");
  };
  const generarPDF = (e) => {
    e.preventDefault(); //para desaparecer el texto del input
    let limpia = limpiarEmail(email);
    console.log("limpia", limpia);
    let tmp = "asistentes";
    if (typecerti == "Organizador") {
      tmp = "organizadores";
    }
    let respuesta = getDatos(limpia, tmp);
    console.log("ingresandoooo1");
    respuesta.then((res) => {
      console.log("ingresandoooo2");
      if (res.length === 0) {
        console.log("no existe elementos");
        setAceptado(true);
      } else {
        console.log("ingresandoooo3");
        console.log("respuestaaa:  ", res);
        let datos = res.datos;
        var doc = new jsPDF("l", "pt", [1754.0, 1241.0]);

        var img_fondo = new Image();
        img_fondo.src = fondo;
        doc.addImage(img_fondo, "png", 0, 0, 1754, 1241);

        doc.addFileToVFS("VIVALDII.TTF", Vivaldi);
        doc.addFont("VIVALDII.TTF", "custom", "normal");
        doc.setFontSize(90);
        doc.setFont("custom");
        let nombres = capitalize(datos);
        // let nombres = capitalize("SILVIA PATRICIA ALESSANDRA GARCÍA ORDINOLA");
        console.log("nombres", nombres);
        doc.text(1754 / 2 - (33 * nombres.length) / 2, 660, nombres);
        // doc.text(440, 660, datos);
        doc.save("Certificate.pdf");
        setAceptado(false);
      }
    });
  };

  useEffect(() => {
    console.log("typecerti", typecerti);
  }, [typecerti]);
  return (
    <>
      <div className="formulario">
        <Card>
          <CardTitle
            style={{
              "text-align": "center",
              "font-size": "2rem",
              "font-weight": "800",
            }}
          >
            Certificados
          </CardTitle>
          <CardBody>
            {/* <form onSubmit={generarPDF}>
            <input
              required
              name="email"
              type="email"
              placeholder="Ingrese su email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <button type="submit">Generar</button>
          </form> */}
            <Form onSubmit={generarPDF}>
              <FormGroup>
                <FormGroup>
                  <Label for="exampleSelect">Tipo de certificado</Label>
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    onChange={(e) => setTypecerti(e.target.value)}
                    value={typecerti}
                  >
                    <option>Asistente</option>
                    <option>Organizador</option>
                  </Input>
                </FormGroup>

                <Label>Email de registro</Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="something@cs.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  invalid={aceptado}
                />
                <FormFeedback invalid={aceptado}>
                  Lo sentimos, no se encontró su certificado.
                </FormFeedback>
                <FormText>Ingrese su email con el que se registro.</FormText>
              </FormGroup>
              <FormGroup style={{ textAlign: "center" }}>
                <br />
                <Button type="submit" className="boton">
                  Descargar
                </Button>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </div>
      {/* <div id="image" className="hero-block-mask">
        <div className="container">
          <form onSubmit={generarPDF}>
            <input
              required
              name="email"
              type="email"
              placeholder="Ingrese su email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <button type="submit">Generar</button>
          </form>
        </div>
      </div> */}
    </>
  );
};

export default Certificates;

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
