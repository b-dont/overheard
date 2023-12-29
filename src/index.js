import 'dotenv/config'
import MastoConnections from './connections/mastoConnector.js';
import * as mentions from './interaction/mention.js';

const subscribe = async() => {
  const connection = new MastoConnections(process.env.URL, process.env.STREAM_URL, process.env.TOKEN)
  const mastoConnection = connection.restConnection();
  const mastoStream = connection.streamConnection();
  console.log("Listening for mentions..");

  for await (const event of mastoStream.user.notification.subscribe()) {
    switch (event.event) {

      case "notification": {
        if (event.payload.status.inReplyToId !== 'undefined') {
          console.log("Found mention", event.payload.status.id);
          if (!mentions.checkNobot(event)) {
            reblogParent(event.payload.status.inReplyToId, mastoConnection);
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
