import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import TeamTable from "../components/TeamTable";
import { Container, Typography, Box } from "@mui/material";
import AddTeamModal from "../components/modals/team/AddTeamModal";
import AddMemberModal from "../components/modals/member/AddMemberModal";

const Dashboard = () => {
  const [teamsAndMembers, setTeamsAndMembers] = useState({
    members: [],
    teams: [],
  });

  const getTeams = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/teams/members`);
      setTeamsAndMembers(response.data);
    } catch (error) {
      // Make a custom error for this
      throw new Error("Error retrieving data from source");
    }
  };

  useEffect(() => {
    getTeams();
  }, []);

  return (
    <Box sx={{ width: "100%", maxWidth: 800 }}>
      <Container>
        <Typography variant="h2" align="left" gutterBottom>
          Team Listing Page
        </Typography>
        <AddTeamModal />
        <AddMemberModal />
        <TeamTable
          teams={teamsAndMembers.teams}
          members={teamsAndMembers.members}
        />
      </Container>
    </Box>
  );
};

export default Dashboard;
