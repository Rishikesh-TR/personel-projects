const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Project = sequelize.define('Project', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('draft', 'active', 'completed', 'archived'),
      defaultValue: 'draft'
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    riskLevel: {
      type: DataTypes.ENUM('low', 'medium', 'high', 'critical'),
      defaultValue: 'medium'
    },
    teamSize: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    budget: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    mapCenter: {
      type: DataTypes.JSON,
      defaultValue: { lat: 19.0760, lng: 72.8777, zoom: 12 }
    },
    resilienceScore: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 100
      }
    },
    ecoScore: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 100
      }
    },
    complianceScore: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 100
      }
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'user_id'
    }
  }, {
    tableName: 'projects'
  });

  return Project;
};