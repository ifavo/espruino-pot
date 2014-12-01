exports.maxBuddyAdd = {
  name: 'maxbuddy/add',
  description: 'add a new raw dataset for Max!Buddy',
  blockedConnectionTypes: [],
  outputExample: {},
  matchExtensionMimeType: false,
  version: 1.0,
  toDocument: true,

  inputs: {
    required: [],
    optional: ['time']
  },

  run: function(api, connection, next) {
    
    connection.response.raw = connection.params;

    var new_raw = {
      type: "Max!Buddy",
      packet: JSON.stringify(connection.params),
      time: connection.params.time || Math.floor((new Date().getTime())/1000)
    };

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