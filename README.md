# CommonLogger

> Cross-browser and Node.js empowered logging.

## Install

```
npm install common-logger
```

## Api

``` coffeescript
logger = new CommonLogger
logger.colors[CommonLogger.WARN] = CommonLogger.ANSI.RED
logger.info
logger.bench 1000 -> 1 + 1
logger.on "frame", (fps) ->
  $("#log-line-template").tmpl(fps).appendTo("#log-panel")

logger.on "message", (data) ->
  $("#log-line-template").tmpl(data).appendTo("#log-panel")
```

## Resources

- http://en.wikipedia.org/wiki/Common_Log_Format

## Development

```
./node_modules/coffee-script/bin/coffee -o lib -w src
./node_modules/jasmine-node/bin/jasmine-node --coffee ./spec
```
