$.fn.wait = function (func) {
  var _times = -1,
    _interval = 20,
    _self = this,
    _selector = this.selector,
    _iIntervalID;
  if (this.length) {
    func && func.call(this);
    clearInterval(_iIntervalID);
  } else {
    _iIntervalID = setInterval(function () {
      _self = $(_selector);
      if (_self.length) {
        func && func.call(_self);
        clearInterval(_iIntervalID);
      }
    }, _interval);
  }
  return this;
};
