import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { ITeam } from "../interfaces/team.interface";
import { IMember } from "../interfaces/member.interface";
import React, { useState } from "react";
import { ITeamsAndMembers } from "../interfaces/teamsAndMembers.interface";
import { deleteTeam } from "../methods/teams";
import { deleteMember, editMember } from "../methods/members";
import ViewTeamModal from "./modals/team/ViewTeamModal";
import EditTeamModal from "./modals/team/EditTeamModal";

const TeamTable = ({ teams, members }: ITeamsAndMembers) => {
  const [showViewTeam, setShowViewTeam] = useState(false);
  const [showEditTeam, setShowEditTeam] = useState(false);
  const [viewedTeam, setViewedTeam] = useState({});
  const [viewedMembers, setViewedMembers] = useState([{}]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const viewTeam = (team: ITeam, members: IMember[]) => {
    setViewedTeam(team);
    setViewedMembers(members);
    setShowViewTeam(true);
  };

  const editTeam = (team: ITeam) => {
    setViewedTeam(team);
    setShowEditTeam(true);
  };

  const visibleRows = React.useMemo(
    () => teams.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage]
  );

  console.log(visibleRows);

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
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
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
                        <TableCell align="center">No Members</TableCell>
                        <TableCell align="center">
                          No Actions Available
                        </TableCell>
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
                            <Button
                              onClick={() => deleteMember(member.memberId)}
                            >
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={teams.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default TeamTable;
