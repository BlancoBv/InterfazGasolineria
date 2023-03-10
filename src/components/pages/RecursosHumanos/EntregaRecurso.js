import { useState } from "react";
import HeaderComponents from "../../../GUI/HeaderComponents";
import FormEntregaRecurso from "../../forms/FormEntregaRecurso";
import ModalSuccess from "../../modals/ModalSuccess";
import ModalError from "../../modals/ModalError";
import Axios from "../../../Caxios/Axios";
import IconComponents from "../../assets/IconComponents";

const EntregaRecurso = () => {
  const [body, setBody] = useState({});
  const [formPending, setFormPending] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState({ status: false, msg: "" });

  const handle = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const closeModal = () => {
    setModalError({ status: false, msg: "" });
    setModalSuccess(false);
  };

  const enviar = async (e) => {
    e.preventDefault();
    console.log(body);
    setFormPending(true);
    try {
      await Axios.post(`/entrega-recursos/registro`, body);
      setModalSuccess(true);
      setFormPending(false);
    } catch (err) {
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

  return (
    <div className="Main">
      <HeaderComponents
        urlBack="../"
        textUrlback="Regresar a recursos humanos"
        title="Control de entregas de recursos"
      >
        <IconComponents
          icon="chart-bar text-warning"
          url="registros"
          text="Registros"
        />
      </HeaderComponents>
      <FormEntregaRecurso
        handle={handle}
        enviar={enviar}
        formPending={formPending}
        body={body}
        setBody={setBody}
      />
      <ModalError
        show={modalError.status}
        close={closeModal}
        text={modalError.msg}
      />
      <ModalSuccess show={modalSuccess} close={closeModal} />
    </div>
  );
};

export default EntregaRecurso;
