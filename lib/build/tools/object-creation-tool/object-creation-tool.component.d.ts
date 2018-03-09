import { OnInit } from '@angular/core';
import { DrObject } from '../../models/dr-object';
import { DataStoreService } from '../../services/data-store.service';
import { ChangeHelperService } from '../../services/change-helper.service';
import { DrawerObjectHelperService } from '../../services/drawer-object-helper.service';
export declare class ObjectCreationToolComponent implements OnInit {
    private _dataService;
    private _changeService;
    private _drawerObjectService;
    currentObject: DrObject;
    private _mouseDown;
    private _mouseDownLocation;
    private _mouseDownClone;
    private _mouseDownBounds;
    constructor(_dataService: DataStoreService, _changeService: ChangeHelperService, _drawerObjectService: DrawerObjectHelperService);
    ngOnInit(): void;
    onBackgroundClick(evt: any): void;
    onBackgroundMouseDown(evt: any): void;
    onBackgroundMouseMove(evt: any): void;
    onBackgroundMouseUp(evt: any): void;
    private getNextId();
    private createStar(evt);
    private createArrow(evt);
    private createCallout(evt);
    private createTriangle(evt);
    private createRect(evt, rounded);
    private createEllipse(evt);
}
