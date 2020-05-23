import * as React from "react";

class RoundItem {
  private index: number;
  private x: number;
  private y: number;
  private r: number;
  private color: string;
  private context: any;
  public constructor(index: number, x: number, y: number, context: any) {
    this.index = index;
    this.x = x;
    this.y = y;
    this.r = Math.random() * 2 + 1;
    let alpha = Math.floor(Math.random() * 10 + 1) / 20;
    this.color = `rgba(255, 255, 255, ${alpha})`;
    this.context = context;
  }

  public draw() {
    this.context.fillStyle = this.color;
    this.context.shadowBlur = this.r * 2;
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    this.context.closePath();
    this.context.fill();
  }

  public move() {
    this.y -= 0.15;
    if (this.y <= -10) {
      this.y = 1334 + 10;
    }
    this.draw();
  }
}

class CanvasTest extends React.Component<{}, {}> {
  // eslint-disable-next-line react/sort-comp
  private width: number;
  private height: number;
  private canvasRef: any;
  private rounds: Array<any>;

  public constructor(props: {}) {
    super(props);
    this.canvasRef = React.createRef();
    this.width = 750;
    this.height = 1334;
    this.rounds = [];
    // this.animate = this.animate.bind(this);
  }

  public componentDidMount() {
    let canvas = this.canvasRef.current;
    canvas.style.background = "#000";
    this.context = canvas.getContext("2d");
    this.init();
    // this.animate();
  }

  public render() {
    return (
      <div>
        <canvas
          ref={this.canvasRef}
          width={this.width}
          height={this.height}
        ></canvas>
      </div>
    );
  }

  public init() {
    console.log("init", this);
    for (let i = 0; i < 100; i++) {
      this.rounds[i] = new RoundItem(
        i,
        Math.random() * this.width,
        Math.random() * this.height,
        this.context
      );
      this.rounds[i].draw();
    }
    this.animate();
  }

  public animate() {
    this.context.clearRect(0, 0, this.width, this.height);

    // eslint-disable-next-line guard-for-in
    for (let i in this.rounds) {
      this.rounds[i].move();
    }
    requestAnimationFrame(this.animate.bind(this));
  }
}

export default CanvasTest;
