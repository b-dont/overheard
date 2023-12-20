import { createStreamingAPIClient } from 'masto'
import 'dotenv/config'

const subscribe = async() => {
  const masto = createStreamingAPIClient({
    streamingApiUrl: process.env.URL,
    accessToken: process.env.TOKEN,
  });

  for await (const event of masto.user.notification.subscribe())

  console.log("subscribed to notifications")
}
