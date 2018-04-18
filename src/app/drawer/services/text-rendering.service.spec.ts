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

  it('should not add lines of text', () => {
    let d = createDrText({ 
      x: 100, 
      y: 100,
      width: 200,
      height: 100,
      vAlignment: DrTextAlignment.NEAR,
      hAlignment:  DrTextAlignment.NEAR, 
      text: "\n" + "Text",
      id: 6,
      size: 16,
      fontFamily: 'Courier New',
      rotation: 0,
      italic: false,
      showStroke: true,
      stroke: 'black'
    });

    
    let r = service.getDivText(d);
    let u = service.undoHtmlText(r);
    d.text = u;
    r = service.getDivText(d);
    u = service.undoHtmlText(r);
    d.text = u;

    expect(d.text).toEqual("\nText");
  });

  it('should remove span', () => {

    let u = service.undoHtmlText('<div><span style="font-size: 16pt;">Text</span><br></div>');

    expect(u).toEqual("Text");
  });

  it('should include first and last line', () => {

    let u = service.undoHtmlText('<div><br></div>Text<div><br></div>');

    expect(u).toEqual("\nText\n");
  });

  it('should include last line', () => {

    let u = service.undoHtmlText('Text<div><br></div>');

    expect(u).toEqual("Text\n");
  });


  it('should have beginning break', () => {
    let d = createDrText({ 
      x: 100, 
      y: 100,
      width: 200,
      height: 100,
      vAlignment: DrTextAlignment.NEAR,
      hAlignment:  DrTextAlignment.NEAR, 
      text: "\n" + "Text",
      id: 6,
      size: 16,
      fontFamily: 'Courier New',
      rotation: 0,
      italic: false,
      showStroke: true,
      stroke: 'black'
    });
    
    let u = service.getDivText(d);

    expect(u).toEqual("<div><br></div>Text");
  });
  
  it('should have end break', () => {
    let d = createDrText({ 
      x: 100, 
      y: 100,
      width: 200,
      height: 100,
      vAlignment: DrTextAlignment.NEAR,
      hAlignment:  DrTextAlignment.NEAR, 
      text: "Text" + "\n",
      id: 6,
      size: 16,
      fontFamily: 'Courier New',
      rotation: 0,
      italic: false,
      showStroke: true,
      stroke: 'black'
    });
    
    let u = service.getDivText(d);

    expect(u).toEqual("Text<div><br></div>");
  });

  it('should have new line', () => {
    let d = createDrText({ 
      x: 100, 
      y: 100,
      width: 200,
      height: 100,
      vAlignment: DrTextAlignment.NEAR,
      hAlignment:  DrTextAlignment.NEAR, 
      text: "Text" + "\n" + "Billy",
      id: 6,
      size: 16,
      fontFamily: 'Courier New',
      rotation: 0,
      italic: false,
      showStroke: true,
      stroke: 'black'
    });
    
    let u = service.getDivText(d);

    expect(u).toEqual("Text<div>Billy</div>");
  });

  it('should break because out of space', () => {
    let d = createDrText({ 
      x: 100, 
      y: 100,
      width: 80,
      height: 253,
      vAlignment: DrTextAlignment.NEAR,
      hAlignment:  DrTextAlignment.NEAR, 
      text: "Text" + "\n" + "\n" + "dsf" + "\n" + "\n" + "a" + "\n" + "bilasdf" + "\n",
      id: 6,
      size: 16,
      fontFamily: 'Courier New',
      rotation: 0,
      italic: false,
      showStroke: true,
      stroke: 'black'
    });
    
    let u = service.getSvgText(d);
    expect(u.length).toEqual(8);
  });
});

/*
Text<div><br></div><div>dsf</div><div><br></div><div>a</div><div>bilasdf</div>
253, width
*/