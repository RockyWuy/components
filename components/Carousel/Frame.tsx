import styled from 'styled-components';

export const Frame = styled.div<{height: number}>`
    position: relative;
    display: block;
    width: 100vw;
    height: ${props => props.height}px;
    overflow: hidden;
    border: 1px solid #000;
    background: grey;
`;