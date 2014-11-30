module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Weather', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    temp: DataTypes.FLOAT,
    humidity: DataTypes.INTEGER,
    light: DataTypes.INTEGER,
    time: DataTypes.INTEGER
  });
};