import { Dialog, PaperProps } from "@mui/material";
import { useEffect, useRef } from "react";

interface Props {
	open?: boolean;
	handleDialogClosing: () => void;
	disableBackdropClick?: boolean;
	closeWhenMouseIsOutside?: boolean;
	paperProps?: PaperProps;
	children: any;
}

const ClosableDialog = (props: Props) => {
	const {
		open = true,
		handleDialogClosing,
		closeWhenMouseIsOutside = true,
		disableBackdropClick = false,
		paperProps,
		children,
	} = props;
	const wrapperRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: any) {
			if (event?.target && closeWhenMouseIsOutside) {
				if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
					handleDialogClosing();
				}
			}
		}

		if (!disableBackdropClick) {
			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				// Unbind the event listener on clean up
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}
	}, [
		handleDialogClosing,
		closeWhenMouseIsOutside,
		wrapperRef,
		disableBackdropClick,
	]);

	return (
		<Dialog
			scroll={paperProps ? "paper" : undefined}
			PaperProps={paperProps}
			open={open}
		>
			<div ref={wrapperRef}>{children}</div>
		</Dialog>
	);
};

export default ClosableDialog;
