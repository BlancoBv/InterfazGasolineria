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
          <Route index element={<RecursosHumanos/>}/>
          <Route path="captura-solicitud" element={<SolicitudesEmpleo />} />
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
        <Route index element={<Seguridad/>} />
        </Route>
        

        {/* Administrativo */}
        <Route path="/administrativo" element={<Layout />}>
          <Route index element={<Administrativo/>}/>
        </Route>

        {/* Mantenimiento */}
        <Route path="/mantenimiento" element={<Layout />}>
          <Route index element={<Mantenimiento/>}/>
        </Route>

        {/* Almacen */}
        <Route path="/almacen1" element={<Layout />}>
          <Route index element={<Almacen/>}/>
        </Route>

        {/* Documentos SGC */}
        <Route path="/documentos-sgc" element={<Layout />}>
          <Route index element={<DocumentosSGC/>}/>
        </Route>

        {/* Siempre debe ir abajo */}
      </Routes> 


      {/* <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="*" element={<Notfound />} />
          <Route exact path="/calidad" element={<Calidad />} />
          <Route
            exact
            path="/calidad/ordenes-de-trabajo/:year/:month/:idEstacion"
            element={<OrdenTrabajo />}
          />
          <Route exact path="/despacho" element={<Despacho />} />
          <Route
            exact
            path="/calidad/ordenes-de-trabajo/:year/:month/:idEstacion/:mantenimiento/:idMantenimiento"
            element={<DetalleMantenimiento />}
          />
          <Route exact path="/calidad/Ordtrabajo" element={<Ordtrabajo />} />
          <Route
            exact
            path="/calidad/DetalleMantenimiento"
            element={<DetalleMantenimiento />}
          />
          <Route exact path="/despacho" element={<Despacho />} />
          <Route
            exact
            path="/despacho/montos-faltantes"
            element={<MontoFaltante />}
          />
          <Route
            exact
            path="/despacho/montos-faltantes/detalles"
            element={<DetallesMontoFaltante />}
          />
          <Route
            exact
            path="/despacho/recoleccion-de-efectivo"
            element={<RecolEfect />}
          />
          <Route
            exact
            path="/despacho/pasos-para-despachar"
            element={<Pasosdespachar />}
          />
          <Route
            exact
            path="/despacho/recursos-despachador"
            element={<RecursosDesp />}
          />
          <Route
            exact
            path="/despacho/reporteria/monto-faltante"
            element={<GraficaMontofaltante />}
          />
          <Route
            exact
            path="/despacho/reporteria/monto-faltante/empleado"
            element={<MontoFaltanteEmpleado />}
          />
          <Route
            exact
            path="/despacho/checklist"
            element={<ChecklistBomba />}
          />
          <Route
            exact
            path="/despacho/evaluacion-uniforme"
            element={<EvalUniforme />}
          />
          <Route
            exact
            path="/despacho/reporteria/registro-checklist"
            element={<GraficaChecklist />}
          />
          <Route
            exact
            path="/despacho/reporteria/uniforme"
            element={<GraficaEvUnifome />}
          />
          <Route
            exact
            path="/salidas-no-conformes"
            element={<SalidaNoConforme />}
          />

          <Route exact path="/chart" element={<Chartprueba />} />
          <Route exact path="/pdf" element={<Pdfprueba />} />
          <Route
            exact
            path="/calidad/ordenes-de-trabajo/:year/:month/:idEstacion"
            element={<OrdenTrabajo />}
          />
          <Route
            exact
            path="/calidad/ordenes-de-trabajo/:year/:month/:idEstacion/:mantenimiento/:idMantenimiento"
            element={<DetalleMantenimiento />}
          />
          <Route
            exact
            path="/reporteria/salidas-no-conformes"
            element={<SalidasNoConformesReportes />}
          />
          <Route
            exact
            path="/despacho/reporteria/recoleccion-efectivo"
            element={<GraficaRecolEfectivo />}
          />
          <Route
            exact
            path="/despacho/reporteria/evaluacion-despachar"
            element={<GraficaPasoDes />}
          />
        </Routes>
      </Layout> */}
    </Router>
  );
}
export default Rutas;
