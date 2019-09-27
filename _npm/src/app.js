import React from "react";
import ReactDOM from "react-dom";
import connect from '@vkontakte/vk-connect'
import $ from 'jquery'
import {Root, View} from '@vkontakte/vkui'

import Dict from './views/dict'

require('./styles/styles.css');

class App extends React.Component {
  render() {
      return (
          <Root activeView="dict">
              <Dict/>
          </Root>
      );
  }
}

connect.subscribe(
    function(e) {
        console.log(e);  // TODO: remove

        if (e['detail'] && e['detail']['type'] === 'VKWebAppGetUserInfoResult') {
            console.log(e['detail']['data']['first_name']);
            // $.ajax({
            //     type: 'POST',
            //     url: 'https://vkhack19.com:11888/message',
            //     data: {'name': e['detail']['data']['first_name']},
            //     success: function (response) {
            //         alert('Slava molodec!');
            //     },
            //     error: function (response) {
            //         console.log(response.responseText);
            //     }
            // });
        } else {
            console.log(e);
        }
    }
);

connect.send('VKWebAppInit', {});
connect.send('VKWebAppGetUserInfo', {});

ReactDOM.render(<App/>, document.getElementById('root'));