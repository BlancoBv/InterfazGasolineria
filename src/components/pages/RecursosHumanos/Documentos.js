import React, { useState } from "react";
import useGetData from "../../../hooks/useGetData";
import HeaderComponents from "../../../GUI/HeaderComponents";
import format from "../../assets/format";
import AddDocs from "../../modals/AddDocs";
import Axios from "../../../Caxios/Axios";
import Loader from "../../assets/Loader";
import { Per } from "../../Provider/Auth";

function Documentos() {
  const [actualizar, setActualizar] = useState(false);
  const documentos = useGetData(`/control-documento/`, actualizar);
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);
  const [id, setId] = useState({ id: null, nombre: null });

  const handleClose = () => {
    setShow(false);
  };
  const mostrarModal = (valor, nombre) => {
    setShow(true);
    setId({ id: valor, nombre: nombre });
  };
  const mostrarAlert = () => {
    setShowAlert(true);
  };

  const mostrarAlertError = () => {
    setShowAlertError(true);
  };
  const handleSwitch = (e) => {
    if (e.target.checked) {
      entregar({ [e.target.name]: e.target.value, idempleado: e.target.id });
    } else {
      quitar({ [e.target.name]: e.target.value, idempleado: e.target.id });
    }
  };

  const entregar = async (datos) => {
    try {
      await Axios.post("/control-documento/", datos);
      setActualizar(!actualizar);
      mostrarAlert();
      setTimeout(() => {
        setShowAlert(false);
      }, 500);
    } catch {
      mostrarAlertError();
    }
  };
  const quitar = async (datos) => {
    try {
      await Axios.put("/control-documento/", datos);
      setActualizar(!actualizar);
      mostrarAlert();
      setTimeout(() => {
        setShowAlert(false);
      }, 500);
    } catch {
      mostrarAlertError();
    }
  };

  return (
    <div className="Main">
      <HeaderComponents
        title="Documentos empleados"
        urlBack="/recursos-humanos"
        textUrlback="Volver a recursos humanos"
      ></HeaderComponents>
      {!documentos.error && !documentos.isPending && (
        <Sucess
          data={documentos.data.response}
          mostrarModal={mostrarModal}
          show={show}
          handleClose={handleClose}
          id={id}
          handleSwitch={handleSwitch}
          showAlert={showAlert}
          showError={showAlertError}
          setShowAlertError={setShowAlertError}
        />
      )}
      {documentos.error && <h4>{documentos.dataError.msg}</h4>}
      {documentos.isPending && <Loader />}
    </div>
  );
}

const Sucess = ({
  data,
  mostrarModal,
  show,
  handleClose,
  id,
  handleSwitch,
  showAlert,
  showError,
  setShowAlertError,
}) => {
  const [documentos, setDocumentos] = useState(data);
  const filterEmp = (e) => {
    const exp = new RegExp(e.target.value, "gi");
    const search = documentos.filter((el) => {
      let ola = exp.test(el.nombre_completo);
      console.log(ola, "ola");
      return ola;
    });
    setDocumentos(search);
  };

  console.log(documentos);
  return (
    <div className="container mt-3 w-50">
      <AddDocs
        show={show}
        handleClose={handleClose}
        idEmpleado={id}
        handle={handleSwitch}
        showAlert={showAlert}
        showError={showError}
        setShowAlertError={setShowAlertError}
      />
      <div className="pt-0">
        <div className="row">
          <div className="offset-md-6 col-md-6">
            <input
              type="text"
              className="form-control"
              name="buscador"
              id="buscador"
              onChange={filterEmp}
              placeholder="Buscar un empleado..."
            ></input>
          </div>
        </div>
      </div>
      <table className="table table-bordered shadow ">
        <thead className="table-light">
          <tr>
            <th>Nombre del empleado</th>
            <th>Número de documentos entregados</th>
            <th>Estatus</th>
            <th>Actualizar/ver documentos</th>
          </tr>
        </thead>
        <tbody>
          {documentos.map((e, i) => {
            return (
              <tr key={i}>
                <td key={e.nombre_completo}>
                  {format.formatTextoMayusPrimeraLetra(e.nombre_completo)}
                </td>
                <td key={e.num_documentos} style={{ width: "10px" }}>
                  {e.num_documentos}
                </td>
                {e.num_documentos > 10 ? (
                  <td className="text-success">Cumple</td>
                ) : (
                  <td className="text-danger">No cumple</td>
                )}
                {Per(28) && (
                  <td style={{ width: " 5px" }} className="text-center">
                    <i
                      className="fa-solid fa-pen text-warning btn btn-outline-warning "
                      role="button"
                      onClick={() =>
                        mostrarModal(
                          e.idempleado,
                          format.formatTextoMayusPrimeraLetra(e.nombre_completo)
                        )
                      }
                    />
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Documentos;
