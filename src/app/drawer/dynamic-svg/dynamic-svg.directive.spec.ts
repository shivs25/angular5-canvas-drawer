import { DynamicSvgDirective } from './dynamic-svg.directive';

describe('DynamicSvgDirective', () => {
  it('should create an instance', () => {
    const directive = new DynamicSvgDirective(null, null);
    expect(directive).toBeTruthy();
  });
});
