// Require the Bolt package (github.com/slackapi/bolt)
const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  appToken: process.env.SLACK_APP_TOKEN
});

app.message('hey', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say(`heyyo <@${message.user}> (;`);
});

app.message('bobby', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say({
    blocks: [
      {
        "type": "image",
        "image_url": "https://images.foxtv.com/static.fox5atlanta.com/www.fox5atlanta.com/content/uploads/2020/03/1280/720/EA6AB9F34AB24A0AB75A876AD7295A1B.jpg?ve=1&tl=1",
        "alt_text": "nah"
      }
    ]
  });
});

app.message('late', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say(`yeah you are`);
});

app.message('yes', async({ message, say }) => {
  await say(`:eyes:`)
});


// All the room in the world for your code
app.event('app_home_opened', async ({ event, client, context }) => {
  try {
    /* view.publish is the method that your app uses to push a view to the Home tab */
    const result = await client.views.publish({

      /* the user that opened your app's app home */
      user_id: event.user,

      /* the view object that appears in the app home*/
      view: {
        type: 'home',
        callback_id: 'home_view',

        /* body of the view */
        blocks: [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "Bobby, Baseball Manager :baseball:"
            }
          },
          {
            "type": "divider"
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "Look alive bud, you've skipped yourself on over to Bobby's page"
              // "text": "This button won't do much for now but you can set up a listener for it using the `actions()` method and passing its unique `action_id`. See an example in the `examples` folder within your Bolt app."
            }
          },
          {
            "type": "divider"
          },
          {
            type: 'image',
            image_url: 'https://www.espn.com/media/mlb/1999/1004/photo/a_cox.jpg',
          }
        ]
      }
    });
  }
  catch (error) {
    console.error(error);
  }
});


app.command('/bobby', async ({ ack, payload, context }) => {
  // Acknowledge the command request
  ack();

  try {
    const result = await app.client.chat.postMessage({
      token: context.botToken,
      // Channel to send message to
      channel: payload.channel_id,
      // Include a button in the message (or whatever blocks you want!)
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: 'What it do'
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Click to open a random photo'
            },
            action_id: 'button_abc'
          }
        }
      ],
      // Text in the notification
      text: 'Message from Test App'
    });
    console.log(result);
  }
  catch (error) {
    console.error(error);
  }
});

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function imgUrll () {
  let num = getRndInteger(0,10);
  if (num == 0) {
    return'https://www.gannett-cdn.com/presto/2019/09/02/USAT/8d72ae7a-d7b8-491e-b069-96238d4cc4ac-AP_Braves_Future_Stars_Baseball.JPG?width=1200&disable=upscale&format=pjpg&auto=webp'
  } else if (num ==1) {
    return'https://7b1de02a7bcf9c1df487-6849f9022b05f72b83236695aa4e9a0a.ssl.cf2.rackcdn.com/uploads/articles/2019/780806/bobby-cox-spring-p3_p3.jpg'
  } else if (num ==2) {
    return'https://cdn.quotesgram.com/img/90/59/1139107438-bobby-cox-ejected.jpg'
  } else if (num ==3) {
    return'https://www.famousbirthdays.com/faces/cox-bobby-image.jpg'
  } else if (num ==4) {
    return'https://www.ajc.com/resizer/ObFL-A_VLnPjFoPXRmxNm4TNJSw=/arc-anglerfish-arc2-prod-ajc/public/PM6NZEIGXWRHGZXAYO5ODGRTLE.jpg'
  } else if (num ==5) {
    return'https://www.gannett-cdn.com/authoring/2009/09/24/NAUG/ghows-GA-759808dc-f400-498d-8960-8857a69dfe98-8948af19.jpeg?width=1200&disable=upscale&format=pjpg&auto=webp'
  } else if (num ==6) {
    return'https://images.foxtv.com/static.fox5atlanta.com/www.fox5atlanta.com/content/uploads/2020/03/1280/720/EA6AB9F34AB24A0AB75A876AD7295A1B.jpg?ve=1&tl=1'
  } else if (num ==7) {
    return'https://www.gannett-cdn.com/authoring/2008/04/22/NTHR/ghows-TH-f470fd78-f50e-40be-bed4-da45daa11013-4b2a2860.jpeg?width=660&height=506&fit=crop&format=pjpg&auto=webp'
  } else if (num ==8) {
    return'https://www.si.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTcyMjMyMTg3NDUyNTk3NDYw/bobby-cox---april-30.jpg'
  } else if (num ==9) {
    return'https://arc-anglerfish-arc2-prod-cmg.s3.amazonaws.com/public/7LILVNFSTCNXSAXIZOROLVJZPU.jpg'
  } else if (num ==10) {
    return'http://cdn2.atlantamagazine.com/wp-content/uploads/sites/12/2010/05/Bobby.jpg'
  }
}

// Listen for a button invocation with action_id `button_abc`
// You must set up a Request URL under Interactive Components on your app configuration page
app.action('button_abc', async ({ ack, body, context }) => {
  // Acknowledge the button request
  ack();
  


  try {
    // Update the message
    const result = await app.client.chat.update({
      token: context.botToken,
      // ts of message to update
      ts: body.message.ts,
      // Channel of message
      channel: body.channel.id,
        blocks: [
          {
            type: 'section',
            text: {
              type: 'plain_text',
              text: "Fire pic :fire: I snapped on this no :billed_cap:"
            }
          },
          {
            type: 'image',
            image_url: imgUrll(),
            alt_text: 'Yay! The modal was updated'
          }
        ],
      text: 'Message from Test App'
    });
    console.log(result);
  }
  catch (error) {
    console.error(error);
  }
});

app.error((error) => {
  // Check the details of the error to handle cases where you should retry sending a message or stop the app
  console.error(error);
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
