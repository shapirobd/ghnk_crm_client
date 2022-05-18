import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./components/RegisterPage.js";
import LoginPage from "./components/LoginPage.js";
// import ScrollToTop from "./ScrollToTop";

const LoginRouter = ({user}) => {

	return (
		<Routes>
			<Route
				exact
				path="/register"
				element={user ? <Navigate to="/" /> : <RegisterPage />}
			/>
			<Route
				exact
				path="/"
				element={user ? <Navigate to="/" /> : <LoginPage />}
			/>
		</Routes>
	);
};

export default LoginRouter;
