import * as React from "react";
import {BaseComponent} from "../../../base";
import {Panel, PanelHeader, HeaderButton, Input, Button, Div, FormLayout} from "@vkontakte/vkui";

import Icon24Back from '@vkontakte/icons/dist/24/back';

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
        let word = (e.target.value).toUpperCase().trim();
        this.log('On change, word = ' + word);

        this.setState({
            word: word
        })
    }

    onWordEnteredClick() {
        let word = this.state.word;
        this.props.onWordEnteredClick(word.toLowerCase());
    }

    render() {
        return (
            <Panel id="word_choosing_panel">
                <PanelHeader
                    left={<HeaderButton onClick={this.goBack.bind(this)}><Icon24Back/></HeaderButton>}
                >
                    Добавление слова
                </PanelHeader>
                <FormLayout>
                    <Input alignment='center' onChange={this.onChange.bind(this)} value={this.state.word}/>
                    <Button
                        size='xl'
                        stretched
                        onClick={this.onWordEnteredClick.bind(this)}
                    >
                        Продолжить
                    </Button>
                </FormLayout>
            </Panel>
        )
    }
}

export default WordChoosingPanel;