import MiniDrawer from "./components/MiniDrawer";
import "./App.css";
import { useSelector } from "react-redux";
import LoginPage from "./components/LoginPage";
import React, { useState } from "react";

function App() {
	const user = useSelector((state) => state.user);
	const [pageName, setPageName] = useState("Home");
	console.log("IN APP")

	return (
		<div className="App">
			<header
				className={
					pageName === "Home" && user ? "App-header-align-top" : "App-header"
				}
			>
				{user ? (
				<MiniDrawer pageName={pageName} setPageName={setPageName} user={user} />
				) : (
				<LoginPage />)}
			</header>
		</div>
	);
}

export default App;
