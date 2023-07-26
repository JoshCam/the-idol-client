import {
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface IMemberResponse {
  name: string;
  team: ITeamResponse;
}

interface ITeamResponse {
  name: string;
}

const TeamTable = ({ members }: any) => {
  console.log(members);

  const rows: IMemberResponse[] = members;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Team</TableCell>
            <TableCell align="right">Team Action</TableCell>
            <TableCell align="right">Member</TableCell>
            <TableCell align="right">Member Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: IMemberResponse) => (
            <TableRow
              key={row.team.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.team.name}
              </TableCell>
              <TableCell align="right">team actions</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">member actions</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TeamTable;
