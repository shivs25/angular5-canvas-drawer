
export interface DrStyle {

    showFill: boolean;
    showStroke: boolean;
    fill: string;
    stroke: string;
    strokeWidth: number;
    opacity: number;
    
}

export const DEFAULT_STYLE: DrStyle = {
    showFill: true,
    showStroke: true,
    fill: "#ffffff",
    stroke: "#000000",
    strokeWidth: 1,
    opacity: 1
}

export function createDrStyle(properties: any): DrStyle {
    return  Object.assign({}, DEFAULT_STYLE, properties);
}