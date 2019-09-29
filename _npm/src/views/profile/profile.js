import * as React from "react";
import {FixedLayout, ScreenSpinner, View} from "@vkontakte/vkui";


import {BaseComponent} from "../../base"
import ProfilePanel from "./panels/profile";

class ProfileView extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            activePanel: 'profile_panel',

            popout: null
        }
    }

    setPopout(flag) {
        this.log('ProfileView: popout changed');

        this.setState({
            popout: flag ? <ScreenSpinner/> : null
        });
    }

    render() {
        return (
            <View id='profile_view' activePanel={this.state.activePanel} popuot={this.state.popout}>
                <ProfilePanel
                    id='profile_panel'
                    setPopout={this.setPopout.bind(this)}
                />
            </View>
        )
    }
}

export default ProfileView;