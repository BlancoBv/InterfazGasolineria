import gdl from "../components/assets/img/GDL.png";
import pemex from "../components/assets/img/PEMEX.png";

const HeaderForm = () => {
  return (
    <div className="row w-100 mb-2">
      <div className="col-md-4">
        <div className="d-flex justify-content-start h-100 align-items-center">
          <img src={gdl} alt="gdl" style={{ height: "40px" }} />
        </div>
      </div>
      <div className="col-md-4 fw-bold text-center">
        <div className="w-100 h-100 justify-content-center align-items-center">
          GASOLINERÍA DON LALO
        </div>
      </div>
      <div className="col-md-4">
        <div className="d-flex justify-content-end align-items-center h-100">
          <img src={pemex} alt="pemex" style={{ height: "30px" }} />
        </div>
      </div>
    </div>
  );
};

export default HeaderForm;
