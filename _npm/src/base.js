import React from "react";
import {Div, ScreenSpinner, Spinner} from "@vkontakte/vkui"

const MODE = 'dev';
const baseUrl = 'https://vkhack19.com:11888';


const possibleSpeechParts = ['nouns', 'verbs', 'adjectives', 'adverbs'];
const speechPartToTitle = {
    nouns: 'Существительные',
    verbs: 'Глаголы',
    adjectives: 'Прилагательные',
    adverbs: 'Наречия'
};


function getRussianPluralText(root, number) {
    let lastNumber = number % 10;

    if (lastNumber == 0 || lastNumber >= 5) {
        return root + 'ов';
    } else if (lastNumber == 1) {
        return root;
    } else {
        return root + 'а';
    }
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
            requestData: props.data || null
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
                        onRequestError && onRequestError('unknown');
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
            return (<div>{this.props.loaded(this.state.data)}</div>);
        } else {
            return (<ScreenSpinner/>);
        }
    }

}

export {BaseComponent, DataLoader, speechPartToTitle, possibleSpeechParts, getRussianPluralText};
