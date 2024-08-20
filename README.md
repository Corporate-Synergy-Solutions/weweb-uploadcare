# Element component starter

This is an element for [weweb.io](https://www.weweb.io/).

## Installation

To run locally, first install all dependencies with `npm i`

## Start

To serve locally, run `npm run serve --port=[PORT]`, and then go to Weweb editor, open developper popup and add your custom element.

## Build

Before release, you can check build error by running `npm run build --name=my-element`

## Releases

### 0.0.1

Initial release

### 0.0.2

-   fix mandatory props ctx-name
-   add uploader type props

### 0.0.3

-   refactor migrate from component wrapper to root component

### 0.0.4

-   revert refactor migrate root component
-   add label props for each types (pending api uploadcare error)
-   add bindable endpoint props
-   add metadata props
-   add component id props to store data

### 0.0.5

-   fix metadata injection
-   add isImageOnly props

### 0.0.6

-   add accept file types props
-   add removeCopyright props
-   add themeColor props
-   rename label types
-   remove endpoint (cdn url) props
