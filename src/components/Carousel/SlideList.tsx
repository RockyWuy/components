import styled from 'styled-components';

interface ISlideListProps {
    translateX: number;
    width: number;
}

export const SlideList = styled.div.attrs<ISlideListProps>((props: ISlideListProps) => ({
    style: {
        width: `${props.width}px`,
        transform: `translateX(${props.translateX}px)`
    }
}))`
    position: relative;
    display: block;
    height: 100%;
`;