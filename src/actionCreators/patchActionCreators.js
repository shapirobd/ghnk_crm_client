import axios from "axios";
import { UPDATE_SHOW, UPDATE_SINGLE, UPDATE_ALBUM } from "../actionTypes";

export const updateShow = (showID, data, user, setSubmitSuccess) => {
	return async (dispatch) => {
		try {
			console.log(data);
			const resp = await axios.patch("http://localhost:5000/shows?showID=" + showID, {
				...data,
				token: user.token,
			});
			const shows = await axios.get(
				"http://localhost:5000/shows"
			);
			const showsWithVenues = await axios.get(
				"http://localhost:5000/shows?getVenueNames=true"
			);
			console.log("shows: ", shows);
			console.log("showsWithVenueResp: ", showsWithVenues);
			// const updatedShow = showsWithVenueResp.data.filter(
			// 	(show) => (show.id === showID)
			// );
			// console.log("updatedShow: ", updatedShow);
			dispatch(showUpdated(shows.data, showsWithVenues.data));
			setSubmitSuccess(true)
		} catch (e) {
			console.error(e);
		}
	};
};

export const updateAlbum = (albumID, data, code, user, setSubmitSuccess) => {
	return async (dispatch) => {
		try {
			const resp = await axios.patch(
				"http://localhost:5000/albums?albumID=" + albumID,
				{
					...data,
					code,
					token: user.token,
				}
			);

			const albums = await axios.get("http://localhost:5000/albums");
			setSubmitSuccess(true);
			dispatch(albumUpdated(albums));
		} catch (e) {
			console.error(e);
		}
	};
};
export const updateSingle = (singleID, data, code, user, setSubmitSuccess) => {
	return async (dispatch) => {
		try {
			console.log("SINGLE DATA: ", data);
			const resp = await axios.patch(
				"http://localhost:5000/singles?singleID=" + singleID,
				{
					...data,
					code,
					token: user.token,
				}
			);

			const singles = await axios.get("http://localhost:5000/singles");
			setSubmitSuccess(true);
			dispatch(singleUpdated(singles));
		} catch (e) {
			console.error(e);
		}
	};
};

const showUpdated = (shows, showsWithVenues) => {
	return {
		type: UPDATE_SHOW,
		payload: {
			shows,
			showsWithVenues,
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