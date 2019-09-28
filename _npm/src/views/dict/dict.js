import * as React from "react";
import {View} from "@vkontakte/vkui";


import {BaseComponent} from "../../base"
import DictPanel from "./panels/dict"
import WordAddingPanel from "./panels/word-adding"
import WordPanel from "./panels/word"


class DictView extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            activePanel: 'dict_panel',
            selectedWord: null
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

    onWordClick(word) {
        this.log('Selected a word ' + JSON.stringify(word));

        this.setState({
            selectedWord: word
        });
        this.changePanel('word_panel')
    }

    render() {
        return (
            <View id='dict_view' activePanel={this.state.activePanel}>
                <DictPanel
                    id='dict_panel'
                    onWordAddingClick={this.onWordAddingClick.bind(this)}
                    onWordClick={(word) => this.onWordClick(word)}/>
                <WordAddingPanel id='word_adding_panel'/>
                <WordPanel id='word_panel' data={this.state.selectedWord} />

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