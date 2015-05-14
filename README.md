# geopkg

A simple module for tagging your npm modules with latitude and longitude
(geotagging) of where on the planet the module was published.

[![Build status](https://travis-ci.org/watson/geopkg.svg?branch=master)](https://travis-ci.org/watson/geopkg)

[![js-standard-style](https://raw.githubusercontent.com/feross/standard/master/badge.png)](https://github.com/feross/standard)

## Installation

```
npm install geopkg -g
```

## Usage

Simply run the following command while in the root of your module
directory:

```
geopkg
```

This will update your `package.json` file with a `coordinates` property
holding the lat/long coordinates:

```json
{
  "coordinates": [55.8079696, 12.502925]
}
```

### Validate coordinates

You can easily validate that the coordinates is correct by running:

```
geopkg open
```

This should open up Google Maps zoomed to the the detected coordinates
in your favorite browser.

## License

MIT
