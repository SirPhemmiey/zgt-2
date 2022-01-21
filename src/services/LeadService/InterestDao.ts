
export interface InterestAttributes {
    message: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type InterestAttributesExtended = {_id: string} & InterestAttributes;

export interface InterestDao {

    create(doc: InterestAttributes): Promise<InterestAttributesExtended | undefined>;
    deleteAll(): Promise<void>;
    deleteById(id: string): Promise<void>;
}