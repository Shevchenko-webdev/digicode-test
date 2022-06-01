export class GetArea {
  getArea(type: string, size: number): number {
    switch (type) {
      case "circle":
        return GetArea.getCircleArea(size);
      case "ellipse":
        return GetArea.getEllipseArea(size);
      case "triangle":
        return GetArea.getNSideShapeArea(size, 3)
      case "rectangle":
        return GetArea.getNSideShapeArea(size, 4);
      case "pentagon":
        return GetArea.getNSideShapeArea(size, 5);
      case "hexagon":
        return GetArea.getNSideShapeArea(size, 6);
      case "custom-shape":
        return GetArea.getCustomArea(size);
      default:
        throw new Error('Undefined shape type');
    }
  }

  private static getNSideShapeArea(radius: number, n: number): number {
    return +(1 / 2 * radius ** 2 * n * Math.sin(360 / n * Math.PI / 180.0)).toFixed();
  }

  private static getCircleArea(radius: number): number {
    return +(Math.PI * radius ** 2).toFixed();
  }

  private static getEllipseArea(a: number): number {
    return +(Math.PI * a * (a / 2)).toFixed();
  }

  private static getCustomArea(x: number): number {
    const areaOfBase = x**2;
    const areaOfSmallCirclesSegment = (Math.PI * (x / 4) ** 2) * 2;

    const circleRadius = (Math.sqrt(2) * 2) / 2;
    const areaOfLargeCirclesSegment = .5 * circleRadius ** 2 * (45 - Math.sin(45 * Math.PI / 180.0));
    return +(areaOfBase + areaOfSmallCirclesSegment + areaOfLargeCirclesSegment).toFixed();
  }
}
