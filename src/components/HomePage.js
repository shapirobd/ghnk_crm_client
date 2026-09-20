import React, { useState, useEffect } from "react";
import { List, ListItem, Divider, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import BasicTable from "./BasicTable";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector, shallowEqual} from 'react-redux'
import { getAlbums, getShowsWithVenues, getShows, getSongs} from "../actionCreators/getActionCreators";
import { deleteAlbum, deleteShow, deleteSong} from "../actionCreators/deleteActionCreators";
import { updateAlbum, updateShow, updateSong} from "../actionCreators/patchActionCreators";
import { API_URL } from "../config";
import { useStyles } from './HomePageStyles';

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const showCols = ["Venue", "Other Artists", "Date", "Time", "Ticket Link", "Solo Show"];
const albumCols = ["Name", "URL", "Code"];
const songCols = ["Name", "URL", "Code", "Display Order", "Show On Site"];

const colMap = {
	Name: "name",
	URL: "url",
	Code: "code",
	Venue: "venue_name",
	Date: "date",
	Time: "time",
	"Ticket Link": "ticket_link",
	"Solo Show": "is_solo",
	"Display Order": "display_order",
	"Show On Site": "show_on_site"
};

const pageUrlMap = {
	"Shows": "shows",
	"Albums": "music",
	"Singles": "music",
	"New Releases": "music",
}

