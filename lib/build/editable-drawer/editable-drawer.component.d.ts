import { OnInit, EventEmitter } from '@angular/core';
import { DrObject } from '../models/dr-object';
import { DataStoreService } from '../services/data-store.service';
export declare class EditableDrawerComponent implements OnInit {
    private _dataService;
    selectionChanged: EventEmitter<DrObject[]>;
    editingChanged: EventEmitter<boolean>;
    elements: DrObject[];
    constructor(_dataService: DataStoreService);
    ngOnInit(): void;
}
