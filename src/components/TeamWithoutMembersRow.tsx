import { Button, TableCell, TableRow } from "@mui/material";
import { deleteTeam, editTeam, viewTeam } from "../methods/teams";
import { ITeamProps } from "../interfaces/team.interface";

const TeamWithoutMembersRow = ({ team }: ITeamProps) => {
  return (
    <TableRow>
      <TableCell align="center">{team.teamName}</TableCell>
      <TableCell align="center">
        <Button onClick={() => viewTeam(team.teamId)}>View</Button>
        <Button onClick={() => editTeam(team.teamId)}>Edit</Button>
        <Button onClick={() => deleteTeam(team.teamId)}>Delete</Button>
      </TableCell>
      <TableCell align="center">No Members</TableCell>
      <TableCell align="center">No Actions Available</TableCell>
    </TableRow>
  );
};

export default TeamWithoutMembersRow;
