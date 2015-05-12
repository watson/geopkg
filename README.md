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

This will update your `package.json` file with a `location` property
holding the lat/long coordinates:

```json
{
  "location": [55.8079696, 12.502925]
}
```

### Validate location

You can easily validate that the location is correct by running:

```
geopkg open
```

This should open up Google Maps zoomed to the the detected location in
your favorite browser.

## License

MIT
