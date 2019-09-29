import React from 'react'
import {BaseComponent, getSpeechPartTitle, possibleSpeechParts} from "../../../base";

import {ModalRoot, ModalPage, ModalPageHeader} from "@vkontakte/vkui"
import {HeaderButton, Button, Div, Cell, Input, Select, FormLayout} from "@vkontakte/vkui";
import {IS_PLATFORM_ANDROID, IS_PLATFORM_IOS} from '@vkontakte/vkui/dist/lib/platform';

import Icon24Cancel from "@vkontakte/icons/dist/24/cancel"
import Icon24Dismiss from "@vkontakte/icons/dist/24/dismiss"

class TranslationAddingModal extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            speechPart: 'nouns',
            translation: null
        }
    }

    onInputChange(e) {
        let inputWord = e.target.value || '';
        this.setState({
            translation: inputWord.toLowerCase().trim()
        })
    }

    onChangeSpeechPart(e) {
        let speechPart = e.target.value;
        this.setState({
            speechPart: speechPart
        })
    }

    onAddTranslation() {
        let tr = this.state.translation;
        let sp = this.state.speechPart;

        if (tr && sp) {
            this.props.onAddTranslation(tr, sp);
        }
    }

    onCloseModal() {
        this.props.onCloseModal();
    }

    render() {
        return (
            <ModalRoot activeModal={'translation_adding_modal'}>
                <ModalPage
                    id='translation_adding_modal'
                    header={
                        <ModalPageHeader
                            left={
                                IS_PLATFORM_ANDROID &&
                                <HeaderButton onClick={this.onCloseModal.bind(this)}>
                                    <Icon24Cancel/>
                                </HeaderButton>
                            }
                            right={
                                IS_PLATFORM_IOS &&
                                <HeaderButton onClick={this.onCloseModal.bind(this)}>
                                    <Icon24Dismiss/>
                                </HeaderButton>
                            }>
                        </ModalPageHeader>
                    }
                    settlingHeight='100'
                    onClose={this.onCloseModal.bind(this)}
                >
                    <Div>
                        <Cell>Укажите перевод</Cell>
                        <FormLayout>
                            <Input value={this.state.translation} onChange={this.onInputChange.bind(this)}/>
                            <Select
                                placeholder='Выберите часть речи'
                                value={this.state.speechPart}
                                onChange={this.onChangeSpeechPart.bind(this)}
                            >
                                {possibleSpeechParts.map((sp, i) =>
                                    <option value={sp} selected={i === 0}>
                                        {getSpeechPartTitle(sp, false, true)}
                                    </option>)}
                            </Select>
                            <Button size='xl' onClick={this.onAddTranslation.bind(this)}>
                                Добавить перевод
                            </Button>
                        </FormLayout>
                    </Div>
                </ModalPage>
            </ModalRoot>
        );
    }
}

export {TranslationAddingModal};