export default interface IDrawable {
  draw(context: CanvasRenderingContext2D, tileSize: number): any;
}