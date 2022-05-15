import {
	Select,
	FormControl,
	InputLabel,
	MenuItem,
	Typography,
} from "@mui/material";
import React from "react";

const SelectVenueSection = ({
	selectedVenue,
	handleVenueChange,
	venues,
	missingFields,
}) => {
	return (
		<FormControl fullWidth sx={{ m: 1 }} variant="outlined">
			<InputLabel id="demo-simple-select-label">Venue</InputLabel>
			<Select
				displayEmpty
				value={selectedVenue}
				onChange={handleVenueChange}
				label="Venue"
				inputProps={{ "aria-label": "Without label" }}
				defaultValue="Select Venue..."
			>
				{venues.map((venue) => (
					<MenuItem
						key={venue.id}
						value={venue.name}
						name={venue.name}
						id={"venue_" + venue.id}
						className="venueOption"
						// style={getStyles(name, personName, theme)}
					>
						{venue.name}
					</MenuItem>
				))}
			</Select>
			{missingFields.includes("venueID") && (
				<Typography variant="caption" sx={{ color: "red", textAlign: "left" }}>
					Venue is required
				</Typography>
			)}
		</FormControl>
	);
};

export default SelectVenueSection;
