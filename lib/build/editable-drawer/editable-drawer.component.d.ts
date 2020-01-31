import { OnInit, EventEmitter } from '@angular/core';
import { DrObject } from '../models/dr-object';
import { DataStoreService } from '../services/data-store.service';
import { BoundingBox } from '../models/bounding-box';
export declare class EditableDrawerComponent implements OnInit {
    private _dataService;
    drawer: any;
    itemViewBox: BoundingBox;
    selectionChanged: EventEmitter<DrObject[]>;
    editingChanged: EventEmitter<boolean>;
    objectsAdded: EventEmitter<DrObject[]>;
    constructor(_dataService: DataStoreService);
    getSvgAsText(): string;
    ngOnInit(): void;
}
