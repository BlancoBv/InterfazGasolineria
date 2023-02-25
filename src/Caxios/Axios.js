import Axios from "axios";

const crendentials = JSON.parse(localStorage.getItem("Credentials"));
const token = crendentials ? crendentials.token.token : null;
export default Axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
  baseURL: "http://127.0.0.1:4000/api",
});
