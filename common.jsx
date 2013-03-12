var ENV;
try {
  flash;
  ENV = 'flash';
} catch(e) { ENV = 'photoshop' }

var console = { 
  log : function() { 
    if (ENV === 'flash') fl.trace.apply(this, arguments);
    else if (ENV === 'photoshop') $.writeln(arguments[0]);
  } 
};
var exports = {};
var module = { exports : exports };
var require = function(moduleName) {

  var LIBRARY_NAME = 'CommonJSFL';

  var readFile = function(path) {
    if (ENV === 'flash') {
      eval(FLfile.read(path));
    } else if (ENV === 'photoshop') {
      var file = new File(path);
      file.open ('r');
      var result = file.read();
      eval(result);
    }
  }

  var fileExists = function(uri) {
    if (ENV === 'flash') {
      return fl.fileExists(uri);
    } else if (ENV === 'photoshop') {
      return new File(uri) !== undefined;
    }
  }

  readFile('json.js');
  
  var loadModule = function(uri) {
    uri = (uri.match(/\.[0-9a-z]+$/i)) ? uri : uri + '.js';

    if (!fileExists(uri)) throw new Error('\nModule load error! Could not find module: `' + uri + '`');
    // Make sure `exports` and `module.exports` are cleared each time:
    exports = {};
    module = { exports : exports };
    readFile(uri);
    return module.exports || exports;
  }

  var isAbsolutePath = /^file:\/\/\//.test(moduleName) || /^\//.test(moduleName)
  if (isAbsolutePath) return loadModule(moduleName);

  var currentFilePath = function() {
    if (ENV === 'flash')  { 
      fl.scriptURI.match(/^(.*[\\\/])/)[0];
    } else if (ENV === 'photoshop') {
      return '~/Desktop/';
    }
  }
  var isRelativePath = /^\.\//i.test(moduleName) || /^\.\.\//i.test(moduleName);
  if (isRelativePath) return loadModule(currentFilePath() + moduleName);

  //
  // The file is neither an absolute nor relative path, try to find in `/core` or `/node_modules`
  //

  var MODULE_PATHS = [
    fl.configURI + LIBRARY_NAME + '/core/', 
    fl.configURI + LIBRARY_NAME + '/node_modules/'
  ]

  var findModulePath = function() {
    for (var i = 0, l = MODULE_PATHS.length; i < l; i++) {
      var path = MODULE_PATHS[i] + moduleName + '/'
      if (fileExists(path)) return path;
    }
    return null;
  }
  var modulePath = findModulePath(moduleName);
  if (!modulePath) throw new Error('\nModule load error! Could not find module: ' + moduleName);
  var main = JSON.parse(readFile(modulePath + 'package.json')).main;
  var fullPath = modulePath + main;
  return require(fullPath);
};

if (ENV === 'flash') {
  window.console = console;
  window.require = require;
  window.exports = exports;
  window.module = module;
  fl.outputPanel.clear();
}