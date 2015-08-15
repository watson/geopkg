# geopkg

A simple module for tagging your npm modules with latitude and longitude
(geotagging) of where on the planet the module was published.

[![Build status](https://travis-ci.org/watson/geopkg.svg?branch=master)](https://travis-ci.org/watson/geopkg)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

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

- `help` - Get help for specific command. Run: `geopkg help [command]`
- `version` - Bump the version and update the coordinates in a single commit
- `update` - Updates the current package.json with current coordinates
- `edit` - Edit coordinates in package.json by dragging a marker on a map
- `view` - Views the coordinates found in package.json in the browser
- `preview` - Finds your current location and previews it in the browser

### Help

Get help for specific command:

```
geopkg help [command]
```

### Version

Bump the version of your npm module **and** automatically tag it with
your current geo-coordinates.

```
geopkg version (<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease) [options]
```

This will do exactly the same as [`npm
version`](https://docs.npmjs.com/cli/version) plus add your current
position on planet earth to the package.json file:

```json
{
  "coordinates": [55.8079696, 12.502925]
}
```

**Options:**

- `-i` - Interactive mode: Modify the location by dragging a pin on a map

### Version

```
geopkg update [options]
```

This will update your `package.json` file with a `coordinates` property
holding the lat/long coordinates:

```json
{
  "coordinates": [55.8079696, 12.502925]
}
```

**Options:**

- `-i` - Interactive mode: Modify the location by dragging a pin on a map

### Edit

To modify the coordinates in package.json, run:

```
geopkg edit
```

This should open up Google Maps zoomed to the coordinates in your
favorite browser. You can now just move the marker on the map to the
desired location. As soon as you close the browser tab, the location in
package.json is updated accordingly.

### View

You can easily view the coordinates that the module in cwd is tagged
with - just run:

```
geopkg view
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

## License

MIT
