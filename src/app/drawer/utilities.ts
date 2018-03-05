import { DrObject } from './models/dr-object';
import { DrType } from './models/enums';
import { DrGroupedObject } from './models/dr-grouped-object';


export function cloneDeep(item: DrObject): DrObject {
    let returnValue = Object.assign({}, item);

    if (DrType.GROUPED_OBJECT === returnValue.drType) {
       (returnValue as DrGroupedObject).objects = (returnValue as DrGroupedObject).objects.map((x: any) => cloneDeep(x));
    }

    return returnValue;
}

export function updateChildItemIds(newItem: DrObject, nextId: number): number {
    if (DrType.GROUPED_OBJECT === newItem.drType){
        for(let o of (newItem as DrGroupedObject).objects){
            o.id = nextId++;
            updateChildItemIds(o, nextId);
        }
    }
    return nextId;
}
