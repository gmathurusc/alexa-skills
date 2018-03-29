const express = require('express');
const axios = require('axios');
const request = require('request');
const NodeCache = require( "node-cache" );
const cache = new NodeCache({ stdTTL: 600} );
const { host, id, secret } = require('../config/secrets.json').owl;


function Alerts() {
    // const request = { client_id: id, client_secret: secret, grant_type: 'client_credentials' };
    let alerts = {};
    // let accessToken = cache.get("accessToken");
    const headers = { headers: {'access-token': '24d96fed2b15594b6f0b06162ec728cc33870b37', 'user-token': '76e2e6df223ebbdb133a48b83afafaee411b6a21'} };

    return axios.get(`${host}/v2/alerts`, headers)
        .then(data => {
        // console.log(data);
        alerts = data.data;
        return alerts;
    });

    // return request;
}

module.exports = Alerts
