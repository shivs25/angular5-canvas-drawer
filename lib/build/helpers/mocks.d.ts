import { NgRedux } from "@angular-redux/store";
import { ChangeHelperService } from "../services/change-helper.service";
import { DrawerObjectHelperService } from "../services/drawer-object-helper.service";
import { TextRenderingService } from '../services/text-rendering.service';
import { DataStoreService } from "../services/data-store.service";
export declare class MockRedux extends NgRedux<any> {
    private state;
    constructor(state: any);
    dispatch: () => any;
    getState: () => any;
    configureStore: () => any;
    configureSubStore: () => any;
    provideStore: () => any;
    replaceReducer: () => any;
    select: () => any;
    subscribe: () => any;
}
export declare class MockChangeHelperService extends ChangeHelperService {
}
export declare class MockDrawerObjectHelperService extends DrawerObjectHelperService {
}
export declare class MockTextRenderingService extends TextRenderingService {
}
export declare class MockDataStoreService extends DataStoreService {
    constructor();
}
