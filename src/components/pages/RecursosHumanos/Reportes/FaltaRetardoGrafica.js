import { useEffect, useState } from "react";
import HeaderComponents from "../../../../GUI/HeaderComponents";
import useGetData from "../../../../hooks/useGetData";
import InputSelectDep from "../../../forms/InputSelectDep";
import InputSelectEmpleado from "../../../forms/InputSelectEmpleado";
import InputChangeMes from "../../../forms/InputChangeMes";
import InputChangeYear from "../../../forms/InputChangeYear";
import format from "../../../assets/format";
import Axios from "../../../../Caxios/Axios";
import Bar from "../../../charts/Bar";
import ErrorHttp from "../../../assets/ErrorHttp";

const FaltaRetardoGrafica = () => {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [emp, setEmp] = useState(null);
  const [idDep, setIdDep] = useState(null);
  const [data, setData] = useState({ success: false });

  const empleados = useGetData(`/empleado?departamento=${idDep}`);
  const changeEmp = (e) => setIdDep(Number(e.target.value));
  const changeYear = (e) => setYear(e.target.value);
  const changeMonth = (e) => setMonth(e.target.value);
  const changeIdEmp = (e) => setEmp(Number(e.target.value));
  const getSemanas = () => {
    const fecha = new Date(year, month - 1, 1);
    const dia = fecha.getDay();
    const dias = new Date(year, month, 0).getDate();
    const saturday = new Date(new Date(fecha).setDate(7 - dia));
    const friday = new Date(
      new Date(fecha).setDate(new Date(saturday).getDate() + 6)
    );
    const fechas = [];

    if (saturday.getDate() > 4) {
      fechas.push({
        semana: 1,
        saturday: format.formatFechaDB(
          new Date(saturday).setDate(saturday.getDate() - 7)
        ),
        friday: format.formatFechaDB(
          new Date(friday).setDate(friday.getDate() - 7)
        ),
      });
    }

    for (let i = 0; i < dias - 6; i = i + 7) {
      let nSaturday = format.formatFechaDB(
        new Date(new Date(saturday).setDate(saturday.getDate() + i))
      );
      let nFriday = format.formatFechaDB(
        new Date(friday).setDate(friday.getDate() + i)
      );
      fechas.push({
        semana: fechas.length + 1,
        saturday: nSaturday,
        friday: nFriday,
      });
    }
    return fechas;
  };

  const fechas = getSemanas();
  const start = fechas[0].saturday;
  const end = fechas[fechas.length - 1].friday;

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await Axios.post(`entrada/buscar-capturas/${emp}`, {
          dateStart: start,
          dateEnd: end,
        });

        setData(response.data);
      } catch (err) {
        setData(err.response.data);
      }
    };
    getData();
  }, [emp, start, end]);

  return (
    <div>
      <HeaderComponents
        urlBack="../"
        textUrlback="Regresar"
        title="Faltas y retardos por empleado"
      />

      <nav className="m-auto w-75 row">
        <div className="col-3">
          <label className="form-label">Departamento</label>
          <InputSelectDep handle={changeEmp} />
        </div>
        <div className="col-5">
          <label className="form-label">Selecciona el empleado</label>
          {!empleados.error && !empleados.isPending && (
            <InputSelectEmpleado
              defaultValue={emp}
              empleados={empleados.data.response}
              handle={changeIdEmp}
            />
          )}
          {!empleados.isPending && empleados.error && (
            <div className="border p-1 form-select text-center py-2">
              Selecciona un departamento
            </div>
          )}
        </div>
        <div className="col-2">
          <label className="form-label">Mes</label>
          <InputChangeMes handle={changeMonth} defaultMes={month} />
        </div>
        <div className="col-2">
          <label className="form-label">Año</label>
          <InputChangeYear handle={changeYear} defaultYear={year} />
        </div>
      </nav>
      <div className="m-3">
        {data.success && <Success weeks={fechas} data={data} />}
        {!data.success && (
          <div className="mt-5">
            <ErrorHttp msg="No hay nada por aqui" />{" "}
          </div>
        )}
      </div>
    </div>
  );
};

