import { useState } from "react";
import { useParams } from "react-router-dom";
import HeaderComponents from "../../../GUI/HeaderComponents";
import useGetData from "../../../hooks/useGetData";
import format from "../../assets/format";
import Loader from "../../assets/Loader";
import ModalSuccess from "../../modals/ModalSuccess";
import ModalError from "../../modals/ModalError";
import { DeleteCB, EditCB } from "../../modals/EditCB";
import gdl from "../../assets/img/GDL.png";
import { Per } from "../../Provider/Auth";

const ChecklistBombaDetalle = () => {
  const [mEdit, setMEdit] = useState({ status: false, id: null });
  const [mDel, setMDel] = useState({ status: true, id: null });
  const [modalSucces, setModalSucces] = useState(false);
  const [modalError, setModalError] = useState({ status: false, msg: "" });
  const [actualizador, setActualizador] = useState(false);
  const { year, month, idEmpleado } = useParams();
  const { data, error, isPending } = useGetData(
    `/bomba-check/findCheck/${year}/${month}/${idEmpleado}`,
    actualizador
  );
  const close = () => {
    setModalSucces(false);
    setModalError({ status: false, msg: "" });
  };

  return (
    <div className="Main">
      <HeaderComponents
        title="Reporte Checklist de Bomba"
        urlBack="/despacho/checklist/reporte"
        textUrlback="Volver a reportes"
      ></HeaderComponents>
      {isPending && (
        <div className="mt-5">
          <Loader />
        </div>
      )}
      {!isPending && !error && (
        <Success data={data} setMDel={setMDel} setMEdit={setMEdit} />
      )}
      {!isPending && error && (
        <div>
          <div>
            <p
              style={{ fontSize: "60px" }}
              className="text-danger fw-bold text-center"
            >
              Sin resultados :(
            </p>
            <img src={gdl} alt="gdl" className="w-25 m-auto d-block" />
          </div>
        </div>
      )}
      {mEdit.id && (
        <EditCB
          stateEdit={[mEdit, setMEdit]}
          toogle={[actualizador, setActualizador]}
          setModalError={setModalError}
          setModalSuccess={setModalSucces}
        />
      )}
      {mDel.id && (
        <DeleteCB
          stateDel={[mDel, setMDel]}
          toogle={[actualizador, setActualizador]}
          setModalError={setModalError}
          setModalSuccess={setModalSucces}
        />
      )}
      <ModalSuccess
        text="Se actualizaron los datos correctamente"
        show={modalSucces}
        close={close}
      />
      <ModalError
        show={modalError.status}
        text={modalError.msg}
        close={close}
      />
    </div>
  );
};

const Success = ({ data, setMDel, setMEdit }) => {
  return (
    <div>
      <div className="m-auto" style={{ width: "min-content" }}>
        <p className="text-nowrap">
          <span className="fw-bold">Empleado: </span>
          <span className="fw-semibold">
            {format.formatTextoMayusPrimeraLetra(data.response.empleado.nombre)}{" "}
            {format.formatTextoMayusPrimeraLetra(
              data.response.empleado.apellido_paterno
            )}{" "}
            {format.formatTextoMayusPrimeraLetra(
              data.response.empleado.apellido_materno
            )}
          </span>
        </p>
      </div>

      {
        <table className="m-auto">
          <thead>
            <tr>
              <th className="border px-2 text-center">Fecha</th>
              <th className="border px-2 text-center">Estaci??n servicio</th>
              <th className="border px-2 text-center">Turno</th>
              <th className="border px-2 text-center">Bomba</th>
              <th className="border px-2 text-center">Isla limpia</th>
              <th className="border px-2 text-center">Aceites completos</th>
            </tr>
          </thead>
          {
            <tbody>
              {data.response.data.map((el) => (
                <tr key={el.idchecklist_bomba}>
                  <td className="border text-center px-2">
                    {format.formatFechaComplete(el.fecha)}
                  </td>
                  <td className="border text-center px-2">
                    {el.estacion_servicio ? (
                      <span className="text-success fw-semibold">Cumple</span>
                    ) : (
                      <span className="text-danger fw-semibold">No cumple</span>
                    )}
                  </td>
                  <td className="border text-center px-2">
                    {el.turno ? (
                      <span className="text-success fw-semibold">Cumple</span>
                    ) : (
                      <span className="text-danger fw-semibold">No cumple</span>
                    )}
                  </td>
                  <td className="border text-center px-2">
                    {el.bomba ? (
                      <span className="text-success fw-semibold">Cumple</span>
                    ) : (
                      <span className="text-danger fw-semibold">No cumple</span>
                    )}
                  </td>
                  <td className="border text-center px-2">
                    {el.isla_limpia ? (
                      <span className="text-success fw-semibold">Cumple</span>
                    ) : (
                      <span className="text-danger fw-semibold">No cumple</span>
                    )}
                  </td>
                  <td className="border text-center px-2">
                    {el.aceites_completos ? (
                      <span className="text-success fw-semibold">Cumple</span>
                    ) : (
                      <span className="text-danger fw-semibold">No cumple</span>
                    )}
                  </td>

                  {Per(7) && (
                    <td
                      className="btn"
                      onClick={() =>
                        setMDel({ status: true, id: el.idchecklist_bomba })
                      }
                    >
                      <li
                        role="button"
                        className="fa-solid fa-trash text-danger"
                        title="Eliminar"
                      ></li>
                    </td>
                  )}
                  {Per(6) && (
                    <td
                      className="btn"
                      onClick={() => {
                        setMEdit({
                          status: true,
                          id: el.idchecklist_bomba,
                        });
                      }}
                    >
                      <li
                        role="button"
                        className="fa-solid fa-pen text-warning"
                        title="Actualizar"
                      ></li>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          }
        </table>
      }
    </div>
  );
};
export default ChecklistBombaDetalle;
