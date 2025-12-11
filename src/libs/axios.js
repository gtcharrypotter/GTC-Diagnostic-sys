import axios from "axios";
console.log("axios.create", import.meta.env.VITE_BACKEND_URL, axios.create);
const Axios = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL,
	// headers: {
	// 	"X-Requested-With": "XMLHttpRequest",
	// },
	withCredentials: false,
});

export default Axios;
