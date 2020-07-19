'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JobRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      JobRecord.belongsTo(models.User)
    }
  };
  JobRecord.init({
    title: DataTypes.STRING,
    company_name: DataTypes.STRING,
    company_logo: DataTypes.STRING,
    description: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    current_position: DataTypes.BOOLEAN,
    public_status: DataTypes.BOOLEAN,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'JobRecord',
  });
  return JobRecord;
};