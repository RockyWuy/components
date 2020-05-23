import * as React from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";

export interface HelloProps {
  compiler?: string;
  framework?: string;
}
interface TitleProps {
  readonly isActive?: boolean;
}

const Title = styled.div({
  "font-size": "1.5rem",
  "text-align": "center",
  color: "red",
});

const Button = styled.button<TitleProps>`
  background: ${(props) => (props.isActive ? "palevioletred" : "white")};
  color: #fff;
  font-size: 1rem;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  ::before {
    content: "sss";
  }
  :hover {
    color: red;
  }
`;

const PrimaryButton = styled(Button)`
  color: tomato;
`;

// const PrimaryButton2 = Button.extends`
//     color: #fff;
// `;

const Thing = styled.div`
  && {
    color: blue;
  }
`;

const GlobalStyle = createGlobalStyle`
  div${Thing} {
    color: red;
  }
`;

const Input = styled.input.attrs(({ size }) => ({
  // we can define static props
  type: "password",

  // or we can define dynamic ones
  margin: size || "1em",
  padding: size || "1em",
}))`
  color: palevioletred;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;

  /* here we use the dynamically computed props */
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
`;

const rotate = keyframes`
    from {
        transform: rotate(0deg)
    }
    to {
        transform: rotate(360deg)
    }
`;

const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;

const Link = styled.a`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background: papayawhip;
  color: palevioletred;
`;

const Icon = styled.svg`
  flex: none;
  transition: fill 0.25s;
  width: 48px;
  height: 48px;
  ${Link}:hover & {
    fill: rebeccapurple;
  }
`;

const Label = styled.span`
  display: flex;
  align-items: center;
  line-height: 1.2;

  &::before {
    content: "◀";
    margin: 0 10px;
  }
`;

const Indicator = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: linear-gradient(to right top, teal 50%, transparent 50%) no-repeat;
  background-size: 100% calc(100% - 100vh + 5px);
  z-index: 1;
  pointer-events: none;
  mix-blend-mode: darken;
  &::after {
    content: "";
    position: fixed;
    top: 5px;
    bottom: 0;
    right: 0;
    left: 0;
    background: #fff;
    z-index: 1;
  }
`;

// 半透明边框
// 默认情况下，背景的颜色会延伸至边框下层，这意味着我们设置的透明边框效果会被覆盖掉，在css3中，我们可以通过设置background-clip: padding-box 来改变背景的默认行为，达到我们想要的效果
const Clip = styled.div`
  width: 100px;
  height: 100px;
  background: red;
  background-clip: padding-box;
  border: 10px solid rgba(0, 0, 0, 0.4);
`;

// 多重边框
const BoxShadow = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #fafafa;
  margin: 105px 29px;
  box-shadow: 0 0 0 10px #e8e2d6, 0 0 0 20px #e1d9c9, 0 0 0 30px #d9cfbb,
    0 0 0 40px #d2c6ae, 0 0 0 50px #cabca0, 0 0 0 60px #c3b393,
    0 0 0 70px #bba985, 0 0 0 80px #b4a078;
`;

// 边框内圆角
// 我们知道 box-shadow 是会紧贴 border-radius 圆角边的，但是，描边outline并不会与圆角边border-radius贴合，我们可以将两者组合，通过box-shadow去填补描边outline所产生的间隙来达到我们想要的效果
const BorderInner = styled.div`
  margin: 10px 0 0 10px;
  width: 200px;
  padding: 8px 16px;
  border-radius: 8px;
  background: #f4f0ea;
  outline: 6px solid #b4a078;
  box-shadow: 0 0 0 5px #b4a078;
`;

// 条纹背景
const ProcessOuter = styled.div`
  margin-top: 20px;
  width: 360px;
  height: 12px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  background: rgba(180, 160, 120, 0.2);
`;
const panoramic = keyframes`
    to {
      background-position: 200% 0;
    }
`;
const ProcessInner = styled.div`
  width: 60%;
  height: inherit;
  border-radius: 6px;
  background: repeating-linear-gradient(
    -45deg,
    #d9cfbb 25%,
    #c3b393 0,
    #c3b393 50%,
    #d9cfbb 0,
    #d9cfbb 75%,
    #c3b393 0
  );
  background-size: 16px 16px;
  animation: ${panoramic} 20s linear infinite;
`;

const Img = styled.div`
  width: 300px;
  height: 150px;
  clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
  transition: clip-path 1s;
  background: red;
  &:hover {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
`;

export class Hello extends React.Component<HelloProps, {}> {
  public OnClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    this.setState({
      name: "ss",
    });
  };

  public render() {
    return (
      <div>
        <Img />
        <ProcessOuter>
          <ProcessInner />
        </ProcessOuter>
        <BorderInner>
          A paragraph of filler text. La la la de dah de dah de dah de la.
        </BorderInner>
        <BoxShadow />
        <Clip />
        <Indicator />
        <Title>
          Hello from {this.props.compiler} and {this.props.framework}
        </Title>
        <Button onClick={this.OnClick} isActive>
          Primary
        </Button>
        <Button onClick={this.OnClick}>Primary</Button>
        <PrimaryButton>tomato</PrimaryButton>
        <GlobalStyle />
        <Thing>Im blue, da ba dee da ba daa</Thing>
        <Input placeholder="A small text input" size={1} />
        <br />
        <Input placeholder="A bigger text input" size={2} />
        <Rotate>&lt; 💅 &gt;</Rotate>
        <Link href="#">
          <Icon viewBox="0 0 20 20">
            <path d="M10 15h8c1 0 2-1 2-2V3c0-1-1-2-2-2H2C1 1 0 2 0 3v10c0 1 1 2 2 2h4v4l4-4zM5 7h2v2H5V7zm4 0h2v2H9V7zm4 0h2v2h-2V7z" />
          </Icon>
          <Label>Hovering my parent changes my style!</Label>
        </Link>
        <Button as="a">linka</Button>
      </div>
    );
  }
}
