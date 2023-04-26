import "@components/Components.css";
import { Button, Typography } from "@mui/material";

interface Props {
	handleClick: () => void;
}

function ContributeButton(props: Props) {
	const { handleClick } = props;
	return (
		<Button
			onClick={handleClick}
			className="contribute-button"
			variant="contained"
		>
			<Typography variant="h4">Contribute</Typography>
		</Button>
	);
}

export default ContributeButton;
