import axios from "axios";
import { UPDATE_SHOW, UPDATE_SONG, UPDATE_ALBUM } from "../actionTypes";
import { API_URL } from "../config";
// import Toastify from "toastify-js";
// import "toastify-js/src/toastify.css";
import { notifySuccess, notifyError } from "../helpers";

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
			notifySuccess("Show", "update");
		} catch (e) {
			console.error(e);
			notifyError(e.response.data.message);
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
			notifySuccess("Album", "update");
		} catch (e) {
			console.error(e);
			notifyError(e.response.data.message);
		}
	};
};
export const updateSong = (songID, data, code, user, setSubmitSuccess) => {
	return async (dispatch) => {
		try {
			console.log("SONG DATA: ", data);
			const resp = await axios.patch(
				API_URL + "/songs?songID=" + songID,
				{
					...data,
					code,
					token: user.token,
				}
			);

			const songs = await axios.get(API_URL + "/songs");
			setSubmitSuccess(true);
			dispatch(songUpdated(songs));
			notifySuccess(data.category || "Single", "update");
		} catch (e) {
			console.error(e);
			notifyError(e.response.data.message);
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
const songUpdated = (songs) => {
	return {
		type: UPDATE_SONG,
		payload: {
			songs,
		},
	};
};
