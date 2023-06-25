import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./styles/toastifyStyles.css"

export const notifySuccess = (itemType, action) => {
	// toast("Default Notification !");
	let actionFormatted = "";
	if (action == "add") {
		actionFormatted = "added";
	} else if (action == "edit") {
		actionFormatted = "edited";
	} else if (action == "delete") {
		actionFormatted = "deleted";
	}
	toast.success(itemType + " " + actionFormatted + " successfully", {
		position: toast.POSITION.TOP_RIGHT,
		className: 'notify-success'
	});

	// toast.error("Error Notification !", {
	// 	position: toast.POSITION.TOP_LEFT,
	// });

	// toast.warn("Warning Notification !", {
	// 	position: toast.POSITION.BOTTOM_LEFT,
	// });

	// toast.info("Info Notification !", {
	// 	position: toast.POSITION.BOTTOM_CENTER,
	// });

	// toast("Custom Style Notification with css class!", {
	// 	position: toast.POSITION.BOTTOM_RIGHT,
	// 	className: "foo-bar",
	// });
};

export const notifyError = (errorMessage) => {
	toast.error("ERROR: " + errorMessage, {
		position: toast.POSITION.TOP_RIGHT,
		className: 'notify-error'
	});
};
