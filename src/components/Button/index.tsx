import styled from 'styled-components';
import theme from '@themes/button/index.js';
console.log(theme);

interface ButtonProps {
    disabled?: boolean;    // 按钮失效状态 默认值 false
    href?: string;         // 点击跳转的地址, 指定此属性 button 行为和 a 链接一致
    loading?: boolean;     // 设置按钮载入状态 默认值 false
    size?: string;         // 设置按钮大小, 可选值为 small/large 或者不设
    mold?: string;         // 按钮类型, 可选值为 primary/dashed/danger/link 或者不设
    onClick?: () => void;  // 点击按钮的回调
}

const Button = styled.button<ButtonProps>`
    color: ${props => props.mold === 'primary' ? theme['btn-primary-color'] : theme['btn-color']};
    background: ${props => props.mold === 'primary' ? theme['btn-primary-bg'] : '#fff'};

    font-size: ${props => props.size === 'small' ? '12px' : props.size === 'large' ? '16px' : '14px'};
    font-weight: 400;
    line-height: 1.5;
    text-align: center;
    
    padding: 0 15px;
    border: 1px solid ${props => props.type ? 'white' : 'blue'};
    border-radius: 2px;
`;

export default Button;