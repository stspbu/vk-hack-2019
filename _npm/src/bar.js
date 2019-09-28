import React from "react";
import {FixedLayout, Tabs, TabsItem} from '@vkontakte/vkui'

require('./styles/styles.css');

class Bar extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 'dict'
        }
    }

    onTestTabClick(){
        this.props.onTestTabClick()
    }


    render() {
        return (
            <FixedLayout vertical="bottom">
                <Tabs>
                    <TabsItem
                        onClick={() => this.setState({ activeTab: 'dict' })}
                        selected={this.state.activeTab === 'dict'}
                    >dict</TabsItem>
                    <TabsItem
                        onClick={this.onTestTabClick.bind(this)}//{() => this.setState({ activeTab: 'test' })}
                        selected={this.state.activeTab === 'test'}
                    >test</TabsItem>
                </Tabs>
            </FixedLayout>
        );
    }
}

export default Bar;