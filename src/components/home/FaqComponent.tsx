import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Typography,
} from "@mui/material";
import "./HomeComponents.css";
import { KeyboardArrowDownRounded } from "@mui/icons-material";

interface FaqComponentProps {
	question: string;
	answer: string;
}

const FaqComponent = (props: FaqComponentProps) => {
	return (
		<Accordion className="faq-accordion">
			<div>
				<AccordionSummary
					style={{ marginLeft: "-8px", height: "96px" }}
					expandIcon={
						<KeyboardArrowDownRounded
							className="accordion-icon"
							style={{
								padding: "8px",
							}}
						/>
					}
				>
					<div className="question-container">
						<Typography
							fontWeight="bold"
							style={{
								color: "#202020",
								fontSize: "18px",
								lineHeight: "22px",
							}}
						>
							{props.question}
						</Typography>
					</div>
				</AccordionSummary>
			</div>
			<AccordionDetails style={{ backgroundColor: "#F4F4F4" }}>
				<div className="answer-container">
					<Typography>{props.answer}</Typography>
				</div>
			</AccordionDetails>
		</Accordion>
	);
};

export default FaqComponent;
