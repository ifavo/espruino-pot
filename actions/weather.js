exports.weatherTimeframe = {
  name: 'weather/timeframe',
  description: 'get the weather within a given timeframe',
  blockedConnectionTypes: [],
  outputExample: {},
  matchExtensionMimeType: false,
  version: 1.0,
  toDocument: true,

  inputs: {
    required: ['from', 'to'],
    optional: []
  },

  run: function(api, connection, next) {
		api.models.Weather
			.findAll({where: {time: {between: [connection.params.from, connection.params.to]}}})
			.then(function(raw) {
				if (!raw) {
					getError("no data found");
					connection.rawConnection.responseHttpCode = 404;
					return next(connection, true);
				}
				return raw;
		})
		.then(getSuccess, getError)
		.finally(function() {
			next(connection, true);
		});

		function getSuccess(raw) {
			connection.response.weather = raw;
		}

		function getError(err) {
			api.log('Could not get weather data for timeframe: ' + connection.params.from + ' to ' + connection.params.to, 'error');
			connection.error = err;
		}
  }
};

exports.weatherStatus = {
  name: 'weather/status',
  description: 'gets the latest weather status',
  blockedConnectionTypes: [],
  outputExample: {},
  matchExtensionMimeType: false,
  version: 1.0,
  toDocument: true,

  inputs: {
    required: [],
    optional: []
  },
  run: function(api, connection, next) {
		api.models.Weather
			.findOne({limit: 1, order: [['time', 'DESC']]})
			.then(function(raw) {
				if (!raw) {
					getError("no data found");
					connection.rawConnection.responseHttpCode = 404;
					return next(connection, true);
				}
				return raw;
		})
		.then(getSuccess, getError)
		.finally(function() {
			next(connection, true);
		});

		function getSuccess(raw) {
			connection.response.weather = raw;
		}

		function getError(err) {
			api.log('Could not get weather data', 'error');
			connection.error = err;
		}
  }
};