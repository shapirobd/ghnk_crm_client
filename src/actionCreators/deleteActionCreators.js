import axios from "axios";
import {
	DELETE_SHOW,
	DELETE_SHOWS_WITH_VENUE,
	DELETE_ALBUM,
	DELETE_SINGLE,
} from "../actionTypes";

export const deleteAlbum = (user, albumID, setDeletedAlbumID) => {
	return async (dispatch) => {
		try {
			await axios.delete("http://localhost:5000/albums", {
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

export const deleteShow = (user, showID, setDeletedShowID) => {
	return async (dispatch) => {
		try {
			await axios.delete("http://localhost:5000/shows", {
				token: user.token,
				data: {
					showID,
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
			axios.delete("http://localhost:5000/singles", {
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
