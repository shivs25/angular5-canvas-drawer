import { ElementFinder } from 'protractor';
import { promise, browser, element, by } from 'protractor';

export class Utilities {

    hasClass(element, cls) {
        return element.getAttribute('class').then(function (classes) {
            return classes.split(' ').indexOf(cls) !== -1;
        });
    };

    getParent(childElement: ElementFinder): ElementFinder {
        return childElement.element(by.xpath('..'));
    }

    timeouts = {
        SHORT: 1000,
        NORMAL: 2500,
        LONG: 5000
    };

    shortPause() {
        browser.sleep(this.timeouts.SHORT);
    };

    normalPause() {
        browser.sleep(this.timeouts.NORMAL);
    };

    longPause() {
        browser.sleep(this.timeouts.LONG);
    }; // "Salonpas"

    customPause(timeout) {
        browser.sleep(timeout);  
    };

    smartPause(cssToWaitFor, reverse) {
        if (reverse) {
            browser.wait(cssToWaitFor, 60000, reverse);
        }
        else {
            browser.wait(cssToWaitFor);
        }

        this.shortPause();
    };

    debugPause() {
        browser.sleep(300000);
    };

};
