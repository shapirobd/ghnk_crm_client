import React, { useState } from "react";
import {
	Box,
	InputLabel,
	FormControl,
	OutlinedInput,
	InputAdornment,
	IconButton,
	Button,
  Typography
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ThemeProvider, createTheme } from "@mui/material/styles";
// import { useStyles } from "./ShowsFormStyles";
import Theme from "./ShowsFormTheme";
import { register } from "../actionCreators/userActionCreators";
// import { getVenueNames } from "../actionCreators/showsActionCreators";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { useStyles } from "./LoginPageStyles";

export default function RegisterPage() {
	const classes = useStyles();
  const navigate = useNavigate();
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const theme = createTheme(Theme);
	// const classes = useStyles();
	// const [venueNames, setVenueNames] = useState([]);
	const [values, setValues] = useState({
		username: "",
		password: "",
		first_name: "",
		last_name: "",
	});
	const [invalidLogin, setInvalidLogin] = useState(undefined);

	const handleSubmit = (e) => {
		console.log(values);
		e.preventDefault();
		dispatch(register(values));
		setTimeout(() => {
			if (!user) {
				setInvalidLogin(true);
			} else {
				setInvalidLogin(false);
        navigate('/')
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

	const handleBackToLoginButton = (event) => {
		event.preventDefault();
		navigate("/");
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
					width: window.innerWidth < 760 ? "90%" : "50%",
				}}
			>
				<div>
					<Typography variant="h3" sx={{ marginBottom: "20px" }}>
						Register
					</Typography>
					<form
						onSubmit={(e) => handleSubmit(e)}
						className={
							window.innerWidth < 760 ? classes.formMobile : classes.form
						}
					>
						<FormControl fullWidth sx={{ margin: "8px 0" }} variant="outlined">
							<InputLabel htmlFor="outlined-adornment-password">
								First Name
							</InputLabel>
							<OutlinedInput
								id="outlined-adornment-password"
								value={values.first_name}
								onChange={handleChange("first_name")}
								label="First Name"
							/>
						</FormControl>
						<FormControl fullWidth sx={{ margin: "8px 0" }} variant="outlined">
							<InputLabel htmlFor="outlined-adornment-password">
								Last Name
							</InputLabel>
							<OutlinedInput
								id="outlined-adornment-password"
								value={values.last_name}
								onChange={handleChange("last_name")}
								label="Last Name"
							/>
						</FormControl>
						<FormControl fullWidth sx={{ margin: "8px 0" }} variant="outlined">
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
						<FormControl fullWidth sx={{ margin: "8px 0" }} variant="outlined">
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
						<FormControl fullWidth sx={{ margin: "8px 0", width: "100%" }}>
							<Button
								variant="contained"
								type="submit"
								sx={{
									backgroundColor: "#1876D1",
									boxShadow: "none",
									"&:hover": { backgroundColor: "#3B87F3", boxShadow: "none" },
									"&:active": { boxShadow: "none" },
								}}
								// onClick={(e) => handleSubmit(e)}
							>
								<b>Submit</b>
							</Button>
						</FormControl>
						<FormControl fullWidth sx={{ margin: "8px 0", width: "100%" }}>
							<Button
								variant="contained"
								type="submit"
								sx={{
									backgroundColor: "#3B3",
									boxShadow: "none",
									"&:hover": { backgroundColor: "#5C5", boxShadow: "none" },
									"&:active": { boxShadow: "none" },
								}}
								onClick={(e) => handleBackToLoginButton(e)}
							>
								<b>Back to login page</b>
							</Button>
						</FormControl>
					</form>
				</div>
			</Box>
		</ThemeProvider>
	);
}
