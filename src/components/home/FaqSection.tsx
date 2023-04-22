import FaqComponent from "@components/home/FaqComponent";
import { Button, Typography } from "@mui/material";

interface FaqSectionProps {}

const questionsAndAnswers = [
	{
		question: "What is the difference between a 4K and 8K TV?",
		answer: "IDK",
	},
	{
		question: "What is the difference between a 4K and 8K TV?",
		answer: "IDK",
	},
	{
		question: "What is the difference between a 4K and 8K TV?",
		answer: "IDK",
	},
	{
		question: "What is the difference between a 4K and 8K TV?",
		answer: "IDK",
	},
	{
		question: "What is the difference between a 4K and 8K TV?",
		answer: "IDK",
	},
	{
		question: "What is the difference between a 4K and 8K TV?",
		answer: "IDK",
	},
];

const FaqSection = (props: FaqSectionProps) => {
	return (
		<div className="faq-section-container">
			<div className="faq-section-title-container">
				<Typography variant="h1">Frequently Asked Questions</Typography>
				<Typography
					variant="subtitle1"
					style={{
						maxWidth: "60%",
					}}
				>
					Frequently asked questions ordered by popularity. Remember that if the
					visitor has not committed to the call to action, they may still have
					questions (doubts) that can be answered.
				</Typography>
			</div>

			<div className="faq-section-accordion-container">
				{questionsAndAnswers.map((questionAndAnswer, index) => (
					<FaqComponent
						key={index}
						question={questionAndAnswer.question}
						answer={questionAndAnswer.answer}
					/>
				))}
			</div>
			<div className="faq-section-contact-container">
				<Typography variant="h2">Still have questions?</Typography>
				<Typography variant="subtitle1">
					Support details to capture customers that might be on the fence.
				</Typography>
				<Button variant="outlined">Contact Us</Button>
			</div>
		</div>
	);
};

export default FaqSection;
