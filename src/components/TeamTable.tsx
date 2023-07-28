import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ITeam } from "../interfaces/team.interface";
import { IMember } from "../interfaces/member.interface";
import React from "react";
import TeamWithMemberRow from "./TeamWithMemberRow";
import TeamWithoutMembersRow from "./TeamWithoutMembersRow";
import { ITeamsAndMembers } from "../interfaces/teamsAndMembers.interface";

const TeamTable = ({ teams, members }: ITeamsAndMembers) => {
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
