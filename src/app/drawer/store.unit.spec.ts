import { editingReducer, INITIAL_ELEMENT_STATE, elementsReducer, IDrawerAppState, rootReducer, INITIAL_STATE } from "./store";
import { SET_ELEMENTS, REPLACE_OBJECTS, ADD_OBJECTS, CHANGE_OBJECTS_PROPERTIES, REMOVE_OBJECTS } from "./actions";
import { createDrRect } from "./models/dr-rect";
import { createDrEllipse } from "./models/dr-ellipse";
import { createDrGroupedObject, DrGroupedObject } from "./models/dr-grouped-object";
import { NgRedux } from "@angular-redux/store";
import { createStore } from "redux";
import { ActionCreators } from "redux-undo";
import { DrStyledObject } from "./models/dr-styled-object";
import { Action } from "rxjs/scheduler/Action";



describe('Store Tests', () => {
    
    it('Should return initial state if no action defined', () => {
        expect(elementsReducer(undefined, { type: 'UNDEFINED' })).toEqual(INITIAL_ELEMENT_STATE);
    });

    it('Should set elements', () => {
        expect(elementsReducer(undefined, { 
            type: SET_ELEMENTS, 
            elements: [createDrRect({}), createDrRect({})]
        }).elements.length).toEqual(2);
    });

    it('SHould replace the objects when there are 1 item to add and multiple to remove', () => {
        let state = INITIAL_ELEMENT_STATE;

        state.elements = [
            createDrRect({ id: 1}), 
            createDrEllipse({ id: 2 }),
            createDrRect({ id: 3})
        ];

        let res = elementsReducer(state, {
            type: REPLACE_OBJECTS,
            itemsToAdd: createDrGroupedObject({ id: 4} ),
            itemsToRemove: state.elements.slice(1),
            zIndex: 1
        });
        expect(res.elements.length).toEqual(2);
        expect(res.elements[0].id).toEqual(1);
        expect(res.elements[1].id).toEqual(4);
    });

    it('SHould replace the objects at zIndex 0 when there are 1 item to add and multiple to remove', () => {
        let state = INITIAL_ELEMENT_STATE;

        state.elements = [
            createDrRect({ id: 1}), 
            createDrEllipse({ id: 2 }),
            createDrRect({ id: 3})
        ];

        let res = elementsReducer(state, {
            type: REPLACE_OBJECTS,
            itemsToAdd: createDrGroupedObject({ id: 4} ),
            itemsToRemove: state.elements.slice(1),
            zIndex: 0
        });
        expect(res.elements.length).toEqual(2);
        expect(res.elements[0].id).toEqual(4);
        expect(res.elements[1].id).toEqual(1);
    });

    it('SHould replace the objects  when there are 1 item to remove and multiple to add', () => {
        let state = INITIAL_ELEMENT_STATE;

        state.elements = [
            createDrRect({ id: 1}), 
            createDrEllipse({ id: 2 }),
            createDrRect({ id: 3})
        ];
        let res = elementsReducer(state, {
            type: REPLACE_OBJECTS,
            itemsToAdd: [createDrRect({ id: 4 }), createDrRect({ id: 5 })],
            itemsToRemove: state.elements.slice(1, 2),
            zIndex: 2
        });
        expect(res.elements.length).toEqual(4);
        expect(res.elements.map((t) => t.id)).toEqual([1, 4, 5, 3]);
    });


    it('Should restore state on undo after move up', () => {
        let state = INITIAL_STATE;

        state.elementState.present.elements = [
            createDrRect({ id: 1}), 
            createDrEllipse({ id: 2 }),
            createDrRect({ id: 3})
        ];
        let store = createStore(rootReducer, state);
        
        let currentState = store.getState();

        store.dispatch({
            type: ADD_OBJECTS,
            newItems: [createDrRect({ id: 4})]
        });
        
        currentState = store.getState();
        //SIMULATE A MOVE_OBJECTS_DOWN
        store.dispatch({
            type: SET_ELEMENTS,
            elements: [
                currentState.elementState.present.elements[0],
                currentState.elementState.present.elements[1],
                currentState.elementState.present.elements[3],
                currentState.elementState.present.elements[2]
            ]
        });

        currentState = store.getState();

        store.dispatch(ActionCreators.undo());
        expect(store.getState().elementState.present.elements.length).toEqual(4);
    });

    it('Should change properties on nested object', () => {
        let state = INITIAL_STATE;

        state.elementState.present.elements = [
            createDrRect({ id: 1}), 
            createDrEllipse({ id: 2 }),
            createDrRect({ id: 3}),
            createDrGroupedObject({ id: 4, objects: [
                createDrRect({ id: 5 }),
                createDrRect({ id: 6 })
            ]})
        ];
        let store = createStore(rootReducer, state);
        
        let currentState = store.getState();

        store.dispatch({
            type: CHANGE_OBJECTS_PROPERTIES,
            changes: [{ id: 5, changes: { fill: 'yellow' }}]
        });
        
        currentState = store.getState();
        expect(((store.getState().elementState.present.elements[3] as DrGroupedObject).objects[0] as DrStyledObject).fill).toEqual('yellow');
    });

    it('Should remove on nested object', () => {
        let state = INITIAL_STATE;

        state.elementState.present.elements = [
            createDrRect({ id: 1}), 
            createDrEllipse({ id: 2 }),
            createDrRect({ id: 3}),
            createDrGroupedObject({ id: 4, objects: [
                createDrRect({ id: 5 }),
                createDrRect({ id: 6 })
            ]})
        ];
        let store = createStore(rootReducer, state);
        
        let currentState = store.getState();

        store.dispatch({
            type: REMOVE_OBJECTS,
            ids: [5]
        });
        
        currentState = store.getState();
        expect((store.getState().elementState.present.elements[3] as DrGroupedObject).objects.length).toEqual(1);
    });

    it('Should remove on nested object and put back on undo', () => {
        let state = INITIAL_STATE;

        state.elementState.present.elements = [
            createDrRect({ id: 1}), 
            createDrEllipse({ id: 2 }),
            createDrRect({ id: 3}),
            createDrGroupedObject({ id: 4, objects: [
                createDrRect({ id: 5 }),
                createDrRect({ id: 6 })
            ]})
        ];
        let store = createStore(rootReducer, state);
        
        let currentState = store.getState();

        store.dispatch({
            type: REMOVE_OBJECTS,
            ids: [5]
        });

        store.dispatch(ActionCreators.undo());
        
        currentState = store.getState();
        expect((store.getState().elementState.present.elements[3] as DrGroupedObject).objects.length).toEqual(2);
    });

    it('SHould set new elements', () => {
        let state = INITIAL_STATE;

        state.elementState.present.elements = [
            createDrRect({ id: 1}), 
            createDrEllipse({ id: 2 }),
            createDrRect({ id: 3})
        ];

        let store = createStore(rootReducer, state);

        store.dispatch({
            type: SET_ELEMENTS,
            elements: [
                Object.assign({}, state.elementState.present.elements[0]),
                Object.assign({}, state.elementState.present.elements[2]),
                Object.assign({}, state.elementState.present.elements[1])
            ]
        });

        let currentState = store.getState();
        expect(currentState.elementState.present.elements[0].id).toEqual(1);
        expect(currentState.elementState.present.elements[1].id).toEqual(3);
        expect(currentState.elementState.present.elements[2].id).toEqual(2);
    });
});