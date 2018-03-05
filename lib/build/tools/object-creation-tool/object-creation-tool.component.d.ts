import { OnInit } from '@angular/core';
import { DrObject } from '../../models/dr-object';
import { DataStoreService } from '../../services/data-store.service';
export declare class ObjectCreationToolComponent implements OnInit {
    private _dataService;
    currentObject: DrObject;
    private _mouseDown;
    private _mouseDownLocation;
    constructor(_dataService: DataStoreService);
    ngOnInit(): void;
    onBackgroundClick(evt: any): void;
    onBackgroundMouseDown(evt: any): void;
    onBackgroundMouseMove(evt: any): void;
    onBackgroundMouseUp(evt: any): void;
    private getNextId();
    private createRect(evt);
    private createEllipse(evt);
}
