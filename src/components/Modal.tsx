"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import style from "@/utils/modalStyle";

export default function BasicModal(props: {
  btnTitle: string,
  children: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return <>
    <div className="flex justify-center">
      <button onClick={handleOpen} className="text-white font-sm bg-dark-bg rounded-lg w-full  mb-2 mx-auto md:ml-5 p-2">{props.btnTitle}</button>
    </div>

    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="dark:bg-[#27272A] rounded-xl w-4/5 md:w-1/2 p-6 overflow-y-auto max-h-[90vh]">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <div className="font-bold text-center w-full mb-4 dark:text-white">{props.btnTitle}</div>
        </Typography>
        {props.children}
      </Box>
    </Modal>
  </>
}
