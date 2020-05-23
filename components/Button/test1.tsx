import * as React from "react";
import Button from "./index";

export default class TestButton extends React.Component<{}, {}> {
  public constructor(props: {}) {
    super(props);

    this.ClickTo = this.ClickTo.bind(this);
  }

  public ClickTo() {
    console.log("sss");
  }

  public render() {
    return (
      <React.Fragment>
        <Button className="btn" onClick={this.ClickTo}>
          default
        </Button>
        <div style={{ height: "10px" }}></div>
        <Button disabled>default</Button>
        <div style={{ height: "10px" }}></div>
        <Button type="primary">primary</Button>
        <div style={{ height: "10px" }}></div>
        <Button disabled type="primary">
          primary
        </Button>
        <div style={{ height: "10px" }}></div>
        <Button type="ghost">ghost</Button>
        <div style={{ height: "10px" }}></div>
        <Button disabled type="ghost">
          ghost
        </Button>
        <div style={{ height: "10px" }}></div>
        <Button type="warning">warning</Button>
        <div style={{ height: "10px" }}></div>
        <Button disabled type="warning">
          warning
        </Button>
      </React.Fragment>
    );
  }
}
