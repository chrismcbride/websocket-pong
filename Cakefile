exec = require('child_process').exec

task 'build', ->
        exec 'coffee -c app.coffee', (err) ->
                puts err if err
        exec 'coffee -c views/index.coffee', (err) ->
                puts err if err
        exec 'coffee -c js/index.coffee', (err) ->
                puts err if err

task 'test', -> require('.test').run()

