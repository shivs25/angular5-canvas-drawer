export interface DrStyle {
    showFill: boolean;
    showStroke: boolean;
    fill: string;
    stroke: string;
    strokeWidth: number;
    opacity: number;
}
export declare const DEFAULT_STYLE: DrStyle;
export declare function createDrStyle(properties: any): DrStyle;
