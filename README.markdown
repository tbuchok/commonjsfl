CommonJSFL
---
Require files for use in .jsfl projects.

## What does this thing do?

`require` your own modules to create more manageable scripting projects using Adobe tools.

Using famous modules inside JSLF can be quite useful, too.

Here's an example combining both super-powers:


```javascript
eval(FLfile.read(fl.configURI + "CommonJSFL/common.jsfl"));

var _ = require('lodash');
var wackyArrays = require('./cool-arrays'); // [1, 2, 3]

_(wackyArrays).forEach(alert).join(',') // 1, 2, 3
```

### Clone into the proper place

These files assume to be cloned to a specific location. That specific location is this one:

```bash
$ ~/Library/Application%20Support/Adobe/Flash%20CS5.5/en_US/Configuration/CommonJSFL/
```

### `eval` the library

Once the library is cloned, it is important to `eval` the file `common.jsfl`.

```javascript
// Load common.jsfl into the global scope:
eval(FLfile.read(fl.configURI + "CommonJSFL/common.jsfl"));

var foo = require('foo');
// Write more code ...
```

### Directory structure is important

Files within directories `CommonJSFL/core` and `CommonJSFL/node_modules` will be searched first when `require`ing. 

It is appropriate to install actual NPM modules into `CommonJSFL/node_modules`.

A structure might look something like this:

```bash
.
|- CommonJSFL
|  ├-- core
|  ├-- node_modules
|  ├-- common.jsfl
|  └-- package.json
|
|- Commands
|  ├-- foo.js
|  ├-- bar.js
|  ├-- baz.js
|  └-- quk.js
```

## What does this thing probably not do?

### This will never be Node.js inside of an Adobe Product

The idea is that writing modular applications is beneficial and leads to more maintanable code. Both Node.js and NPM are extremely radical projects that do a lot of cool things.

CommonJSFL will provide virtually -- and possibly categorically -- none of Node.js's cool things.

### This will never guarantee `my-favorite-package` from NPM to work

NPM is a great place to put code. And NPM modules actually will work inside the JSFL run-time, so that's why `node_modules` and `package.json` are included here. NPM is a Good Thing™.

But, admittedly, using the directory `node_modules` is a good idea, but it may be ambiguous -- this is not Node.js and most NPM modules rely on Node.js. Your favorite package will probably not work.

### This is not a replacement for `npm` or Node.js's `require`

This library is as barebones as it has to be. A lot of the lovable things about `npm` are missing. :(

## Why this thing?

Working with Adobe scripting languages can be a bit painful for even the simplest tasks.

Maintaining larger projects leads to potential regressions and confusing code. 

CommonJSFL looks to try and use some of the CommonJS best practices -- most visible in Node.js -- to bring some sanity to Adobe scripting projects. 

Particularlly, it may eventually provide a nice ability to unit test projects to ensure test coverage!

## What's left for this thing?

This has only been review in Adobe Flash CS 5.5. The target is Flash CS 5.5, 6 and Photoshop CS 5.5, 6.

Other Adobe products may work great, or may be trivial to implement.

## Pull requests and contributions

Have at it. It is actually interesting to take something you love (CommonJS) and wedge it into something you don't (JSFL) to create great projects.


