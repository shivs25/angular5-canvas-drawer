# Angular5CanvasDrawer

An angular library that allows users to generate various basic shapes in an angular component as svgs on a parent svg.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.1.

## Installation

`npm install angular5-canvas-drawer [--save-dev|--save-prod]`

## Getting started

Import `DrawerLibraryModule` into your `app.module.ts`.

Add `DrawerLibraryModule.forRoot()` into your `imports`. If you do not use `forRoot()` you will be unable to load critical dependancies for the library to function.

To use [associated models and enum](https://github.com/shivs25/angular5-canvas-drawer/tree/dev/src/app/drawer/models) you will need to import the models from `angular5-canvas-drawer` in the component.ts that contains the drawer component on the html.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

To use this library in your newly generated component, add the `app-drawer` to your html as you would any other angular component. Once added, you will need to add inputs* to set your height, width, and viewbox for the main svg**.

*Current available inputs are `widthValue` (number or percentage),`heightValue` (number or percentage), `viewWidthValue` (number), `viewTopValue` (number), `viewHeightValue` (number), `viewLeftValue` (number) 

**Currently the main component that handles the parent svg has a default value for `preserveAspectRatio` set to `xMinYMin meet`. Currently this keeps svg scaling working correctly between High Resolution (IE retina) and standard displays.

## Latest Update
- This list contains summaries of releases and current updates, for a full detailed list of changes please view our [CHANGELOG documentation](https://github.com/shivs25/angular5-canvas-drawer/blob/master/CHANGELOG). 

Date: `2018-05-08` VERSION: `1.1.2`
- Fixed issue where text objects would disappear under certain circumstances after editing.

Date: `2018-04-24` VERSION: `1.1.0`
- Merged dev into master.

Date: `2018-02-23` - `2018-04-24` VERSIONS: `1.0.33-beta.2` - `1.0.33-beta.75`
- SUMMARY:
    - Implemented SVG object drawer to draw basic shapes, lines and customized polygons.
    - Implemented a Text and Image tool to upload images and place text objects on a view
    - Implemented several services and helpers to help add, remove, and manipulate objects.
    - Added mouse and key down listeners for various keys to help implement various click events.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/). Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

For documentation on angular and how to get started using it checkout [Angular's Tutorial](https://angular.io/guide/quickstart)

To better understand `npm install` checkout [npmjs documentation](https://docs.npmjs.com/cli/install)

## License

MIT, see LICENSE for more information.