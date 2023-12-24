import 'dotenv/config'
import { MastoConnections } from 'mastoConnector'

const subscribe = async() => {
  const connection = new MastoConnections(process.env.URL, process.env.STREAM_URL, process.env.TOKEN)
  const mastoConnection = connection.restConnection();
  const mastoStream = connection.streamConnection();

  for await (const event of mastoStream.user.notification.subscribe()) {
    switch (event.event) {

      case "notification": {
        if (event.payload.status.inReplyToId !== 'undefined') {
          if (!checkNobot(event)) {
            reblogParent(event.payload.status.inReplyToId, mastoConnection);
            break;
          }
        } else {
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
