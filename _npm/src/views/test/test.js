import * as React from "react";
import {View} from "@vkontakte/vkui";


import {BaseComponent} from "../../base"
import TestSettings from "./panels/test-settings"
import TestPanel from "./panels/test"


class TestView extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            activePanel: 'test_settings'
        }
    }

    changePanel(panel) {
        this.setState({
            activePanel: panel
        })
    }

    onStartTestClick() {
        this.changePanel('')
    }

    render() {
        return (
            <View id='test_view' activePanel={this.state.activePanel}>
                <TestSettings
                    id='test_settings'
                    onStartTestClick={this.onStartTestClick.bind(this)}
                />
            </View>
        )
    }
}

export default TestView;