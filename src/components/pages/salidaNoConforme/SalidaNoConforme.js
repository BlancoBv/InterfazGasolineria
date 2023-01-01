import React, { useState } from "react";
import { Link } from "react-router-dom";
import useGetData from "../../../hooks/useGetData";
import InputSelectEmpleado from "../../forms/InputSelectEmpleado";
import ModalAddIncumplimiento from "../../assets/ModalAddIncumplimiento";
import Axios from "../../../Caxios/Axios";
import InputFecha from "../../forms/InputFecha";
import PDFSalidaNoConforme from "../despacho/PDFSalidaNoConforme";
import format from "../../assets/format";

const SalidaNoConforme = () => {
  const empleadoS = useGetData("/empleado?departamento");
  const empleadoA = useGetData("/empleado?departamento=2");
  const incumplimiento = useGetData("/incumplimiento/1");
  const [idsalida, setIdsalida] = useState(null);

  const [show, setShow] = useState(false);

  const [datos, setDatos] = useState([]);
  const enviar = (e) => {
    e.preventDefault();
    console.log(datos);
    enviarDatos(datos);
  };

  const enviarDatos = async (x) => {
    const req = await Axios.post("/salida-no-conforme", x);
    setIdsalida(req.data.response);
  };
  const consultarPdf = useGetData(
    `/salida-no-conforme/${!idsalida ? false : idsalida.insertId}`
  );
  const ola = !consultarPdf.data ? false : consultarPdf.data;
  console.log(
    !ola.response ? false : ola.response.map((e) => e.fecha),
    "fecha"
  );
  /* const url = `/salida-no-conforme/${!idsalida ? false : idsalida.idInsert}`;
  console.log(url); */

  const handle = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };
  const changeSelectIncumplimiento = (e) => {
    if (e.target.value === "add") {
      setShow(true);
    }
  };

  const cerrarModal = () => {
    setShow(false);
  };
  console.log(idsalida, "response post");
  console.log(!consultarPdf.data ? false : consultarPdf.data.response);

  return (
    <div>
      <ModalAddIncumplimiento show={show} close={cerrarModal} />
      <div>
        <Link className="link-primary" to="/despacho">
          Volver al despacho
        </Link>
        <h4 className="border-bottom">Captura de salidas no conformes</h4>
      </div>
      <div style={{ display: "flex", flexdirection: "column" }}>
        <div>
          <form style={{ width: "300px" }} onSubmit={enviar}>
            <div className="mb">
              <label className="form-label">Fecha</label>
              <InputFecha
                handle={handle}
                data={datos}
                setData={setDatos}
                name="fecha"
              />
            </div>
            <div className="mb">
              <label className="form-label">Descripcion de la falla</label>
              <textarea
                name="descripcionFalla"
                className="form-control"
                placeholder="Motivo de la inconformidad"
                onChange={handle}
              ></textarea>
            </div>
            <div className="mb">
              <label className="form-label">Acciones a corregir</label>
              <textarea
                name="accionesCorregir"
                className="form-control"
                placeholder="..."
                onChange={handle}
              ></textarea>
            </div>
            <div className="mb">
              <label>Concesiones</label>
              <textarea
                name="concesiones"
                className="form-control"
                placeholder="..."
                onChange={handle}
              ></textarea>
            </div>
            {!empleadoS.error && !empleadoS.isPending && (
              <div className="m-b">
                <label className="label-form">
                  Seleccionar empleado que incumple
                </label>
                <InputSelectEmpleado
                  empleados={empleadoS.data.response}
                  name="idEmpleadoIncumple"
                  handle={handle}
                />
              </div>
            )}
            {!empleadoA.error && !empleadoA.isPending && (
              <div className="m-b">
                <label className="label-form">
                  Seleccionar empleado que autoriza
                </label>
                <InputSelectEmpleado
                  empleados={empleadoA.data.response}
                  name="idEmpleadoAutoriza"
                  handle={handle}
                />
              </div>
            )}
            {!incumplimiento.error && !incumplimiento.isPending && (
              <div className="m-b">
                <label className="label-form">Seleccionar incumplimiento</label>
                <select
                  name="idIncumplimiento"
                  className="form-select form-select"
                  onChange={(changeSelectIncumplimiento, handle)}
                >
                  <option value="0">-- Seleccionar incumplimiento --</option>
                  {incumplimiento.data.response.map((el) => (
                    <option
                      key={el.idincumplimiento}
                      value={el.idincumplimiento}
                    >
                      {el.incumplimiento}
                    </option>
                  ))}
                  <option value="add" className="bg-success">
                    Añadir otro
                  </option>
                </select>
              </div>
            )}
            <div className="mt-2 mb-5 w-100">
              <button type="submit" className="btn btn-primary d-block m-auto">
                Crear salida no corforme
              </button>
            </div>
          </form>

          {!consultarPdf.data ? (
            false
          ) : (
            <PDFSalidaNoConforme
              title="salida no conforme"
              fecha={
                !ola.response
                  ? false
                  : ola.response.map((e) => format.formatFechaComplete(e.fecha))
              }
              inconformidad={
                !ola.response
                  ? false
                  : ola.response.map((e) => e.descripcion_falla)
              }
              corregir={
                !ola.response
                  ? false
                  : ola.response.map((e) => e.acciones_corregir)
              }
              incumple={
                !ola.response ? false : ola.response.map((e) => e.concesiones)
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SalidaNoConforme;