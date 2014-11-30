// initializers/sqlite.js
var Sequelize = require('sequelize');

exports.sqlite = function(api, next) {
    
  // omitting database name, username and password as it's not required
  var sqlized = new Sequelize(null,null,null,api.config.sqlite);
  
  api.sqlite = {};

  api.sqlite._start = function(api, next){
	api.models = {
		Raw: sqlized.import(__dirname + '/../models/Raw.js'),
		Weather: sqlized.import(__dirname + '/../models/Weather.js')
	};

	sqlized
		.sync()
		.then(syncSuccess, syncError);

	function syncSuccess() {
		api.log('Succesfully synced DB!');
		next();
	}

	function syncError(ex) {
		api.log('Error while executing DB sync', 'error', ex);
		process.exit();
	}
  };

  api.sqlite._stop =  function(api, next){
    next();
  };

  next();
};