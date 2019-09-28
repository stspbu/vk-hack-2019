import * as React from "react";
import {BaseComponent} from "../../../base";
import {Panel, PanelHeader, HeaderButton, Input, Button, Div} from "@vkontakte/vkui";

import Icon24Back from '@vkontakte/icons/dist/24/back';
import Tabs from '../../../tabs';

class WordChoosingPanel extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            word: ''
        }
    }

    goBack() {
        this.props.goBack()
    }

    onChange(e) {
        let word = e.target.value;
        this.log('On change, word = ' + word);

        this.setState({
            word: word
        })
    }

    onWordEnteredClick() {
        this.props.onWordEnteredClick(this.state.word);
    }

    render() {
        return (
            <Panel id="word_choosing_panel">
                <PanelHeader
                    left={<HeaderButton onClick={this.goBack.bind(this)}><Icon24Back/></HeaderButton>}>
                    Добавление слова
                </PanelHeader>
                <Div>
                    <Input value={this.state.word} onChange={this.onChange.bind(this)}/>
                </Div>
                <Div align="center">
                    <Button onClick={this.onWordEnteredClick.bind(this)}>
                        Продолжить
                    </Button>
                </Div>
                <Tabs/>
            </Panel>
        )
    }
}

export default WordChoosingPanel;