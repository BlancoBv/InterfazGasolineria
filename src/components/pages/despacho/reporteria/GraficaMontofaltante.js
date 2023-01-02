import { useState } from "react";
import Bar from "../../../charts/Bar";
import Tabla from "../../../TablaMonto";
import { Link } from "react-router-dom";
import InputChangeMes from "../../../forms/InputChangeMes";
import InputChangeYear from "../../../forms/InputChangeYear";
import useGetData from "../../../../hooks/useGetData";
import ErrorHttp from "../../../assets/ErrorHttp";
import PdfGraficas from "../../../pdf_generador/PdfGraficas";

function GraficaMontofaltante() {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);

  const url = `monto-faltante-despachador/semanas/${year}/${month}`;
  const montoF = useGetData(url);
  let dataBar = {};

  const changeMes = (e) => {
    setMonth(e.target.value);
  };
  const changeYear = (e) => {
    setYear(e.target.value);
  };

  if (!montoF.error && !montoF.isPending) {
    dataBar = {
      labels: montoF.data.response.map((el) => el.nombre_completo.split(" ")),
      dataset: montoF.data.response[0].semanas.map((el, i) => ({
        data: montoF.data.response.map((eld) => eld.semanas[i].cantidad),
        label: `Semana ${i + 1}`,
      })),
    };
  }

  return (
    <div className="Main">
      <Link className="link-primary" to="/despacho">
        Volver al despacho
      </Link>
      <h3 className="border-bottom">Monto faltante por despachadores</h3>
      <div className="container">
        <form>
          <div className="row">
            <div className="mb-3 col 6">
              <label>Año</label>
              <InputChangeYear defaultYear={year} handle={changeYear} />
            </div>
            <div className="mb-3 col-6">
              <label>Mes</label>
              <InputChangeMes defaultMes={month} handle={changeMes} />
            </div>
          </div>
        </form>
        {!montoF.error && !montoF.isPending && (
          <>
            <div id="render">
              <div>
                <Tabla datos={montoF.data} />
              </div>
              <div>
                <Bar
                  datos={dataBar}
                  text="GRÁFICA SEMANAL DE MONTO FALTANTE DESPACHADOR"
                />
              </div>
            </div>

            <div>
              <PdfGraficas mes={month} year={year} />
            </div>
          </>
        )}
        {montoF.error && !montoF.isPending && (
          <ErrorHttp code={montoF.dataError.code} msg={montoF.dataError.msg} />
        )}
      </div>
    </div>
  );
}

export default GraficaMontofaltante;
