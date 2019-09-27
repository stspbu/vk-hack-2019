import * as React from "react";
import {View, Panel, Cell, CellButton, PanelHeader, List, Group, Div, HeaderButton} from "@vkontakte/vkui";


import DictPanel from "./panels/dict"
import WordAddingPanel from "./panels/word-adding"
import {BaseComponent, DataLoader} from "../../base"





class DictView extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            activePanel: 'dict_panel'
        }
    }

    changePanel(panel) {
        this.setState({
            activePanel: panel
        })
    }

    onWordAddingClick() {
        this.changePanel('word_adding_panel')
    }

    render() {
        return (
            <View id='dict_view' activePanel={this.state.activePanel}>
                <DictPanel id='dict_panel' onWordAddingClick={this.onWordAddingClick.bind(this)}/>
                <WordAddingPanel id='word_adding_panel'/>

                {/*<Panel id='dict_panel'>*/}
                    {/*<Dict*/}
                        {/*onWordAddingClick={this.onWordAddingClick.bind(this)}*/}
                        {/*onWordViewClick={this.onWordViewClick.bind(this)}/>*/}
                {/*</Panel>*/}
                {/*<Panel id='word_panel'>*/}
                {/*</Panel>*/}
            </View>
        )
    }
}

export default DictView;