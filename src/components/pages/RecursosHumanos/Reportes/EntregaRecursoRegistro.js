import React from "react";
import useGetData from "../../../../hooks/useGetData";
import HeaderComponents from "../../../../GUI/HeaderComponents";
import format from "../../../assets/format";
import Loader from "../../../assets/Loader";
import ErrorHttp from "../../../assets/ErrorHttp";

const EntregaRecursoRegistro = () => {
  const recursos = useGetData(`/entrega-recursos`);
  return (
    <div className="Main">
      <HeaderComponents
        urlBack="../"
        textUrlback="Regresar a capturas de recursos"
        title="Registros de entrega de recursos"
      />
      {recursos.error && !recursos.isPending && (
        <div className="mt-5">
          <ErrorHttp
            msg={recursos.dataError.response.msg}
            code={recursos.dataError.response.code}
          />
        </div>
      )}
      {!recursos.error && !recursos.isPending && (
        <Success data={recursos.data.response} />
      )}
      {recursos.isPending && <Loader />}
    </div>
  );
};

const Success = ({ data }) => {
  return (
    <div className="mt-4">
      <table className="mx-auto">
        <thead>
          <tr>
            <th className="border px-2">Empleado</th>
            <th className="border px-2">Tipo de entrada</th>
            <th className="border px-2">Fecha</th>
            <th className="border px-2">Recurso</th>
            <th className="border px-2">Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {data.map((el) => (
            <tr key={el.idrecurso_entrega}>
              <td className="border px-2 fw-semibold">
                {el.nombre} {el.apellido_paterno} {el.apellido_materno}
              </td>
              <td className="border px-2 fw-semibold"></td>
              <td className="border px-2 fw-semibold">
                {format.formatFechaComplete(el.fecha)}
              </td>
              <td className="border px-2 fw-semibold">{el.recurso}</td>
              <td className="border px-2 fw-semibold text-center">
                {el.cantidad}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default EntregaRecursoRegistro;
