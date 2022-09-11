import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
// import ShowsPage from "./ShowsPage";
// import HomePage from "./HomePage";
// import MusicPage from "./MusicPage";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actionCreators/userActionCreators";
import { getVenues } from "../actionCreators/getActionCreators";
import Router from '../Router'
import axios from "axios";

const drawerWidth = 240;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const pathMap = {
	Home: "/",
	Shows: "/shows",
	Music: "/music"
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

export default function MiniDrawer({ pageName, setPageName, user }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const theme = useTheme();
	const [open, setOpen] = useState(false);
	// const [pageName, setPageName] = useState("Home");
	const venues = useSelector((state) => state.venues)

	useEffect(() => {
		dispatch(getVenues());
	}, []);

	// const pageMap = {
	// 	Home: <HomePage user={user} />,
	// 	Shows: <ShowsPage venues={venues} />,
	// 	Music: <MusicPage />,
	// };

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	// useEffect(() => {
	// 	navigate(pathMap[pageName])
	// }, [pageName])

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
		navigate("/");
	};

	return (
		<Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
			<CssBaseline />
			<AppBar position="fixed" open={open}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{
							marginRight: 5,
							...(open && { display: "none" }),
						}}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						Greylan Hall and The Nasty Kings - Content Management
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer variant="permanent" open={open} sx={{ display: window.innerWidth < 760 && !open ? "none" : "block" }}>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === "rtl" ? (
							<ChevronRightIcon />
						) : (
							<ChevronLeftIcon />
						)}
					</IconButton>
				</DrawerHeader>
				<Divider />
				{user.is_admin &&
					<>
						<List>
							{["Home", "Shows", "Music"].map((text, index) => (
								<ListItemButton
									key={text}
									sx={{
										minHeight: 48,
										justifyContent: open ? "initial" : "center",
										px: 2.5,
									}}
									onClick={() => {
										if (window.innerWidth < 760) {
											handleDrawerClose();
										}
										setPageName(text); 
										navigate(pathMap[text]);
									}}
								>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: open ? 3 : "auto",
											justifyContent: "center",
										}}
									>
										{index === 0 && <HomeIcon />}
										{index === 1 && <ConfirmationNumberIcon />}
										{index === 2 && <LibraryMusicIcon />}
									</ListItemIcon>
									<ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
								</ListItemButton>
							))}
						</List>
						<Divider />
					</>
				}
				<List>
					{["Logout"].map((text, index) => (
						<ListItemButton
							key={text}
							sx={{
								minHeight: 48,
								justifyContent: open ? "initial" : "center",
								px: 2.5,
							}}
							onClick={(e) => handleLogout(e)}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : "auto",
									justifyContent: "center",
								}}
							>
								{index === 0 && <LogoutIcon />}
							</ListItemIcon>
							<ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
						</ListItemButton>
					))}
				</List>
			</Drawer>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					p: 3,
					width: window.innerWidth < 760 ? "100%" : "50%",
					display: "flex",
					justifyContent: "center",
					alignItems: pageName === "Home" ? "start" : "center",
				}}
			>
				{/* {pageMap[pageName]} */}
			{user.is_admin ?
				<Router user={user} venues={venues} pageName={pageName} setPageName={setPageName}/>
					:
				<div style={{ 
							width: window.innerWidth < 760 ? "100%" : "50%", 
							height: "90vh", 
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center" }}>
					<Typography variant="h6">You must be an admin to have read/write access to this content.</Typography>
				</div>
			}
			</Box>
		</Box>
	);
}
