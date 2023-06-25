import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./styles/toastifyStyles.css"

export const notifySuccess = (itemType, action) => {
	let actionFormatted = "";
	if (action == "add") {
		actionFormatted = "added";
	} else if (action == "update") {
		actionFormatted = "updated";
	} else if (action == "delete") {
		actionFormatted = "deleted";
	}
	toast.success(itemType + " " + actionFormatted + " successfully", {
		position: toast.POSITION.TOP_RIGHT,
		className: 'notify-success'
	});
};

export const notifyError = (errorMessage) => {
	toast.error("ERROR: " + errorMessage, {
		position: toast.POSITION.TOP_RIGHT,
		className: 'notify-error'
	});
};
