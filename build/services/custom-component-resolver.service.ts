import { Injectable } from '@angular/core';
import { DrObject } from '../models/dr-object';

@Injectable({
  providedIn: 'root'
})
export class CustomComponentResolverService {

  constructor() { }

  buildComponent(data: DrObject): any {
    return null;
  }

  canRotate(data: DrObject): boolean {
    return false;
  }
}
