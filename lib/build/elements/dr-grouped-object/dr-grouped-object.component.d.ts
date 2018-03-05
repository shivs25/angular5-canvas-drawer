import { DrObjectComponent } from '../dr-object/dr-object.component';
import { MouseEventData } from '../../models/mouse-event-data';
export declare class DrGroupedObjectComponent extends DrObjectComponent {
    onChildMouseDown(data: MouseEventData): void;
    onChildMouseMove(data: MouseEventData): void;
    onChildMouseUp(data: MouseEventData): void;
}
