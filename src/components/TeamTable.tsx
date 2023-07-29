import {
  Box,
  Button,
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
import React, { useState } from "react";
import { ITeamsAndMembers } from "../interfaces/teamsAndMembers.interface";
import { deleteTeam, editTeam } from "../methods/teams";
import { deleteMember, editMember } from "../methods/members";
import ViewTeamModal from "./modals/team/ViewTeamModal";
import EditTeamModal from "./modals/team/EditTeamModal";

const TeamTable = ({ teams, members }: ITeamsAndMembers) => {
  const [showViewTeam, setShowViewTeam] = useState(false);
  const [showEditTeam, setShowEditTeam] = useState(false);
  const [viewedTeam, setViewedTeam] = useState({});
  const [viewedMembers, setViewedMembers] = useState([{}]);

  const viewTeam = (team: ITeam, members: IMember[]) => {
    setViewedTeam(team);
    setViewedMembers(members);
    setShowViewTeam(true);
  };

  const editTeam = (team: ITeam) => {
    setViewedTeam(team);
    setShowEditTeam(true);
  };

  return (
    <Box>
      <ViewTeamModal
        show={showViewTeam}
        close={() => setShowViewTeam(false)}
        team={viewedTeam}
        members={viewedMembers}
      />
      <EditTeamModal
        show={showEditTeam}
        close={() => setShowEditTeam(false)}
        team={viewedTeam}
      />
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
                    <TableRow>
                      <TableCell align="center">{team.teamName}</TableCell>
                      <TableCell align="center">
                        <Button onClick={() => viewTeam(team, membersForTeam)}>
                          View
                        </Button>
                        <Button onClick={() => editTeam(team)}>Edit</Button>
                        <Button onClick={() => deleteTeam(team.teamId)}>
                          Delete
                        </Button>
                      </TableCell>
                      <TableCell align="center">No Members</TableCell>
                      <TableCell align="center">No Actions Available</TableCell>
                    </TableRow>
                  ) : (
                    // Render team rows with members
                    membersForTeam.map((member: IMember) => (
                      <TableRow key={member.memberName}>
                        <TableCell align="center">{team.teamName}</TableCell>
                        <TableCell align="center">
                          <Button
                            onClick={() => viewTeam(team, membersForTeam)}
                          >
                            View
                          </Button>
                          <Button onClick={() => editTeam(team)}>Edit</Button>
                          <Button onClick={() => deleteTeam(team.teamId)}>
                            Delete
                          </Button>
                        </TableCell>
                        <TableCell align="center">
                          {member.memberName}
                        </TableCell>
                        <TableCell align="center">
                          <Button onClick={() => editMember(member.memberId)}>
                            Edit
                          </Button>
                          <Button onClick={() => deleteMember(member.memberId)}>
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TeamTable;
