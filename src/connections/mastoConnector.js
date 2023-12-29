import { createOAuthAPIClient, createRestAPIClient, createStreamingAPIClient } from "masto";

export default class MastoConnections {
  constructor(url, stream, token) {
    this.url = url;
    this.stream = stream;
    this.token = token;
  }

  restConnection() {
    console.log("Connecting to REST API")
    return createRestAPIClient({
      url: this.url,
      accessToken: this.token,
    });
  }

  streamConnection() {
    console.log("Connecting to notification stream")
    return createStreamingAPIClient({
      streamingApiUrl: this.stream,
      accessToken: this.token,
    })
  }

  oauthConnection() {
    console.log("Making OAuth connection")
    return createOAuthAPIClient({
      url: this.url,
      accessToken: this.token,
    });
  }
}
