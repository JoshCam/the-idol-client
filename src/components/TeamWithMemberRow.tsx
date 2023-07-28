import { Button, TableCell, TableRow } from "@mui/material";
import { deleteTeam, editTeam, viewTeam } from "../methods/teams";
import { deleteMember, editMember } from "../methods/members";
import { IMemberProps } from "../interfaces/member.interface";
import { ITeamProps } from "../interfaces/team.interface";

const TeamWithMemberRow = ({ member, team }: IMemberProps & ITeamProps) => {
  return (
    <TableRow key={member.memberName}>
      <TableCell align="center">{team.teamName}</TableCell>
      <TableCell align="center">
        <Button onClick={() => viewTeam(team.teamId)}>View</Button>
        <Button onClick={() => editTeam(team.teamId)}>Edit</Button>
        <Button onClick={() => deleteTeam(team.teamId)}>Delete</Button>
      </TableCell>
      <TableCell align="center">{member.memberName}</TableCell>
      <TableCell align="center">
        <Button onClick={() => editMember(member.memberId)}>Edit</Button>
        <Button onClick={() => deleteMember(member.memberId)}>Delete</Button>
      </TableCell>
    </TableRow>
  );
};

export default TeamWithMemberRow;
