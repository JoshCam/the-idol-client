import {
  Box,
  Button,
  Container,
  FormControl,
  Input,
  Modal,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { API_BASE_URL } from "../../config";
import axios from "axios";
import Joi from "joi";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddTeamModal = () => {
  const [teamName, setTeamName] = useState("");
  const [validationError, setValidationError] = useState("");

  // Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const schema = Joi.object({
    teamName: Joi.string().alphanum().required(),
  });

  const createTeam = async (): Promise<void> => {
    const validation = schema.validate({ teamName: teamName });

    // If fails validation show error and return out
    if (validation.error) {
      setValidationError(validation.error as unknown as string);
      return;
    }

    // Save new team to DB
    await axios.post(`${API_BASE_URL}/teams`, {
      teamName,
    });

    // reload window so that new team is instantly visible
    window.location.reload();
    handleClose();
  };

  return (
    <>
      <Button onClick={handleOpen}>Add Team</Button>
      {/* MODAL */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Team
          </Typography>
          <Typography>Team Name</Typography>
          <FormControl>
            {validationError ? (
              <Typography>{`${validationError}`}</Typography>
            ) : null}
            <Input
              id="team-name"
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Team Name"
            />
            <Container>
              <Button onClick={createTeam}>Save</Button>
              <Button onClick={() => handleClose()}>Cancel</Button>
            </Container>
          </FormControl>
        </Box>
      </Modal>
    </>
  );
};

export default AddTeamModal;
