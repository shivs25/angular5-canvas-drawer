import { OnInit, EventEmitter } from '@angular/core';
import { DrObject } from '../models/dr-object';
import { DataStoreService } from '../services/data-store.service';
import { BoundingBox } from '../models/bounding-box';
import { DrStyle } from '../models/dr-style';
export declare class EditableDrawerComponent implements OnInit {
    private _dataService;
    pointStyle: DrStyle;
    polygonStyle: DrStyle;
    lineStyle: DrStyle;
    drawer: any;
    itemViewBox: BoundingBox;
    penDblClick: string;
    selectionChanged: EventEmitter<DrObject[]>;
    editingChanged: EventEmitter<boolean>;
    objectsAdded: EventEmitter<DrObject[]>;
    constructor(_dataService: DataStoreService);
    getSvgAsText(): string;
    ngOnInit(): void;
}
