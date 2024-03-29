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
import { login } from "../actionCreators/userActionCreators";
// import { getVenueNames } from "../actionCreators/showsActionCreators";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import logo from '../images/logo_vector.png'
import {useStyles} from './LoginPageStyles';

export default function LoginPage() {
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

	const handleRegisterButton = (event) => {
		event.preventDefault();
		navigate('/register')
	}

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
				<div style={{ width: "100%" }}>
					<img
						src={logo}
						className={
							window.innerWidth < 1060 ? classes.logoMobile : classes.logo
						}
					/>
					{/* <Typography variant="h3" sx={{ marginBottom: "20px" }}>
						Login
					</Typography> */}
					<form
						onSubmit={(e) => handleSubmit(e)}
						className={
							window.innerWidth < 760 ? classes.formMobile : classes.form
						}
					>
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
								<b>Login</b>
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
								onClick={(e) => handleRegisterButton(e)}
							>
								<b>Register</b>
							</Button>
						</FormControl>
					</form>
				</div>
			</Box>
		</ThemeProvider>
	);
}
