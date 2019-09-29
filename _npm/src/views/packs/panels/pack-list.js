import React from 'react'
import {BaseComponent, DataLoader} from "../../../base";
import {Cell, PanelHeader, Group, List, Panel, Div, Avatar} from "@vkontakte/vkui";

import Icon24Fullscreen from '@vkontakte/icons/dist/24/fullscreen';

class Packs extends BaseComponent {
    /**
     * props.data = [{
     *     pack_id: _,
     *     name: _,
     *     avatar: _
     * }]
     *
     * @param props
     * */
    constructor(props) {
        super(props);

        this.state = {
            packs: this.props.data
        };
    }

    onPackClick(pack) {
        this.props.onPackClick(pack);
    }

    render() {
        let packs = this.state.packs;

        return (
            <Group>
                <List>
                    {packs.map((pack) =>
                        <Cell
                            onClick={() => this.onPackClick(pack)}
                            before={<Avatar type="image" src={pack.avatar}/>}
                            description={pack.description}
                            asideContent={
                                <Icon24Fullscreen
                                    onClick={() => this.onPackClick(pack)}
                                /> // fill='var(--accent)' fill='var(--accent)'
                            }
                        >
                            {pack.name}
                        </Cell>
                    )}
                </List>
            </Group>
        )
    }
}

class PacksListPanel extends BaseComponent {
    constructor(props) {
        super(props);
    }

    onPackClick(pack) {
        this.props.onPackClick(pack);
    }

    render() {
        return (
            <Panel id='pack_list_panel'>
                <PanelHeader>
                    Наборы слов
                </PanelHeader>
                <DataLoader
                    endpoint='/packs/'
                    loaded={
                        (data) => <Packs data={data.packs} onPackClick={this.onPackClick.bind(this)} />
                    }
                    failed={
                        (error) => <Div>Что-то пошло не так...</Div>
                    }
                    method='GET'/>
            </Panel>
        )
    }
}

export default PacksListPanel;