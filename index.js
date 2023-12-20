import { createRestAPIClient } from "masto";

const masto = createRestAPIClient({
  url: process.env.URL,
  accessToken: process.env.TOKEN,
});

const status = await masto.v1.statuses.create({
  status: "Automated post from mastojs. Yes, I'm learning Javascript..",
  visibility: "public",
});

console.log(status.url);
