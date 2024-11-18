import { IPoint } from '@core_modules/puppeteer_module/interfaces/point.interface';
import { Injectable } from '@nestjs/common';

interface IWindState {
  windX: number;
  windY: number;
}

interface IMovementState {
  position: IPoint;
  velocity: {
    x: number;
    y: number;
  };
  wind: IWindState;
}

@Injectable()
export class WindMouseService {
  private readonly gravity = 14.5;
  private readonly wind = 0.2;
  private readonly maxStep = 16.0;
  private readonly targetArea = 6.0;
  private readonly minStepSize = 2.0;
  private readonly friction = 0.982;
  private readonly velocityDecay = 0.92;
  private readonly windDecay = 0.94;

  public generatePoints(start: IPoint, end: IPoint): Array<IPoint> {
    const initialState = this.getInitialState(start, end);
    const points: Array<IPoint> = [{ ...start }];
    let currentState = initialState;
    let lastPoint = { ...start };

    while (!this.isAtDestination(currentState, end)) {
      currentState = this.calculateNextState(currentState, end);

      if (this.shouldAddPoint(currentState.position, lastPoint)) {
        points.push({ ...currentState.position });
        lastPoint = { ...currentState.position };
      }
    }
    points.push({ ...end });

    return points;
  }

  private getInitialState(start: IPoint, end: IPoint): IMovementState {
    const startMultiplier = 0.8;

    return {
      position: { ...start },
      velocity: {
        x: (end.x - start.x) * startMultiplier,
        y: (end.y - start.y) * startMultiplier,
      },
      wind: {
        windX: 0,
        windY: 0,
      },
    };
  }

  private calculateDistance(point1: IPoint, point2: IPoint): number {
    return Math.sqrt((point2.x - point1.x) ** 2 + (point2.y - point1.y) ** 2);
  }

  private isAtDestination(state: IMovementState, end: IPoint): boolean {
    const dist = this.calculateDistance(state.position, end);

    return (
      dist < this.targetArea && Math.abs(state.velocity.x) < 0.1 && Math.abs(state.velocity.y) < 0.1
    );
  }

  private calculateWindEffect(dist: number): number {
    const windMultiplier = Math.min(dist / 200, 0.3) * Math.max(0, (dist - this.targetArea) / 50);

    return Math.min(this.wind, dist) * (Math.random() * 2 - 1) * windMultiplier;
  }

  private calculateGravityEffect(dist: number, delta: number): number {
    const gravityMultiplier = Math.min(dist / 50, 1);

    return ((this.gravity * delta) / dist) * gravityMultiplier;
  }

  private limitVelocity(velocity: number): number {
    return Math.abs(velocity) > this.maxStep ? this.maxStep * Math.sign(velocity) : velocity;
  }

  private calculateNextState(state: IMovementState, end: IPoint): IMovementState {
    const dist = this.calculateDistance(state.position, end);

    const targetWindX = this.calculateWindEffect(dist);
    const targetWindY = this.calculateWindEffect(dist);

    const newWindX = state.wind.windX * this.windDecay + targetWindX * 0.06;
    const newWindY = state.wind.windY * this.windDecay + targetWindY * 0.06;

    let newVelocityX = state.velocity.x + newWindX;
    let newVelocityY = state.velocity.y + newWindY;

    newVelocityX *= this.friction;
    newVelocityY *= this.friction;

    const targetX = this.calculateGravityEffect(dist, end.x - state.position.x);
    const targetY = this.calculateGravityEffect(dist, end.y - state.position.y);

    newVelocityX = newVelocityX * this.velocityDecay + targetX * 0.08;
    newVelocityY = newVelocityY * this.velocityDecay + targetY * 0.08;

    newVelocityX = this.limitVelocity(newVelocityX);
    newVelocityY = this.limitVelocity(newVelocityY);

    if (dist < this.targetArea) {
      newVelocityX *= 0.97;
      newVelocityY *= 0.97;
    }

    return {
      position: {
        x: state.position.x + newVelocityX,
        y: state.position.y + newVelocityY,
      },
      velocity: {
        x: newVelocityX,
        y: newVelocityY,
      },
      wind: {
        windX: newWindX,
        windY: newWindY,
      },
    };
  }

  private shouldAddPoint(currentPosition: IPoint, lastPoint: IPoint): boolean {
    const distToLast = this.calculateDistance(currentPosition, lastPoint);

    return distToLast >= this.minStepSize;
  }
}
