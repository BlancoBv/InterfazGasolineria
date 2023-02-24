import { useContext, useState } from "react";
import Axios from "../../Caxios/Axios";
import useGetData from "../../hooks/useGetData";
import Loader from "../assets/Loader";
import ModalCustomer from "../modals/ModalCustomer";
import ModalError from "../modals/ModalError";
import ModalSuccess from "../modals/ModalSuccess";
import { Usuario } from "../Provider/PermisoUsuario";
function FormConfiguracionPemisos() {
  const [user] = useContext(Usuario);
  const [addPer, setAddPer] = useState([]);
  const [delPer, setDelPer] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalError, setModalError] = useState({ status: false, msg: "" });
  const [modalSuccess, setModalSuccess] = useState(false);
  const [msgSuccess, setMsgSuccess] = useState(null);
  const [msgError, setMsgError] = useState(null);
  const [id, setId] = useState(user ? user.idchecador : null);

  const { data, error, isPending } = useGetData(`/auth/permisos/${id}`, id);
  const usuarios = useGetData(`/auth/usuarios/${id}`, id);

  console.log(data);

  const close = () => setModal(false);

  const agruparPermisos = {};

  if (!error && !isPending) {
    data.response.forEach((el) => {
      if (agruparPermisos.hasOwnProperty(el.area)) {
        if (agruparPermisos[el.area].hasOwnProperty(el.peticion)) {
          agruparPermisos[el.area][el.peticion].push(el);
        } else {
          agruparPermisos[el.area][el.peticion] = [el];
        }
      } else {
        agruparPermisos[el.area] = {
          [el.peticion]: [el],
        };
      }
    });
  }
  const guardar = async () => {
    const establecidos = data.response.filter((el) => el.user);
    const quitar = [],
      establecer = [];
    establecidos.forEach((el) => {
      let quit = delPer.some((es) => es === el.idpermiso);
      if (quit) quitar.push(el.idpermiso);
    });
    addPer.forEach((el) => {
      let add = establecidos.find((es) => es.idpermiso === el);
      if (!add) establecer.push(el);
    });
    try {
      console.log(quitar, establecer);
      if (establecer.length > 0) {
        await Axios.post(`auth/registrar/permiso`, {
          user: usuarios.data.response.username,
          permiso: establecer,
        });
      }
      if (quitar.length > 0) {
        await Axios.put(`auth/quitar/permiso`, {
          user: usuarios.data.response.username,
          permiso: quitar,
        });
      }
      setMsgSuccess("Permisos guardados");
      setAddPer([]);
      setDelPer([]);
      setTimeout(() => {
        setMsgSuccess(null);
      }, 500);
    } catch (err) {
      setMsgError("Error, intente de nuevo o refresca la página");
    }
  };

  const handleCheck = (e) => {
    if (e.target.checked) {
      let permiso = delPer.filter((el) => el !== Number(e.target.value));
      setAddPer([...addPer, Number(e.target.value)]);
      setDelPer(permiso);
    } else {
      let permiso = addPer.filter((el) => el !== Number(e.target.value));
      setDelPer([...delPer, Number(e.target.value)]);
      setAddPer(permiso);
    }
  };

  const closeModal = () => {
    setModalError({ status: false, msg: "" });
    setModalSuccess(false);
  };

  return (
    <div className="main">
      <div className="container col-8">
        <label className="form-label">Ingresar empleado</label>
        <div className="row">
          <div className="col-2">
            <div className="input-group">
              <span className="input-group-text">ID </span>
              <input
                type="number"
                className="form-control"
                placeholder="ID del empleado"
                onChange={(e) => {
                  setId(Number(e.target.value));
                }}
                defaultValue={user ? user.idchecador : null}
              />
            </div>
          </div>
          <div className="col-6">
            {!usuarios.error && !usuarios.isPending && (
              <div className="input-group mb-3">
                <span className="input-group-text">Nombre</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre del empleado"
                  aria-label="Username"
                  defaultValue={
                    usuarios.data.response ? usuarios.data.response.nombre : " "
                  }
                  disabled
                />
              </div>
            )}
          </div>
          <div className="col-4">
            {!usuarios.error && !usuarios.isPending && (
              <div className="input-group mb-3">
                <span className="input-group-text">Usuario</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre del empleado"
                  aria-label="Username"
                  defaultValue={
                    usuarios.data.response
                      ? usuarios.data.response.username
                      : " "
                  }
                  disabled
                />
              </div>
            )}
          </div>
          <div className="col-4">
            {!usuarios.error && !usuarios.isPending && (
              <div className="input-group mb-3">
                <button
                  className="btn btn-danger"
                  disabled={usuarios.data.response ? false : true}
                  onClick={() => setModal(true)}
                >
                  Restaurar Contraseña
                </button>
              </div>
            )}
          </div>
          {!usuarios.error && !usuarios.isPending && (
            <div className="col-3">
              <button
                className="btn btn-primary d-block mx-auto"
                disabled={
                  (delPer.length > 0 || addPer.length > 0) &&
                  usuarios.data.response
                    ? false
                    : true
                }
                onClick={guardar}
              >
                Guardar permisos
              </button>
              {msgSuccess && <span className="text-success">{msgSuccess}</span>}
              {msgError && <span className="text-danger">{msgError}</span>}
            </div>
          )}
        </div>
      </div>
      <div></div>
      <div className="text-center text-primary">
        Seleccione los atributos que tendrá cada empleado
      </div>
      {isPending && <Loader />}
      {!error && !isPending && (
        <div className="d-flex justify-content-around">
          {Object.keys(agruparPermisos).map((el, i) => (
            <details key={i} open>
              <summary>{el}</summary>
              {Object.keys(agruparPermisos[el]).map((pe, j) => (
                <details key={j} className="ms-4" open>
                  <summary>{pe}</summary>
                  {agruparPermisos[el][pe].map((check) => (
                    <div
                      key={check.idpermiso}
                      className="form-check form-switch ms-4"
                      title={check.descripcion}
                    >
                      <label className="form-checkbox-label">
                        {check.permiso}
                        <input
                          type="checkbox"
                          value={check.idpermiso}
                          className="form-check-input"
                          onChange={handleCheck}
                          defaultChecked={check.user ? true : false}
                        />
                      </label>
                    </div>
                  ))}
                </details>
              ))}
            </details>
          ))}
        </div>
      )}
      <ModalChangePass
        usuarios={usuarios}
        modal={modal}
        close={close}
        setModalSuccess={setModalSuccess}
        setModalError={setModalError}
      />
      <ModalError
        show={modalError.status}
        text={modalError.msg}
        close={closeModal}
      />
      <ModalSuccess show={modalSuccess} close={closeModal} />
    </div>
  );
}

