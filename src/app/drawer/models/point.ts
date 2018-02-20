import { Directive } from '@angular/core';

@Directive({
    selector: '[app-drawer]'
})

export class Point {
    x: number;
    y: number;
}
