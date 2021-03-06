import { forwardRef } from "react";
import { useHref, useLinkClickHandler } from "react-router-dom";
import Link from "@mui/material/Link";

const CustomLink = forwardRef(
	({ onClick, replace = false, state, target, to, ...rest }, ref) => {
		let href = useHref(to);
		let handleClick = useLinkClickHandler(to, {
			replace,
			state,
			target,
		});

		return (
			<Link
				{...rest}
				href={href}
				onClick={(event) => {
					onClick?.(event);
					if (!event.defaultPrevented) {
						handleClick(event);
					}
				}}
				ref={ref}
				target={target}
			/>
		);
	}
);

export default CustomLink;
