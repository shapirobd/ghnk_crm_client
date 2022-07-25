import axios from "axios";
import {
	DELETE_SHOW,
	DELETE_SHOWS_WITH_VENUE,
	DELETE_ALBUM,
	DELETE_SINGLE,
} from "../actionTypes";
import { API_URL } from '../config'

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
		} catch (e) {
			console.error(e);
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
		} catch (e) {
			console.error(e);
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
		} catch (e) {
			console.error(e);
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
