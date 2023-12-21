import { createRestAPIClient, createStreamingAPIClient } from 'masto'
import 'dotenv/config'

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
          mastoConnection.v1.statuses.$select(event.payload.status.inReplyToId).reblog();
          console.log("Found mention ", event.payload.status.id, ", boosting status ", event.payload.status.inReplyToId)
          break;
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
}
