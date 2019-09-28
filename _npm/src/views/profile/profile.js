import * as React from "react";
import {View} from "@vkontakte/vkui";


import {BaseComponent} from "../../base"
import ProfilePanel from "./panels/profile";

class TestView extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            activePanel: 'profile_panel'
        }
    }

    render() {
        return (
            <View id='profile_view' activePanel={this.state.activePanel}>
                <ProfilePanel
                    id='profile_panel'
                />
            </View>
        )
    }
}

export default TestView;