import React from 'react'
import {CellButton, PanelHeader, Group, List, Panel, Div, HeaderButton, Footer, Button} from "@vkontakte/vkui";

import Icon24Back from '@vkontakte/icons/dist/24/back';

import {BaseComponent, DataLoader, getRussianPluralText, InfoSnackbar} from "../../../base";


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

    onPackApplied() {
        this.props.onPackApplied();
    }

    render() {
        let wordsCnt = this.state.data.words.length;
        return (
            <Div>
                <Group title='Слова в наборе:'>
                    <List>
                        {this.state.data.words.map((word) =>
                            <CellButton onClick={() => this.onWordClicked(word)}>{word.word}</CellButton>
                        )}
                    </List>
                </Group>
                <Footer>Всего {wordsCnt} {
                    getRussianPluralText('слов', wordsCnt, '', 'о', 'а')
                }</Footer>
                <Button size='xl' onClick={this.onPackApplied.bind(this)}>Добавить в словарь</Button>
            </Div>
        )
    }
}


class PackPanel extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            pack: props.pack,
            snackbar: null
        }
    }

    onPackClick() {
        this.props.onPackClick();
    }

    onWordClicked(w) {
        this.props.onWordClicked(w);
    }

    onPackApplied(pack) {
        DataLoader.doMakeRequest({
            endpoint: '/packs/' + pack.id + '/',
            method: 'POST'
        });
        this.setState({
            snackbar: <InfoSnackbar message='Слова успешно добавлены'/>
        })
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
                                onPackApplied={() => this.onPackApplied(data.pack)}
                                onPackClick={this.onPackClick.bind(this)}
                                onWordClicked={this.onWordClicked.bind(this)}
                            />
                    }
                    failed={
                        (error) => <Div>Что-то пошло не так...</Div>
                    }
                    method='GET'
                />
                {this.state.snackbar}
            </Panel>
        )
    }
}

export default PackPanel;