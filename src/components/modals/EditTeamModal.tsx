import {
  Box,
  Button,
  Container,
  FormControl,
  Input,
  Modal,
  Typography,
} from "@mui/material";
import axios from "axios";
import Joi from "joi";
import { useState } from "react";
import { API_BASE_URL } from "../../config";

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

const EditTeamModal = (props: any) => {
  const [teamName, setTeamName] = useState("");
  const [validationError, setValidationError] = useState("");

  const schema = Joi.object({
    teamName: Joi.string().alphanum().required(),
  });

  const updateTeam = async () => {
    const validation = schema.validate({ teamName: teamName });

    // If fails validation show error and return out
    if (validation.error) {
      setValidationError(validation.error as unknown as string);
      return;
    }

    // Save new team to DB
    await axios.patch(`${API_BASE_URL}/teams`, {
      teamName,
      teamId: props.team.teamId,
    });

    // reload window so that new team is instantly visible
    window.location.reload();
  };
  return (
    <>
      {/* <Button onClick={handleOpen}>Add Team</Button> */}
      <Modal
        open={props.show}
        onClose={props.close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Team Details
          </Typography>
          <Typography>Team Name</Typography>
          <Typography>{props.team.teamName}</Typography>
          <FormControl>
            {validationError ? (
              <Typography>{`${validationError}`}</Typography>
            ) : null}
            <Input
              id="team-name"
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Edit Name"
            />
            <Container>
              <Button onClick={updateTeam}>Save</Button>
              <Button onClick={props.close}>Cancel</Button>
            </Container>
          </FormControl>
        </Box>
      </Modal>
    </>
  );
};

export default EditTeamModal;
