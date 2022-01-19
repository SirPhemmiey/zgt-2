import Interest from "./interest";
import Lead from "./lead";


Lead.hasMany(Interest, {
    foreignKey: 'lead_id'
  });
  Interest.belongsTo(Lead, {
    foreignKey: 'lead_id'
  })