import axios from "axios";
import {
	DELETE_SHOW,
	DELETE_SHOWS_WITH_VENUE,
	DELETE_ALBUM,
	DELETE_SINGLE,
} from "../actionTypes";
import { API_URL } from '../config';
// import Toastify from "toastify-js";
// import "toastify-js/src/toastify.css";
import { notifySuccess, notifyError } from "../helpers";

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
			notifySuccess("Album", "delete");
		} catch (e) {
			console.error(e);
			notifyError(e.response.data.message);
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
			notifySuccess("Show", "delete");
		} catch (e) {
			console.error(e);
			notifyError(e.response.data.message);
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
			notifySuccess("Single", "delete");
		} catch (e) {
			console.error(e);
			notifyError(e.response.data.message);
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
