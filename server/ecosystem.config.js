module.exports = {
  "apps" : [{
    "name"        : "TheCommunityMind",
    "script"      : "./server.js",
    "watch"       : true,
    "exec_interpreter" : "babel-node",
    "exec_mode"        : "fork"
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-35-176-133-98.eu-west-2.compute.amazonaws.com',
      key: '~/.ssh/id_rsa',
      ref: 'origin/master',
      repo: 'git@github.com:wip-abramson/TheCommunityMind.git',
      path: '/home/ubuntu/TCM',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}