import { IMember } from "./member.interface";
import { ITeam } from "./team.interface";

export interface ITeamsAndMembers {
  teams: ITeam[];
  members: IMember[];
}
