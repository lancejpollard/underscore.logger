CommonLogger = require('../lib/common-logger')

describe 'common-logger', ->
  describe 'levels', ->
    beforeEach ->
      @logger = new CommonLogger

    it "should default to debug", ->
      expect(@logger.level).toEqual CommonLogger.DEBUG
      
    it "should accept a new log level", ->
      @logger.level = CommonLogger.ERROR
      expect(@logger.level).toEqual CommonLogger.ERROR
    
  describe 'color', ->
    beforeEach ->
      @logger = new CommonLogger
      
    it "should have default colors", ->
      expect(@logger.colors[CommonLogger.TRACE]).toEqual CommonLogger.ANSI.BLUE
      expect(@logger.colors[CommonLogger.DEBUG]).toEqual CommonLogger.ANSI.CYAN
  
  describe 'format', ->
    beforeEach ->
      @logger = new CommonLogger(colorized: false, out: (m) -> m)
      
    it 'should default to a date format', ->
      now = new Date().toUTCString()
      expect(@logger.info('format')).toEqual "[#{now}] INFO format"
  
  describe 'file', ->
  
  describe 'stream', ->
  
  describe 'grouping', ->
  
  describe 'benchmarking', ->
  
  describe 'fps', ->
    beforeEach ->
      @logger = new CommonLogger(colorized: false)
      
    it "should clock it!", ->
      @logger.on "frame", ->
        expect(@fps).toEqual 60
        @stop()
  
  describe 'cross-browser', ->