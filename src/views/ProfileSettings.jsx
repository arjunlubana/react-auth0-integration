import { useOutletContext } from "react-router-dom";

export default function ProfileSettings() {
	const data = useOutletContext()
	return (
		<div>
			Profile Settings
			{
				JSON.stringify(data.app_metadata)
			}
		</div>
	)
}