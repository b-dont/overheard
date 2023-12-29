import 'dotenv/config'
import MastoConnections from './connections/mastoConnector.js';
import * as mentions from './interaction/mention.js';

const subscribe = async() => {
  const connector = new MastoConnections(process.env.URL, process.env.STREAM_URL, process.env.TOKEN)
  const connection = connector.restConnection();
  const stream = connector.streamConnection();
  console.log("Listening for mentions..");

  for await (const event of stream.user.notification.subscribe()) {
    switch (event.event) {

      case "notification": {
        if (event.payload.status.inReplyToId !== 'undefined') {
          console.log("Found mention", event.payload.status.id);
          var parent = toString(event.payload.status.inReplyToAccountId);
          var parentUser = getParentUser(parent);
          console.log(`Parent user: ${parentUser.user}`);
          if (!mentions.checkNobot(event)) {
            reblogParent(event.payload.status.inReplyToId, connection);
            break;
          }
        } else {
            console.log("User has #nobot in bio, abstaining from reblog.");
            break
        }
      }

      default: {
        break;
      }
    }
  }
};

try {
  await subscribe();
} catch (error) {
  console.error(error);
  await subscribe();
}
