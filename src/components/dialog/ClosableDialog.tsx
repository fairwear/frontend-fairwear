import { Dialog, DialogProps, PaperProps } from "@mui/material";
import { useEffect, useRef } from "react";

interface Props extends DialogProps {
	handleDialogClosing: () => void;
	disableBackdropClick?: boolean;
	closeWhenMouseIsOutside?: boolean;
	paperProps?: PaperProps;
	containerClassName?: string;
	constainerStyle?: React.CSSProperties;
	children: any;
}

const ClosableDialog = (props: Props) => {
	const {
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
			{...props}
		>
			<div
				className={props.containerClassName ? props.containerClassName : ""}
				style={{
					...props.constainerStyle,
				}}
				ref={wrapperRef}
			>
				{children}
			</div>
		</Dialog>
	);
};

export default ClosableDialog;
