import * as React from "react";
import {BaseComponent} from "../../../base";
import {Panel, PanelHeader, HeaderButton, Input, Button, Div} from "@vkontakte/vkui";

import Icon24Back from '@vkontakte/icons/dist/24/back';
import Bar from '../../../bar';

class WordAddingPanel extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            word: ''
        }
    }

    onChange(e) {
        let word = e.target.value;
        this.log('On change a word: ' + word);

        this.setState({
            word: word
        })
    }

    onClick() {
        // см dict.js для примера перехода
    }

    render() {
        return (
            <Panel id="word_adding_panel">
                <PanelHeader
                    left={<HeaderButton><Icon24Back/></HeaderButton>}>
                    Добавление слова
                </PanelHeader>
                <Input value={this.state.word} onChange={this.onChange.bind(this)}/>
                <Div align="center">
                    <Button onClick={this.onClick.bind(this)}>
                        GO!
                    </Button>
                </Div>
                <Bar/>
            </Panel>
        )
    }
}

export default WordAddingPanel;