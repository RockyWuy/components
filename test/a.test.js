import * as React from 'react';
import Hello from './a';
import { shallow } from 'enzyme';

it('Jest-React-TypeScript 尝试运行', () => {
    const renderer = shallow(<Hello />);
    expect(renderer.text()).toEqual('hello world');
});