import React from "react";
import {
	FormControl,
	InputLabel,
	OutlinedInput,
	Typography,
} from "@mui/material";

const CreateVenueSection = ({
	newVenueValues,
	handleNewVenueChange,
	missingFields,
}) => {
	return (
		<>
			<FormControl fullWidth sx={{ m: 1 }} variant="outlined">
				<InputLabel htmlFor="venu_name">Venue Name</InputLabel>
				<OutlinedInput
					id="venu_name"
					// type="time"
					value={newVenueValues.name}
					onChange={(e) => handleNewVenueChange(e, "name")}
					label="Venue Name"
				/>
				{missingFields.includes("name") && (
					<Typography
						variant="caption"
						sx={{ color: "red", textAlign: "left" }}
					>
						Venue Name is required
					</Typography>
				)}
			</FormControl>
			<FormControl fullWidth sx={{ m: 1 }} variant="outlined">
				<InputLabel htmlFor="venue_address">Address</InputLabel>
				<OutlinedInput
					id="venue_address"
					// type="time"
					value={newVenueValues.address}
					onChange={(e) => handleNewVenueChange(e, "address")}
					label="Address"
				/>
				{missingFields.includes("address") && (
					<Typography
						variant="caption"
						sx={{ color: "red", textAlign: "left" }}
					>
						Address is required
					</Typography>
				)}
			</FormControl>
			<FormControl fullWidth sx={{ m: 1 }} variant="outlined">
				<InputLabel htmlFor="venue_city">City</InputLabel>
				<OutlinedInput
					id="venue_city"
					// type="time"
					value={newVenueValues.city}
					onChange={(e) => handleNewVenueChange(e, "city")}
					label="City"
				/>
				{missingFields.includes("city") && (
					<Typography
						variant="caption"
						sx={{ color: "red", textAlign: "left" }}
					>
						City is required
					</Typography>
				)}
			</FormControl>
			<FormControl fullWidth sx={{ m: 1 }} variant="outlined">
				<InputLabel htmlFor="venue_state">State</InputLabel>
				<OutlinedInput
					id="venue_state"
					// type="time"
					value={newVenueValues.state}
					onChange={(e) => handleNewVenueChange(e, "state")}
					label="State"
				/>
				{missingFields.includes("state") && (
					<Typography
						variant="caption"
						sx={{ color: "red", textAlign: "left" }}
					>
						State is required
					</Typography>
				)}
			</FormControl>
			<FormControl fullWidth sx={{ m: 1 }} variant="outlined">
				<InputLabel htmlFor="venue_link">Link</InputLabel>
				<OutlinedInput
					id="venue_link"
					// type="time"
					value={newVenueValues.link}
					onChange={(e) => handleNewVenueChange(e, "link")}
					label="Link"
				/>
				{missingFields.includes("link") && (
					<Typography
						variant="caption"
						sx={{ color: "red", textAlign: "left" }}
					>
						Link is required
					</Typography>
				)}
			</FormControl>
		</>
	);
};

export default CreateVenueSection;
