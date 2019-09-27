import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Hello } from '@components/Hello';
import Button from '@components/Button';

ReactDOM.render(
    <div>
        <Hello compiler="TypeScript" framework="React" />
        <Button>sss</Button>
    </div>,
    document.getElementById('root')
);