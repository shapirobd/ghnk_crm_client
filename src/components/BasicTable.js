import React, {useEffect, useState} from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {useDispatch} from 'react-redux';
import SimpleDialog from './SimpleDialog';

const BasicTable = ({
	cols,
	data,
	colMap,
	deleteFunction,
	editFunction,
	category,
	user,
	deletedIdSetter,
}) => {
	const dispatch = useDispatch();
	console.log("rednering BasicTable");

	if (category == "shows") {
		console.log("*** SHOWS DATA *** ", data);
	}

	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [deletedRowId, setDeletedRowId] = useState(-1);

	function handleShowDelete(rowId) {
		setDeletedRowId(rowId)
	}

	useEffect(() => {
		if (deletedRowId > -1) {
			setOpenDeleteDialog(true);
		}
	}, [deletedRowId])

	return (
		<TableContainer component={Paper}>
			<SimpleDialog
				open={openDeleteDialog}
				setOpen={setOpenDeleteDialog}
				deleteFunction={deleteFunction}
				user={user}
				rowId={deletedRowId}
				deletedIdSetter={deletedIdSetter}
			/>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						{cols.map((col) => (
							<TableCell key={col} align="left">
								{col}
							</TableCell>
						))}
						<TableCell align="left" id="trash-column"></TableCell>
						<TableCell align="left" id="edit-column"></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((row) => (
						<TableRow
							key={category + "_" + row.id}
							name={category + "_" + row.id}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							{cols.map((col) => (
								<TableCell key={category + "_" + col} align="left">
									{row[colMap[col]]}
								</TableCell>
							))}
							<TableCell align="left">
								<IconButton
									onClick={() => {
										console.log(row.id);
										if (category === "shows") {
											handleShowDelete(row.id);
										} else {
											dispatch(deleteFunction(user, row.id, deletedIdSetter));
										}
									}}
								>
									<DeleteIcon sx={{ color: "red" }} />
								</IconButton>
							</TableCell>
							<TableCell align="left">
								<IconButton onClick={() => editFunction(row.id)}>
									<EditIcon sx={{ color: "grey" }} />
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default BasicTable;
