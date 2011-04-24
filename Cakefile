exec = require('child_process').exec

task 'build', ->
        exec 'coffee -c app.coffee', (err) ->

        exec 'coffee -c views/index.coffee', (err) ->

        exec 'coffee -c js/index.coffee', (err) ->


task 'test', -> require('.test').run()

