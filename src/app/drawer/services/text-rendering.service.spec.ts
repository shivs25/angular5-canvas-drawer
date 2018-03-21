import { TestBed, inject } from '@angular/core/testing';

import { TextRenderingService } from './text-rendering.service';
import { createDrText } from '../models/dr-text';
import { DrTextAlignment } from '../models/enums';

describe('TextRenderingService', () => {
  let service: TextRenderingService;

  beforeEach(() => {
    service = new TextRenderingService();
  });

  it('line ending in a space should have no tilde', () => {
    let d = createDrText({ 
      x: 100, 
      y: 100,
      width: 200,
      height: 100,
      vAlignment: DrTextAlignment.NEAR,
      hAlignment:  DrTextAlignment.NEAR, 
      text: "Text \nBilly Shivers",
      id: 6,
      size: 16,
      fontFamily: 'Courier New',
      rotation: 0,
      italic: false,
      showStroke: true,
      stroke: 'black'
    });

    let r = service.getSvgText(d);

    expect(r[0].text).toEqual("Text ");
    expect(r[1].text).toEqual("Billy Shivers");
    expect(r.length).toEqual(2);
  });

  it('line ending no space should have no space', () => {
    let d = createDrText({ 
      x: 100, 
      y: 100,
      width: 200,
      height: 100,
      vAlignment: DrTextAlignment.NEAR,
      hAlignment:  DrTextAlignment.NEAR, 
      text: "Text\nBilly Shivers",
      id: 6,
      size: 16,
      fontFamily: 'Courier New',
      rotation: 0,
      italic: false,
      showStroke: true,
      stroke: 'black'
    });

    let r = service.getSvgText(d);

    expect(r[0].text).toEqual("Text");
    expect(r[1].text).toEqual("Billy Shivers");
    expect(r.length).toEqual(2);
  });

  it('one word should equal that word', () => {
    let d = createDrText({ 
      x: 100, 
      y: 100,
      width: 200,
      height: 100,
      vAlignment: DrTextAlignment.NEAR,
      hAlignment:  DrTextAlignment.NEAR, 
      text: "Text",
      id: 6,
      size: 16,
      fontFamily: 'Courier New',
      rotation: 0,
      italic: false,
      showStroke: true,
      stroke: 'black'
    });

    let r = service.getSvgText(d);

    expect(r[0].text).toEqual("Text");
    expect(r.length).toEqual(1);
  });

  it('one word starts with a space should equal that word with space', () => {
    let d = createDrText({ 
      x: 100, 
      y: 100,
      width: 200,
      height: 100,
      vAlignment: DrTextAlignment.NEAR,
      hAlignment:  DrTextAlignment.NEAR, 
      text: " Text",
      id: 6,
      size: 16,
      fontFamily: 'Courier New',
      rotation: 0,
      italic: false,
      showStroke: true,
      stroke: 'black'
    });

    let r = service.getSvgText(d);

    expect(r[0].text).toEqual(" Text");
    expect(r.length).toEqual(1);
  });

  it('one word starts with a multiple spaces should equal that word with spaces', () => {
    let d = createDrText({ 
      x: 100, 
      y: 100,
      width: 200,
      height: 100,
      vAlignment: DrTextAlignment.NEAR,
      hAlignment:  DrTextAlignment.NEAR, 
      text: "  Text",
      id: 6,
      size: 16,
      fontFamily: 'Courier New',
      rotation: 0,
      italic: false,
      showStroke: true,
      stroke: 'black'
    });

    let r = service.getSvgText(d);

    expect(r[0].text).toEqual("  Text");
    expect(r.length).toEqual(1);
  });

  it('long line of text should be cut in 2', () => {
    let d = createDrText({ 
      x: 100, 
      y: 100,
      width: 200,
      height: 100,
      vAlignment: DrTextAlignment.NEAR,
      hAlignment:  DrTextAlignment.NEAR, 
      text: "Billy Shivers is killing it here",
      id: 6,
      size: 16,
      fontFamily: 'Courier New',
      rotation: 0,
      italic: false,
      showStroke: true,
      stroke: 'black'
    });

    let r = service.getSvgText(d);

    console.log(r[0].text);
    console.log(r[1].text);
    expect(r.length).toEqual(2);
  });

  it('empty lines should return as a line', () => {
    let d = createDrText({ 
      x: 100, 
      y: 100,
      width: 200,
      height: 100,
      vAlignment: DrTextAlignment.NEAR,
      hAlignment:  DrTextAlignment.NEAR, 
      text: "Billy Shivers \n\nwhats up",
      id: 6,
      size: 16,
      fontFamily: 'Courier New',
      rotation: 0,
      italic: false,
      showStroke: true,
      stroke: 'black'
    });

    let r = service.getSvgText(d);

    expect(r[0].text).toEqual("Billy Shivers ");
    expect(r[1].text).toEqual("");
    expect(r[2].text).toEqual("whats up");
    expect(r.length).toEqual(3);
  });

  it('should include empty lines at the end', () => {
    let d = createDrText({ 
      x: 100, 
      y: 100,
      width: 200,
      height: 100,
      vAlignment: DrTextAlignment.NEAR,
      hAlignment:  DrTextAlignment.NEAR, 
      text: "Billy Shivers \n\nwhats up\n",
      id: 6,
      size: 16,
      fontFamily: 'Courier New',
      rotation: 0,
      italic: false,
      showStroke: true,
      stroke: 'black'
    });

    let r = service.getSvgText(d);
    expect(r.length).toEqual(4);
  });

  it('should include lines with spaces', () => {
    let d = createDrText({ 
      x: 100, 
      y: 100,
      width: 200,
      height: 100,
      vAlignment: DrTextAlignment.NEAR,
      hAlignment:  DrTextAlignment.NEAR, 
      text: "Billy Shivers \n  \nwhats up\n",
      id: 6,
      size: 16,
      fontFamily: 'Courier New',
      rotation: 0,
      italic: false,
      showStroke: true,
      stroke: 'black'
    });

    let r = service.getSvgText(d);
    expect(r[1].text).toEqual("  ");
  });

  it('should include lines with html spaces', () => {
    let d = createDrText({ 
      x: 100, 
      y: 100,
      width: 200,
      height: 100,
      vAlignment: DrTextAlignment.NEAR,
      hAlignment:  DrTextAlignment.NEAR, 
      text: "Billy Shivers \n  \nwhats up\n",
      id: 6,
      size: 16,
      fontFamily: 'Courier New',
      rotation: 0,
      italic: false,
      showStroke: true,
      stroke: 'black'
    });


    let r = service.getDivText(d);
    expect(r).toEqual("Billy Shivers <div>&nbsp;&nbsp;</div><div>whats up</div><div><br></div>");
  });

});

/*

*/