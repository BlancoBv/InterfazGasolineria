import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Notfound from "../components/pages/Notfound";
import Layout from "../GUI/Layout";
import Home from "../components/pages/home/Home";
// Importacion de despacho
import Despacho from "../components/pages/Despacho";
import MontoFaltante from "../components/pages/despacho/MontoFaltante";
import ChecklistBomba from "../components/pages/despacho/ChecklistBomba";
import CheckBombaInfo from "../components/pages/despacho/ChecklistBombaDetalle";
import EvalUniforme from "../components/pages/despacho/EvalUniforme";
import RecolEfect from "../components/pages/despacho/RecolEfect";
import Pasosdespachar from "../components/pages/despacho/Pasosdespachar";
import RecursosDesp from "../components/pages/despacho/RecursosDesp";
import SalidaNoConforme from "../components/pages/salidaNoConforme/SalidaNoConforme";
import SNR from "../components/pages/salidaNoConforme/SalidasNoConformesReportes";
//importacion de graficos despacho
import GMF from "../components/pages/despacho/reporteria/GraficaMontofaltante";
import CCB from "../components/pages/despacho/reporteria/GraficaChecklist";
import GEU from "../components/pages/despacho/reporteria/GraficaEvUnifome";
import DRE from "../components/pages/despacho/reporteria/GraficaRecolEfectivo";
import GPD from "../components/pages/despacho/reporteria/GraficaPasoDes";
import GRD from "../components/pages/despacho/reporteria/GraficaRecursosDes";
import GMSN from "../components/pages/salidaNoConforme/SalidaNoConformeGraficaMensual";
import GSNI from "../components/pages/salidaNoConforme/SalidaInconformidadesGrafica";
//importaciones recursos humanos
import RecursosHumanos from "../components/pages/RecursosHumanos";
import SolicitudesEmpleo from "../components/pages/RecursosHumanos/SolicitudesEmpleo";
import AltaBaja from "../components/pages/RecursosHumanos/AltaBaja";
import FaltasRetardos from "../components/pages/RecursosHumanos/FaltasRetardos";
import CM from "../components/pages/RecursosHumanos/ConcursoMadrugador";
// Importación gráficos recursos
import FRG from "../components/pages/RecursosHumanos/Reportes/FaltaRetardoGrafica";

//importaciones de calidad
import Ordtrabajo from "../components/pages/calidad/Ordtrabajo";
import OrdenTrabajo from "../components/pages/calidad/OrdenTrabajo";
import Calidad from "../components/pages/Calidad";
import DetalleMantenimiento from "../components/pages/calidad/reporteria/DetalleMantenimiento";

//importaciones de seguridad
import Seguridad from "../components/pages/Seguridad";
//importaciones de almacen
import Almacen from "../components/pages/Almacen";
//importaciones de mantenimiento
import Mantenimiento from "../components/pages/Mantenimiento";
//importaciones documentosSGC
import DocumentosSGC from "../components/pages/DocumentosSGC";
//importaciones administrativos
import Administrativo from "../components/pages/Administrativo";
import EmpleadosRechazados from "../components/pages/RecursosHumanos/EmpleadosRechazados";
import Documentos from "../components/pages/RecursosHumanos/Documentos";
import Ordtrabajomante from "../components/pages/mantenimiento/Ordtrabajomante";
import FaltaRetardoGrafica from "../components/pages/RecursosHumanos/Reportes/FaltaRetardoGrafica";
import ControlDocumentos from "../components/pages/RecursosHumanos/ControlDocumentos";
import Octanoso from "../components/pages/RecursosHumanos/Octanoso";
import Aceitoso from "../components/pages/RecursosHumanos/Aceitoso";

