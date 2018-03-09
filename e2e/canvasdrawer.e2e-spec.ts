import { } from './jasmine';
import { promise, browser, element, by, protractor } from 'protractor';
import { Utilities } from './helpers/Utilities';
import { CanvasPage } from './helpers/CanvasPage';
const protractorImageComparison = require('protractor-image-comparison');

fdescribe('Maps', function () {

  let utilities: Utilities = new Utilities();
  let canvas: CanvasPage = new CanvasPage();
  let containerCss = "app-editable-drawer app-drawer ";

    beforeAll(() => {
        //browser.ignoreSynchronization = true;

    });
    afterAll(() => {

    });
    beforeEach(() => {
      browser.get('/');
      browser.waitForAngularEnabled();
      utilities.newSmartPause(by.xpath('.//*[.="Undo"]'), false);
    });
    afterEach(() => {
        
    });
  
    it('CanvasDrawer_ExpectCanvasLoads', () => {
      utilities.normalPause();

      expect(browser.isElementPresent(by.xpath('.//*[.="Undo"]'))).toBeTruthy();
    });

    //Resizing
    it('CanvasDrawer_TopResize_ExpectObjectToBeResizedVerticallyUpwards', () => {
      utilities.normalPause();

      element(by.css(containerCss + 'rect.clickable')).click();
      utilities.normalPause();

      canvas.moveObjectByOffset(by.css(canvas.getResizerCssByIndex(7)), 0, -80);
      utilities.normalPause();
    });
    it('CanvasDrawer_BottomResize_ExpectObjectToBeResizedVerticallyDownwards', () => {
      utilities.normalPause();

      element(by.css(containerCss + 'rect.clickable')).click();
      utilities.normalPause();

      canvas.moveObjectByOffset(by.css(canvas.getResizerCssByIndex(3)), 0, 80);
      utilities.normalPause();
    });
    it('CanvasDrawer_LeftResize_ExpectObjectToBeResizedHorizontallyLeft', () => {
      utilities.normalPause();

      element(by.css(containerCss + 'rect.clickable')).click();
      utilities.normalPause();

      canvas.moveObjectByOffset(by.css(canvas.getResizerCssByIndex(1)), -80, 0);
      utilities.normalPause();
    });
    it('CanvasDrawer_RightResize_ExpectObjectToBeResizedHorizontallyRight', () => {
      utilities.normalPause();

      element(by.css(containerCss + 'rect.clickable')).click();
      utilities.normalPause();

      canvas.moveObjectByOffset(by.css(canvas.getResizerCssByIndex(5)), 80, 0);
      utilities.normalPause();
    });

    //Undo / Redo
    it('CanvasDrawer_MoveThenUndo_ExpectObjectToReturnToOriginalPosition', () => {
      utilities.normalPause();

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

      canvas.selectButton("Clear");
      utilities.shortPause();

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

      canvas.selectButton("Clear");
      utilities.shortPause();

      canvas.selectButton("Rectangle");
      utilities.shortPause();

      canvas.drawSquareSize(200);
      utilities.longPause();

      canvas.selectButton("Selector");
      utilities.shortPause();

      expect(element(by.css(containerCss + "rect")).isDisplayed()).toBeTruthy();
    });
    it('CanvasDrawer_AddRectangle_ExpectRectangleObjectOnCanvas', () => {
      utilities.normalPause();

      canvas.selectButton("Clear");
      utilities.shortPause();

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

      canvas.selectButton("Clear");
      utilities.shortPause();

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

    //Group / Ungroup
    it('CanvasDrawer_UngroupObjects_ExpectGroupedObjectsToSeparate', () => {
      utilities.normalPause();

      element(by.css('rect.clickable')).click();
      utilities.normalPause();

      canvas.selectButton("Ungroup");
      utilities.normalPause();

      expect(element(by.css(containerCss + "svg.fill-parent g")).isPresent()).toBeFalsy();
    });
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

    //Clearing and copying
    it('CanvasDrawer_DuplicateObject_ExpectObjectToAppearTwice', () => {
      utilities.normalPause();

      element(by.css(containerCss + 'rect.clickable')).click();
      utilities.normalPause();

      canvas.selectButton("Duplicate");
      utilities.shortPause();

      element.all(by.css(containerCss + "svg.fill-parent g")).then(function (elements) {
        expect(elements.length / 2).toEqual(2);
      });
    });
    it('CanvasDrawer_RemoveObject_ExpectObjectToBeRemovedFromCanvas', () => {
      utilities.normalPause();

      element(by.css(containerCss + 'rect.clickable')).click();
      utilities.normalPause();

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

      expect(element(by.css(containerCss + "rect")).getCssValue("stroke")).toEqual("rgb(255, 255, 0)");
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
});
