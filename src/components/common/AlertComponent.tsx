import BannerComponent from "@components/common/BannerComponent";
import ToastComponent from "@components/common/ToastComponent";
import alerts from "@redux/alerts";
import { AlertValue } from "@redux/store/alert/AlertState";

interface DruskininkaiAlertProps {
	alertValue: AlertValue;
	bannerStyle?: React.CSSProperties;
	toastStyle?: React.CSSProperties;
	AlertMessageComponent?: JSX.Element;
}

const DruskinikaiAlert = (props: DruskininkaiAlertProps) => {
	const { alertValue } = props;

	return (
		<>
			{alertValue.alertType === "banner" && (
				<BannerComponent
					key={alertValue.message + alertValue.alertSeverity}
					alertMessage={alertValue.message}
					AlertMessageComponent={props.AlertMessageComponent}
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

export default DruskinikaiAlert;
