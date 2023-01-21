import HeaderComponents from "../../../GUI/HeaderComponents";
import FormChecklist from "../../forms/FormChecklist";
import IconComponents from "../../assets/IconComponents";

function ChecklistBomba() {
  return (
    <div className="Main">
      <HeaderComponents
        urlBack="/despacho"
        textUrlback="Regresar a despacho"
        title="Checklist de bomba"
      >
        <IconComponents
          icon="chart-line text-danger"
          text="Reportes"
          url="/despacho/checklist/reporte"
        />
      </HeaderComponents>
      <div>
        <FormChecklist />
      </div>
    </div>
  );
}
export default ChecklistBomba;
