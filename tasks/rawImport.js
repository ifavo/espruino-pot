exports.task = {
  name:          'rawImport',
  description:   'convert raw import packages into a workable format',
  frequency:     30*1000,
  queue:         'default',
  plugins:       [],
  pluginOptions: {},
  
  run: function(api, params, next){
  	handleRawData();

	/**
	 * handle raw data import
	 */
  	function handleRawData () {
		// get raw entries and convert them
		api.models.Raw
				.find({where: {type: "raw"}, limit: 1})
				.then(function(raw) {
					// no data, nothing to do
					if ( !raw ) {
						return next();
					}

					// delete invalid json packets
					try {
					  raw.json = JSON.parse(raw.packet);
					}
					catch (e) {
						return raw.destroy();
					}

					// Weather Import
					if ( raw.json.tmp || raw.json.hum || raw.json.lum ) {
						var weather = {time: raw.time};
						
						// Temperature
						if ( typeof(raw.json.tmp) != "undefined" ) {
							weather.temp = Number(raw.json.tmp);
						}

						// Humidity
						if ( typeof(raw.json.hum) != "undefined" ) {
							weather.humidity = Number(raw.json.hum);
						}

						// Brightness in Lux
						if ( typeof(raw.json.lum) != "undefined" ) {
							var lumVal = raw.json.lum[0]?raw.json.lum[0]:raw.json.lum[16]/16;
							weather.light = Number(lumVal);
						}
						
						// create weather dataset
						api.models.Weather
						  .create(weather)
						  .finally(function() {
						  	raw.destroy();
						  	handleRawData();
						  });
					}
			}, function () {
				next();
			});
  	}
  }
};