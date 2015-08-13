# geopkg

A simple module for tagging your npm modules with latitude and longitude
(geotagging) of where on the planet the module was published.

[![Build status](https://travis-ci.org/watson/geopkg.svg?branch=master)](https://travis-ci.org/watson/geopkg)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

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

- `help` - Will output the help (default)
- `update` - Updates the current package.json with current coordinates
- `open` - Opens the coordinates found in package.json in the browser
- `preview` - Finds your current location and previews it in the browser
- `interactive` - Choose coordinates interactively by dragging a marker
  on a map

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

### Interactive

To modify the detected location, run:

```
geopkg interactive
```

This should open up Google Maps zoomed to the detected coordinates in
your favorite browser. You can now just move the marker on the map to
the desired location. As soon as you close the browser tab, the location
in package.json is updated accordingly.

## npm integration

If you want to automatically tag your npm releases with your geo
coordinates, take a look at
[npm-geoversion](https://github.com/watson/npm-geoversion).

## License

MIT
