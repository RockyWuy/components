import styled from 'styled-components';

export const SlideItem = styled.div<{width: number}>`
    display: inline-block;
    height: 100%;
    width: ${props => props.width}px;
`;