import { User} from "./app/users";

declare module 'restify' {
    export interface Request {
        authenticated: User
    }
}