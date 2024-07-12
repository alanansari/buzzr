import { Box, Modal } from "@mui/material"
import style from "@/utils/modalStyle"
import ClientImage from "@/components/ClientImage"

export default function EndGame({ open, setOpen, onClick }: { open: boolean, setOpen: any, onClick: any }) {
    return <>
        <Modal
            open={open}
            onClose={() => { setOpen(false) }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className="dark:bg-[#27272A] rounded-xl w-4/5 sm:w-3/5 md:w-2/5">
                <div className="p-6 flex flex-col justify-center items-center">
                    <ClientImage props={{ src: "/endGame.svg", alt: "End game", width: 140, height: 140 }} />
                    <p className="text-xl font-bold mb-2 dark:text-white">Are you sure?</p>
                    <p className="text-[#4E4E56] mb-4 dark:text-white text-center">Do you really want to stop this quiz session ? This action cannot be undone.</p>

                    <div className="w-full grid md:grid-cols-2 md:gap-x-4 gap-y-4 md:gap-y-0">
                        <button onClick={() => { setOpen(false) }} className="text-white bg-red-light rounded-lg py-2">
                            Cancel
                        </button>
                        <button onClick={onClick} className="bg-white text-red-light dark:text-red-dark dark:border-red-dark border-2 font-semibold py-2 border-red-light rounded-lg dark:bg-[#27272A]">
                            Submit
                        </button>
                    </div>
                </div>
                {/* {props.children} */}
            </Box>
        </Modal>
    </>
}