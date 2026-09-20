const INITIAL_STATE = {
	venues: [],
	user: null,
	shows: [],
	albums: [],
	songs: [],
	showsWithVenues: []
};

const rootReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "LOGIN": {
			const { user, token } = action.payload;
			return { ...state, user: { ...user, token } };
		}
		case "LOGOUT": {
			return INITIAL_STATE;
		}
		case "LOAD_SHOWS_WITH_VENUES": {
			const { showsWithVenues } = action.payload;
			console.log("SHOWS WITH VENUES LOADED: ", showsWithVenues);
			return {
				...state,
				showsWithVenues,
			};
		}
		case "LOAD_VENUES": {
			const { venues } = action.payload;
			console.log("VENUES LOADED: ", venues);
			return {
				...state,
				venues,
			};
		}
		case "LOAD_SHOWS": {
			const { shows } = action.payload;
			console.log("SHOWS LOADED: ", shows);
			return {
				...state,
				shows,
			};
		}
		case "LOAD_SONGS": {
			const { songs } = action.payload;
			console.log("SONGS LOADED: ", songs);
			return {
				...state,
				songs,
			};
		}
		case "LOAD_ALBUMS": {
			const { albums } = action.payload;
			console.log("ALBUMS LOADED: ", albums);
			return {
				...state,
				albums,
			};
		}
		case "ADD_SHOW": {
			const { show, showWithVenue } = action.payload;
			console.log("SHOW ADDED: ", show);
			console.log("SHOW WITH VENUE FOUND: ", showWithVenue);
			return {
				...state,
				shows: [...state.shows, show],
				showWithVenue: [...state.showsWithVenues, showWithVenue],
			};
		}
		case "ADD_ALBUM": {
			const { album } = action.payload;
			console.log("ALBUM ADDED: ", album);
			return {
				...state,
				albums: [...state.albums, album],
			};
		}
		case "ADD_SONG": {
			const { song } = action.payload;
			console.log("SONG ADDED: ", song);
			return {
				...state,
				songs: [...state.songs, song],
			};
		}
		case "DELETE_SHOW": {
			const { showID } = action.payload;
			console.log("SHOW DELETED: ", showID); 
			console.log('rootReducer - shows = ', state.shows);
			return {
				...state,
				shows: state.shows.filter((show) => show.id !== showID),
				showsWithVenues: state.showsWithVenues.filter(
					(show) => show.id !== showID
				),
			};
		}
		case "DELETE_ALBUM": {
			const { albumID } = action.payload;
			console.log("ALBUM DELETED: ", albumID);
			return {
				...state,
				albums: state.albums.filter((album) => album.id !== albumID),
			};
		}
		case "DELETE_SONG": {
			const { songID } = action.payload;
			console.log("SONG DELETED: ", songID);
			return {
				...state,
				songs: state.songs.filter((song) => song.id !== songID),
			};
		}
		case "UPDATE_SHOW": {
			const { shows, showsWithVenues } = action.payload;
			console.log("SHOWS: ", shows);
			console.log("SHOWS WITH VENUES: ", showsWithVenues);
			return {
				...state,
				shows: shows,
				showsWithVenues: showsWithVenues,
			};
		}
		case "UPDATE_SONG": {
			const { songs } = action.payload;
			console.log("SONGS: ", songs);
			return {
				...state,
				songs: songs,
			};
		}
		case "UPDATE_ALBUM": {
			const { albums } = action.payload;
			console.log("ALBUMS: ", albums);
			return {
				...state,
				albums: albums,
			};
		}
		default: {
			return state;
		}
	}
};

export default rootReducer;
