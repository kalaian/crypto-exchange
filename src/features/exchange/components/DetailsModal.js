import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DetailsModal = ({ highPrice, lowPrice, volume }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Open details
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Symbol details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Previous high price: {highPrice}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Previous low price: {lowPrice}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Volume: {volume}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default DetailsModal;
