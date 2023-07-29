import {
  Box,
  Button,
  Container,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../config";
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

const AddMemberModal = () => {
  const [memberName, setMemberName] = useState("");
  const [teamId, setTeamId] = useState("");
  const [teams, setTeams] = useState([{ teamId: 0, teamName: "" }]);
  const [validationError, setValidationError] = useState("");

  // Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const schema = Joi.object({
    memberName: Joi.string().alphanum().required(),
    teamId: Joi.number().greater(0).required(),
  });

  const createMember = async (): Promise<void> => {
    const validation = schema.validate({ memberName, teamId });
    // If fails validation show error and return out
    if (validation.error) {
      setValidationError(validation.error as unknown as string);
      return;
    }

    // Save new team to DB
    await axios.post(`${API_BASE_URL}/members`, {
      memberName,
      teamId,
    });

    // reload window so that new team is instantly visible
    window.location.reload();
    handleClose();
  };

  const getTeamData = async () => {
    const response = await axios.get(`${API_BASE_URL}/teams`);
    setTeams(response.data);
  };

  useEffect(() => {
    getTeamData();
  }, []);

  return (
    <>
      <Button onClick={handleOpen}>Add Member</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Member
          </Typography>
          {validationError ? (
            <Typography>{`${validationError}`}</Typography>
          ) : null}
          <InputLabel id="teamId-select-label">Team Name</InputLabel>
          <Select
            labelId="teamId-select-label"
            id="teamId-select"
            value={teamId}
            label="teamId"
            onChange={(event) => setTeamId(event.target.value)}
            sx={{ minWidth: 150, marginBottom: 3 }}
          >
            {teams.map((team) => {
              return (
                <MenuItem key={team.teamId} value={team.teamId}>
                  {team.teamName}
                </MenuItem>
              );
            })}
          </Select>
          <Typography>Person Name</Typography>
          <FormControl>
            <Input
              id="member-name"
              onChange={(e) => setMemberName(e.target.value)}
              placeholder="member Name"
            />
            <Container>
              <Button onClick={createMember}>Save</Button>
              <Button onClick={() => handleClose()}>Cancel</Button>
            </Container>
          </FormControl>
        </Box>
      </Modal>
    </>
  );
};

export default AddMemberModal;
