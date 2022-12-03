export interface RectangleProps {
  x: number;
  y: number;
  width: number;
  height: number;
  speedX: number;
  speedY: number;
  canvasWidth: number;
  canvasHeight: number;
}

export class Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
  speedX: number;
  speedY: number;
  canvasWidth: number;
  canvasHeight: number;

  constructor(props: RectangleProps) {
    this.x = props.x;
    this.y = props.y;
    this.width = props.width;
    this.height = props.height;
    this.speedX = props.speedX;
    this.speedY = props.speedY;
    this.canvasWidth = props.canvasWidth;
    this.canvasHeight = props.canvasHeight;
  }
  update(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.fillStyle = "red";
    ctx.translate(this.x, this.y);
    ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
    ctx.restore();
  }

  newPos(ctx: CanvasRenderingContext2D) {
    const speedChange =
      Math.random() < 0.5 ? -Math.random() / 5 : Math.random() / 5;
    if (this.x - this.width / 2 < 0)
      this.speedX = Math.abs(this.speedX) + speedChange;
    else if (this.x + this.width / 2 >= ctx.canvas.width)
      this.speedX = -Math.abs(this.speedX) + speedChange;
    if (this.y - this.height / 2 < 0)
      this.speedY = -Math.abs(this.speedY) + speedChange;
    else if (this.y + this.height / 2 >= ctx.canvas.height)
      this.speedY = Math.abs(this.speedY) + speedChange;
    this.x += this.speedX;
    this.y -= this.speedY;
  }
}
