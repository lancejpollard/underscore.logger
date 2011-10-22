(function() {
  var CommonLogger;
  CommonLogger = (function() {
    CommonLogger.FATAL = 0;
    CommonLogger.ERROR = 1;
    CommonLogger.WARN = 2;
    CommonLogger.INFO = 3;
    CommonLogger.DEBUG = 4;
    CommonLogger.TRACE = 5;
    CommonLogger.levels = ["FATAL", "ERROR", "WARN", "INFO", "DEBUG", "TRACE"];
    CommonLogger.ANSI = {
      OFF: 0,
      BOLD: 1,
      ITALIC: 3,
      UNDERLINE: 4,
      BLINK: 5,
      INVERSE: 7,
      HIDDEN: 8,
      BLACK: 30,
      RED: 31,
      GREEN: 32,
      YELLOW: 33,
      BLUE: 34,
      MAGENTA: 35,
      CYAN: 36,
      WHITE: 37,
      BLACK_BG: 40,
      RED_BG: 41,
      GREEN_BG: 42,
      YELLOW_BG: 43,
      BLUE_BG: 44,
      MAGENTA_BG: 45,
      CYAN_BG: 46,
      WHITE_BG: 47
    };
    CommonLogger.colors = [CommonLogger.ANSI.MAGENTA, CommonLogger.ANSI.RED, CommonLogger.ANSI.YELLOW, CommonLogger.ANSI.GREEN, CommonLogger.ANSI.CYAN, CommonLogger.ANSI.BLUE];
    function CommonLogger(options) {
      if (options == null) {
        options = {};
      }
      this.level = options.level || this.constructor.DEBUG;
      if (options.out) {
        this.out = options.out;
      }
      this.colorized = options.hasOwnProperty("colorized") ? options.colorized : false;
      this.colors = this.constructor.colors.concat();
    }
    CommonLogger.prototype.out = function(message) {
      return console.log(message);
    };
    CommonLogger.prototype.colorize = function() {
      var color, colors, i, result, string;
      colors = Array.prototype.slice.call(arguments);
      string = colors.shift();
      result = "";
      i = 0;
      while (color = colors[i]) {
        result += "\033[" + color + "m";
        i++;
      }
      result += "" + string + "\033[" + this.constructor.ANSI.OFF + "m";
      return result;
    };
    CommonLogger.prototype.format = function(date, level, message) {
      return "[" + (date.toUTCString()) + "] " + this.constructor.levels[level] + " " + message;
    };
    CommonLogger.prototype.log = function(level, args) {
      var i, message;
      if (level <= this.level) {
        i = 0;
        message = args[0].replace(/%s/g, function() {
          return args[i++];
        });
        message = this.format(new Date(), level, message);
        if (this.colorized) {
          message = this.colorize(message, this.colors[level]);
        }
        return this.out(message);
      }
    };
    CommonLogger.prototype.fatal = function() {
      return this.log(this.constructor.FATAL, arguments);
    };
    CommonLogger.prototype.error = function() {
      return this.log(this.constructor.ERROR, arguments);
    };
    CommonLogger.prototype.warn = function() {
      return this.log(this.constructor.WARN, arguments);
    };
    CommonLogger.prototype.info = function() {
      return this.log(this.constructor.INFO, arguments);
    };
    CommonLogger.prototype.debug = function() {
      return this.log(this.constructor.DEBUG, arguments);
    };
    CommonLogger.prototype.trace = function() {
      return this.log(this.constructor.TRACE, arguments);
    };
    CommonLogger.prototype.group = function() {};
    CommonLogger.prototype.on = function(event, callback) {
      var _ref;
      switch (event) {
        case "message":
          this;
          break;
        case "line":
          this;
          break;
        case "frame":
          if ((_ref = this.timer) == null) {
            this.timer = new CommonLogger.Timer();
          }
          this.timer.on(event, callback);
          break;
        case "bench":
          this;
      }
      return this;
    };
    CommonLogger.Timer = (function() {
      function Timer() {
        this.now = Date.now();
        this.time_last_frame = this.now;
        this.time_last_second = this.now;
        this.fps = 0;
        this.fps_min = 1000;
        this.fps_max = 0;
        this.ms = 0;
        this.ms_min = 0;
        this.ms_max = 0;
        this.frames = 0;
        this.handlers = [];
      }
      Timer.prototype.on = function(event, callback) {
        this.handlers.push(callback);
        return this.start();
      };
      Timer.prototype.start = function() {
        var self;
        if (this.timer) {
          return this;
        }
        self = this;
        this.timer = setInterval((function() {
          return self.update();
        }), 1000 / 60);
        return this;
      };
      Timer.prototype.stop = function() {
        clearInterval(this.timer);
        this.timer = null;
        return this;
      };
      Timer.prototype.update = function() {
        var handler, _i, _len, _ref, _results;
        this.now = Date.now();
        this.ms = this.now - this.time_last_frame;
        this.ms_min = Math.min(this.ms_min, this.ms);
        this.ms_max = Math.max(this.ms_max, this.ms);
        this.time_last_frame = this.now;
        this.frames += 1;
        if (this.now > (this.time_last_second + 1000)) {
          this.fps = Math.round((this.frames * 1000) / (this.now - this.time_last_second));
          this.fps_min = Math.min(this.fps_min, this.fps);
          this.fps_max = Math.max(this.fps_max, this.fps);
          this.time_last_second = this.now;
          this.frames = 0;
          _ref = this.handlers;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            handler = _ref[_i];
            _results.push(handler.apply(this));
          }
          return _results;
        }
      };
      return Timer;
    })();
    return CommonLogger;
  })();
  if (typeof module === 'undefined') {
    this["CommonLogger"] = CommonLogger;
  } else {
    module.exports = CommonLogger;
  }
}).call(this);
