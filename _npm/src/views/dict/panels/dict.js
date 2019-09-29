import * as React from "react";
import {CellButton, Group, List, PanelHeader, Cell, Panel, Search, HeaderButton} from "@vkontakte/vkui";

import Icon24Add from '@vkontakte/icons/dist/24/add';

import {BaseComponent, DataLoader, YandexSign} from "../../../base";

class Words extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            words: this.props.data
        };
    }

    onWordClick(word) {
        this.log('Words: on word click');
        this.log(word);

        this.props.onWordClick(word);
    }

    render() {
        let search = this.props.search;
        let words = this.state.words;
        words = words.filter(({word}) => word.toLowerCase().indexOf(search) > -1);

        this.log('Search: ' + search);
        this.log('Words: ' + JSON.stringify(words));

        return [
            <Group title='Добавленные слова'>
                <List>
                    {
                        words.map((word) =>
                            <CellButton level='primary' onClick={() => this.onWordClick(word)}>
                                {word.word}
                            </CellButton>
                    )}
                </List>
            </Group>
        ]
    }
}


class DictPanel extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            search: ''
        }
    }

    onAdding() {
        this.props.onWordChoosingClick();
    }

    onSearchChange(search) {
        this.setState({search});
    }

    render() {
        return (
            <Panel id='dict_panel'>
                <PanelHeader
                    left={<HeaderButton key='add' onClick={this.onAdding.bind(this)}><Icon24Add/></HeaderButton>}>
                    Словарь
                </PanelHeader>
                <Search value={this.state.search} onChange={this.onSearchChange.bind(this)}/>

                <DataLoader
                    endpoint='/words/'
                    loaded={
                        (data) =>
                            <Words
                                data={data}
                                onWordClick={(word) => this.props.onWordClick(word)}
                                search={this.state.search}/>
                    }
                    method='GET'
                />
                {this.props.snackbar}
                <YandexSign/>
            </Panel>
        )
    }
}

export default DictPanel;