const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ComplianceCheck = sequelize.define('ComplianceCheck', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    standard: {
      type: DataTypes.ENUM('is1893', 'nbc2016', 'ircsp55', 'is11799', 'cpcb'),
      allowNull: false
    },
    standardName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    overallScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 100
      }
    },
    checks: {
      type: DataTypes.JSON,
      allowNull: false
    },
    recommendations: {
      type: DataTypes.JSON,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('pending', 'running', 'completed', 'failed'),
      defaultValue: 'pending'
    },
    runDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    projectId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'project_id'
    }
  }, {
    tableName: 'compliance_checks'
  });

  return ComplianceCheck;
};