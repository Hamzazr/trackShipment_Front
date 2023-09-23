import { User } from "./user.interface";

export interface Tracking {

    id_Tracking?: number;

    Tracking_Number?: string;

    Origin_Country?: string;

    Destination_Country?: string; 
 
    Recipient_PostCode?: number;

    shippingDate?: Date;

    Title?: string;

    OrderNumber?: number;

    PhoneNumber?: string;

    RecipientEmail?: string;
    
    client?: User;

}