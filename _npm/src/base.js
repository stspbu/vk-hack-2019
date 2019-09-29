import React from "react";

import {Div, ScreenSpinner, Avatar, Link, Snackbar} from "@vkontakte/vkui"

import Icon16Done from "@vkontakte/icons/dist/16/done";

const MODE = 'dev';
const baseUrl = 'https://demo138.bravo.vkhackathon.com:11888';


const possibleSpeechParts = ['nouns', 'verbs', 'adjectives', 'adverbs'];
function getSpeechPartTitle(speechPart, plural=true, capitalized=false) {
    let res = {
        nouns: plural ? 'существительные' : 'существительное',
        verbs: plural ? 'глаголы' : 'глагол',
        adjectives: plural ? 'прилагательные' : 'прилагательное',
        adverbs: plural ? 'наречия' : 'наречие'
    }[speechPart];

    if (capitalized) {
        res = capitalizeFirstLetter(res);
    }

    return res;
}

function getRussianPluralText(root, number, e05, e1, eo) {
    let lastNumber = number % 10;
    let lastSndNumber = parseInt(number / 10) % 10;

    if (lastNumber == 0 || lastNumber >= 5 || lastSndNumber == 1) {
        return root + e05;
    } else if (lastNumber == 1) {
        return root + e1;
    } else {
        return root + eo;
    }
}

function capitalizeFirstLetter(word) {
    return word.toUpperCase()[0] + word.slice(1);
}


class BaseComponent extends React.Component {
    log(message, level='debug') {
        if (level === 'debug' && MODE !== 'dev') {
            return;
        }

        console.log(message);
    }
}


class DataLoader extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            data: null,
            error: null,

            endpoint: props.endpoint || '/',
            method: props.method || 'GET',
            requestData: props.requestData || null
        }
    }

    componentDidMount() {
        this.makeRequest()
    }

    makeRequest() {
        DataLoader.doMakeRequest({
            endpoint: this.state.endpoint,
            method: this.state.method,
            requestData: this.state.requestData
        }, this.onRequestSuccess.bind(this), this.onRequestError.bind(this), this)
    }

    static doMakeRequest(params, onRequestSuccess, onRequestError, logger=null) {
        logger && logger.log('requesting url: ' + baseUrl + params.endpoint);
        logger && logger.log('data: ' + JSON.stringify(params.requestData));

        fetch(baseUrl + params.endpoint, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-SDict-User-Id': window.sdUserId,
                'X-SDict-Token': window.sdToken
            },
            method: params.method,
            body: params.requestData ? JSON.stringify(params.requestData) : null
        })
            .then(res => res.json())
            .then(
                (responseData) => {
                    if (responseData && responseData.result === 'ok') {
                        onRequestSuccess && onRequestSuccess(responseData.data);
                    } else {
                        onRequestError && onRequestError(responseData.error || 'unknown');
                    }
                },
                (error) => {
                    logger && logger.log('not success = ' + error);
                    onRequestError && onRequestError('unknown');
                }
            )
    }

    onRequestSuccess(data) {
        this.log('successful request with data = ' + JSON.stringify(data));

        this.setState({
            isLoaded: true,
            data: data
        })
    }

    onRequestError(error) {
        this.log('error + ' + JSON.stringify(error));

        this.setState({
            isLoaded: true,
            error: error
        })
    }

    render() {
        if (this.state.isLoaded) {
            if (!this.state.error) {
                return this.props.loaded(this.state.data);
            } else {
                return this.props.failed(this.state.error);
            }
        } else {
            return (<ScreenSpinner/>);
        }
    }

}

class YandexSign extends React.Component {
    render() {
        return (
            <Div align='left'>
                <Link href='https://tech.yandex.ru/dictionary' target='_blank' style={{color: '#000'}}>
                    Реализовано с помощью сервиса «Яндекс.Словарь»
                </Link>
            </Div>
        )
    }
}

class InfoSnackbar extends BaseComponent {
    render() {
        return (
            <Snackbar
                layout="vertical"
                onClose={() => this.setState({snackbar: null})}
                before={
                    <Avatar
                        size={24}
                        style={{backgroundColor: 'var(--accent)'}}
                    >
                        <Icon16Done fill='#fff' width={14} height={14}/>
                    </Avatar>
                }
            >
                {this.props.message}
            </Snackbar>
        )
    }
}

export {
    BaseComponent,
    DataLoader,
    getSpeechPartTitle,
    possibleSpeechParts,
    getRussianPluralText,
    YandexSign,
    InfoSnackbar
};
