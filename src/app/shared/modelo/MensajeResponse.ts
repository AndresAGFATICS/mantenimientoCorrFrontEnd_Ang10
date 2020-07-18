import { MensajeError } from "./MensajeError";

export class MensajeResponse {
    headers: string;
    status: string;
    statusText: string;
    url: string;
    ok: string;
    name: string;
    message: string;
    error: MensajeError;
}