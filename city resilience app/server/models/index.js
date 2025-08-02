const { Sequelize } = require('sequelize');
const path = require('path');

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database.sqlite'),
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: {
    timestamps: true,
    underscored: true,
  }
});

// Import models
const User = require('./User')(sequelize);
const Project = require('./Project')(sequelize);
const MapFeature = require('./MapFeature')(sequelize);
const Simulation = require('./Simulation')(sequelize);
const ComplianceCheck = require('./ComplianceCheck')(sequelize);

// Define associations
User.hasMany(Project, { foreignKey: 'user_id', as: 'projects' });
Project.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Project.hasMany(MapFeature, { foreignKey: 'project_id', as: 'features' });
MapFeature.belongsTo(Project, { foreignKey: 'project_id', as: 'project' });

Project.hasMany(Simulation, { foreignKey: 'project_id', as: 'simulations' });
Simulation.belongsTo(Project, { foreignKey: 'project_id', as: 'project' });

Project.hasMany(ComplianceCheck, { foreignKey: 'project_id', as: 'complianceChecks' });
ComplianceCheck.belongsTo(Project, { foreignKey: 'project_id', as: 'project' });

module.exports = {
  sequelize,
  User,
  Project,
  MapFeature,
  Simulation,
  ComplianceCheck
};