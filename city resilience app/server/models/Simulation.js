const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Simulation = sequelize.define('Simulation', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('earthquake', 'flood', 'tsunami', 'heatwave', 'cyclone'),
      allowNull: false
    },
    parameters: {
      type: DataTypes.JSON,
      allowNull: false
    },
    results: {
      type: DataTypes.JSON,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('pending', 'running', 'completed', 'failed'),
      defaultValue: 'pending'
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'Duration in seconds'
    },
    riskAreas: {
      type: DataTypes.JSON,
      allowNull: true
    },
    recommendations: {
      type: DataTypes.JSON,
      allowNull: true
    },
    impactSummary: {
      type: DataTypes.JSON,
      allowNull: true
    },
    projectId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'project_id'
    }
  }, {
    tableName: 'simulations'
  });

  return Simulation;
};