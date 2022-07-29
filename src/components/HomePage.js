import React, { useState, useEffect } from "react";
import { List, ListItem, Divider, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import BasicTable from "./BasicTable";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector, shallowEqual} from 'react-redux'
import { getAlbums, getShowsWithVenues, getShows, getSingles} from "../actionCreators/getActionCreators";
import { deleteAlbum, deleteShow, deleteSingle} from "../actionCreators/deleteActionCreators";
import { updateAlbum, updateShow, updateSingle} from "../actionCreators/patchActionCreators";
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

const showCols = ["Venue", "Date", "Time", "Ticket Link", "Solo Show"];
const albumCols = ["Name", "URL", "Code"];
const singleCols = ["Name", "URL", "Code"];

const colMap = {
	Name: "name",
	URL: "url",
	Code: "code",
	Venue: "venue_name",
	Date: "date",
	Time: "time",
	"Ticket Link": "ticket_link",
	"Solo Show": "is_solo",
};

const pageUrlMap = {
	"Shows": "shows",
	"Albums": "music",
	"Singles": "music",
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
	const singles = useSelector((state) => state.singles, shallowEqual)

	const [deletedAlbumID, setDeletedAlbumID] = useState(0);
	const [deletedSingleID, setDeletedSingleID] = useState(0);
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
		if (deletedSingleID) {
			console.log("deletedAlbumID: ", deletedSingleID);
			dispatch(getSingles());
			setDeletedSingleID(0);
		}
	}, [deletedAlbumID]);

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

	// const deleteSingle = async (singleID) => {
	// 	axios.delete(API_URL + "/singles").send({
	// 		token: user.token,
	// 		singleID,
	// 	});
	// 	setDeletedSingleID(singleID);
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

	const editSingle = async (singleID) => {
		setPageName("Music");
		navigate("/music?singleID=" + singleID);
	};

	useEffect(() => {
		dispatch(getAlbums());
		dispatch(getSingles());
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
			<Typography sx={{ marginBottom: window.innerWidth < 760 ? "5%" : '0%'}}>
				<a
					href={
						"https://www.greylanhallandthenastykings.com/" +
						pageUrlMap[currentTable]
					}
					target="_blank"
					className={classes.url}
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
			</List>
			{/* <DrawerHeader /> */}
			{currentTable === "Shows" && (
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
			)}
			{currentTable === "Albums" && (
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
			)}
			{currentTable === "Singles" && (
				<BasicTable
					cols={singleCols}
					data={singles}
					colMap={colMap}
					deleteFunction={deleteSingle}
					editFunction={editSingle}
					category="singles"
					user={user}
					deletedIdSetter={setDeletedSingleID}
				/>
			)}
		</div>
	);
};

export default HomePage;
