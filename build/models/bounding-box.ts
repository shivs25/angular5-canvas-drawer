export interface BoundingBox {
    x: number;
    y: number;
    height: number;
    width: number;
}

export const DEFAULT_BOUNDING_BOX: BoundingBox = {
    x: 0,
    y: 0,
    height: 0,
    width: 0,
};

export function createBoundingBox(): BoundingBox {
    return Object.assign({}, DEFAULT_BOUNDING_BOX);
}