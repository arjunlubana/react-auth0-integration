import { Outlet, useOutletContext } from "react-router-dom";

export default function ProfileOverview() {
	const data = useOutletContext()
	return (
		<div>
			<h1>Profile Overview</h1>
			{
				JSON.stringify(data)
			}
		</div>
	);
}
