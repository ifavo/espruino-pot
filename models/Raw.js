module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Raw', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: DataTypes.STRING,
    packet: DataTypes.STRING,
    time: DataTypes.INTEGER
  });
};