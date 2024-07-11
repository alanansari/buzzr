"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  color:"white",
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

export default function BasicModal(props:{
  btnTitle: string,
  children: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="flex justify-center">
      <button onClick={handleOpen} className="text-white font-sm bg-dark-bg rounded-lg w-[95%] mx-auto md:ml-5 p-2">{props.btnTitle}</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.btnTitle}
          </Typography>
          {props.children}
        </Box>
      </Modal>
    </div>
  );
}
