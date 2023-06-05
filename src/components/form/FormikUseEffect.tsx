import { useFormikContext } from "formik";
import { useEffect } from "react";

interface FormikGetStateUpdatesProps {
	value: any;
	actionOnUpdate: () => void;
}

const FormikUseEffect = (props: FormikGetStateUpdatesProps) => {
	const { value, actionOnUpdate } = props;

	const formikContext = useFormikContext();
	useEffect(() => {
		console.log(formikContext.values);
		actionOnUpdate();
	}, [value]);

	return null;
};

export default FormikUseEffect;
