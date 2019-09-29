import React from 'react'
import {BaseComponent, DataLoader} from "../../../base";
import {CellButton, PanelHeader, Group, List, Panel, Div, HeaderButton} from "@vkontakte/vkui";


import Icon24Back from '@vkontakte/icons/dist/24/back';

class PackLoaded extends BaseComponent {
    /**
     * props.data = {
     *     id: _,
     *     name: _,
     *     avatar: _,
     *     words: [{
     *         word: _,
     *         translations: {
     *             nouns: [],
     *             verbs: []
     *             ...
     *         }
     *     }]
     * }
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            data: props.data
        }
    }

    onWordClicked(word) {
        this.props.onWordClicked(word);
    }

    render() {
        return (
            <Group title='Слова в наборе:'>
                <List>
                    {this.state.data.words.map((word) =>
                        <CellButton onClick={() => this.onWordClicked(word)}>{word.word}</CellButton>
                    )}
                </List>
            </Group>
        )
    }
}


class PackPanel extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            pack: props.pack
        }
    }

    onPackClick() {
        this.props.onPackClick();
    }

    onWordClicked(w) {
        this.props.onWordClicked(w);
    }

    goBack() {
        this.props.goBack();
    }

    render() {
        return (
            <Panel id='pack_panel'>
                <PanelHeader
                    left={<HeaderButton onClick={this.goBack.bind(this)}><Icon24Back/></HeaderButton>}
                >
                    Набор {this.state.pack.name}
                </PanelHeader>
                <DataLoader
                    endpoint={'/packs/' + this.state.pack.id + '/'}
                    loaded={
                        (data) =>
                            <PackLoaded
                                data={data.pack}
                                onPackClick={this.onPackClick.bind(this)}
                                onWordClicked={this.onWordClicked.bind(this)}
                            />
                    }
                    failed={
                        (error) => <Div>Что-то пошло не так...</Div>
                    }
                    method='GET'/>
            </Panel>
        )
    }
}

export default PackPanel;