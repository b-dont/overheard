import { createStreamingAPIClient } from 'masto'
import 'dotenv/config'

const subscribe = async() => {
  const masto = createStreamingAPIClient({
    streamingApiUrl: process.env.URL,
    accessToken: process.env.TOKEN,
  });

  console.log("subscribed to notifications")

  for await (const event of masto.user.notification.subscribe()) {
    switch (event.event) {
      case "notification": {
        console.log("new notification", event.payload.status.inReplyToId);
        break;
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
