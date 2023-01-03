import { useState } from "react";
import { Link } from "react-router-dom";
import FormSolEmpleo from "../../forms/FormSolEmpleo";

function SolicitudesEmpleo() {
  const [datos, setDatos] = useState([]);

  const handle = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const enviar = (e) => {
    e.preventDefault();
    console.log(datos);
  };
  return (
    <div className="Main">
      <div>
        <Link className="link-primary" to="/recursos-humanos">
          Volver a recursos humanos
        </Link>
        <h4 className="border-bottom">Control de solicitudes de empleo</h4>
      </div>
      <div>
        <FormSolEmpleo
          handle={handle}
          enviar={enviar}
          data={datos}
          setData={setDatos}
        />
      </div>
    </div>
  );
}

export default SolicitudesEmpleo;