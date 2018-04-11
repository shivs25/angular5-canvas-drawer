import { NgRedux } from "@angular-redux/store";
import { ChangeHelperService } from "../services/change-helper.service";
import { DrawerObjectHelperService } from "../services/drawer-object-helper.service";
import { TextRenderingService } from '../services/text-rendering.service';
import { DataStoreService } from "../services/data-store.service";


export class MockRedux extends NgRedux<any> {
    constructor(private state: any) {
      super();
    }
    dispatch = () => undefined;
    getState = () => this.state;
    configureStore = () => undefined;
    configureSubStore = () => undefined;
    provideStore = () => undefined;
    replaceReducer = () => undefined;
    select = () => undefined;
    subscribe = () => undefined;
  
  }

  export class MockChangeHelperService extends ChangeHelperService {
  }

  export class MockDrawerObjectHelperService extends DrawerObjectHelperService {

  }

  export class MockTextRenderingService extends TextRenderingService{}

  export class MockDataStoreService extends DataStoreService {

    constructor() { super(null, null, null, null)}
  }