const Success = ({ weeks, data }) => {
  const [render, setRender] = useState(data.response);
  const [dataBar, setDataBar] = useState(null);
  const createDataBar = (datos) => {
    let totalXtipo = [];
    let finconforme = datos.filter((el) => el.inconforme);
    finconforme.forEach((el) => {
      let group = totalXtipo.some((j) => j.idtipo_falta === el.idtipo_falta);
      if (group) {
        let index = totalXtipo.findIndex(
          (j) => j.idtipo_falta === el.idtipo_falta
        );
        totalXtipo[index].count = totalXtipo[index].count + 1;
      } else {
        totalXtipo.push({
          idtipo_falta: el.idtipo_falta,
          count: 1,
          tipo: el.tipo,
        });
      }
    });
    if (totalXtipo.length > 0) {
      let dataBarV = {
        labels: totalXtipo.map((el) => el.tipo),
        dataset: [
          {
            backgroundColor: "#d7a10e",
            label: "Inconformidades",
            data: totalXtipo.map((el) => el.count),
          },
        ],
      };
      setDataBar(dataBarV);
    } else {
      setDataBar(null);
    }
  };

  useEffect(() => {
    createDataBar(render);
    setRender(data.response);
  }, [render, data]);

  const chooseWeek = (e) => {
    if (e.target.value === "") return setRender(data.response);
    let dataFil = data.response.filter((el) => {
      let principio = new Date(weeks[e.target.value].saturday).getTime();
      let fin = new Date(weeks[e.target.value].friday).getTime();
      let tiempo = new Date(el.fecha).getTime();

      return tiempo > principio && tiempo < fin;
    });
    setRender(dataFil);
  };

  return (
    <div className="d-flex">
      <div>
        <div className="row mb-3">
          <div className="col-8">
            <label className="form-label fw-semibold mb-1">Semanas</label>
            <select className="form-select" onChange={chooseWeek}>
              <option value="">Todas las semanas del mes</option>
              {weeks.map((w, i) => (
                <option value={i} key={i}>
                  Del {format.formatFecha(w.saturday)} al{" "}
                  {format.formatFecha(w.friday)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <nav>
          {render.length > 0 ? (
            render.map((el) => (
              <div
                key={el.idcaptura_entrada}
                className="mb-3"
                style={{ width: "max-content" }}
              >
                <p className="fw-bold mb-1">
                  Fecha:{" "}
                  <span className="fw-semibold">
                    {format.formatFechaComplete(el.fecha)}
                  </span>{" "}
                  Turno: <span className="fw-semibold">{el.turno}</span>
                </p>
                <table>
                  <thead>
                    <tr>
                      <th className="border px-2">Horario</th>
                      <th className="border px-2">Hora Entrada</th>
                      <th className="border px-2">Minutos de retardo</th>
                      <th className="border px-2 text-center">Falta</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center border">
                        <span className="fw-semibold">{el.hora_anticipo}</span>
                      </td>
                      <td className="text-center border">
                        <span className="fw-semibold">{el.hora_entrada}</span>
                      </td>
                      <td className="text-center border">
                        <span
                          className={`fw-semibold text-${
                            el.minutosRetardos === "00:00"
                              ? "success"
                              : "danger"
                          }`}
                        >
                          {el.minutosRetardos}
                        </span>
                      </td>
                      <td className="border px-2 text-center fw-semibold">
                        {el.tipo}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))
          ) : (
            <div>
              <p className="fw-bold text-danger">Sin datos aún</p>
            </div>
          )}
        </nav>
      </div>
      <div className="w-75">
        {dataBar && (
          <Bar
            datos={dataBar}
            text={`${data.response[0].nombre} ${data.response[0].apellido_paterno} ${data.response[0].apellido_materno}`}
            legend={false}
          />
        )}
      </div>
    </div>
  );
};

export default FaltaRetardoGrafica;