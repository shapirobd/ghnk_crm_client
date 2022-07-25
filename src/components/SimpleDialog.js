import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";

function SimpleDialog({
	open,
	setOpen,
	deleteFunction,
	user,
	rowId,
	deletedIdSetter,
}) {
  const dispatch = useDispatch();

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				{'Would you like to add this show to the "Previous Shows" list?'}
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					This show will still be deleted as an "Upcoming Show", but will appear
					in the "Previous Shows" section on the Shows page instead.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => {
            dispatch(deleteFunction(user, rowId, deletedIdSetter));
            handleClose()
          }}>
            No
          </Button>
				<Button
					onClick={() => {
						dispatch(deleteFunction(user, rowId, deletedIdSetter, true));
            handleClose();
					}}
					autoFocus
				>
					Yes
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default SimpleDialog;
