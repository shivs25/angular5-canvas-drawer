import { editingReducer, INITIAL_ELEMENT_STATE, elementsReducer } from "./store";
import { SET_ELEMENTS, REPLACE_OBJECTS } from "./actions";
import { createDrRect } from "./models/dr-rect";
import { createDrEllipse } from "./models/dr-ellipse";
import { createDrGroupedObject } from "./models/dr-grouped-object";



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
});