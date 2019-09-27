import styled from 'styled-components';

interface ButtonProps {
    disabled?: boolean;    // 按钮失效状态 默认值 false
    href?: string;         // 点击跳转的地址, 指定此属性 button 行为和 a 链接一致
    loading?: boolean;     // 设置按钮载入状态 默认值 false
    size?: string;         // 设置按钮大小, 可选值为 small/large 或者不设
    type?: string;         // 按钮类型, 可选值为 primary/dashed/danger/link 或者不设
    onClick?: () => void;  // 点击按钮的回调
}

const Button = styled.button<ButtonProps>`
    background: ${props => props.type ? 'blue' : 'white'};
    color: ${props => props.type ? 'white' : 'blue'};

    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 1px solid ${props => props.type ? 'white' : 'blue'};
    border-radius: 2px
`;

export default Button;