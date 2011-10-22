class CommonLogger
  @FATAL:       0
  @ERROR:       1
  @WARN:        2
  @INFO:        3
  @DEBUG:       4
  @TRACE:       5
  
  @levels:      ["FATAL", "ERROR", "WARN", "INFO", "DEBUG", "TRACE"]
  
  @ANSI:
    OFF:        0
    BOLD:       1
    ITALIC:     3
    UNDERLINE:  4
    BLINK:      5
    INVERSE:    7
    HIDDEN:     8
    BLACK:      30
    RED:        31
    GREEN:      32
    YELLOW:     33
    BLUE:       34
    MAGENTA:    35
    CYAN:       36
    WHITE:      37
    BLACK_BG:   40
    RED_BG:     41
    GREEN_BG:   42
    YELLOW_BG:  43
    BLUE_BG:    44
    MAGENTA_BG: 45
    CYAN_BG:    46
    WHITE_BG:   47
    
  @colors:      [@ANSI.MAGENTA, @ANSI.RED, @ANSI.YELLOW, @ANSI.GREEN, @ANSI.CYAN, @ANSI.BLUE]
  
  constructor: (options = {}) ->
    @level      = options.level || @constructor.DEBUG
    @out        = options.out if options.out
    # set to false if you're in the browser
    @colorized  = if options.hasOwnProperty("colorized") then options.colorized else false
    @colors     = @constructor.colors.concat()
  
  out: (message) -> console.log(message)
    
  colorize: ->
    colors  = Array.prototype.slice.call(arguments)
    string  = colors.shift()
    result  = ""
    i       = 0
    while color = colors[i]
      result += "\033[#{color}m"
      i++
    result += "#{string}\033[#{@constructor.ANSI.OFF}m"
    result
  
  format: (date, level, message) ->
    # Common Log Date Format: [10/Oct/2000:13:55:36 -0700]
    "[#{date.toUTCString()}] #{@constructor.levels[level]} #{message}"
    
  log: (level, args) ->
    if level <= @level
      i       = 0
      message = args[0].replace /%s/g, -> args[i++]
      message = @format(new Date(), level, message)
      message = @colorize(message, @colors[level]) if @colorized
      @out message
    
  fatal: ->
    @log(@constructor.FATAL, arguments)
  
  error: ->
    @log(@constructor.ERROR, arguments)
  
  warn: ->
    @log(@constructor.WARN, arguments)
  
  info: ->
    @log(@constructor.INFO, arguments)
  
  debug: ->
    @log(@constructor.DEBUG, arguments)
  
  trace: ->
    @log(@constructor.TRACE, arguments)
    
  group: ->
    
  on: (event, callback) ->
    switch event
      when "message"
        @
      when "line"
        @
      when "frame"
        @timer ?= new CommonLogger.Timer()
        @timer.on(event, callback)
      when "bench"
        @
    @
  
  class @Timer
    constructor: ->
      @now                = Date.now()
      @time_last_frame    = @now
      @time_last_second   = @now
      @fps                = 0
      @fps_min            = 1000 # set it high so it's calibrated to the lowest
      @fps_max            = 0
      @ms                 = 0
      @ms_min             = 0
      @ms_max             = 0
      @frames             = 0
      @handlers           = []

    on: (event, callback) ->
      @handlers.push(callback)
      @start()

    start: ->
      return @ if @timer
      self    = @
      @timer  = setInterval((-> self.update()), 1000 / 60)
      @

    stop: ->
      clearInterval(@timer)
      @timer = null
      @
    
    update: ->
      @now                = Date.now()
      @ms                 = @now - @time_last_frame
      @ms_min             = Math.min(@ms_min, @ms)
      @ms_max             = Math.max(@ms_max, @ms)
      @time_last_frame    = @now
      @frames += 1

      if @now > (@time_last_second + 1000)
        @fps              = Math.round((@frames * 1000) / (@now - @time_last_second))
        @fps_min          = Math.min(@fps_min, @fps)
        @fps_max          = Math.max(@fps_max, @fps)
        @time_last_second = @now
        @frames           = 0

        for handler in @handlers
          handler.apply(@)

if typeof module == 'undefined'
  this["CommonLogger"] = CommonLogger
else
  module.exports = CommonLogger
