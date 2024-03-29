


import axios from "axios";
import {
	ADD_SHOW, ADD_SINGLE, ADD_ALBUM
} from "../actionTypes";
import { API_URL } from "../config";
// import Toastify from "toastify-js";
// import "toastify-js/src/toastify.css";
import { notifySuccess, notifyError } from "../helpers"

export const addAlbum = (data, code, user, setSubmitSuccess) => {
	return async (dispatch) => {
		try {
			const resp = await axios.post(API_URL + "/albums", {
				...data,
				code,
				token: user.token,
			});

			if (resp.data.affectedRows) {
				setSubmitSuccess(true);
				dispatch(addedAlbum(resp.data));
				notifySuccess("Album", "add");
			}
		} catch (e) {
			console.error(e);
			notifyError(e.response.data.message);
		}
	};
};
export const addSingle = (data, code, user, setSubmitSuccess) => {
	return async (dispatch) => {
		try {
      console.log("SINGLE DATA: ", data)
			const resp = await axios.post(API_URL + "/singles", {
				...data,
				code,
				token: user.token,
			});

			if (resp.data.affectedRows) {
				setSubmitSuccess(true);
        dispatch(addedSingle(resp.data));
				notifySuccess("Single", "add");
			}
		} catch (e) {
			console.error(e);
			notifyError(e.response.data.message);
		}
	};
};
export const addShow = (data, user) => {
	return async (dispatch) => {
		try {
			console.log(data);
			const resp = await axios.post(API_URL + "/shows", {
				...data,
				token: user.token,
			})
      const showsWithVenueResp = await axios.get(API_URL + "/shows?getVenueNames=true");
      const newShow = showsWithVenueResp.data.shows.filter(show => show.id = resp.data.id);
      dispatch(addedShow(resp.data, newShow[0]));
			// Toastify({
			// 	text: "Show added successfully",
			// 	duration: 3000,
			// 	// destination: "https://github.com/apvarun/toastify-js",
			// 	newWindow: true,
			// 	close: true,
			// 	gravity: "top", // `top` or `bottom`
			// 	position: "right", // `left`, `center` or `right`
			// 	stopOnFocus: true, // Prevents dismissing of toast on hover
			// 	style: {
			// 		background: "linear-gradient(to right, #00b09b, #96c93d)",
			// 	},
			// 	onClick: function () {}, // Callback after click
			// }).showToast();
			notifySuccess("Show", "add")
		} catch (e) {
			console.error(e);
			// Toastify({
			// 	text: "Error: " + e.response.data.message,
			// 	duration: 5000,
			// 	// destination: "https://github.com/apvarun/toastify-js",
			// 	newWindow: true,
			// 	close: true,
			// 	gravity: "top", // `top` or `bottom`
			// 	position: "right", // `left`, `center` or `right`
			// 	stopOnFocus: true, // Prevents dismissing of toast on hover
			// 	style: {
			// 		background:
			// 			"linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113))",
			// 	},
			// 	onClick: function () {}, // Callback after click
			// }).showToast();
			notifyError(e.response.data.message);
		}
	};
};

const addedAlbum = (album) => {
  return {
    type: ADD_ALBUM,
    payload: {
      album
    }
  }
}

const addedShow = (show, showWithVenue) => {
  return {
    type: ADD_SHOW,
    payload: {
      show: show.show,
      showWithVenue
    }
  }
}

const addedSingle = (single) => {
  console.log("single", single)
  return {
    type: ADD_SINGLE,
    payload: {
      single
    }
  }
}