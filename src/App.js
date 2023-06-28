import MiniDrawer from "./components/MiniDrawer";
import "./App.css";
import { useSelector } from "react-redux";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import React, { useState } from "react";
import LoginRouter from './LoginRouter'
import { ToastContainer, toast } from "react-toastify";
import DarkModeToggle from "react-dark-mode-toggle";

function App() {
	const user = useSelector((state) => state.user);
	const [pageName, setPageName] = useState("Home");
	const [isDarkMode, setIsDarkMode] = useState(() => false);
	console.log("IN APP")

	return (
		<div className="App">
			<header
				className={
					(pageName === "Home" || pageName === "Shows") && user
						? isDarkMode
							? "App-header-align-top-dark"
							: "App-header-align-top"
						: isDarkMode
						? "App-header-dark"
						: "App-header"
				}
				style={{ height: window.innerHeight }}
			>
				{user ? (
					<MiniDrawer
						pageName={pageName}
						setPageName={setPageName}
						user={user}
						isDarkMode={isDarkMode}
						setIsDarkMode={setIsDarkMode}
					/>
				) : (
					<LoginRouter />
				)}
			</header>
			<ToastContainer />
		</div>
	);
}

export default App;
