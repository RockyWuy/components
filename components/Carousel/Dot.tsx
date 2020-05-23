import * as React from "react";
import styled from "styled-components";

interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any;
}

interface IDotProps {
  selected: boolean;
  selectedColor?: string;
}

const Dot = styled.span<IDotProps>`
  display: inline-block;
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 0.6rem;
  background-color: ${(props) =>
    props.selected ? props.selectedColor || "#da373d" : "grey"};

  margin: 0 0.3rem;
  opacity: ${(props) => (props.selected ? 1 : 0.3)};
  transition-duration: 0.3s;
`;

const WrapperDot = styled.div<{ width: number }>`
  position: absolute;
  width: ${(props) => props.width}px;
  z-index: 100;
  bottom: 0.1rem;
  text-align: center;
  background-color: transparent;
`;

interface IndicatorDotProps {
  total: number;
  currentIndex: number;
  width: number;
  selectedColor?: string;
}

const IndicatorDot: React.SFC<IndicatorDotProps> = ({
  total,
  currentIndex,
  width,
  selectedColor,
}) => {
  if (!total || total < 4) {
    return <Dot selected />;
  }
  const len = total - 2;
  const arr = Array.from(new Array(len).keys());
  return (
    <WrapperDot width={width}>
      {arr.map((dot, i) => {
        return (
          <Dot
            selectedColor={selectedColor}
            selected={i === currentIndex - 1}
            key={i}
          />
        );
      })}
    </WrapperDot>
  );
};

export default IndicatorDot;
