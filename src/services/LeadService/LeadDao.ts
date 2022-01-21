
export interface LeadAttributes {
    _id: string;
    email: string;
    phone: string;
    first_name: string;
    interests: string[],
    last_name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export const emptyLead = {
    _id: "",
    email: "",
    phone: "",
    first_name: "",
    interests: [],
    last_name: ""
};

export interface LeadDao {

    create(doc: LeadAttributes): Promise<void>;
    getAll(): Promise<LeadAttributes[]>;
    getLeadById(id: string): Promise<LeadAttributes>;
    deleteById(id: string): Promise<void>;
    deleteAll(): Promise<void>;

}