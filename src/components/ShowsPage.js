import React, { useState } from "react";
import {
	Typography,
	List,
	ListItem,
	Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ShowsForm from "./ShowsForm";
import EditShowsForm from "./EditShowsForm";

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const ShowsPage = ({ venues, showID }) => {
	const [venueType, setVenueType] = useState("Select Venue");
	return (
		<div style={{ width: window.innerWidth < 760 ? "100%" : "50%" }}>
			<DrawerHeader />
			<Typography variant="h3" sx={{ marginBottom: "30px" }}>
				{showID ? "Edit Show" : "Add Show"}
			</Typography>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
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
						onClick={() => setVenueType("Select Venue")}
						sx={{
							display: "flex",
							justifyContent: "center",
							backgroundColor: venueType === "Select Venue" ? "#eee" : "white",
							fontSize: "18px",
						}}
					>
						Select Venue
					</ListItem>
					<Divider
						orientation="vertical"
						flexItem
						sx={{ marginLeft: "0px !important", marginRight: "0px !important" }}
					/>
					<ListItem
						button
						onClick={() => setVenueType("Create New Venue")}
						sx={{
							display: "flex",
							justifyContent: "center",
							backgroundColor:
								venueType === "Create New Venue" ? "#eee" : "white",
							fontSize: "18px",
						}}
					>
						Create New Venue
					</ListItem>
				</List>
				{showID ? (
					<EditShowsForm
						venues={venues}
						venueType={venueType}
						showID={showID}
					/>
				) : (
					<ShowsForm venues={venues} venueType={venueType} />
				)}
			</div>
		</div>
	);
};

export default ShowsPage;
