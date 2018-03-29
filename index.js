const express = require('express');
const app = express();


const routes = require('./app/routes/Alerts');

/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
// const APP_ID = 'amzn1.ask.skill.5f8e54cc-d105-45f0-a9e3-69989b0eaa90';
const APP_ID = 'amzn1.ask.skill.7b151ccd-9cf2-48b1-8712-6d98621408cf';

const SKILL_NAME = 'Space Facts';
const GET_FACT_MESSAGE = "Here's your alert: ";
const HELP_MESSAGE = 'You can say tell me my paydex alert, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
const data = [
    'Paydex Score DECLINED.',
    'Paydex Score IMPROVED.',
    'Bankruptcy.',
    'Business Deterioration.',
    'Delinquency Predictor Class DECLINED.',
];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const handlers = {
        'LaunchRequest': function () {
            this.emit(':ask', 'Welcome to Dun and Bradstreet. Would you like to play your alerts?.');
        },
        'dandbalertIntent': function () {
            const factArr = data;
            const factIndex = Math.floor(Math.random() * factArr.length);
            const randomFact = factArr[factIndex];
            console.log("before alerts");
            var alerts = routes()
                .then(result => {
                    console.log("alerts : ", result);
                    console.log("result[0] : ", result[0]);
                    const speechOutput = result[0]['message_text'];
                    console.log("speechOutput : ", speechOutput);
                    // this.response.cardRenderer(SKILL_NAME, speechOutput);
                    this.response.speak(speechOutput);
                    this.emit(':responseReady');
                });

        },
        'AMAZON.HelpIntent': function () {
            const speechOutput = HELP_MESSAGE;
            const reprompt = HELP_REPROMPT;

            this.response.speak(speechOutput).listen(reprompt);
            this.emit(':responseReady');
        },
        'AMAZON.CancelIntent': function () {
            this.response.speak(STOP_MESSAGE);
            this.emit(':responseReady');
        },
        'AMAZON.StopIntent': function () {
            this.response.speak(STOP_MESSAGE);
            this.emit(':responseReady');
        },
    };

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};




//
// app.listen(process.env.PORT || 8003, function () {
//     console.log("Server serving on 8003...");
// });
