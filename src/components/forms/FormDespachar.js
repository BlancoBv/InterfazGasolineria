import { useState } from "react";
import InputFecha from "./InputFecha";
import InputSelectEmpleados from "./InputSelectEmpleado";
import Loader from "../assets/Loader";
import useGetData from "../../hooks/useGetData";
import Axios from "../../Caxios/Axios";
import ModalSuccess from "../assets/ModalSuccess";
import ModalError from "../assets/ModalError";
import HeaderForm from "../../GUI/HeaderForm";
function FormDespachar() {
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState({ status: false });
  const [body, setBody] = useState({ pasos: [] });
  const [formPending, setFormPending] = useState(false);

  const despachador = useGetData("/empleado?departamento=1");
  const pasosEv = useGetData("/pasos-despachar/get-pasos");

  const handle = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const handlePasos = (e) => {
    let idPaso = Number(e.target.name);
    let ev = Number(e.target.value);
    let pasosF = body.pasos.filter((el) => el.idPaso !== idPaso);
    setBody({ ...body, pasos: [...pasosF, { idPaso, evaluacion: ev }] });
  };

  const enviar = async (e) => {
    e.preventDefault();
    setFormPending(true);
    try {
      let res = await Axios.post(`pasos-despachar`, body);
      console.log(res);
      setModalSuccess(true);
      setFormPending(false);
      e.target.reset();
    } catch (err) {
      console.log(err);
      if (err.hasOwnProperty("response")) {
        setModalError({
          status: true,
          msg: err.response.data.msg,
        });
      } else {
        setModalError({ status: true, msg: err.code });
      }
      setFormPending(false);
    }
  };

  const closeModal = () => {
    setModalSuccess(false);
    setModalError({ status: false });
  };

  return (
    <div>
      <ModalSuccess show={modalSuccess} close={closeModal} />
      <ModalError
        show={modalError.status}
        close={closeModal}
        text={modalError.msg}
      />
      <form onSubmit={enviar} className="row m-auto w-75 shadow p-2 nt-3">
        <HeaderForm />
        <div className="col-md-6">
          <label className="form-label">Fecha</label>
          <InputFecha handle={handle} data={body} setData={setBody} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Selecciona el empleado</label>
          {!despachador.error && !despachador.isPending && (
            <InputSelectEmpleados
              name="empleado"
              empleados={despachador.data.response}
              handle={handle}
            />
          )}
          {despachador.isPending && (
            <label className="form-label text-danger">
              Cargado despachadores ...{" "}
            </label>
          )}
        </div>
        {!pasosEv.error && !pasosEv.isPending && (
          <div className="w-100 row mt-2">
            <label className="form-label">Evaluaciones</label>
            {pasosEv.data.response.map((el) => (
              <div key={el.idpaso_despachar} className="col-md-4 my-2">
                <div className="d-flex flex-column justify-content-start h-100 mb-2 shadow-sm rounded p-2">
                  <select
                    name={el.idpaso_despachar}
                    className="form-select"
                    onChange={handlePasos}
                    required
                  >
                    <option value="">-- Selecciona una opcion -- </option>
                    <option value="1">Cumple</option>
                    <option value="0">No cumple</option>
                  </select>
                  <label className="form-label text-center">{el.paso}</label>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-2">
          <button type="submit" className="btn btn-primary d-block m-auto">
            {formPending ? <Loader size="1.5" /> : "Evaluar pasos"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormDespachar;