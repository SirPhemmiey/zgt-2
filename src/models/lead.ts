
import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../clients/sequelize/config';
import Interest from './interest';
export interface LeadAttributes {
    id: string;
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface LeadInput extends Optional<LeadAttributes, 'updatedAt'> { }
export interface LeadOuput extends Required<LeadAttributes> { };

class Lead extends Model<LeadAttributes, LeadInput> implements LeadAttributes {
    public id!: string;
    public email!: string;
    public phone!: string;
    public first_name!: string;
    public last_name!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Lead.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true },
    },
    first_name: { type: DataTypes.STRING },
    last_name: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
});

// Lead.hasMany(Interest, {
//     foreignKey: 'lead_id'
//   });
  
//Lead.hasMany(Interest);

export default Lead;