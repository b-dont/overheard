import { createRestAPIClient, createStreamingAPIClient } from 'masto'
import 'dotenv/config'
import 'mention'

const subscribe = async() => {
  const mastoConnection = createRestAPIClient({
    url: process.env.URL,
    accessToken: process.env.TOKEN,
  })

  const mastoStream = createStreamingAPIClient({
    streamingApiUrl: process.env.STREAM_URL,
    accessToken: process.env.TOKEN,
  });

  console.log("Subscribed to notifications, listening for mentions.");

  for await (const event of mastoStream.user.notification.subscribe()) {
    switch (event.event) {

      case "notification": {
        if (event.payload.status.inReplyToId !== 'undefined') {
          if (!checkParent(event)) {
            reblogParent(event.payload.status.inReplyToId, mastoConnection);
            console.log("Found mention:", event.payload.status.id, ", boosting status ", event.payload.status.inReplyToId)
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
