import React, { useState } from "react";
import HeaderComponents from "../../../../GUI/HeaderComponents";
import Bar from "../../../charts/Bar";
import Scale from "../../../charts/Scale";
import format from "../../../assets/format";
import Decimal from "decimal.js-light";
import FormBuscarDetallesTiempo from "../../../forms/FormBuscarDetallesTiempo";
import ModalError from "../../../modals/ModalError";
import Axios from "../../../../Caxios/Axios";
import IconComponents from "../../../assets/IconComponents";

const HistorialRelEfectivo = () => {
  const [body, setBody] = useState(null);
  const [data, setData] = useState(null);
  const [modalError, setModalError] = useState({ status: false, msg: "" });

  const closeModal = () => setModalError({ status: false, msg: "" });

  const buscarDatos = async () => {
    try {
      const res = await Axios.post(`/recoleccion-efectivo/buscar`, body);
      setData(res.data.response);
    } catch (err) {
      setModalError({
        status: true,
        msg: "No se encontraron resultados en este intervalo de tiempo",
      });
      console.log(err);
    }
  };

  return (
    <div className="Main">
      <HeaderComponents
        urlBack="/despacho/recoleccion-efectivo/reporte"
        textUrlback="Regresar a Recolección de efectivos mensuales"
        title="Recolección de efectivo por tiempo"
      >
        <IconComponents
          icon="sack-dollar text-info"
          url="../recoleccion-efectivo"
          text="Recolección efectivo"
        />
      </HeaderComponents>
      <div>
        {!data && (
          <FormBuscarDetallesTiempo
            bodyState={[body, setBody]}
            buscarDatos={buscarDatos}
          />
        )}
        {data && <Success data={data} setData={setData} body={body} />}
      </div>
      <ModalError
        show={modalError.status}
        text={modalError.msg}
        close={closeModal}
      />
    </div>
  );
};

const Success = ({ data, setData, body }) => {
  const [groupTiempo, setGropTiempo] = useState(1);
  const [grafica, setGrafica] = useState(1);
  const group = [];
  let dataGrafica;
  //Programacion orientada al input *mostrar por*
  data.forEach((re) => {
    if (groupTiempo === 2) {
      let month = format.formatMes(re.fecha).slice(0, 3);
      let year = format
        .formatFechaLocale(re.fecha)
        .getFullYear()
        .toString()
        .slice(2, 4);
      let ffecha = `${month} ${year}`;
      let index = group.findIndex((f) => f.fecha === ffecha);
      if (index !== -1) {
        group[index].cantidad = new Decimal(group[index].cantidad)
          .plus(re.cantidad)
          .toNumber();
      } else {
        group.push({ ...re, fecha: ffecha });
      }
    } else if (groupTiempo === 3) {
      let year = format.formatFechaLocale(re.fecha).getFullYear().toString();
      let index = group.findIndex((f) => f.fecha === year);
      if (index !== -1) {
        group[index].cantidad = new Decimal(group[index].cantidad)
          .plus(re.cantidad)
          .toNumber();
      } else {
        group.push({ ...re, fecha: year });
      }
    } else {
      let fecha = format.formatFechaLocale(re.fecha);
      let ffecha = `${fecha.getDate()} ${format
        .formatMes(re.fecha)
        .slice(0, 3)} ${fecha.getFullYear().toString().slice(2, 4)}`;
      group.push({ ...re, fecha: ffecha });
    }
  });
  //Programacion orientada al input *Grafica*
  if (grafica === 2) {
    dataGrafica = {
      labels: group.map((re) => re.fecha.split(" ")),
      datasets: [
        {
          borderColor: "blue",
          backgroundColor: "blue",
          data: group.map((re) => re.cantidad),
        },
      ],
    };
  } else {
    dataGrafica = {
      labels: group.map((re) => re.fecha.split(" ")),
      dataset: [
        {
          data: group.map((re) => re.cantidad),
        },
      ],
    };
  }
  const optionsCustom = {
    scales: {
      y: {
        ticks: {
          stepSize: 0.5,
          callback: (value) => `$${value}`,
        },
      },
    },
  };
  return (
    <div>
      <div className="mt-2">
        <button className="btn btn-success" onClick={() => setData(null)}>
          Buscar otro despachador
        </button>
      </div>
      <div className="fw-bold">
        <p className="mb-0">
          Nombre Completo:{" "}
          <span className="fw-semibold">
            {data.filter((el) => el.nombre)[0].nombre_completo}
          </span>
        </p>
        <p className="mb-0">
          Cantidad acumulada:{" "}
          <span className="fw-semibold">
            ${data.map((el) => el.cantidad).reduce((a, b) => a + b, 0)}
          </span>
        </p>
        <p className="mb-0">
          Fecha Inicio:{" "}
          <span className="fw-semibold">
            {format.formatFechaComplete(body.fechaInicio)}
          </span>
        </p>
        <p className="mb-0">
          Fecha Final:{" "}
          <span className="fw-semibold">
            {format.formatFechaComplete(body.fechaFinal)}
          </span>
        </p>
      </div>
      <div className="d-flex justify-content-around w-50 mx-auto">
        <div className="col-5">
          <label className="form-label me-3">Mostrar por:</label>
          <select
            className="form-select-sm"
            defaultValue={groupTiempo}
            onChange={(e) => setGropTiempo(Number(e.target.value))}
          >
            <option value="1">Dia</option>
            <option value="2">Mes</option>
            <option value="3">Año</option>
          </select>
        </div>
        <div className="col-5">
          <label className="form-label me-3">Gráfica</label>
          <select
            className="form-select-sm"
            defaultValue={grafica}
            onChange={(e) => setGrafica(Number(e.target.value))}
          >
            <option value="1">De barra</option>
            <option value="2">De Linea</option>
          </select>
        </div>
      </div>
      <div className="w-75 mx-auto">
        <div>
          {grafica === 2 && (
            <Scale
              data={dataGrafica}
              legend={false}
              text="Recolección de efectivo"
              optionsCustom={optionsCustom}
            />
          )}
          {grafica === 1 && (
            <Bar
              datos={dataGrafica}
              legend={false}
              text="Recolección de efectivo"
              optionsCustom={optionsCustom}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HistorialRelEfectivo;
