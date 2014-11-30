module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Raw', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    packet: DataTypes.STRING,
    time: DataTypes.INTEGER
  });
};