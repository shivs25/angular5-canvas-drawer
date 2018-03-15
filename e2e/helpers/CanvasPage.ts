import { ElementFinder } from 'protractor';
import { promise, browser, element, by } from 'protractor';

export class CanvasPage {
  selectButton(buttonName) {
    browser.element(by.xpath('.//*[.="' + buttonName + '"]')).click();
  };

  moveObjectByOffset(objectCss, offsetX, offsetY) {
    browser.actions().
      mouseDown(browser.findElement(objectCss)).
      mouseMove({ x: offsetX, y: offsetY }).
      mouseUp().
      perform();
  };

  getResizerCssByIndex(index) {
    return "#resizer-" + index;
  };

  drawSquareSize(size) {
    browser.actions().
      mouseDown(element(by.css("app-editable-drawer app-drawer svg"))).
      mouseMove({ x: size, y: size }).
      mouseUp().
      perform();
  };

  rotateSelectedObject(rotateHandleCss, offsetX, offsetY) {
    browser.actions().
      mouseDown(element(by.css(rotateHandleCss))).
      mouseMove({ x: offsetX, y: offsetY }).
      mouseUp().
      perform();
  }
}
