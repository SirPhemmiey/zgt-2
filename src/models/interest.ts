
import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../clients/sequelize/config';
export interface InterestAttributes {
    id?: string,
    lead_id?: string;
    message: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface InterestInput extends Optional<InterestAttributes, 'updatedAt'> { }
export interface InterestOuput extends Required<InterestAttributes> { };

class Interest extends Model<InterestAttributes, InterestInput> implements InterestAttributes {
    public id!: string;
    public lead_id!: string;
    public message!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}
Interest.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    lead_id: {
        type: DataTypes.INTEGER.UNSIGNED
    },
    message: { type: DataTypes.TEXT },
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
});

// Interest.belongsTo(Lead, {
//     foreignKey: 'lead_id'
//   })
  
// Interest.belongsTo(LeadDao);

export default Interest;