import { useFormikContext } from "formik";
import { useEffect } from "react";

export default function AutoSubmitToken() {
	const { isValid, submitForm, values } = useFormikContext();
	useEffect(() => {
		if (isValid) {
			setTimeout(() => {
				submitForm();
			});
		}
	}, [isValid, submitForm, values]);
	return null;
}
