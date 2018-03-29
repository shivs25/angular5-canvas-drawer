import { } from './jasmine';
import { promise, browser, element, by, protractor } from 'protractor';
import { Utilities } from './helpers/Utilities';
import { CanvasPage } from './helpers/CanvasPage';
const protractorImageComparison = require('protractor-image-comparison');

fdescribe('Maps', function () {

  let utilities: Utilities = new Utilities();
  let canvas: CanvasPage = new CanvasPage();
  let containerCss = "app-editable-drawer app-editor-tool ";
  let sizeBuffer = 3;

    beforeAll(() => {
        //browser.ignoreSynchronization = true;

    });
    afterAll(() => {

    });
    beforeEach(() => {
      browser.get('/');
      browser.waitForAngularEnabled();
      utilities.newSmartPause(by.xpath('.//*[.="Undo"]'), false);

      //clear the canvas before each test
      canvas.selectButton("Clear");
      utilities.shortPause();
    });
    afterEach(() => {
        
    });
  
    xit('CanvasDrawer_ExpectCanvasLoads', () => {
      utilities.normalPause();

      expect(browser.isElementPresent(by.xpath('.//*[.="Undo"]'))).toBeTruthy();
    });

    //Resizing
    it('CanvasDrawer_TopResize_ExpectObjectToBeResizedVerticallyUpwards', () => {
      utilities.normalPause();

      canvas.selectButton("Rectangle");
      utilities.shortPause();

      canvas.drawSquareSize(100);
      utilities.longPause();

      canvas.selectButton("Selector");
      utilities.shortPause();

      canvas.moveObjectByOffset(by.css(canvas.getResizerCssByIndex(7)), 0, -100);
      utilities.normalPause();

      element(by.css(containerCss + "rect")).getSize().then(function (eleSize) {
        expect(eleSize.height).toBeLessThan(200 + sizeBuffer);
        expect(eleSize.height).toBeGreaterThan(200 - sizeBuffer);
        expect(eleSize.width).toBeLessThan(100 + sizeBuffer);
        expect(eleSize.width).toBeGreaterThan(100 - sizeBuffer);
      });
    });
    it('CanvasDrawer_BottomResize_ExpectObjectToBeResizedVerticallyDownwards', () => {
      utilities.normalPause();

      canvas.selectButton("Rectangle");
      utilities.shortPause();

      canvas.drawSquareSize(100);
      utilities.longPause();

      canvas.selectButton("Selector");
      utilities.shortPause();

      canvas.moveObjectByOffset(by.css(canvas.getResizerCssByIndex(3)), 0, 100);
      utilities.normalPause();

      element(by.css(containerCss + "rect")).getSize().then(function (eleSize) {
        expect(eleSize.height).toBeLessThan(200 + sizeBuffer);
        expect(eleSize.height).toBeGreaterThan(200 - sizeBuffer);
        expect(eleSize.width).toBeLessThan(100 + sizeBuffer);
        expect(eleSize.width).toBeGreaterThan(100 - sizeBuffer);
      });
    });
    it('CanvasDrawer_LeftResize_ExpectObjectToBeResizedHorizontallyLeft', () => {
      utilities.normalPause();

      canvas.selectButton("Rectangle");
      utilities.shortPause();

      canvas.drawSquareSize(100);
      utilities.longPause();

      canvas.selectButton("Selector");
      utilities.shortPause();

      canvas.moveObjectByOffset(by.css(canvas.getResizerCssByIndex(1)), -100, 0);
      utilities.normalPause();

      element(by.css(containerCss + "rect")).getSize().then(function (eleSize) {
        expect(eleSize.height).toBeLessThan(100 + sizeBuffer);
        expect(eleSize.height).toBeGreaterThan(100 - sizeBuffer);
        expect(eleSize.width).toBeLessThan(200 + sizeBuffer);
        expect(eleSize.width).toBeGreaterThan(200 - sizeBuffer);
      });
    });
    it('CanvasDrawer_RightResize_ExpectObjectToBeResizedHorizontallyRight', () => {
      utilities.normalPause();

      canvas.selectButton("Rectangle");
      utilities.shortPause();

      canvas.drawSquareSize(200);
      utilities.longPause();

      canvas.selectButton("Selector");
      utilities.shortPause();

      canvas.moveObjectByOffset(by.css(canvas.getResizerCssByIndex(5)), -100, 0);
      utilities.normalPause();

      element(by.css(containerCss + "rect")).getSize().then(function (eleSize) {
        expect(eleSize.height).toBeLessThan(200 + sizeBuffer);
        expect(eleSize.height).toBeGreaterThan(200 - sizeBuffer);
        expect(eleSize.width).toBeLessThan(100 + sizeBuffer);
        expect(eleSize.width).toBeGreaterThan(100 - sizeBuffer);
      });
    });
    it('CanvasDrawer_TopLeftResize_ExpectObjectToBeResizedDiagonally', () => {
      utilities.normalPause();

      canvas.selectButton("Rectangle");
      utilities.shortPause();

      canvas.drawSquareSize(100);
      utilities.longPause();

      canvas.selectButton("Selector");
      utilities.shortPause();

      canvas.moveObjectByOffset(by.css(canvas.getResizerCssByIndex(0)), -100, -100);
      utilities.normalPause();

      element(by.css(containerCss + "rect")).getSize().then(function (eleSize) {
        expect(eleSize.height).toBeLessThan(200 + sizeBuffer);
        expect(eleSize.height).toBeGreaterThan(200 - sizeBuffer);
        expect(eleSize.width).toBeLessThan(200 + sizeBuffer);
        expect(eleSize.width).toBeGreaterThan(200 - sizeBuffer);
      });
    });
    it('CanvasDrawer_BottomLeftResize_ExpectObjectToBeResizedDiagonally', () => {
      utilities.normalPause();

      canvas.selectButton("Rectangle");
      utilities.shortPause();

      canvas.drawSquareSize(100);
      utilities.longPause();

      canvas.selectButton("Selector");
      utilities.shortPause();

      canvas.moveObjectByOffset(by.css(canvas.getResizerCssByIndex(2)), -100, 100);
      utilities.normalPause();

      element(by.css(containerCss + "rect")).getSize().then(function (eleSize) {
        expect(eleSize.height).toBeLessThan(200 + sizeBuffer);
        expect(eleSize.height).toBeGreaterThan(200 - sizeBuffer);
        expect(eleSize.width).toBeLessThan(200 + sizeBuffer);
        expect(eleSize.width).toBeGreaterThan(200 - sizeBuffer);
      });
    });
    it('CanvasDrawer_BottomRightResize_ExpectObjectToBeResizedDiagonally', () => {
      utilities.normalPause();

      canvas.selectButton("Rectangle");
      utilities.shortPause();

      canvas.drawSquareSize(200);
      utilities.longPause();

      canvas.selectButton("Selector");
      utilities.shortPause();

      canvas.moveObjectByOffset(by.css(canvas.getResizerCssByIndex(4)), -100, -100);
      utilities.normalPause();

      element(by.css(containerCss + "rect")).getSize().then(function (eleSize) {
        expect(eleSize.height).toBeLessThan(100 + sizeBuffer);
        expect(eleSize.height).toBeGreaterThan(100 - sizeBuffer);
        expect(eleSize.width).toBeLessThan(100 + sizeBuffer);
        expect(eleSize.width).toBeGreaterThan(100 - sizeBuffer);
      });
    });
    it('CanvasDrawer_TopRightResize_ExpectObjectToBeResizedDiagonally', () => {
      utilities.normalPause();

      canvas.selectButton("Rectangle");
      utilities.shortPause();

      canvas.drawSquareSize(200);
      utilities.longPause();

      canvas.selectButton("Selector");
      utilities.shortPause();

      canvas.moveObjectByOffset(by.css(canvas.getResizerCssByIndex(6)), -100, 100);
      utilities.normalPause();

      element(by.css(containerCss + "rect")).getSize().then(function (eleSize) {
        expect(eleSize.height).toBeLessThan(100 + sizeBuffer);
        expect(eleSize.height).toBeGreaterThan(100 - sizeBuffer);
        expect(eleSize.width).toBeLessThan(100 + sizeBuffer);
        expect(eleSize.width).toBeGreaterThan(100 - sizeBuffer);
      });
  });

    //Undo / Redo
    it('CanvasDrawer_MoveThenUndo_ExpectObjectToReturnToOriginalPosition', () => {
      utilities.normalPause();

      canvas.selectButton("Rectangle");
      utilities.shortPause();

      canvas.drawSquareSize(200);
      utilities.longPause();

      canvas.selectButton("Selector");
      utilities.shortPause();

      var rectElement = element(by.css(containerCss + 'rect.clickable'));
      var ogLocation = rectElement.getLocation();
      
      canvas.moveObjectByOffset(by.css(containerCss + 'rect.clickable'), 80, 0);
      utilities.normalPause();

      canvas.selectButton("Undo");
      utilities.normalPause();

      expect(rectElement.getLocation()).toEqual(ogLocation);
    });
    it('CanvasDrawer_MoveThenUndoThenRedo_ExpectObjectToReturnToMovedPosition', () => {
      utilities.normalPause();

      canvas.selectButton("Rectangle");
      utilities.shortPause();

      canvas.drawSquareSize(200);
      utilities.longPause();

      canvas.selectButton("Selector");
      utilities.shortPause();

      var rectElement = element(by.css(containerCss + 'rect.clickable'));
      var ogLocation = rectElement.getLocation();

      canvas.moveObjectByOffset(by.css(containerCss + 'rect.clickable'), 80, 0);
      utilities.normalPause();

      canvas.selectButton("Undo");
      utilities.normalPause();

      canvas.selectButton("Redo");
      utilities.normalPause();

      expect(rectElement.getLocation()).not.toEqual(ogLocation);
    });

    //Adding objects
    it('CanvasDrawer_AddEllipse_ExpectEllipseObjectOnCanvas', () => {
      utilities.normalPause();

      canvas.selectButton("Ellipse");
      utilities.shortPause();

      canvas.drawSquareSize(200);
      utilities.longPause();

      canvas.selectButton("Selector");
      utilities.shortPause();

      expect(element(by.css(containerCss + "ellipse")).isDisplayed()).toBeTruthy();
    });
    it('CanvasDrawer_AddRectangle_ExpectRectangleObjectOnCanvas', () => {
      utilities.normalPause();

      canvas.selectButton("Rectangle");
      utilities.shortPause();

      canvas.drawSquareSize(200);
      utilities.longPause();

      canvas.selectButton("Selector");
      utilities.shortPause();

      expect(element(by.css(containerCss + "rect")).isDisplayed()).toBeTruthy();
    });
    it('CanvasDrawer_AddImage_ExpectImageObjectOnCanvas', () => {
      utilities.normalPause();

      canvas.selectButton("Image");
      utilities.shortPause();

      canvas.drawSquareSize(200);
      utilities.longPause();

      canvas.selectButton("Selector");
      utilities.shortPause();

      expect(element(by.css(containerCss + "rect")).isDisplayed()).toBeTruthy();
    });
    it('CanvasDrawer_AddText_ExpectTextFieldObjectOnCanvas', () => {
      utilities.normalPause();

      canvas.selectButton("Text");
      utilities.shortPause();

      canvas.drawSquareSize(200);
      utilities.longPause();

      canvas.selectButton("Selector");
      utilities.shortPause();

      //both are pointing to the same object, but it's good to test both selectors
      expect(element(by.css(containerCss + "rect")).isDisplayed()).toBeTruthy();
      //expect(element(by.xpath('.//*[.="TEXT"]')).isDisplayed()).toBeTruthy();
    });
    it('CanvasDrawer_AddRoundedRectangle_ExpectRoundedRectangleObjectOnCanvas', () => {
      utilities.normalPause();

      canvas.selectButton("Rounded Rectangle");
      utilities.shortPause();

      canvas.drawSquareSize(200);
      utilities.longPause();

      canvas.selectButton("Selector");
      utilities.shortPause();

      expect(element(by.css(containerCss + "rect")).isDisplayed()).toBeTruthy();
    });
    it('CanvasDrawer_AddCallout_ExpectCalloutObjectOnCanvas', () => {
      utilities.normalPause();

      canvas.selectButton("Callout");
      utilities.shortPause();

      canvas.drawSquareSize(200);
      utilities.longPause();

      canvas.selectButton("Selector");
      utilities.shortPause();

      var el = element(by.css(containerCss + "polygon"));
 
      expect(el.isDisplayed()).toBeTruthy();
      el.getAttribute('points').then(function (item) { expect(item.split(' ').length).toEqual(14); });
    });
    it('CanvasDrawer_AddTriangle_ExpectCalloutObjectOnCanvas', () => {
      utilities.normalPause();

      canvas.selectButton("Triangle");
      utilities.shortPause();

      canvas.drawSquareSize(200);
      utilities.longPause();

      canvas.selectButton("Selector");
      utilities.shortPause();

      var el = element(by.css(containerCss + "polygon"));

      expect(el.isDisplayed()).toBeTruthy();
      el.getAttribute('points').then(function (item) { expect(item.split(' ').length).toEqual(6); });
    });
    it('CanvasDrawer_AddStar_ExpectStarObjectOnCanvas', () => {
      utilities.normalPause();

      canvas.selectButton("Star");
      utilities.shortPause();

      canvas.drawSquareSize(200);
      utilities.longPause();

      canvas.selectButton("Selector");
      utilities.shortPause();

      var el = element(by.css(containerCss + "polygon"));

      expect(el.isDisplayed()).toBeTruthy();
      el.getAttribute('points').then(function (item) { expect(item.split(' ').length).toEqual(20); });
    });
    it('CanvasDrawer_AddArrow_ExpectArrowObjectOnCanvas', () => {
      utilities.normalPause();

      canvas.selectButton("Arrow");
      utilities.shortPause();

      canvas.drawSquareSize(200);
      utilities.longPause();

      canvas.selectButton("Selector");
      utilities.shortPause();

      var el = element(by.css(containerCss + "polygon"));

      expect(el.isDisplayed()).toBeTruthy();
      el.getAttribute('points').then(function (item) { expect(item.split(' ').length).toEqual(14); });
    });
    xit('CanvasDrawer_AddPenPolygon_ExpectPolygonShapeOnCanvas', () => {
      utilities.normalPause();

      canvas.selectButton("Ellipse");
      utilities.shortPause();

      canvas.drawSquareSize(80);
      utilities.longPause();
      
      canvas.selectButton("Pen");
      utilities.shortPause();
      
      browser.actions().
        mouseDown(element(by.css("ellipse"))).
        mouseUp().
        mouseMove({ x: 200, y: 200 }).
        click().
        mouseMove({ x: -100, y: 0 }).
        doubleClick().
        perform();

      utilities.debugPause();
    });
    xit('CanvasDrawer_AddPenLine_ExpectPolygonLineOnCanvas', () => {
      //this test is to expose a bug - only two points for a polygon should not be possible
    });

    //Adding objects while holding shift key
    it('CanvasDrawer_AddEllipseThenHoldShiftKey_ExpectObjectSizeToBecomeSquareVertically', () => {
      utilities.normalPause();

      canvas.selectButton("Ellipse");
      utilities.shortPause();

      browser.actions().
        mouseDown(element(by.css("app-editable-drawer app-drawer svg"))).
        mouseMove({ x: -200, y: 100 }).
        sendKeys(protractor.Key.SHIFT).
        mouseUp().
        sendKeys(protractor.Key.NULL).
        perform();

      utilities.normalPause();

      element(by.css("ellipse")).getSize().then(function (eleSize) {
        expect(eleSize.height).toBeLessThan(200 + sizeBuffer);
        expect(eleSize.height).toBeGreaterThan(200 - sizeBuffer);
        expect(eleSize.width).toBeLessThan(200 + sizeBuffer);
        expect(eleSize.width).toBeGreaterThan(200 - sizeBuffer);
      });
    });
    it('CanvasDrawer_AddEllipseThenHoldShiftKey_ExpectObjectSizeToBecomeSquareHorizontally', () => {
      utilities.normalPause();

      canvas.selectButton("Ellipse");
      utilities.shortPause();

      browser.actions().
        mouseDown(element(by.css("app-editable-drawer app-drawer svg"))).
        mouseMove({ x: -100, y: 200 }).
        sendKeys(protractor.Key.SHIFT).
        mouseUp().
        sendKeys(protractor.Key.NULL).
        perform();

      utilities.normalPause();

      element(by.css("ellipse")).getSize().then(function (eleSize) {
        expect(eleSize.height).toBeLessThan(200 + sizeBuffer);
        expect(eleSize.height).toBeGreaterThan(200 - sizeBuffer);
        expect(eleSize.width).toBeLessThan(200 + sizeBuffer);
        expect(eleSize.width).toBeGreaterThan(200 - sizeBuffer);
      });
    });
    xit('CanvasDrawer_UsePenToolWhileHoldingShiftKey_ExpectObjectToSnapToAngle', () => {
      utilities.normalPause();

      canvas.selectButton("Pen");
      utilities.shortPause();

      browser.actions().
        mouseDown(element(by.css("app-editable-drawer app-drawer svg"))).
        mouseUp().
        mouseMove({ x: -100, y: 200 }).
        click().
        mouseMove({ x: -10, y: 10 }).
        sendKeys(protractor.Key.SHIFT).
        click().
        mouseMove({ x: 0, y: -10 }).
        sendKeys(protractor.Key.NULL).
        doubleClick().
        perform();

      utilities.debugPause();
      utilities.debugPause();
    });

    //Group / Ungroup
    it('CanvasDrawer_GroupObjects_ExpectObjectsToBeGrouped', () => {
      utilities.normalPause();

      canvas.selectButton("Clear");

      canvas.selectButton("Rectangle");
      utilities.shortPause();

      canvas.drawSquareSize(200);
      utilities.longPause();

      canvas.selectButton("Ellipse");
      utilities.shortPause();

      canvas.drawSquareSize(80);
      utilities.longPause();

      canvas.selectButton("Selector");
      utilities.shortPause();

      browser.actions().
        mouseDown(element(by.css(containerCss + "ellipse"))).
        mouseUp().
        sendKeys(protractor.Key.SHIFT).
        mouseDown(element(by.css(containerCss + "rect"))).
        mouseUp().
        sendKeys(protractor.Key.NULL).
        perform();
      utilities.normalPause();

      canvas.selectButton("Group");
      utilities.shortPause();

      expect(element(by.css(containerCss + "svg.fill-parent g")).isPresent()).toBeTruthy();
    });
    it('CanvasDrawer_UngroupObjects_ExpectGroupedObjectsToSeparate', () => {
      utilities.normalPause();

      canvas.selectButton("Rectangle");
      utilities.shortPause();

      canvas.drawSquareSize(200);
      utilities.longPause();

      canvas.selectButton("Ellipse");
      utilities.shortPause();

      canvas.drawSquareSize(80);
      utilities.longPause();

      canvas.selectButton("Selector");
      utilities.shortPause();

      browser.actions().
        mouseDown(element(by.css(containerCss + "ellipse"))).
        mouseUp().
        sendKeys(protractor.Key.SHIFT).
        mouseDown(element(by.css(containerCss + "rect"))).
        mouseUp().
        sendKeys(protractor.Key.NULL).
        perform();
      utilities.normalPause();

      canvas.selectButton("Group");
      utilities.shortPause();
      
      canvas.selectButton("Ungroup");
      utilities.normalPause();

      expect(element(by.css(containerCss + "svg.fill-parent g")).isPresent()).toBeFalsy();
    });

    //Clearing and copying
    it('CanvasDrawer_DuplicateObject_ExpectObjectToAppearTwice', () => {
      utilities.normalPause();

      canvas.selectButton("Rectangle");
      utilities.shortPause();

      canvas.drawSquareSize(200);
      utilities.longPause();

      canvas.selectButton("Selector");
      utilities.shortPause();

      canvas.selectButton("Duplicate");
      utilities.shortPause();

      element.all(by.css(containerCss + "app-selector-tool app-drawer svg.fill-parent rect")).then(function (elements) {
        expect(elements.length).toEqual(2);
      });
    });
    it('CanvasDrawer_RemoveObject_ExpectObjectToBeRemovedFromCanvas', () => {
      utilities.normalPause();

      canvas.selectButton("Rectangle");
      utilities.shortPause();

      canvas.drawSquareSize(200);
      utilities.longPause();

      canvas.selectButton("Selector");
      utilities.shortPause();

      canvas.selectButton("Remove");
      utilities.shortPause();

      expect(element(by.css(containerCss + "rect")).isPresent()).toBeFalsy();
    });
    it('CanvasDrawer_ClearCanvas_ExpectAllObjectsToBeRemoved', () => {
      utilities.normalPause();

      canvas.selectButton("Clear");
      utilities.shortPause();

      expect(element(by.css(containerCss + "rect")).isPresent()).toBeFalsy();
    });

    //Styles
    it('CanvasDrawer_StyleButton_ExpectObjectStyleToChange', () => {
      utilities.normalPause();

      canvas.selectButton("Clear");
      utilities.shortPause();

      canvas.selectButton("Rectangle");
      utilities.shortPause();
      
      canvas.drawSquareSize(200);
      utilities.longPause();

      canvas.selectButton("Selector");
      utilities.shortPause();

      canvas.selectButton("Styles");
      utilities.shortPause();

      expect(element(by.css("app-editable-drawer app-drawer rect")).getCssValue("fill")).toEqual("rgb(255, 0, 0)");
    });

    //Directionals
    it('CanvasDrawer_DownButton_ExpectObjectToBeLayeredBelowAnother', () => {
      utilities.normalPause();

      canvas.selectButton("Clear");

      utilities.normalPause();

      canvas.selectButton("Clear");

      canvas.selectButton("Rectangle");
      utilities.shortPause();

      canvas.drawSquareSize(200);
      utilities.longPause();

      canvas.selectButton("Ellipse");
      utilities.shortPause();

      canvas.drawSquareSize(80);
      utilities.longPause();

      canvas.selectButton("Selector");
      utilities.shortPause();

      canvas.selectButton("Down");
      utilities.shortPause();

      //click away from the object
      browser.actions().
        mouseMove(element(by.css(containerCss + "ellipse"))).
        mouseMove({ x: -200, y: 0 }).
        click().
        perform();
      utilities.normalPause();

      //the order of the children elements determines the "layer" they rest on
      element.all(by.css(containerCss + "svg.fill-parent > *")).each(function (element, index) {
        if (index == 0) {
          expect(element.getTagName()).toEqual("ellipse");
        } else if (index == 1) {
          expect(element.getTagName()).toEqual("rect");
        }
      });
    });
    it('CanvasDrawer_UpButton_ExpectObjectToBeLayeredAboveAnother', () => {
      utilities.normalPause();

      canvas.selectButton("Clear");

      utilities.normalPause();

      canvas.selectButton("Clear");

      canvas.selectButton("Rectangle");
      utilities.shortPause();

      canvas.drawSquareSize(200);
      utilities.longPause();

      canvas.selectButton("Ellipse");
      utilities.shortPause();

      canvas.drawSquareSize(80);
      utilities.longPause();

      canvas.selectButton("Selector");
      utilities.shortPause();

      element(by.css(containerCss + "svg.fill-parent rect.clickable")).click();
      utilities.normalPause();

      canvas.selectButton("Up");
      utilities.normalPause();

      //click away from the object
      browser.actions().
        mouseMove(element(by.css(containerCss + "rect.clickable"))).
        mouseMove({ x: -200, y: 0 }).
        click().
        perform();
      utilities.normalPause();

      //the order of the children elements determines the "layer" they rest on
      element.all(by.css(containerCss + "svg.fill-parent > *")).each(function (element, index) {
        if (index == 0) {
          expect(element.getTagName()).toEqual("ellipse");
        } else if (index == 1) {
          expect(element.getTagName()).toEqual("rect");
        }
      });
    });
    it('CanvasDrawer_LeftButton_ExpectObjectToBeLeftAlignedToAnother', () => {
      utilities.normalPause();

      canvas.selectButton("Clear");

      utilities.normalPause();

      canvas.selectButton("Clear");

      canvas.selectButton("Rectangle");
      utilities.shortPause();

      canvas.drawSquareSize(200);
      utilities.longPause();

      canvas.selectButton("Ellipse");
      utilities.shortPause();

      canvas.drawSquareSize(80);
      utilities.longPause();

      canvas.selectButton("Selector");
      utilities.shortPause();

      browser.actions().
        mouseDown(element(by.css(containerCss + "ellipse"))).
        mouseUp().
        sendKeys(protractor.Key.SHIFT).
        mouseDown(element(by.css(containerCss + "rect"))).
        mouseUp().
        sendKeys(protractor.Key.NULL).
        perform();
      utilities.normalPause();

      canvas.selectButton("Left");
      utilities.normalPause();

      expect(element(by.css(containerCss + "ellipse")).getCssValue("cx")).toEqual("340px");
    });
    it('CanvasDrawer_RightButton_ExpectObjectToBeRightAlignedToAnother', () => {
      utilities.normalPause();

      canvas.selectButton("Clear");

      utilities.normalPause();

      canvas.selectButton("Clear");

      canvas.selectButton("Rectangle");
      utilities.shortPause();

      canvas.drawSquareSize(200);
      utilities.longPause();

      canvas.selectButton("Ellipse");
      utilities.shortPause();

      canvas.drawSquareSize(80);
      utilities.longPause();

      canvas.selectButton("Selector");
      utilities.shortPause();

      browser.actions().
        mouseDown(element(by.css(containerCss + "ellipse"))).
        mouseUp().
        sendKeys(protractor.Key.SHIFT).
        mouseDown(element(by.css(containerCss + "rect"))).
        mouseUp().
        sendKeys(protractor.Key.NULL).
        perform();
      utilities.normalPause();

      canvas.selectButton("Right");
      utilities.normalPause();

      expect(element(by.css(containerCss + "ellipse")).getCssValue("cx")).toEqual("460px");
    });
    it('CanvasDrawer_CenterButton_ExpectObjectToBeCenterAlignedToAnother', () => {
      utilities.normalPause();

      canvas.selectButton("Clear");

      utilities.normalPause();

      canvas.selectButton("Clear");

      canvas.selectButton("Rectangle");
      utilities.shortPause();

      canvas.drawSquareSize(200);
      utilities.longPause();

      canvas.selectButton("Ellipse");
      utilities.shortPause();

      canvas.drawSquareSize(80);
      utilities.longPause();

      canvas.selectButton("Selector");
      utilities.normalPause();

      browser.actions().
        mouseDown(element(by.css(containerCss + "ellipse"))).
        mouseUp().
        sendKeys(protractor.Key.SHIFT).
        mouseDown(element(by.css(containerCss + "rect"))).
        mouseUp().
        sendKeys(protractor.Key.NULL).
        perform();
      utilities.normalPause();

      canvas.selectButton("Center");
      utilities.normalPause();

      expect(element(by.css(containerCss + "ellipse")).getCssValue("cx")).toEqual("400px");
    });
    it('CanvasDrawer_TopButton_ExpectObjectToBeTopAlignedToAnother', () => {
      utilities.normalPause();

      canvas.selectButton("Clear");

      utilities.normalPause();

      canvas.selectButton("Clear");

      canvas.selectButton("Rectangle");
      utilities.shortPause();

      canvas.drawSquareSize(200);
      utilities.longPause();

      canvas.selectButton("Ellipse");
      utilities.shortPause();

      canvas.drawSquareSize(80);
      utilities.longPause();

      canvas.selectButton("Selector");
      utilities.shortPause();

      browser.actions().
        mouseDown(element(by.css(containerCss + "ellipse"))).
        mouseUp().
        sendKeys(protractor.Key.SHIFT).
        mouseDown(element(by.css(containerCss + "rect"))).
        mouseUp().
        sendKeys(protractor.Key.NULL).
        perform();
      utilities.normalPause();

      canvas.selectButton("Top");
      utilities.normalPause();

      expect(element(by.css(containerCss + "ellipse")).getCssValue("cy")).toEqual("340px");
    });
    it('CanvasDrawer_MiddleButton_ExpectObjectToBeMiddleAlignedToAnother', () => {
      utilities.normalPause();

      canvas.selectButton("Clear");

      utilities.normalPause();

      canvas.selectButton("Clear");

      canvas.selectButton("Rectangle");
      utilities.shortPause();

      canvas.drawSquareSize(200);
      utilities.longPause();

      canvas.selectButton("Ellipse");
      utilities.shortPause();

      canvas.drawSquareSize(80);
      utilities.longPause();

      canvas.selectButton("Selector");
      utilities.normalPause();

      browser.actions().
        mouseMove(element(by.css(containerCss + "ellipse"))).
        click().
        sendKeys(protractor.Key.SHIFT).
        mouseMove(element(by.css(containerCss + "rect"))).
        click().
        sendKeys(protractor.Key.NULL).
        perform();
      utilities.normalPause();

      canvas.selectButton("Middle");
      utilities.normalPause();

      expect(element(by.css(containerCss + "ellipse")).getCssValue("cy")).toEqual("400px");
    });
    it('CanvasDrawer_BottomButton_ExpectObjectToBeBottomAlignedToAnother', () => {
      utilities.normalPause();

      canvas.selectButton("Clear");

      utilities.normalPause();

      canvas.selectButton("Clear");

      canvas.selectButton("Rectangle");
      utilities.shortPause();

      canvas.drawSquareSize(200);
      utilities.longPause();

      canvas.selectButton("Ellipse");
      utilities.shortPause();

      canvas.drawSquareSize(80);
      utilities.longPause();

      canvas.selectButton("Selector");
      utilities.shortPause();

      browser.actions().
        mouseDown(element(by.css(containerCss + "ellipse"))).
        mouseUp().
        sendKeys(protractor.Key.SHIFT).
        mouseDown(element(by.css(containerCss + "rect"))).
        mouseUp().
        sendKeys(protractor.Key.NULL).
        perform();
      utilities.normalPause();

      canvas.selectButton("Bottom");
      utilities.normalPause();

      expect(element(by.css(containerCss + "ellipse")).getCssValue("cy")).toEqual("460px");
    });

    //Rotation
    it('CanvasDrawer_RotateRightHandle_ExpectObjectToRotate', () => {
      utilities.normalPause();

      canvas.selectButton("Rectangle");
      utilities.shortPause();

      canvas.drawSquareSize(200);
      utilities.longPause();

      canvas.selectButton("Selector");
      utilities.shortPause();

      canvas.rotateSelectedObject("#rotate-right", 50, 50);
      utilities.normalPause();

      //utilities.debugPause();

      element(by.css("app-selector-tool svg.grabber")).getAttribute("style").then(function (value) {
        expect(value.includes("transform: rotate(15deg)")).toBeTruthy();
      });
    });
    it('CanvasDrawer_RotateBottomHandle_ExpectObjectToRotate', () => {
      utilities.normalPause();

      canvas.selectButton("Rectangle");
      utilities.shortPause();

      canvas.drawSquareSize(200);
      utilities.longPause();

      canvas.selectButton("Selector");
      utilities.shortPause();

      canvas.rotateSelectedObject("#rotate-bottom", 50, 50);
      utilities.normalPause();

      //utilities.debugPause();

      element(by.css("app-selector-tool svg.grabber")).getAttribute("style").then(function (value) {
        expect(value.includes("transform: rotate(345deg)")).toBeTruthy();
      });
    });
    it('CanvasDrawer_SelectMultipleItems_ExpectRotationHandlesToNotAppear', () => {
      utilities.normalPause();

      canvas.selectButton("Rectangle");
      utilities.shortPause();

      canvas.drawSquareSize(200);
      utilities.longPause();

      canvas.drawSquareSize(-200);
      utilities.longPause();

      canvas.selectButton("Selector");
      utilities.shortPause();
      
      browser.actions().
        sendKeys(protractor.Key.SHIFT).
        mouseDown(element(by.css(containerCss + "rect"))).
        mouseUp().
        sendKeys(protractor.Key.NULL).
        perform();
      utilities.normalPause();

      expect(element(by.css("#rotate-right")).isPresent()).toBeFalsy();
      expect(element(by.css("#rotate-bottom")).isPresent()).toBeFalsy();
  });

    //Shift rotate (snap to 45 degree angle)
    it('CanvasDrawer_SnapRotateObject_ExpectObjectToBeRotatedAt45DegreeAngle', () => {
      utilities.normalPause();

      canvas.selectButton("Rectangle");
      utilities.shortPause();

      canvas.drawSquareSize(200);
      utilities.longPause();

      canvas.selectButton("Selector");
      utilities.shortPause();

      browser.actions().
        mouseDown(element(by.css("#rotate-right"))).
        mouseMove({ x: -100, y: -50 }). // Odd movement, so it's not an obvious 45 degree change
        sendKeys(protractor.Key.SHIFT).
        mouseUp().
        sendKeys(protractor.Key.NULL).
        perform();

      //utilities.debugPause();

      element(by.css("app-selector-tool svg.grabber")).getAttribute("style").then(function (value) {
        expect(value.includes("transform: rotate(315deg)")).toBeTruthy();
      });
    });

    //Shift resize of already rotated object
    it('CanvasDrawer_AddEllipseThenHoldShiftKey_ExpectObjectSizeToBeResized', () => {
      utilities.normalPause();

      canvas.selectButton("Ellipse");
      utilities.shortPause();

      canvas.drawSquareSize(200);
      utilities.longPause();

      canvas.selectButton("Selector");
      utilities.shortPause();

      canvas.rotateSelectedObject("#rotate-right", 50, 50);
      utilities.normalPause();
      
      browser.actions().
        mouseDown(element(by.css("#resizer-4"))).
        mouseMove({ x: -100, y: -50 }).
        sendKeys(protractor.Key.SHIFT).
        mouseUp().
        sendKeys(protractor.Key.NULL).
        perform();

      utilities.normalPause();

      expect(element(by.css("ellipse")).getSize()).toEqual(jasmine.objectContaining({
        width: 172.07049560546875,
        height: 172.07049560546875
      }));
    });

    //Es-ca-pé - it's spelled just like the word escape
    it('CanvasDrawer_PressEscapeWhileCreatingEllipse_ExpectObjectToClear', () => {
      utilities.normalPause();

      canvas.selectButton("Ellipse");
      utilities.shortPause();

      browser.actions().
        mouseDown(element(by.css("app-editable-drawer app-drawer svg"))).
        mouseMove({ x: 100, y: 100 }).
        sendKeys(protractor.Key.ESCAPE).
        mouseUp().
        sendKeys(protractor.Key.NULL).
        perform();

      expect(element(by.css("ellipse")).isPresent()).toBeFalsy();
    });
    it('CanvasDrawer_PressEscapeWhileResizingObject_ExpectObjectToRemainOriginalSize', () => {
      utilities.normalPause();

      canvas.selectButton("Ellipse");
      utilities.shortPause();

      canvas.drawSquareSize(100);
      utilities.longPause();

      canvas.selectButton("Selector");
      utilities.shortPause();

      browser.actions().
        mouseDown(browser.findElement(by.css(canvas.getResizerCssByIndex(1)))).
        mouseMove({ x: 100, y: 0 }).
        sendKeys(protractor.Key.ESCAPE).
        mouseUp().
        sendKeys(protractor.Key.NULL).
        perform();
      
      utilities.normalPause();

      element(by.css("ellipse")).getSize().then(function (eleSize) {
        expect(eleSize.height).toBeLessThan(100 + sizeBuffer);
        expect(eleSize.height).toBeGreaterThan(100 - sizeBuffer);
        expect(eleSize.width).toBeLessThan(100 + sizeBuffer);
        expect(eleSize.width).toBeGreaterThan(100 - sizeBuffer);
      });
    });
});
