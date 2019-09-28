import React from "react";
import {Div, ScreenSpinner, Spinner} from "@vkontakte/vkui"

const MODE = 'dev';
const baseUrl = 'https://vkhack19.com:11888';


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
        this.log('requesting url: ' + baseUrl + this.state.endpoint);

        fetch(baseUrl + this.state.endpoint, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-SDict-User-Id': window.sdUserId,
                'X-SDict-Token': window.sdToken
            },
            method: this.props.method,
            body: this.state.requestData ? JSON.stringify(this.state.requestData) : null
        })
            .then(res => res.json())
            .then(
                (responseData) => {
                    if (responseData && responseData.result === 'ok') {
                        this.onRequestSuccess(responseData.data);
                    } else {
                        this.onRequestError(responseData.error);
                    }
                },
                (error) => {
                    this.log('not success = ' + error);
                    this.onRequestError('unknown');
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

export {BaseComponent, DataLoader};
