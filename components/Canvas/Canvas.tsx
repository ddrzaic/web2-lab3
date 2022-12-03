import * as React from "react";
import { Rectangle } from "../../utils/";
import * as S from "./Canvas.styled";

export interface CanvasProps {
  children: React.ReactNode;
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function getInitialRectangles(
  numberOfRectangles: number,
  canvasRef: React.RefObject<HTMLCanvasElement>
) {
  const rectangles: Rectangle[] = [];
  const rectangleDimension =
    (canvasRef.current?.width! + canvasRef.current?.height!) / 25;
  for (let i = 0; i < numberOfRectangles; i++) {
    rectangles.push(
      new Rectangle({
        x: getRandomInt(canvasRef.current?.height || 0),
        y: getRandomInt(canvasRef.current?.width || 0),
        width: rectangleDimension,
        height: rectangleDimension,
        speedX: Math.random() / 2 + 0.01,
        speedY: Math.random() / 2 + 0.01,
        canvasHeight: canvasRef.current?.height || 0,
        canvasWidth: canvasRef.current?.width || 0,
      })
    );
  }
  return rectangles;
}

export const Canvas = ({ children }: CanvasProps) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [context, setContext] = React.useState<CanvasRenderingContext2D | null>(
    null
  );
  const [numberOfComponents, setNumberOfComponents] = React.useState(0);
  const [rectangles, setRectangles] = React.useState<Rectangle[]>([]);
  const clearCanvas = () => {
    if (context) {
      context.clearRect(
        0,
        0,
        context.canvas.width ?? 1000,
        context.canvas.height ?? 1000
      );
    }
  };

  React.useEffect(() => {
    const randomNumberOfComponents = getRandomInt(6) + 3;
    setNumberOfComponents(randomNumberOfComponents);
    let initialRectangles = getInitialRectangles(
      randomNumberOfComponents,
      canvasRef
    );
    setRectangles(initialRectangles);
  }, []);

  React.useEffect(() => {
    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext("2d");
      if (renderCtx) {
        setContext(renderCtx);
      }
    }
  }, [canvasRef, numberOfComponents]);

  const draw = () => {
    if (context) {
      clearCanvas();
      const txt1 = "Number of components: " + numberOfComponents.toString();
      context.font = "10px Arial";
      context.fillText(
        txt1,
        context.canvas.width - context.measureText(txt1).width - 10,
        15
      );

      rectangles.forEach((rectangle) => {
        rectangle.newPos(context);
        rectangle.update(context);
      });
    }
  };
  setInterval(draw, 20);

  return (
    <S.Canvas id="myCanvas" ref={canvasRef}>
      {children}
    </S.Canvas>
  );
};
