import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import TeamTable from "../components/TeamTable";
import { Container, Button, Typography, Box } from "@mui/material";
import { ITeamsAndMembers } from "../interfaces/teamsAndMembers.interface";

const teamsAndMembers: ITeamsAndMembers = {
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
      teamName: "Team B",
      teamId: 2,
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
const Dashboard = () => {
  //   const [members, setMembers] = useState([]);

  //   const getTeams = async () => {
  //     const response = await axios.get(`${API_BASE_URL}/members`);
  //     setMembers(response.data);
  //   };
  //   useEffect(() => {
  //     getTeams();
  //   }, []);

  return (
    <Box sx={{ width: "100%", maxWidth: 800 }}>
      <Container>
        <Typography variant="h2" align="left" gutterBottom>
          Team Listing Page
        </Typography>
        <Button>Add Team</Button>
        <Button>Add Member</Button>
        <TeamTable
          teams={teamsAndMembers.teams}
          members={teamsAndMembers.members}
        />
      </Container>
    </Box>
  );
};

export default Dashboard;
