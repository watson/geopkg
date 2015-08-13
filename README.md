# geopkg

A simple module for tagging your npm modules with latitude and longitude
(geotagging) of where on the planet the module was published.

[![Build status](https://travis-ci.org/watson/geopkg.svg?branch=master)](https://travis-ci.org/watson/geopkg)
[![js-standard-style](https://raw.githubusercontent.com/feross/standard/master/badge.png)](https://github.com/feross/standard)

For a one-stop solution to bumping the module version *and* updating the
package coordinates, check out
[npm-geoversion](https://github.com/watson/npm-geoversion) instead.

## Installation

```
npm install geopkg -g
```

## Usage

Simply run the following command while in the root of your module
directory:

```
geopkg [command]
```

The commands are as follows:

- `help` - Will output the help
- `update` - Updates the current package.json with current coordinates
  (default behavior is no command is given)
- `open` - Opens the coordinates found in package.json in the browser
- `preview` - Finds your current location and previews it in the browser

### Update

```
geopkg update
```

This will update your `package.json` file with a `coordinates` property
holding the lat/long coordinates:

```json
{
  "coordinates": [55.8079696, 12.502925]
}
```

### Open

You can easily view the coordinates that the module in cwd is tagged
with - just run:

```
geopkg open
```

This should open up Google Maps zoomed to the module coordinates in your
favorite browser.

### Preview

To see your current location (regardless of what is written to
package.json), run:

```
geopkg preview
```

This should open up Google Maps zoomed to the detected coordinates in
your favorite browser.

## npm integration

Newer versions of npm support a `postversion` hook which you can add to
the package.json file in your module. Using this hook you can
automatically geo-tag your modules when ever you run the `npm version`
command.

To achive this, do the following:

1. Install geopkg as a development dependency:

 ```
 npm install --save-dev geopkg
 ```

2. Add a `postversion` hook to the package.json file:

  ```js
  "scripts": {
    "postversion": "tag=`git describe --exact-match --tags $(git log -n1 --pretty='%h')` && geopkg && git add -A && git commit -C HEAD --amend && git tag $tag -f"
  }
  ```

## License

MIT
