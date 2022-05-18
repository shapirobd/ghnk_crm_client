import React from "react";
import { Routes, Route, Navigate, useLocation} from "react-router-dom";
import HomePage from "./components/HomePage.js";
import ShowsPage from "./components/ShowsPage.js";
import MusicPage from "./components/MusicPage.js";
import RegisterPage from "./components/RegisterPage.js";
// import ScrollToTop from "./ScrollToTop";

const useQuery = () => {
	const { search } = useLocation();

	return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Router = ({ mobile, user, venues, pageName, setPageName }) => {
  // const [pageName, setPageName] = useState("Home");
  let query = useQuery();
  console.log("query: ", query)
	let showID = query.get("showID");
	let albumID = query.get("albumID");
	let singleID = query.get("singleID");
  console.log("showID: ", showID)
  console.log("albumID: ", albumID);
  console.log("singleID: ", singleID);
	
	// useEffect(() => {
	// 	navigate(pathMap[pageName]);
	// }, [pageName]);

	return (
		<Routes>
			<Route
				exact
				path="/"
				element={<HomePage user={user} setPageName={setPageName} />}
			/>
			<Route
				exact
				path="/register"
				element={user ? <Navigate to="/" /> : <RegisterPage />}
			/>
			<Route
				exact
				path="/shows"
				element={<ShowsPage venues={venues} showID={showID} />}
			/>
			<Route
				exact
				path="/music"
				element={<MusicPage albumID={albumID} singleID={singleID} />}
			/>
		</Routes>
	);
};

export default Router;
