exports.default = { 
  tasks: function(api){
    return {
      scheduler: true,
      queues: ['default'],
      timeout: 5000,
      redis: api.config.redis
    }
  }
}
