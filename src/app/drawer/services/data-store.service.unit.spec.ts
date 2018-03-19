import { TestBed, inject, getTestBed } from '@angular/core/testing';

import { DataStoreService } from './data-store.service';
import { NgRedux } from '@angular-redux/store';
import { DrawerObjectHelperService } from './drawer-object-helper.service';
import { ChangeHelperService  } from './change-helper.service';
import { rootReducer, INITIAL_STATE, IDrawerAppState } from '../store';

import { MockRedux, MockChangeHelperService, MockDrawerObjectHelperService } from '../helpers/mocks';
import { createDrRect, DrRect } from '../models/dr-rect';
import { DrObject } from '../models/dr-object';
import { SET_ELEMENTS, SELECT_OBJECTS } from '../actions';
import { CHANGE_OBJECTS_PROPERTIES } from '../actions';


describe('DataStoreService', () => {
  let objectHelperService: any;
  let changeService: any;
  let redux;
  let service: DataStoreService;

  beforeEach(() => {
   redux = new MockRedux({});
    changeService = new MockChangeHelperService();
    objectHelperService = new MockDrawerObjectHelperService();
    service = new DataStoreService(redux, objectHelperService, changeService);
  });

  it('should be created', () => {
    
    expect(service).toBeTruthy();
  });

  it('should move last object down', () => {
    let items = [
      createDrRect({ id: 1}),
      createDrRect({ id: 2}),
      createDrRect({ id: 3}),
      createDrRect({ id: 4}),
    ];

    spyOn(redux, "getState").and.returnValue(Object.assign({}, INITIAL_STATE, {
      elementState: {
        present: {
          elements: items
        }
      }
    }));
    spyOn(redux, "dispatch");

    service.moveObjectsDown([Object.assign({}, items[3]) as DrObject]);

    expect(redux.dispatch).toHaveBeenCalledWith({
      type: SET_ELEMENTS,
      elements: [
        items[0],
        items[1],
        items[3],
        items[2]
      ]
    });
    
  });

  it('should not move first object down', () => {
    let items = [
      createDrRect({ id: 1}),
      createDrRect({ id: 2}),
      createDrRect({ id: 3}),
      createDrRect({ id: 4}),
    ];

    spyOn(redux, "getState").and.returnValue(Object.assign({}, INITIAL_STATE, {
      elementState: {
        present: {
          elements: items
        }
      }
    }));
    spyOn(redux, "dispatch");

    service.moveObjectsDown([Object.assign({}, items[0]) as DrObject]);

    expect(redux.dispatch).not.toHaveBeenCalled();
    
  });

  it('should move middle object', () => {
    let items = [
      createDrRect({ id: 1}),
      createDrRect({ id: 2}),
      createDrRect({ id: 3}),
      createDrRect({ id: 4}),
    ];

    spyOn(redux, "getState").and.returnValue(Object.assign({}, INITIAL_STATE, {
      elementState: {
        present: {
          elements: items
        }
      }
    }));
    spyOn(redux, "dispatch");

    service.moveObjectsDown([Object.assign({}, items[2]) as DrObject]);

    expect(redux.dispatch).toHaveBeenCalledWith({
      type: SET_ELEMENTS,
      elements: [
        items[0],
        items[2],
        items[1],
        items[3]
      ]}
    );
    
  });

  it('should move first object up', () => {
    let items = [
      createDrRect({ id: 1}),
      createDrRect({ id: 2}),
      createDrRect({ id: 3}),
      createDrRect({ id: 4}),
    ];

    spyOn(redux, "getState").and.returnValue(Object.assign({}, INITIAL_STATE, {
      elementState: {
        present: {
          elements: items
        }
      }
    }));
    spyOn(redux, "dispatch");

    service.moveObjectsUp([Object.assign({}, items[0]) as DrObject]);

    expect(redux.dispatch).toHaveBeenCalledWith({
      type: SET_ELEMENTS,
      elements: [
        items[1],
        items[0],
        items[2],
        items[3]
      ]
    });
    
  });

  it('should not move last object up', () => {
    let items = [
      createDrRect({ id: 1}),
      createDrRect({ id: 2}),
      createDrRect({ id: 3}),
      createDrRect({ id: 4}),
    ];  

    spyOn(redux, "getState").and.returnValue(Object.assign({}, INITIAL_STATE, {
      elementState: {
        present: {
          elements: items
        }
      }
    }));
    spyOn(redux, "dispatch");

    service.moveObjectsUp([Object.assign({}, items[3]) as DrObject]);

    expect(redux.dispatch).not.toHaveBeenCalled();
    
  });

  it('should move middle object', () => {
    let items = [
      createDrRect({ id: 1}),
      createDrRect({ id: 2}),
      createDrRect({ id: 3}),
      createDrRect({ id: 4}),
    ];

    spyOn(redux, "getState").and.returnValue(Object.assign({}, INITIAL_STATE, {
      elementState: {
        present: {
          elements: items
        }
      }
    }));
    spyOn(redux, "dispatch");

    service.moveObjectsUp([Object.assign({}, items[1]) as DrObject]);

    expect(redux.dispatch).toHaveBeenCalledWith({
      type: SET_ELEMENTS,
      elements: [
        items[0],
        items[2],
        items[1],
        items[3]
      ]}
    );
    
  });

  it('should move multiple middle objects', () => {
    let items = [
      createDrRect({ id: 1}),
      createDrRect({ id: 2}),
      createDrRect({ id: 3}),
      createDrRect({ id: 4}),
      createDrRect({ id: 5}),
      createDrRect({ id: 6})
    ];

    spyOn(redux, "getState").and.returnValue(Object.assign({}, INITIAL_STATE, {
      elementState: {
        present: {
          elements: items
        }
      }
    }));
    spyOn(redux, "dispatch");

    service.moveObjectsUp([
      Object.assign({}, items[1]) as DrObject,
      Object.assign({}, items[2]) as DrObject
    ]);

    expect(redux.dispatch).toHaveBeenCalledWith({
      type: SET_ELEMENTS,
      elements: [
        items[0],
        items[3],
        items[1],
        items[2],
        items[4],
        items[5]
      ]}
    );
    
  });

  it('should move multiple objects with first one included', () => {
    let items = [
      createDrRect({ id: 1}),
      createDrRect({ id: 2}),
      createDrRect({ id: 3}),
      createDrRect({ id: 4}),
      createDrRect({ id: 5}),
      createDrRect({ id: 6})
    ];

    spyOn(redux, "getState").and.returnValue(Object.assign({}, INITIAL_STATE, {
      elementState: {
        present: {
          elements: items
        }
      }
    }));
    spyOn(redux, "dispatch");

    service.moveObjectsUp([
      Object.assign({}, items[0]) as DrObject,
      Object.assign({}, items[2]) as DrObject
    ]);

    expect(redux.dispatch).toHaveBeenCalledWith({
      type: SET_ELEMENTS,
      elements: [
        items[1],
        items[3],
        items[0],
        items[2],
        items[4],
        items[5]
      ]}
    );
    
  });

  it('should move multiple objects with last included', () => {
    let items = [
      createDrRect({ id: 1}),
      createDrRect({ id: 2}),
      createDrRect({ id: 3}),
      createDrRect({ id: 4}),
      createDrRect({ id: 5}),
      createDrRect({ id: 6})
    ];

    spyOn(redux, "getState").and.returnValue(Object.assign({}, INITIAL_STATE, {
      elementState: {
        present: {
          elements: items
        }
      }
    }));
    spyOn(redux, "dispatch");

    service.moveObjectsUp([
      Object.assign({}, items[2]) as DrObject,
      Object.assign({}, items[5]) as DrObject
    ]);

    expect(redux.dispatch).toHaveBeenCalledWith({
      type: SET_ELEMENTS,
      elements: [
        items[0],
        items[1],
        items[3],
        items[4],
        items[2],
        items[5]
      ]}
    );
    
  });

  it('should not move multiplethat cant move', () => {
    let items = [
      createDrRect({ id: 1}),
      createDrRect({ id: 2}),
      createDrRect({ id: 3}),
      createDrRect({ id: 4}),
      createDrRect({ id: 5}),
      createDrRect({ id: 6})
    ];

    spyOn(redux, "getState").and.returnValue(Object.assign({}, INITIAL_STATE, {
      elementState: {
        present: {
          elements: items
        }
      }
    }));
    spyOn(redux, "dispatch");

    service.moveObjectsUp([
      Object.assign({}, items[4]) as DrObject,
      Object.assign({}, items[5]) as DrObject
    ]);

    expect(redux.dispatch).not.toHaveBeenCalled();
    
  });


  it('should set visibility on objects', () => {
    let items = [
      createDrRect({ id: 1}),
      createDrRect({ id: 2}),
      createDrRect({ id: 3}),
      createDrRect({ id: 4}),
    ];

    spyOn(redux, "getState").and.returnValue(Object.assign({}, INITIAL_STATE, {
      elementState: {
        present: {
          elements: items,
          selectedObjects: []
        }
      }
    }));
    spyOn(redux, "dispatch");

    service.setVisibility([
      Object.assign({}, items[0]) as DrObject,
      Object.assign({}, items[3]) as DrObject
    ]
    , false);

    expect(redux.dispatch).toHaveBeenCalledWith({
        type: CHANGE_OBJECTS_PROPERTIES,
        changes: [
          { id: 1, changes: { visible: false } },
          { id: 4, changes: { visible: false } }
        ]
      }
    );
      
    
  });

  it('should return a name with a 1 when no elements', () => {
    let items = [
    ];

    
    spyOn(redux, "getState").and.returnValue(Object.assign({}, INITIAL_STATE, {
      elementState: {
        present: {
          elements: items
        }
      }
    }));
    
    let result: string = service.getUniqueName("star");

    expect(result).toEqual("star 1");
    
  });

  it('should return a name with a 2 when a star already exists', () => {
    let items = [
      createDrRect({ id: 1, name: "star 1"})
    ];

    
    spyOn(redux, "getState").and.returnValue(Object.assign({}, INITIAL_STATE, {
      elementState: {
        present: {
          elements: items
        }
      }
    }));
    
    let result: string = service.getUniqueName("star");

    expect(result).toEqual("star 2");
    
  });

  it('should return a name with a 1 when a star already exists with name 2', () => {
    let items = [
      createDrRect({ id: 1, name: "star 2"})
    ];

    
    spyOn(redux, "getState").and.returnValue(Object.assign({}, INITIAL_STATE, {
      elementState: {
        present: {
          elements: items
        }
      }
    }));
    
    let result: string = service.getUniqueName("star");

    expect(result).toEqual("star 1");
    
  });

  it('should return a name with a 1 when a 1 already exists but with a different name', () => {
    let items = [
      createDrRect({ id: 1, name: "circle 1"})
    ];

    
    spyOn(redux, "getState").and.returnValue(Object.assign({}, INITIAL_STATE, {
      elementState: {
        present: {
          elements: items
        }
      }
    }));
    
    let result: string = service.getUniqueName("star");

    expect(result).toEqual("star 1");
    
  });

});
