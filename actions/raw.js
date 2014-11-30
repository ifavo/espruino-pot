exports.rawAdd = {
  name: 'raw/add',
  description: 'add a new raw dataset',
  blockedConnectionTypes: [],
  outputExample: {},
  matchExtensionMimeType: false,
  version: 1.0,
  toDocument: true,

  inputs: {
    required: ['packet'],
    optional: ['time']
  },

  run: function(api, connection, next) {
    
    var new_raw = {
      packet: connection.params.packet,
      time: connection.params.time || Math.floor((new Date().getTime())/1000)
    };
    
    // validate packet is a JSON object
    try {
      JSON.parse(new_raw.packet);
    }
    catch (e) {
      createError("packet is no valid json object");
      return next(connection, true);
    }

    api.models.Raw
      .create(new_raw)
      .then(createSuccess, createError)
      .finally(function() {
        next(connection, true);
      });

    function createSuccess(created_raw) {
        connection.response.raw = created_raw;
    }

    function createError(err) {
        api.log('Could not create new raw packet', 'error', new_raw);
        connection.error = err;
    }
  }
};


exports.rawGet = {
  name: 'raw/get',
  description: 'get a  raw dataset',
  blockedConnectionTypes: [],
  outputExample: {},
  matchExtensionMimeType: false,
  version: 1.0,
  toDocument: true,

  inputs: {
    required: ['id'],
    optional: []
  },

  run: function(api, connection, next) {
		api.models.Raw
			.find(connection.params.id)
			.then(function(raw) {
				if (!raw) {
					getError("raw data not found");
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
			connection.response.raw = raw;
		}

		function getError(err) {
			api.log('Could not get raw id: ' + connection.params.id, 'error');
			connection.error = err;
		}
  }
};




exports.rawCount = {
  name: 'raw/count',
  description: 'get total number of raw datasets',
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
		api.models.Raw
			.count()
			.then(function(count) {
				if (!count) {
					getError("raw data not not be counted");
					connection.rawConnection.responseHttpCode = 404;
					return next(connection, true);
				}
				return count;
		})
		.then(countSuccess, countError)
		.finally(function() {
			next(connection, true);
		});

		function countSuccess(count) {
			connection.response.count = count;
		}

		function countError(err) {
			api.log('Could not get raw count', 'error', err);
			connection.error = err;
		}
  }
};