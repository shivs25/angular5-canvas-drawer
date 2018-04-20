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
Date: `2018-04-20` VERSION: `1.0.33-beta.73`
- Fixed pipe character in the drawer so it would not disappear.

Date: `2018-04-20` VERSION: `1.0.33-beta.72`
- Fixed ampersands, greater than and less than in the text tool.
- Fixed issue where finalize on text was getting called more than necessary.

Date: `2018-04-20` VERSION: `1.0.33-beta.71`
- Fixed images showing up on top in selector tool
- Fixed text objects reverting when changing tools and not clicking on the div first.

Date: `2018-04-20` VERSION: `1.0.33-beta.70`
- Fixed issue with selector tool and sloped items in a straight line

Date: `2018-04-19` VERSION: `1.0.33-beta.69`
- Fixed issue with selector tool and rotated objects and flat lines.

Date: `2018-04-18` VERSION: `1.0.33-beta.68`
- Fixed selection issue where you couldn't select on object within another object

Date: `2018-04-18` VERSION: `1.0.33-beta.67`
- Added set initial urls

Date: `2018-04-18` VERSION: `1.0.33-beta.66`
- Fixed some text issues with history

Date: `2018-04-18` VERSION: `1.0.33-beta.65`
- Fixed drawing order when grouping objects
- Added function to add and remove temp objects

Date: `2018-04-16` VERSION: `1.0.33-beta.64`
- Fixed some text issues.

Date: `2018-04-11` VERSION: `1.0.33-beta.63`
- Changed where text change event was emitted.

Date: `2018-04-11` VERSION: `1.0.33-beta.62`
- Added emit event for when text object is changed.

Date: `2018-04-11` VERSION: `1.0.33-beta.61`
- Fixed callout drawing issue

Date: `2018-04-11` VERSION: `1.0.33-beta.60`
- Fixed bounding box issue in firefox and IE

Date: `2018-04-09` VERSION: `1.0.33-beta.59`
- Added method to export Callout Object Path text

Date: `2018-04-09` VERSION: `1.0.33-beta.58`
- Added rounded callout tool
- Preserve aspect ratio on images

Date: `2018-04-06` VERSION: `1.0.33-beta.56`
- Updates to callout tool

Date: `2018-04-06` VERSION: `1.0.33-beta.55`
- Added Rounded Callout tool
- Added rename function in DataStoreService

Date: `2018-04-05` VERSION: `1.0.33-beta.54`
- Fixed mousemove issue on dblclick for PenTool

Date: `2018-04-05` VERSION: `1.0.33-beta.53`
- Added lines
- Added micro-movements

Date: `2018-04-04` VERSION: `1.0.33-beta.52`
- Fixed naming of Grouped Objects

Date: `2018-04-04` VERSION: `1.0.33-beta.51`
- Edited text tool to no longer use a placehoder text string.

Date: `2018-04-02` VERSION: `1.0.33-beta.50`
- Even More changing default text object from 'px' to 'pt'

Date: `2018-04-02 VERSION: `1.0.33-beta.49`
- More changing default text object from 'px' to 'pt'

Date: `2018-04-02 VERSION: `1.0.33-beta.48`
- Changed default text object from 'px' to 'pt'

Date: `2018-03-29` VERSION: `1.0.33-beta.46`
- Fixed rotated multi selection

Date: `2018-03-28` VERSION: `1.0.33-beta.45`
- Added public function to find rotated point
- Added public function to find rotated bounding box

Date: `2018-03-26` VERSION: `1.0.33-beta.44`
- Added service call to export text object as SVG text

Date: `2018-03-23` VERSION: `1.0.33-beta.43`
- Resize rotated objects

Date: `2018-03-23` VERSION: `1.0.33-beta.42`
- Minor enhancements to text tool
- Added shift rotation and resizing
- Added click and double click events to objects

Date: `2018-03-19` VERSION: `1.0.33-beta.39`
- Finished Text Tool
- Added shift click and escape to the object creation tool

Date: `2018-03-19` VERSION: `1.0.33-beta.36`
- Added debug consoles for Pen Tool