const HomePage = ({ user, setPageName }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch()

	const classes = useStyles();

	const [currentTable, setCurrentTable] = useState("Shows");
	// const [albums, setAlbums] = useState([]);
	// const [singles, setSingles] = useState([]);
	// const [shows, setShows] = useState([]);

	const shows = useSelector((state) => state.showsWithVenues, shallowEqual)
	const albums = useSelector((state) => state.albums, shallowEqual)
	const songs = useSelector((state) => state.songs, shallowEqual)
	const singles = songs.filter((song) => (song.category || "Single") === "Single")
	const newReleases = songs.filter((song) => song.category === "New Release")

	const [deletedAlbumID, setDeletedAlbumID] = useState(0);
	const [deletedSongID, setDeletedSongID] = useState(0);
	const [deletedShowID, setDeletedShowID] = useState(0);

	// const getAlbums = async () => {
	// 	const resp = await axios.get(API_URL + "/albums");
	// 	setAlbums(resp.data);
	// };
	// const getSingles = async () => {
	// 	const resp = await axios.get(API_URL + "/singles");
	// 	setSingles(resp.data);
	// };
	// const getShows = async () => {
	// 	const resp = await axios.get(
	// 		API_URL + "/shows?getVenueNames=true"
	// 	);
	// 	setShows(resp.data);
	// };

	useEffect(() => {
		if (deletedAlbumID) {
			dispatch(getAlbums());
			setDeletedAlbumID(0);
		}
	}, [deletedAlbumID]);

	useEffect(() => {
		if (deletedShowID) {
			dispatch(getShowsWithVenues());
			setDeletedShowID(0);
		}
	}, [deletedShowID]);

	useEffect(() => {
		if (deletedShowID) {
			dispatch(getShows());
			setDeletedShowID(0);
		}
	}, [deletedShowID]);

	useEffect(() => {
		if (deletedSongID) {
			console.log("deletedSongID: ", deletedSongID);
			dispatch(getSongs());
			setDeletedSongID(0);
		}
	}, [deletedSongID]);

	// ##################################
	// ######## DELETE FUNCTIONS ########
	// ##################################

	// const deleteShow = async (showID) => {
	// 	axios.delete(API_URL + "/shows", {
	// 		token: user.token,
	// 		data: {
	// 			showID,
	// 		},
	// 	});
	// 	setDeletedShowID(showID);
	// };

	// const deleteAlbum = async (albumID) => {
	// 	axios.delete(API_URL + "/albums").send({
	// 		token: user.token,
	// 		albumID,
	// 	});
	// 	setDeletedAlbumID(albumID);
	// };

	// const deleteSong = async (songID) => {
	// 	axios.delete(API_URL + "/songs").send({
	// 		token: user.token,
	// 		songID,
	// 	});
	// 	setDeletedSongID(songID);
	// };

	// ##################################
	// ######## EDIT FUNCTIONS ########
	// ##################################

	const editShow = async (showID) => {
		console.log("EDIT CLICKED")
		setPageName("Shows")
		navigate('/shows?showID=' + showID)
	};

	const editAlbum = async (albumID) => {
		setPageName("Music");
		navigate("/music?albumID=" + albumID);
	};

	const editSong = async (songID) => {
		setPageName("Music");
		navigate("/music?songID=" + songID);
	};

	useEffect(() => {
		dispatch(getAlbums());
		dispatch(getSongs());
		dispatch(getShows());
		dispatch(getShowsWithVenues());
	}, []);

	return (
		<div
			style={{
				width: "95%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "left",
				alignItems: "center",
				marginTop: window.innerWidth < 760 ? "25%" : "8%",
			}}
		>
			<Typography sx={{ marginBottom: window.innerWidth < 760 ? "5%" : "0%" }}>
				<a
					href={
						"https://www.greylanhallandthenastykings.com/" +
						pageUrlMap[currentTable]
					}
					target="_blank"
					className={`${classes.url} ignoreInvert`}
				>
					Visit the {pageUrlMap[currentTable]} page
				</a>
			</Typography>
			<List
				sx={{
					display: "flex",
					alignItems: "center",
					width: "97%",
					margin: "40px 0px 30px",
					padding: 0,
					border: (theme) => `1px solid ${theme.palette.divider}`,
					borderRadius: 1,
					bgcolor: "background.paper",
					color: "text.secondary",
					"& svg": {
						m: 1.5,
					},
					"& hr": {
						mx: 0.5,
					},
				}}
			>
				<ListItem
					button
					onClick={() => setCurrentTable("Shows")}
					sx={{
						display: "flex",
						justifyContent: "center",
						backgroundColor: currentTable === "Shows" ? "#eee" : "white",
						fontSize: "18px",
					}}
				>
					Shows
				</ListItem>
				<Divider
					orientation="vertical"
					flexItem
					sx={{ marginLeft: "0px !important", marginRight: "0px !important" }}
				/>
				<ListItem
					button
					onClick={() => setCurrentTable("Albums")}
					sx={{
						display: "flex",
						justifyContent: "center",
						backgroundColor: currentTable === "Albums" ? "#eee" : "white",
						fontSize: "18px",
					}}
				>
					Albums
				</ListItem>
				<Divider
					orientation="vertical"
					flexItem
					sx={{ marginLeft: "0px !important", marginRight: "0px !important" }}
				/>
				<ListItem
					button
					onClick={() => setCurrentTable("Singles")}
					sx={{
						display: "flex",
						justifyContent: "center",
						backgroundColor: currentTable === "Singles" ? "#eee" : "white",
						fontSize: "18px",
					}}
				>
					Singles
				</ListItem>
				<Divider
					orientation="vertical"
					flexItem
					sx={{ marginLeft: "0px !important", marginRight: "0px !important" }}
				/>
				<ListItem
					button
					onClick={() => setCurrentTable("New Releases")}
					sx={{
						display: "flex",
						justifyContent: "center",
						backgroundColor: currentTable === "New Releases" ? "#eee" : "white",
						fontSize: "18px",
					}}
				>
					New Releases
				</ListItem>
			</List>
			{/* <DrawerHeader /> */}
			{currentTable === "Shows" &&
				(shows.length ? (
					<BasicTable
						cols={showCols}
						data={shows}
						colMap={colMap}
						deleteFunction={deleteShow}
						editFunction={editShow}
						category="shows"
						user={user}
						deletedIdSetter={setDeletedShowID}
					/>
				) : (
					<div className={classes.emptyList}>
						<Typography
							variant="h6"
							sx={{ color: "grey", fontWeight: "bolder" }}
						>
							There are no shows at this time.
						</Typography>
					</div>
				))}
			{currentTable === "Albums" &&
				(albums.length ? (
					<BasicTable
						cols={albumCols}
						data={albums}
						colMap={colMap}
						deleteFunction={deleteAlbum}
						editFunction={editAlbum}
						category="albums"
						user={user}
						deletedIdSetter={setDeletedAlbumID}
					/>
				) : (
					<div className={classes.emptyList}>
						<Typography
							variant="h6"
							sx={{ color: "grey", fontWeight: "bolder" }}
						>
							There are no albums at this time.
						</Typography>
					</div>
				))}
			{currentTable === "Singles" &&
				(singles.length ? (
					<BasicTable
						cols={songCols}
						data={singles}
						colMap={colMap}
						deleteFunction={deleteSong}
						editFunction={editSong}
						category="singles"
						user={user}
						deletedIdSetter={setDeletedSongID}
					/>
				) : (
					<div className={classes.emptyList}>
						<Typography
							variant="h6"
							sx={{ color: "grey", fontWeight: "bolder" }}
						>
							There are no singles at this time.
						</Typography>
					</div>
				))}
			{currentTable === "New Releases" &&
				(newReleases.length ? (
					<BasicTable
						cols={songCols}
						data={newReleases}
						colMap={colMap}
						deleteFunction={deleteSong}
						editFunction={editSong}
						category="new-releases"
						user={user}
						deletedIdSetter={setDeletedSongID}
					/>
				) : (
					<div className={classes.emptyList}>
						<Typography
							variant="h6"
							sx={{ color: "grey", fontWeight: "bolder" }}
						>
							There are no new releases at this time.
						</Typography>
					</div>
				))}
		</div>
	);
};

export default HomePage;
