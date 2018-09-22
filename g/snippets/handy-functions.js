 Q._isString = function(obj) {
    return typeof obj === "string";
  };

  Q._isNumber = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Number]';
  };