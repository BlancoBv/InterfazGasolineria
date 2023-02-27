import HeaderComponents from "../../../GUI/HeaderComponents";
import FormOrdenIsla from "../../forms/FormOrdenIsla";

function OrdenIsla() {
  return (
    <div className="Main">
      <HeaderComponents
        urlBack="/despacho"
        textUrlback="Volver a Despacho"
        title="Orden y Limpiza de Isla"
      ></HeaderComponents>

      <FormOrdenIsla />
    </div>
  );
}

export default OrdenIsla;
