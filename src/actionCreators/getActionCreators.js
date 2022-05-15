import axios from "axios";
import { LOAD_SHOWS, LOAD_SHOWS_WITH_VENUES, LOAD_SINGLES, LOAD_ALBUMS, LOAD_VENUES } from "../actionTypes";

export const getAlbums = () => {
  return async (dispatch) => {
		try {
	    const resp = await axios.get("http://localhost:5000/albums");
	    dispatch(gotAlbums(resp.data));
    } catch (e) {
      console.error(e)
    }
  };
};

export const getSingles = () => {
  return async (dispatch) => {
    try {
  	  const resp = await axios.get("http://localhost:5000/singles");
  	  dispatch(gotSingles(resp.data));
    } catch (e) {
      console.error(e)
    }
  };
};

export const getShows = () => {
  return async (dispatch) => {
    try {
	    const resp = await axios.get("http://localhost:5000/shows");
	    dispatch(gotShows(resp.data));
    } catch (e) {
      console.error(e)
    }
  };
};

export const getVenues = () => {
  return async (dispatch) => {
    try {
			const resp = await axios.get(`http://localhost:5000/venues`);
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
	    	"http://localhost:5000/shows?getVenueNames=true"
	    );
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
			shows,
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
	return {
		type: LOAD_SHOWS_WITH_VENUES,
		payload: {
			showsWithVenues,
		},
	};
};
