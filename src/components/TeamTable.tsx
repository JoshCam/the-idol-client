import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
// import { ITeamsAndMembers } from "../interfaces/teamsAndMembers.interface";
import { ITeam } from "../interfaces/team.interface";
import { IMember } from "../interfaces/member.interface";
import React from "react";
import TeamWithMemberRow from "./TeamWithMemberRow";
import { deleteTeam, editTeam, viewTeam } from "../methods/teams";
import TeamWithoutMembersRow from "./TeamWithoutMembersRow";

const teamsAndMembers = {
  teams: [
    {
      teamName: "Team A",
      teamId: 1,
    },
    {
      teamName: "Team B",
      teamId: 2,
    },
    {
      teamName: "Team C",
      teamId: 3,
    },
  ],
  members: [
    {
      memberName: "Member 1",
      memberId: 1,
      teamId: 1,
    },
    {
      memberName: "Member 2",
      memberId: 2,
      teamId: 1,
    },
    {
      memberName: "Member 3",
      memberId: 3,
      teamId: 2,
    },
  ],
};

// LEAVING FOR NOW AS ANY BUT MUST FIX LATER!
const TeamTable = ({ props }: any) => {
  const { teams, members } = teamsAndMembers;
  console.log(teams, members);

  //   const rows = teamsAndMembers;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Team</TableCell>
            <TableCell align="center">Team Action</TableCell>
            <TableCell align="center">Member</TableCell>
            <TableCell align="center">Member Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teams.map((team: ITeam) => {
            const membersForTeam = members.filter(
              (member: IMember) => member.teamId === team.teamId
            );
            return (
              <React.Fragment key={team.teamId}>
                {membersForTeam.length === 0 ? (
                  // Render the team row with no members
                  <TeamWithoutMembersRow team={team} />
                ) : (
                  // Render team rows with members
                  membersForTeam.map((member: IMember) => (
                    <TeamWithMemberRow member={member} team={team} />
                  ))
                )}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TeamTable;
