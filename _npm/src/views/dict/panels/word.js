import React from 'react'
import {Panel, PanelHeader} from "@vkontakte/vkui";

import {BaseComponent} from "../../../base";

class WordPanel extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data
        }
    }

    render() {
        return (
            <Panel id='word_panel'>
                <PanelHeader>
                    Слово {this.state.data.word}
                </PanelHeader>
            </Panel>
        )
    }
}

export default WordPanel;