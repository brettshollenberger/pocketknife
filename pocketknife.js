(function() {
    var root = this;

    var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

    var
        push             = ArrayProto.push,
        slice            = ArrayProto.slice,
        concat           = ArrayProto.concat,
        toString         = ObjProto.toString,
        hasOwnProperty   = ObjProto.hasOwnProperty;

    var
        nativeForEach      = ArrayProto.forEach,
        nativeMap          = ArrayProto.map,
        nativeReduce       = ArrayProto.reduce,
        nativeReduceRight  = ArrayProto.reduceRight,
        nativeFilter       = ArrayProto.filter,
        nativeEvery        = ArrayProto.every,
        nativeSome         = ArrayProto.some,
        nativeIndexOf      = ArrayProto.indexOf,
        nativeLastIndexOf  = ArrayProto.lastIndexOf,
        nativeIsArray      = Array.isArray,
        nativeKeys         = Object.keys,
        nativeBind         = FuncProto.bind;
        
    if (!Function.prototype.bind) {
        Function.prototype.bind = function(oThis) {
            if (typeof this !== 'function') {
                // closest thing possible to the ECMAScript 5 internal IsCallable function
                throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
            }

            var aArgs = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                FNOP = function() {},
                fBound = function() {
                    return fToBind.apply(this instanceof FNOP && oThis ? this : oThis,
                        aArgs.concat(Array.prototype.slice.call(arguments)));
                };

            FNOP.prototype = this.prototype;
            fBound.prototype = new FNOP();

            return fBound;
        };
    }
    
    var pk = {};

    pk.capitalize = function (string) {
        return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
    };

    pk.mixin = function(receiver, giver) {
      for (var i in giver) {
        if (!receiver.hasOwnProperty(i)) {
          Object.defineProperty(receiver, i, giver[i]);
        }
      }
    };

    var enumerable = {
      all: {
        enumerable: false,
        value: function(cb) {
          var truth = true;
          this.each(function(i) { if (!cb(i)) truth = false; });
          return truth;
        }
      },
      any: {
        enumerable: false,
        value: function(cb) {
          var truth = false;
          this.each(function(i) { if (cb(i)) truth = true; });
          return truth;
        }
      },
      collect: {
        enumerable: false,
        value: function(cb) {
          var returner = [];
          this.each(function(i) { returner.push(cb(i)); });
          return returner;
        }
      },
      first: {
        enumerable: false,
        value: function(num) {
          var returner = [];
          var num = num || 1;
          var count = 1;
          this.each(function(i) { if (count <= num) returner.push(i); count++; });
          return returner;
        }
      },
      include: {
        enumerable: false,
        value: function(what) {
          var truth = false;
          this.each(function(i) { if (i == what) truth = true; });
          return truth;
        }
      }
    };

    Object.defineProperty(Array.prototype, 'each', {
      enumerable: false,
      value: function(cb) {
        for (var i in this) {
          cb(this[i]);
        }
      }
    });

    _.mixin(pk);

}).call(this);
