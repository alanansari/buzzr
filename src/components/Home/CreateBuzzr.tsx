"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="flex justify-center">
      <span className="border-[1.5px] border-slate-100 rounded-full mb-3">
        <Button onClick={handleOpen}>Create Buzzr</Button>
      </span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Buzzr
          </Typography>
          <form action="" className="flex flex-col justify-center items-center">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="text-slate-900 my-2 rounded-full p-2"
              required
              autoComplete="off"
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              autoComplete="off"
              className="text-slate-900 my-2 rounded-full p-2"
            />
            <button
              value="submit"
              className="text-slate-100 bg-blue-500 my-2 rounded-full p-2 w-[60%] hover:cursor-pointer hover:bg-blue-600 transition-all duration-300 ease-in-out"
            >
              Submit
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
