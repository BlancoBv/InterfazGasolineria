import HeaderComponents from "../../../GUI/HeaderComponents";
import { Fragment, useState } from "react";
import InputChangeMes from "../../forms/InputChangeMes";
import InputChangeYear from "../../forms/InputChangeYear";
import useGetData from "../../../hooks/useGetData";

function PorEmpleadoTipo() {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);

  const { data, error, isPending } = useGetData(
    `/salida-no-conforme/${year}/${month}/incumplimientoxiddepartamento/1`
  );

  const handleMonth = (e) => {
    setMonth(e.target.value);
  };

  const handleYear = (e) => {
    setYear(e.target.value);
  };

  return (
    <div className="Main">
      <HeaderComponents
        title="Salida no conforme por empleado y tipo"
        textUrlback="Volver a reportes de SNC"
        urlBack="../files"
      />
      <div className="row w-75 mx-auto mt-4">
        <div className="col-md-6">
          <InputChangeMes defaultMes={month} handle={handleMonth} />
        </div>
        <div className="col-md-6">
          <InputChangeYear defaultYear={year} handle={handleYear} />
        </div>
      </div>
      {!error && !isPending && <Success datos={data.response} />}
    </div>
  );
}
const Success = ({ datos }) => {
  const [limiteIncumplimiento, setLimiteIncumplimiento] = useState(
    datos[0].incumplimientos.length
  );

  const sumaSNCTipo = () => {
    const agrupar = datos.map((el) =>
      el.incumplimientos.map((el) => {
        return {
          incumplimiento: el.incumplimiento,
          total: el.total,
        };
      })
    );

    const suma = agrupar.map((el) => {
      return el.map((el) => el.total).reduce((a, b) => a + b, 0);
    });

    return suma;
  };

  const totalSNC = datos.map((el) => el.totalSNC).reduce((a, b) => a + b, 0);

  return (
    <div className="container-fluid">
      <div className="mt-3 overflow-auto">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Despachador</th>
              {datos[0].incumplimientos.map((e) => {
                return (
                  <Fragment>
                    <th>{e.incumplimiento}</th>
                  </Fragment>
                );
              })}
              <th>Total despachador</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((el) => {
              return (
                <tr>
                  <td>{el.empleado}</td>
                  {el.incumplimientos.map((el) => {
                    return (
                      <Fragment>
                        <td>{el.total}</td>
                      </Fragment>
                    );
                  })}
                  <td>{el.totalSNC}</td>
                </tr>
              );
            })}
            <tr>
              <td>Total por incorfomidad</td>
              {sumaSNCTipo().map((el) => {
                return <td>{el}</td>;
              })}
              <td>{totalSNC}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PorEmpleadoTipo;
