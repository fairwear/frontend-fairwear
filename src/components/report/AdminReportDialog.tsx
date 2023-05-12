import { Dialog } from "@mui/material";

interface AdminReportDialogProps {
    open: boolean;
    onClose: () => void;
}   

const AdminReportDialog = (props: AdminReportDialogProps) => {
    return (
        <Dialog open={props.open}>
            <div>
                <h1>Report</h1>
            </div>
        </Dialog>
    );
};

export default AdminReportDialog;