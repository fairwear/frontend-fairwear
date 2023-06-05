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
		actionOnUpdate();
	}, [value]);

	return null;
};

export default FormikUseEffect;
