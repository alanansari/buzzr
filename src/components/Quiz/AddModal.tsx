// modal for add question

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#202020",
    border: "2px solid #eee",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
};

function AddModal(props: {
    btnTitle: string,
    children: React.ReactNode
    open: boolean
    setOpen: any
}) {
    function handleClose() {
        props.setOpen(false)
    }

    return <>
        <div className="flex justify-center">
            <Modal
                open={props.open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {props.btnTitle}
                    </Typography>
                    {props.children}
                </Box>
            </Modal>
        </div>
    </>
}

export default AddModal