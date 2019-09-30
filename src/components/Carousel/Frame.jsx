import styled from 'styled-components';

export const Frame = styled.div`
    display: block;
    width: 100vw;
    height: ${props => props.height}px;
    overflow: hidden;
    background: grey;
    position: relative;
`;