function Rutas() {
  return (
    <Router>
      <Routes>
        {/* Rutas de despacho */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="*" element={<Notfound />} />
        </Route>
        <Route element={<Layout />}>
          <Route path="salida-no-conforme-reportes" />
          <Route path="salida-no-conforme-reporte-mensual" element={<GMSN />} />
          <Route path="salida-no-conformexinconformidad" element={<GSNI />} />
        </Route>
        <Route path="/despacho" element={<Layout />}>
          <Route index element={<Despacho />} />;
          <Route path="montos-faltantes" element={<MontoFaltante />} />;
          <Route path="montos-faltantes-reporte" element={<GMF />} />;
          <Route path="checklist" element={<ChecklistBomba />} />;
          <Route path="checklist/:idE/:fecha" element={<CheckBombaInfo />} />;
          <Route path="checklist-reporte" element={<CCB />} />;
          <Route path="evaluacion-uniforme" element={<EvalUniforme />} />;
          <Route path="evaluacion-uniforme-reporte" element={<GEU />} />;
          <Route path="recoleccion-efectivo" element={<RecolEfect />} />;
          <Route path="recoleccion-efectivo-reporte" element={<DRE />} />;
          <Route path="pasos-despachar" element={<Pasosdespachar />} />;
          <Route path="pasos-despachar-reporte" element={<GPD />} />;
          <Route path="recurso-despachador" element={<RecursosDesp />} />;
          <Route path="recurso-despachador-reporte" element={<GRD />} />
          <Route path="salida-no-conforme" element={<SalidaNoConforme />} />
          <Route path="salida-no-conforme-files" element={<SNR />} />; ;
          <Route path="*" element={<Notfound />} />
        </Route>

        {/* Recursos humanos */}
        <Route path="/recursos-humanos" element={<Layout />}>
          <Route index element={<RecursosHumanos />} />
          <Route path="captura-solicitud" element={<SolicitudesEmpleo />} />
          <Route path="alta-baja-empleados" element={<AltaBaja />} />
          <Route path="faltas-retardo">
            <Route index element={<FaltasRetardos />} />
            <Route path="reportes" element={<FRG />} />
          </Route>
          <Route path="documentos-trabajadores" element={<Documentos />} />
          <Route path="consursos" element={<CM />}>
            <Route path="madrugador" element={<CM />} />
          </Route>
          <Route path="faltas-retardo" element={<FaltasRetardos />} />
          <Route
            path="empleados-dados-baja"
            element={<EmpleadosRechazados />}
          />
          <Route path="documentos-trabajadores" element={<Documentos />} />
          <Route
            path="grafica-mensual-faltas-retardos"
            element={<FaltaRetardoGrafica />}
          />
          <Route path="control-documentos" element={<ControlDocumentos />} />
          <Route path="concurso-octanoso" element={<Octanoso />} />
          <Route path="concurso-aceitoso" element={<Aceitoso />} />
        </Route>

        {/* Calidad */}
        <Route path="/calidad" element={<Layout />}>
          <Route index element={<Calidad />} />
          <Route path="orden-trabajo" element={<Ordtrabajo />} />
          <Route path="orden-trabajo-reporte/" element={<OrdenTrabajo />} />
          <Route
            exact
            path="/calidad/orden-trabajo-reporte/:year/:month/:idEstacion/:mantenimiento/:idMantenimiento"
            element={<DetalleMantenimiento />}
          />
        </Route>

        {/* Seguridad */}
        <Route path="/seguridad" element={<Layout />}>
          <Route index element={<Seguridad />} />
        </Route>

        {/* Administrativo */}
        <Route path="/administrativo" element={<Layout />}>
          <Route index element={<Administrativo />} />
        </Route>

        {/* Mantenimiento */}
        <Route path="/mantenimiento" element={<Layout />}>
          <Route index element={<Mantenimiento />} />
          <Route path="orden-trabajo" element={<Ordtrabajomante />} />
        </Route>

        {/* Almacen */}
        <Route path="/almacen1" element={<Layout />}>
          <Route index element={<Almacen />} />
        </Route>

        {/* Documentos SGC */}
        <Route path="/documentos-sgc" element={<Layout />}>
          <Route index element={<DocumentosSGC />} />
        </Route>

        {/* Siempre debe ir abajo */}
      </Routes>
    </Router>
  );
}
export default Rutas;
