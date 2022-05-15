import React, { useState } from "react";
import {
	Box,
	InputLabel,
	FormControl,
	OutlinedInput,
	InputAdornment,
	IconButton,
	Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ThemeProvider, createTheme } from "@mui/material/styles";
// import { useStyles } from "./ShowsFormStyles";
import Theme from "./ShowsFormTheme";
import { login } from "../actionCreators/userActionCreators";
// import { getVenueNames } from "../actionCreators/showsActionCreators";
import { useSelector, useDispatch } from "react-redux";

export default function LoginPage() {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const theme = createTheme(Theme);
	// const classes = useStyles();
	// const [venueNames, setVenueNames] = useState([]);
	const [values, setValues] = useState({
		username: "",
		password: "",
	});
	const [invalidLogin, setInvalidLogin] = useState(undefined);

	const handleSubmit = (e) => {
		console.log(values);
		e.preventDefault();
		dispatch(login(values));
		setTimeout(() => {
			if (!user) {
				setInvalidLogin(true);
			} else {
				setInvalidLogin(false);
			}
		}, 1000);
	};

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	// useEffect(() => {
	// 	const getVenueNames = async () => {
	// 		const resp = await axios.get(`http://localhost:5000/shows`, {
	// 			params: {
	// 				// ids: bookmarks.join(","),
	// 				apiKey: process.env.REACT_APP_SPOON_API_KEY,
	// 			},
	// 		});
	// 		setVenueNames(resp.data);
	// 	};
	// 	getVenueNames();
	// }, []);

	return (
		<ThemeProvider theme={theme}>
			<Box
				sx={{
					display: "flex",
					flexWrap: "wrap",
				}}
			>
				<div>
					<form onSubmit={(e) => handleSubmit(e)}>
						<FormControl fullWidth sx={{ m: 1 }} variant="outlined">
							<InputLabel htmlFor="outlined-adornment-password">
								Username
							</InputLabel>
							<OutlinedInput
								id="outlined-adornment-password"
								value={values.username}
								onChange={handleChange("username")}
								label="Username"
							/>
						</FormControl>
						<FormControl fullWidth sx={{ m: 1 }} variant="outlined">
							<InputLabel htmlFor="outlined-adornment-password">
								Password
							</InputLabel>
							<OutlinedInput
								id="outlined-adornment-password"
								type={values.showPassword ? "text" : "password"}
								value={values.password}
								onChange={handleChange("password")}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{values.showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
								label="Password"
							/>
						</FormControl>
						<FormControl fullWidth sx={{ m: 1, width: "50%" }}>
							<Button
								variant="contained"
								type="submit"
								sx={{ backgroundColor: "#87C4F7" }}
								// onClick={(e) => handleSubmit(e)}
							>
								Login
							</Button>
						</FormControl>
					</form>
				</div>
			</Box>
		</ThemeProvider>
	);
}
