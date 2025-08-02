const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const MapFeature = sequelize.define('MapFeature', {
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
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.ENUM('infrastructure', 'disaster', 'eco', 'transportation', 'residential', 'commercial'),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('existing', 'proposed', 'under_construction', 'completed'),
      defaultValue: 'proposed'
    },
    geometry: {
      type: DataTypes.JSON,
      allowNull: false
    },
    properties: {
      type: DataTypes.JSON,
      defaultValue: {}
    },
    resilienceScore: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 100
      }
    },
    cost: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high', 'critical'),
      defaultValue: 'medium'
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: true
    },
    projectId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'project_id'
    }
  }, {
    tableName: 'map_features'
  });

  return MapFeature;
};