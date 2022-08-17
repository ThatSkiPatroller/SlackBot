This repo contains a Bolt App which is a framework allowing you to build JavaScript-based Slack Apps specifically. 

- app.js contains the primary Bolt app. It imports the Bolt package (@slack/bolt) and starts the Bolt app's server. It's where you'll add your app's listeners.

- .env is where you'll put your Slack app's authorization token and signing secret.

Here is the Bolt docs: https://slack.dev/bolt

Currently have my own implementation of a Slackbot I call Bobby in app.js, so this is not a base template but my own bot. 