const ModalChangePass = ({
  usuarios,
  modal,
  close,
  setModalError,
  setModalSuccess,
}) => {
  const [formPending, setFormPending] = useState();
  const [pass, setPass] = useState(null);
  const enviar = async (e) => {
    e.preventDefault();
    setFormPending(true);
    try {
      let res = await Axios.put("/auth/changePass", {
        ...pass,
        user: usuarios.data.response.username,
      });
      console.log(res);
      setFormPending(false);
      setModalSuccess(true);
      close();
      setPass(null);
      e.target.reset();
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
    <ModalCustomer show={modal} close={close} title="Nueva contraseña">
      <form className="container col-8" onSubmit={enviar}>
        {!usuarios.error && !usuarios.isPending && (
          <>
            <div className="input-group mb-3">
              <span className="input-group-text">User</span>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre del empleado"
                aria-label="Username"
                defaultValue={
                  usuarios.data.response ? usuarios.data.response.username : " "
                }
                disabled
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Nueva contraseña</label>
              <input
                type="text"
                name="newPassword"
                className="form-control"
                onChange={(e) =>
                  setPass({ ...pass, newPassword: e.target.value })
                }
                placeholder="Nueva contraseña"
                autoComplete="off"
              />
            </div>
            <div>
              <button
                className="btn btn-danger mx-auto d-block"
                disabled={formPending}
              >
                {formPending ? <Loader size="1.5" /> : "Establecer"}
              </button>
            </div>
          </>
        )}
      </form>
    </ModalCustomer>
  );
};
export default FormConfiguracionPemisos;
