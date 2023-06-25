import axios from "axios";
import {
	DELETE_SHOW,
	DELETE_SHOWS_WITH_VENUE,
	DELETE_ALBUM,
	DELETE_SINGLE,
} from "../actionTypes";
import { API_URL } from '../config';
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export const deleteAlbum = (user, albumID, setDeletedAlbumID) => {
	return async (dispatch) => {
		try {
			await axios.delete(API_URL + "/albums", {
				token: user.token,
				data: {
					albumID
				}
			});
			dispatch(deletedAlbum(albumID));
			setDeletedAlbumID(albumID);
			Toastify({
				text: "Album deleted successfully",
				duration: 3000,
				// destination: "https://github.com/apvarun/toastify-js",
				newWindow: true,
				close: true,
				gravity: "top", // `top` or `bottom`
				position: "right", // `left`, `center` or `right`
				stopOnFocus: true, // Prevents dismissing of toast on hover
				style: {
					background: "linear-gradient(to right, #00b09b, #96c93d)",
				},
				onClick: function () {}, // Callback after click
			}).showToast();
		} catch (e) {
			console.error(e);
			Toastify({
				text: "Error: " + e.response.data.message,
				duration: 5000,
				// destination: "https://github.com/apvarun/toastify-js",
				newWindow: true,
				close: true,
				gravity: "top", // `top` or `bottom`
				position: "right", // `left`, `center` or `right`
				stopOnFocus: true, // Prevents dismissing of toast on hover
				style: {
					background:
						"linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113))",
				},
				onClick: function () {}, // Callback after click
			}).showToast();
		}
	};
};

export const deleteShow = (user, showID, setDeletedShowID, setPreviousShow = false) => {
	return async (dispatch) => {
		try {
			await axios.delete(API_URL + "/shows", {
				token: user.token,
				data: {
					showID,
					setPreviousShow
				},
			});
			dispatch(deletedShow(showID));
			setDeletedShowID(showID);
			Toastify({
				text: "Show deleted successfully",
				duration: 3000,
				// destination: "https://github.com/apvarun/toastify-js",
				newWindow: true,
				close: true,
				gravity: "top", // `top` or `bottom`
				position: "right", // `left`, `center` or `right`
				stopOnFocus: true, // Prevents dismissing of toast on hover
				style: {
					background: "linear-gradient(to right, #00b09b, #96c93d)",
				},
				onClick: function () {}, // Callback after click
			}).showToast();
		} catch (e) {
			console.error(e);
			Toastify({
				text: "Error: " + e.response.data.message,
				duration: 5000,
				// destination: "https://github.com/apvarun/toastify-js",
				newWindow: true,
				close: true,
				gravity: "top", // `top` or `bottom`
				position: "right", // `left`, `center` or `right`
				stopOnFocus: true, // Prevents dismissing of toast on hover
				style: {
					background:
						"linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113))",
				},
				onClick: function () {}, // Callback after click
			}).showToast();
		}
	};
};

export const deleteSingle = (user, singleID, setDeletedSingleID) => {
  console.log(singleID)
  console.log("inside delete single")
	return async (dispatch) => {
		try {
			axios.delete(API_URL + "/singles", {
				token: user.token,
				data: {
					singleID
				},
			});
			dispatch(deletedSingle(singleID));
			setDeletedSingleID(singleID);
			Toastify({
				text: "Single deleted successfully",
				duration: 3000,
				// destination: "https://github.com/apvarun/toastify-js",
				newWindow: true,
				close: true,
				gravity: "top", // `top` or `bottom`
				position: "right", // `left`, `center` or `right`
				stopOnFocus: true, // Prevents dismissing of toast on hover
				style: {
					background: "linear-gradient(to right, #00b09b, #96c93d)",
				},
				onClick: function () {}, // Callback after click
			}).showToast();
		} catch (e) {
			console.error(e);
			Toastify({
				text: "Error: " + e.response.data.message,
				duration: 5000,
				// destination: "https://github.com/apvarun/toastify-js",
				newWindow: true,
				close: true,
				gravity: "top", // `top` or `bottom`
				position: "right", // `left`, `center` or `right`
				stopOnFocus: true, // Prevents dismissing of toast on hover
				style: {
					background:
						"linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113))",
				},
				onClick: function () {}, // Callback after click
			}).showToast();
		}
	};
};

const deletedAlbum = (albumID) => {
	return {
		type: DELETE_ALBUM,
		payload: {
			albumID,
		},
	};
};
const deletedShow = (showID) => {
	return {
		type: DELETE_SHOW,
		payload: {
			showID,
		},
	};
};
const deletedSingle = (singleID) => {
	console.log("inside deletedSingle!")
	return {
		type: DELETE_SINGLE,
		payload: {
			singleID,
		},
	};
};
