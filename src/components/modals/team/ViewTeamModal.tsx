import { Box, Button, Modal, Typography } from "@mui/material";
import { IMember } from "../../../interfaces/member.interface";

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

const ViewTeamModal = (props: any) => {
  const formatMembers = () => {
    const members = props.members.map((member: IMember) => {
      return member.memberName;
    });
    if (!Array.isArray(members) || members.length === 0) {
      return "No members associated with this team";
    }

    const formattedMembers = members.join(", "); // Join the array elements with commas

    // Find the last comma and replace it with an ampersand
    const lastCommaIndex = formattedMembers.lastIndexOf(",");
    if (lastCommaIndex !== -1) {
      const result =
        formattedMembers.slice(0, lastCommaIndex) +
        " &" +
        formattedMembers.slice(lastCommaIndex + 1);
      return result;
    } else {
      return formattedMembers; // If there's only one member, return as is
    }
  };

  return (
    <>
      <Modal
        open={props.show}
        onClose={props.close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Team Details
          </Typography>
          <Typography>Team Name</Typography>
          <Typography>{props.team.teamName}</Typography>
          <Typography>Team Members</Typography>
          <Typography>{formatMembers()}</Typography>
          <Button onClick={props.close}>Cancel</Button>
        </Box>
      </Modal>
    </>
  );
};

export default ViewTeamModal;
