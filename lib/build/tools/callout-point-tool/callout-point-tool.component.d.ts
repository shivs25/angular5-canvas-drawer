import { OnInit } from '@angular/core';
import { DrPoint } from '../../models/dr-point';
import { DataStoreService } from '../../services/data-store.service';
export declare class CalloutPointToolComponent implements OnInit {
    private dataService;
    SIZER_SIZE: number;
    sizerOffsetX: number;
    sizerOffsetY: number;
    mouseDown: boolean;
    sizer: number;
    point1Bounds: any;
    point2Bounds: any;
    pointerBounds: any;
    points: DrPoint[];
    polyBounds: any;
    private objectBounds;
    constructor(dataService: DataStoreService);
    ngOnInit(): void;
    getPolyBounds(): {
        left: number;
        top: number;
        width: number;
        height: number;
    };
    getPoints(): string;
    onSizerMouseDown(evt: any, index: any): void;
    onBackgroundMouseDown(evt: any): void;
    onBackgroundMouseMove(evt: any): void;
    onBackgroundMouseUp(evt: any): void;
    pixelizeBounds(bounds: any): any;
    finalize(): void;
    private isInBounds;
}
