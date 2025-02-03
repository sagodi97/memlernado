import "server-only";
import { AuthService } from "./auth.service";
import { WorkspaceService } from "./workspace.service";
import { OAuthService } from "./oauth.service";

export const authService = new AuthService();
export const workspaceService = new WorkspaceService();
export const oAuthService = new OAuthService();
