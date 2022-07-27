import axios from "axios";
import { LOAD_SHOWS, LOAD_SHOWS_WITH_VENUES, LOAD_SINGLES, LOAD_ALBUMS, LOAD_VENUES } from "../actionTypes";
import { API_URL } from "../config";

export const getAlbums = () => {
  return async (dispatch) => {
		try {
	    const resp = await axios.get(API_URL + "/albums");
	    dispatch(gotAlbums(resp.data));
    } catch (e) {
      console.error(e)
    }
  };
};

export const getSingles = () => {
  return async (dispatch) => {
    try {
  	  const resp = await axios.get(API_URL + "/singles");
  	  dispatch(gotSingles(resp.data));
    } catch (e) {
      console.error(e)
    }
  };
};

export const getShows = () => {
  return async (dispatch) => {
    try {
	    const resp = await axios.get(API_URL + "/shows");
	    dispatch(gotShows(resp.data));
    } catch (e) {
      console.error(e)
    }
  };
};

export const getVenues = () => {
  return async (dispatch) => {
    try {
			const resp = await axios.get(`${API_URL}/venues`);
	    dispatch(gotVenues(resp.data));
    } catch (e) {
      console.error(e)
    }
  };
};

export const getShowsWithVenues = () => {
  return async (dispatch) => {
    try {
	    const resp = await axios.get(
	    	API_URL + "/shows?getVenueNames=true"
	    );
			console.log(resp.data)
	    dispatch(gotShowsWithVenues(resp.data));
    } catch (e) {
      console.error(e)
    }
  }
};

const gotAlbums = (albums) => {
	return {
		type: LOAD_ALBUMS,
		payload: {
			albums,
		},
	};
};

const gotSingles = (singles) => {
	return {
		type: LOAD_SINGLES,
		payload: {
			singles,
		},
	};
};

const gotShows = (shows) => {
	return {
		type: LOAD_SHOWS,
		payload: {
			shows: shows.shows,
		},
	};
};

const gotVenues = (venues) => {
	return {
		type: LOAD_VENUES,
		payload: {
			venues,
		},
	};
};

const gotShowsWithVenues = (showsWithVenues) => {
	const showsWithReadableDates = showsWithVenues.shows.map(s => {
		console.log({ ...s, date: s.date.substring(0, 10) });
		return {...s, date: s.date.substring(0, 10)}
	})
	return {
		type: LOAD_SHOWS_WITH_VENUES,
		payload: {
			showsWithVenues: showsWithReadableDates,
		},
	};
};
