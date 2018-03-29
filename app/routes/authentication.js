const express = require('express');
const axios = require('axios');
const request = require('request');
const NodeCache = require( "node-cache" );
const cache = new NodeCache({ stdTTL: 600} );
const { host, id, secret } = require('../config/secrets.json').owl;



module.exports = app => {
    app.get('/access-token', function (req, res) {
        let owlToken = null;
        const request = { client_id: id, client_secret: secret, grant_type: 'client_credentials' };
        const headers = { headers: { 'Content-Type': 'application/json' } };
        axios.post(`${host}/v1/oauth/token`, request, headers).then(data => {
            owlToken = data.data.access_token;
            console.log(data);
            cache.set("accessToken", data.data);
            res.send(owlToken);
        });

    });


    app.get('/alerts', function (req, res) {
        const request = { client_id: id, client_secret: secret, grant_type: 'client_credentials' };
        let alerts = {};
        // let accessToken = cache.get("accessToken");
        const headers = { headers: {'access-token': '24d96fed2b15594b6f0b06162ec728cc33870b37', 'user-token': '76e2e6df223ebbdb133a48b83afafaee411b6a21'} };

        axios.get(`${host}/v2/alerts`, headers).then(data => {
            // console.log(data);
            alerts = data.data;
            res.send(alerts);
        })
    })
};


