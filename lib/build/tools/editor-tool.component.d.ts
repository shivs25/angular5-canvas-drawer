import { OnInit } from '@angular/core';
import { EditorToolType } from '../models/enums';
import { DataStoreService } from '../services/data-store.service';
export declare class EditorToolComponent implements OnInit {
    private _dataService;
    SELECTOR_TOOL: EditorToolType;
    PEN_TOOL: EditorToolType;
    TEXT_EDIT_TOOL: EditorToolType;
    elementState: any;
    constructor(_dataService: DataStoreService);
    ngOnInit(): void;
    shouldShowCreationTool(): boolean;
}
