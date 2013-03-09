fl.outputPanel.clear();

var LIBRARY_NAME = 'CommonJSFL';
eval(FLfile.read(fl.configURI + LIBRARY_NAME + '/core/json.js'));
window.console = { log : function() { fl.trace.apply(this, arguments) } };
window.exports = {};
window.module = { exports : exports };

var require = function(moduleName) {
  
  var loadModule = function(uri) {
    uri = (uri.match(/\.[0-9a-z]+$/i)) ? uri : uri + '.js';

    if (!fl.fileExists(uri)) throw new Error('\nModule load error! Could not find module: ' + uri);
    // Make sure `exports` and `module.exports` are cleared each time:
    exports = {};
    module = { exports : exports };
    eval(FLfile.read(uri));
    return module.exports || exports;
  }

  var isAbsolutePath = /^file:\/\/\//.test(moduleName)
  if (isAbsolutePath) return loadModule(moduleName);

  var currentFilePath = fl.scriptURI.match(/^(.*[\\\/])/)[0];
  var isRelativePath = /^\.\//i.test(moduleName) || /^\.\.\//i.test(moduleName);
  if (isRelativePath) return loadModule(currentFilePath + moduleName);

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
      if (fl.fileExists(path)) return path;
    }
    return null;
  }
  var modulePath = findModulePath(moduleName);
  if (!modulePath) throw new Error('\nModule load error! Could not find module: ' + moduleName);
  var main = JSON.parse(FLfile.read(modulePath + 'package.json')).main;
  var fullPath = modulePath + main;
  return require(fullPath);
};