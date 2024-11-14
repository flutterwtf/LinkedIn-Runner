export interface Point {
  x: number;
  y: number;
}

export class WindMouse {
  private gravity = 14.5;
  private wind = 0.2;
  private minWait = 2.0;
  private maxWait = 5.0;
  private maxStep = 16.0;
  private targetArea = 6.0;
  private windX = 0.0;
  private windY = 0.0;

  async generatePoints(
    start: Point,
    end: Point,
    viewport: { width: number; height: number },
  ): Promise<Point[]> {
    const points: Point[] = [];
    let veloX = 0.0;
    let veloY = 0.0;
    const position = { ...start };

    const startMultiplier = 0.8;
    veloX = (end.x - start.x) * startMultiplier;
    veloY = (end.y - start.y) * startMultiplier;

    let lastPoint = { ...start };
    const minStepSize = 2.0;

    while (true) {
      const dist = Math.sqrt((end.x - position.x) ** 2 + (end.y - position.y) ** 2);

      if (dist < this.targetArea) {
        veloX *= 0.97;
        veloY *= 0.97;

        if (Math.abs(veloX) < 0.1 && Math.abs(veloY) < 0.1) {
          break;
        }
      }

      const windMultiplier = Math.min(dist / 200, 0.3) * Math.max(0, (dist - this.targetArea) / 50);
      const targetWindX = Math.min(this.wind, dist) * (Math.random() * 2 - 1) * windMultiplier;
      const targetWindY = Math.min(this.wind, dist) * (Math.random() * 2 - 1) * windMultiplier;

      this.windX = this.windX * 0.94 + targetWindX * 0.06;
      this.windY = this.windY * 0.94 + targetWindY * 0.06;

      veloX += this.windX;
      veloY += this.windY;

      const friction = 0.982;
      veloX *= friction;
      veloY *= friction;

      const gravityMultiplier = Math.min(dist / 50, 1);
      const targetX = ((this.gravity * (end.x - position.x)) / dist) * gravityMultiplier;
      const targetY = ((this.gravity * (end.y - position.y)) / dist) * gravityMultiplier;

      veloX = veloX * 0.92 + targetX * 0.08;
      veloY = veloY * 0.92 + targetY * 0.08;

      if (Math.abs(veloX) > this.maxStep) {
        veloX = this.maxStep * Math.sign(veloX);
      }
      if (Math.abs(veloY) > this.maxStep) {
        veloY = this.maxStep * Math.sign(veloY);
      }

      const nextX = position.x + veloX;
      const nextY = position.y + veloY;

      if (nextX < 0) {
        position.x = 0;
        veloX = 0;
      } else if (nextX > viewport.width) {
        position.x = viewport.width;
        veloX = 0;
      } else {
        position.x = nextX;
      }

      if (nextY < 0) {
        position.y = 0;
        veloY = 0;
      } else if (nextY > viewport.height) {
        position.y = viewport.height;
        veloY = 0;
      } else {
        position.y = nextY;
      }

      const distToLast = Math.sqrt(
        (position.x - lastPoint.x) ** 2 + (position.y - lastPoint.y) ** 2,
      );

      if (distToLast >= minStepSize) {
        points.push({ ...position });
        lastPoint = { ...position };
      }
    }

    points.push({ ...end });
    return points;
  }
}
