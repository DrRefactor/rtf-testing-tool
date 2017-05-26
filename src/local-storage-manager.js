var LocalStorageManager = {
  get: function(key, defValue) {
    var value = window.localStorage[key];
    if (value !== undefined) {
      try {
        value = JSON.parse(value);
      }
      catch(error) {
        console.log(error);
      }
    }
    if (value === undefined || value === null)
      value = defValue;
    return value;
  },

  set: function(key, value) {
    if (value === undefined || value === null)
      localStorage.removeItem(key);
    else
      window.localStorage[key] = JSON.stringify(value);
  }
};

module.exports = LocalStorageManager;