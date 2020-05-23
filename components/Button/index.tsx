import styled from "styled-components";
// import theme from '@themes/button/index.js';

interface ButtonProps {
  className?: string; // 样式类名
  disabled?: boolean; // 按钮失效状态 默认值 false
  loading?: boolean; // 设置按钮载入状态 默认值 false
  size?: string; // 设置按钮大小, 可选值为 small/large 或者不设
  type?: string; // 按钮类型, 可选值为 primary/ghost/warning 或者不设
  onClick?: () => void; // 点击按钮的回调
}

// 不同类型不同颜色
function typeToColor(
  type: string = "default",
  disabled: boolean = false,
  style: string
): string {
  let colors = {
    primary: {
      color: disabled ? "hsla(0,0%,100%,.6)" : "#fff",
      bgColor: "#108ee9",
      border: "1px solid #108ee9",
    },
    ghost: {
      color: disabled ? "rgba(0,0,0,.1)" : "#108ee9",
      bgColor: "transparent",
      border: disabled ? "1px solid rgba(0,0,0,.1)" : "1px solid #108ee9",
    },
    warning: {
      color: disabled ? "hsla(0,0%,100%,.6)" : "#fff",
      bgColor: "#e94f4f",
      border: "1px solid #e94f4f",
    },
    default: {
      color: disabled ? "rgba(0,0,0,.3)" : "#000",
      bgColor: "#fff",
      border: "1px solid #ddd",
    },
  };
  return colors[type][style];
}

// 激活时的颜色
function activeColor(type: string = "default", style: string): string {
  let colors = {
    primary: {
      color: "hsla(0,0%,100%,.3)",
      bgColor: "#0e80d2",
    },
    ghost: {
      color: "rgba(16,142,233,.6)",
      bgColor: "transparent",
      border: "1px solid rgba(16,142,233,.6)",
    },
    warning: {
      color: "hsla(0,0%,100%,.3)",
      bgColor: "#d24747",
    },
    default: {
      bgColor: "#ddd",
    },
  };
  return colors[type][style];
}

const Button = styled.a<ButtonProps>`
  display: block;
  outline: 0 none;
  box-sizing: border-box;
  padding: 0;
  text-align: center;
  font-size: ${(props) =>
    props.size === "small" ? "26px" : props.size === "large" ? "48px" : "36px"};
  font-weight: 400;
  height: 4.6rem;
  line-height: 4.6rem;

  color: ${(props) => typeToColor(props.type, props.disabled, "color")};
  background-color: ${(props) =>
    typeToColor(props.type, props.disabled, "bgColor")};
  border: ${(props) => typeToColor(props.type, props.disabled, "border")};
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  border-radius: 0.5rem;

  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  white-space: nowrap;

  &:active {
    background-color: ${(props) =>
      props.disabled ? "" : activeColor(props.type, "bgColor")};
    color: ${(props) =>
      props.disabled ? "" : activeColor(props.type, "color")};
    border: ${(props) =>
      props.disabled ? "" : activeColor(props.type, "border")};
  }
`;

export default Button;
