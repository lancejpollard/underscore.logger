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
logger.info "Hello %s", "World"
logger.bench 1000 -> 1 + 1
logger.on "frame" ->
  $("#log-line-template").tmpl(@fps).appendTo("#log-panel")

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

## License

(The MIT License)

Copyright &copy 2011 [Lance Pollard](http://twitter.com/viatropos) &lt;lancejpollard@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
