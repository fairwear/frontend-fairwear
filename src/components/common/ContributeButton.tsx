import { Button, Typography } from "@mui/material";
import "@components/Components.css";

function ContributeButton() {
	return (
		<Button className="contribute-button" variant="contained">
			<Typography variant="h4">Contribute</Typography>
		</Button>
	);
}

export default ContributeButton;
