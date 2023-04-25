import BannerComponent from "@components/alert/BannerComponent";
import ToastComponent from "@components/alert/ToastComponent";
import alerts from "@redux/alerts";
import { AlertValue } from "@redux/store/alert/AlertState";

interface AlertComponentProps {
	alertValue: AlertValue;
	bannerStyle?: React.CSSProperties;
	toastStyle?: React.CSSProperties;
	alertMessageComponent?: JSX.Element;
}

const AlertComponent = (props: AlertComponentProps) => {
	const { alertValue } = props;

	return (
		<>
			{alertValue.alertType === "banner" && (
				<BannerComponent
					key={alertValue.message + alertValue.alertSeverity}
					alertMessage={alertValue.message}
					AlertMessageComponent={props.alertMessageComponent}
					severity={alertValue.alertSeverity}
					actionTitle={alertValue.actionTitle}
					alertAction={alertValue.alertAction}
					closeAlert={() => alerts.remove(alertValue)}
					hasCloseButton={alertValue.hasCloseButton}
					sx={props.bannerStyle}
				/>
			)}

			{alertValue.alertType !== "banner" && (
				<ToastComponent
					closeAlert={() => alerts.remove(alertValue)}
					key={alertValue.message + alertValue.alertSeverity}
					alertMessage={alertValue.message}
					severity={alertValue.alertSeverity}
					sx={props.toastStyle}
				/>
			)}
		</>
	);
};

export default AlertComponent;
