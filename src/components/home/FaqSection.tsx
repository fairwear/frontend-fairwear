import FaqComponent from "@components/home/FaqComponent";
import { Button, Typography } from "@mui/material";

interface FaqSectionProps {}

const questionsAndAnswers = [
	{
		question: "What is Fairwear and what does it aim to achieve?",
		answer:
			"Fairwear is a crowdsourcing platform dedicated to providing information about ethical fashion purchasing, thus helping consumers make informed decisions. Our goal is to raise awareness and promote transparency in the fashion industry by highlighting ethical and moral issues within the them.",
	},
	{
		question: "How does Fairwear gather information about brands?",
		answer:
			"Fairwear relies on a collaborative approach to gather information about brands. We encourage users to contribute by sharing their experiences, research, and insights regarding various fashion brands through posts.",
	},
	{
		question: "Why is it important to support ethical fashion brands?",
		answer:
			"Supporting ethical fashion brands helps protect workers' rights, prevents child labor, improves working conditions, and promotes sustainable practices. By making informed purchasing decisions, you can contribute to positive change in the fashion industry and encourage brands to adopt ethical practices.",
	},
	{
		question: "Does Fairwear endorse or promote specific brands?",
		answer:
			"Fairwear does not endorse or promote any specific brands. We provide information to help consumers make informed decisions based on their personal values and ethics. Our goal is to encourage transparency and accountability across the fashion industry.",
	},
	{
		question: "How reliable is the information provided on Fairwear",
		answer:
			"Fairwear relies on user-generated content, and while we strive to ensure accuracy, we cannot independently verify every piece of information. We encourage users to provide credible sources and evidence to support their claims. It is important to review multiple sources and exercise your judgment when assessing the credibility of information.",
	},
	{
		question:
			"Can I report a brand to Fairwear if I suspect unethical practices?",
		answer:
			"Yes, you can report a brand to Fairwear if you suspect unethical practices. It is our main functionality that users share their own experience and expertise through posting on the website. Therefore, if you notice a brand that is not in our database we strongly encourage you to gather information and make a post about it.",
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
