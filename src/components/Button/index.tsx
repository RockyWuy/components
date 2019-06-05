import * as React from 'react';
interface Iprops {
    name: string;
    age: number;
}

export class Button extends React.Component<Iprops, {}> {
    public clickTo = () => {
        this.setState({
            name: 'sss'
        });
    }

    public render() {
        return (
            <div onClick={this.clickTo}>
                {this.props.children}
            </div>
        );
    }
}