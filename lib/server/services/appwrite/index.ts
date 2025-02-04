import "server-only";
import { AuthService } from "./auth.service";
import { WorkspaceService } from "./workspace.service";
import { OAuthService } from "./oauth.service";
import { SquadService } from "./squad.service";
import { SquadMembershipService } from "./squad-membership.service";

export const authService = new AuthService();
export const workspaceService = new WorkspaceService();
export const oAuthService = new OAuthService();
export const squadService = new SquadService();
export const squadMembershipService = new SquadMembershipService();
