import { Transporteur } from "./trans.interface";
import { User } from "./user.interface";

export interface Colis {
    id?: number;

    numero?: number;

    statut?: string; 

    transporteur?: Transporteur;
    
    client?: User;
}