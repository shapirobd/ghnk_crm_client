import axios from "axios";
import { UPDATE_SHOW, UPDATE_SINGLE, UPDATE_ALBUM } from "../actionTypes";
import { API_URL } from "../config";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export const updateShow = (showID, data, user, setSubmitSuccess) => {
	return async (dispatch) => {
		try {
			console.log(data);
			const resp = await axios.patch(API_URL + "/shows?showID=" + showID, {
				...data,
				token: user.token,
			});
			const shows = await axios.get(
				API_URL + "/shows"
			);
			const showsWithVenues = await axios.get(
				API_URL + "/shows?getVenueNames=true"
			);
			console.log("shows: ", shows);
			console.log("showsWithVenueResp: ", showsWithVenues);
			// const updatedShow = showsWithVenueResp.data.filter(
			// 	(show) => (show.id === showID)
			// );
			// console.log("updatedShow: ", updatedShow);
			dispatch(showUpdated(shows.data, showsWithVenues.data));
			setSubmitSuccess(true)
			Toastify({
				text: "Show updated successfully",
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

export const updateAlbum = (albumID, data, code, user, setSubmitSuccess) => {
	return async (dispatch) => {
		try {
			const resp = await axios.patch(
				API_URL + "/albums?albumID=" + albumID,
				{
					...data,
					code,
					token: user.token,
				}
			);

			const albums = await axios.get(API_URL + "/albums");
			setSubmitSuccess(true);
			dispatch(albumUpdated(albums));
			Toastify({
				text: "Album updated successfully",
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
export const updateSingle = (singleID, data, code, user, setSubmitSuccess) => {
	return async (dispatch) => {
		try {
			console.log("SINGLE DATA: ", data);
			const resp = await axios.patch(
				API_URL + "/singles?singleID=" + singleID,
				{
					...data,
					code,
					token: user.token,
				}
			);

			const singles = await axios.get(API_URL + "/singles");
			setSubmitSuccess(true);
			dispatch(singleUpdated(singles));
			Toastify({
				text: "Single updated successfully",
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

const showUpdated = (shows, showsWithVenues) => {
	return {
		type: UPDATE_SHOW,
		payload: {
			shows: shows.shows,
			showsWithVenues: showsWithVenues.shows,
		},
	};
};

const albumUpdated = (albums) => {
	return {
		type: UPDATE_ALBUM,
		payload: {
			albums,
		},
	};
};
const singleUpdated = (singles) => {
	return {
		type: UPDATE_SINGLE,
		payload: {
			singles,
		},
	};
};
