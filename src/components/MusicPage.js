import React, { useState } from "react";
import {
	Typography,
	List,
	ListItem,
	Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SongForm from "./SongForm";
import AlbumForm from "./AlbumForm";
import EditSongForm from "./EditSongForm";
import EditAlbumForm from "./EditAlbumForm";
import { useSelector } from "react-redux";

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const MusicPage = ({albumID, songID}) => {
	const user = useSelector((state) => state.user);
	const [venueType, setVenueType] = useState("Add Single");
	const [newSongValues, setNewSongValues] = useState({
		name: "",
		url: "",
	});
	const [newAlbumValues, setNewAlbumValues] = useState({
		name: "",
		url: "",
	});
	return (
		<div style={{ width: window.innerWidth < 760 ? "100%" : "50%" }}>
			<DrawerHeader />
			<Typography variant="h3" sx={{ marginBottom: "30px" }}>
				{albumID && "Edit Album"}
				{songID && "Edit Song"}
				{!albumID && !songID ? "Add Music" : ""}
			</Typography>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{!albumID && !songID && (
					<List
						sx={{
							display: "flex",
							alignItems: "center",
							width: "97%",
							marginBottom: "8px",
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
							onClick={() => setVenueType("Add Single")}
							sx={{
								display: "flex",
								justifyContent: "center",
								backgroundColor: venueType === "Add Single" ? "#eee" : "white",
								fontSize: "18px",
							}}
						>
							Add Single
						</ListItem>
						<Divider
							orientation="vertical"
							flexItem
							sx={{
								marginLeft: "0px !important",
								marginRight: "0px !important",
							}}
						/>
						<ListItem
							button
							onClick={() => setVenueType("Add New Release")}
							sx={{
								display: "flex",
								justifyContent: "center",
								backgroundColor: venueType === "Add New Release" ? "#eee" : "white",
								fontSize: "18px",
							}}
						>
							Add New Release
						</ListItem>
						<Divider
							orientation="vertical"
							flexItem
							sx={{
								marginLeft: "0px !important",
								marginRight: "0px !important",
							}}
						/>
						<ListItem
							button
							onClick={() => setVenueType("Add Album")}
							sx={{
								display: "flex",
								justifyContent: "center",
								backgroundColor: venueType === "Add Album" ? "#eee" : "white",
								fontSize: "18px",
							}}
						>
							Add Album
						</ListItem>
					</List>
				)}
				{!songID && !albumID ? (
					venueType === "Add Album" ? (
						<AlbumForm
							user={user}
							newAlbumValues={newAlbumValues}
							setNewAlbumValues={setNewAlbumValues}
						/>
					) : (
						<SongForm
							user={user}
							category={venueType === "Add New Release" ? "New Release" : "Single"}
							newSongValues={newSongValues}
							setNewSongValues={setNewSongValues}
						/>
					)
				) : songID ? (
					<EditSongForm
						user={user}
						songID={songID}
					/>
				) : (
					<EditAlbumForm
						user={user}
						albumID={albumID}
					/>
				)}
			</div>
		</div>
	);
};

export default MusicPage;
