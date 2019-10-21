import * as React from 'react';
import { shallow, render } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import 'jest-styled-components';
import Button from '../index';

describe(`测试<Button> snapshots`, () => {
    const wrapper = shallow(<Button>sssa</Button>);
    const wrapper1 = render(<Button>sssa</Button>);
    it('render button', () => {
        expect(wrapper.props().children).toBe('sssa');
    });
    it('render button1', () => {
        expect(renderToJson(wrapper1)).toMatchSnapshot();
    });
});