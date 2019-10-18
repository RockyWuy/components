import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TestButton from '@components/Button/test1';
import Carousel from '@components/Carousel';

ReactDOM.render(
    <div>
        <TestButton />
        <Carousel>
            <div style={{ background: '#fff', height: '100%' }}>sss</div>
            <div style={{ background: '#fff', height: '100%' }}>aaa</div>
            <div style={{ background: '#fff', height: '100%' }}>ddd</div>
        </Carousel>
    </div>,
    document.getElementById('root')
);