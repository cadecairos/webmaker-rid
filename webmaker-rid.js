(function() {

  // original License for node-cookie: https://github.com/defunctzombie/node-cookie/blob/master/LICENSE
  var cookiejs = {
    serialize: function(name, val, opt){
      opt = opt || {};
      var enc = opt.encode || encode;
      var pairs = [name + '=' + enc(val)];

      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge)) throw new Error('maxAge should be a Number');
        pairs.push('Max-Age=' + maxAge);
      }

      if (opt.domain) pairs.push('Domain=' + opt.domain);
      if (opt.path) pairs.push('Path=' + opt.path);
      if (opt.expires) pairs.push('Expires=' + opt.expires.toUTCString());
      if (opt.httpOnly) pairs.push('HttpOnly');
      if (opt.secure) pairs.push('Secure');

      return pairs.join('; ');
    },
    parse: function(str, opt) {
      opt = opt || {};
      var obj = {}
      var pairs = str.split(/; */);
      var dec = opt.decode || decode;

      pairs.forEach(function(pair) {
        var eq_idx = pair.indexOf('=')

        if (eq_idx < 0) {
          return;
        }

        var key = pair.substr(0, eq_idx).trim()
        var val = pair.substr(++eq_idx, pair.length).trim();

        if ('"' == val[0]) {
          val = val.slice(1, -1);
        }

        if (undefined == obj[key]) {
          try {
            obj[key] = dec(val);
          } catch (e) {
            obj[key] = val;
          }
        }
      });

      return obj;
    }
  };

  var encode = encodeURIComponent;
  var decode = decodeURIComponent;
  // end of node-cookie code

  var referralCookieSettings = {
        domain: location.hostname.split('.').slice(-2).join('.'),
        path: '/',
        secure: location.protocol === 'https:',
        expires: new Date((Date.now() + 60 * 1000 * 60 * 24 * 7))
      },
      refValue = /ref=((?:\w|-)+)/.exec(window.location.search),
      cookieRefValue = cookiejs.parse(document.cookie).webmakerReferral;

  if (refValue) {
    refValue = refValue[1];
    if (cookieRefValue !== refValue) {
      document.cookie = cookiejs.serialize('webmakerReferral', refValue, referralCookieSettings);
    }
  }
}());
