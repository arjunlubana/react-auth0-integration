import { Outlet } from "react-router-dom";
export default function ProfileOverview({ userData }) {
	return (
		<div>
			<h1>Profile Overview</h1>
			<Outlet></Outlet>
		</div>
	);
}
