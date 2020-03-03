# Angular5CanvasDrawer

An angular library that allows users to generate various basic shapes in an angular component as svgs on a parent svg.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.1.

## Installation

`npm install angular5-canvas-drawer [--save-dev|--save-prod]`
- Angular6 Compatible Version is release 1.2.0, this should install automatically but you can specify it if you like.
- For Angular5 users, you will need to specify release 1.1.8

## Getting started

Import `DrawerLibraryModule` into your `app.module.ts`.

Add `DrawerLibraryModule.forRoot()` into your `imports`. If you do not use `forRoot()` you will be unable to load critical dependancies for the library to function.

To use [associated models and enum](https://github.com/shivs25/angular5-canvas-drawer/tree/dev/src/app/drawer/models) you will need to import the models from `angular5-canvas-drawer` in the component.ts that contains the drawer component on the html.

To get information on the shapes you make, to use the various tools, and generaly interact with the drawer you will need to inject `DataStoreService` into the constructor of your component.

To set a tool, you will need the `EditorToolType` imported on your component. You can then change your tools by doing `this._dataStoreService.selectedTool = EditorToolType.RECTANGLE_TOOL;`

Lastly, you will need to make sure your application has the following classes loaded into it's css files. The application currently inherits from the parent, other styles may need to be added to work in your application:

    .absolute-position {
        position: absolute;
    }
    .fill-parent {
        width: 100%;
        height: 100%;
    }
    .absolute-fill-0 {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
    .no-interact {
      pointer-events: none;
    }
    .pointer {
      cursor: default;
    }

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

To use this library in your newly generated component, add the `app-drawer` to your html as you would any other angular component. Once added, you will need to add inputs* to set your height, width, and viewbox for the main svg**.

*The available app-drawer inputs are as followed:
`itemViewBox` which is our `BoundingBox` object to set the view of the drawer
`handleMouseEvents` which is a `boolean`

*The available app-editable-drawer inputs are as followed:
- `itemViewBox` which is our `BoundingBox` to set the view of the drawer
- `penDblClick` allows you to set the double click behavior in the pen tool. `CLEAR` will remove an unfinished object. `COMPLETE` will close the shape back to your first point. Any other input or empty string will be treated to default behavior, rendering a line instead of a polygon.
-`pointStyle`, `polygonStyle`, `lineStyle` inputs will let you set a style objects will show on initial add. Each input is a generic DrStyle. `lineStyle` is for lines, it will not set the stroke on a `polygonStyle`. These styles are currently only supported by the pen, point, and object tools.

**Currently the main component that handles the parent svg has a default value for `preserveAspectRatio` set to `xMinYMin meet`. Currently this keeps svg scaling working correctly between High Resolution (IE retina) and standard displays.

## Latest Update
- This list contains summaries of releases and current updates, for a full detailed list of changes please view our [CHANGELOG documentation](https://github.com/shivs25/angular5-canvas-drawer/blob/master/CHANGELOG). 

Date `2020-03-03` VERSION `1.4.3`
- Minor Bug Fixes to the "complete" double click behavior
- Added input `objectPreviewStyle: DrStyle` which will allow you to adjust the style preview for creating shapes

Date `2020-02-13` VERSION `1.4.0`
- Minor Bug Fixes
- Added Point Tool
- Added Inputs for Styles and Pen Double Click behavior.

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
