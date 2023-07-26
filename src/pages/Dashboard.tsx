import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import TeamTable from "../components/TeamTable";

const Dashboard = () => {
  const [members, setMembers] = useState([]);

  const getTeams = async () => {
    const response = await axios.get(`${API_BASE_URL}/members`);
    setMembers(response.data);
  };
  useEffect(() => {
    getTeams();
  }, []);

  return (
    <div className="Dashboard">
      <div>
        <TeamTable members={members}></TeamTable>
      </div>
    </div>
  );
};

export default Dashboard;
