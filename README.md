# Webmaker RID

A small, standalone JavaScript snippet for setting a Webmaker Referrer ID (RID).

Read more about RIDs [on the wiki](https://wiki.mozilla.org/Webmaker/Maker_Party/referrer_api).

Just have this script load on any page under the `*.webmaker.org` domain and it will do the rest for you!

Cookie-js code pulled from: https://github.com/cadecairos/cookie-js
RID related code pulled from https://github.com/mozilla/webmaker-auth-client

Note: This script **is not required** if the page has the [webmaker-auth-client](https://github.com/mozilla/webmaker-auth-client) loaded!

## Examples

### Insert into HTML

```html
<script src="https://stuff.webmaker.org/webmaker-rid/webmaker-rid.js" async></script>
```

### Insert into JavaScript

```js
var ridScript = document.createElement("script");
ridScript.async = true;
ridScript.src = "https://stuff.webmaker.org/webmaker-rid/webmaker-rid.js";
document.body.appendChild(ridScript);
```