Date: `2018-03-19` VERSION: `1.0.33-beta.35`
- Fixed images not loading in safari

Date: `2018-03-19` VERSION: `1.0.33-beta.34`
- Named objects
- Got rotation working in safari

Date: `2018-03-16` VERSION: `1.0.33-beta.32`
- Added input to handle changes to a view box through a bounding box if needed


Date: `2018-03-15` VERSION: `1.0.33-beta.31`
- Exported ChangeHelperService

Date: `2018-03-15` VERSION: `1.0.33-beta.30`
- Added rotation
- Added functionality for the corner sizers

Date: `2018-03-08` VERSION: `1.0.33-beta.29`
- Exported methods for arrow, star, triangle, callout

Date: `2018-03-08` VERSION: `1.0.33-beta.28`
- Added create methods for arrow, star, triangle, callout

Date: `2018-03-08` VERSION: `1.0.33-beta.27`
- Added star
- Added triangle
- Added arrow
- Added callout

Date: `2018-03-08` VERSION: `1.0.33-beta.26`
- Added setPreviewStyles

Date: `2018-03-08` VERSION: `1.0.33-beta.25`
- Added preview component
- Removed output and inputs on editable drawer
- Removed elements input on drawer

Date: `2018-03-08` VERSION: `1.0.33-beta.24`
- Added Pen Tool
- Added setUrls

Date: `2018-03-08` VERSION: `1.0.33-beta.23`
- Exporting app drawer

Date: `2018-03-07` VERSION: `1.0.33-beta.22`
- Added getObjects function to return items from an array

Date: `2018-03-07` VERSION: `1.0.33-beta.21`
- Added setVisibility

Date: `2018-03-07` VERSION: `1.0.33-beta.20`
- Got changing of nested styles work
- Got removing of nested objects

Date: `2018-03-05` VERSION: `1.0.33-beta.19`
- Exported DrGroupedObject and createDrGroupedObject for testing in applications.


Date: `2018-03-05` VERSION: `1.0.33-beta.18`
- Changed default styles to return hex code instead of names

DATE: `2018-03-05` VERSION: `1.0.33-beta.17`
- Fixed issue with ungroup

DATE: `2018-03-05` VERSION: `1.0.33-beta.16`
- Added align tools
- Added remove objects
- Added setStyles
- Removed set Style
- Added changing z index of multiple objects


DATE: `2018-03-05` VERSION: `1.0.33-beta.14`
- Added DrGroupedObject
- Added Object Creation Tools
- Added resizers

DATE: `2018-03-02` VERSION: `1.0.33-beta.13`
- Added function to change style
- Added DrStyle and DrTextStyle

DATE: `2018-03-02` VERSION: `1.0.33-beta.12`
- Got the selection box working
- Got undo and redo working
- Added events for selection changed and editing changed
- Added EditableDrawerComponent

DATE: `2018-03-02` VERSION: `1.0.33-beta.11`
- Got items selected from the selection tool

DATE: `2018-03-01` VERSION: `1.0.33-beta.9`
- Compiled and included styles.sass file

DATE: `2018-03-01` VERSION: `1.0.33-beta.8`
 - Added move operations for all objects
 - Added selectedIds and selectedTool to the application state
 - Got rid of viewbox and width and height on the svg's

DATE: `2018-02-28` VERSION: `1.0.33-beta.7`
 - Added Undo/Redo support
 - Added DataStoreService

DATE: `2018-02-28` VERSION: `1.0.33-beta.6`
 - Removed line of test code that was left in module.

DATE: `2018-02-28` VERSION: `1.0.33-beta.5`
 - Added visible, name, showFill, showStroke properties to the DrObject
 - Changed from classes to interfaces for all models
 - Created factory convenience methods for all models
 - Added DrawerObjectHelperService and "getBoundingBox" public function
 - Exported DrawerObjectHelperService through the Library Module
 - Cleaned up existing object and class exports for use outside of the application.

DATE: `2018-02-27` VERSION: `1.0.33-beta.3`
 - Added DrText, DrImage, DrTextAlignment

DATE: `2018-02-23`  VERSION: `1.0.33-beta.2`
 - Testing new beta publishing.

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
