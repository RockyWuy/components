import * as React from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

export interface HelloProps {
    compiler: string;
    framework: string;
}
interface TitleProps {
    readonly isActive?: boolean;
}

const Title = styled.div({
    'font-size': '1.5rem',
    'text-align': 'center',
    'color': 'red',
});

const Button = styled.button<TitleProps>`
    background: ${props => props.isActive ? 'palevioletred' : 'white'};
    color: #fff;
    font-size: 1rem;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
    ::before{
        content: 'ss'
    }
    :hover{
        color: red
    }
`;

const PrimaryButton = styled(Button)`
    color: tomato;
`;

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
    type: 'password',

    // or we can define dynamic ones
    margin: size || '1em',
    padding: size || '1em'
}))`
    color: palevioletred;
    font-size: 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
  
    /* here we use the dynamically computed props */
    margin: ${props => props.margin};
    padding: ${props => props.padding};
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
    content: '◀';
    margin: 0 10px;
  }
`;

export class Hello extends React.Component<HelloProps, {}> {
    public OnClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        console.log('lll', e);
        this.setState({
            name: 'ss'
        });
    }

    public render() {
        return (
            <div>
                <Title>Hello from {this.props.compiler} and {this.props.framework}</Title>
                <Button onClick={this.OnClick} isActive>Primary</Button>
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
            </div>
        );
    }
}