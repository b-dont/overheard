import { createRestAPIClient, createStreamingAPIClient } from "masto";

export default class MastoConnections {
  constructor(url, stream, token) {
    this.url = url;
    this.stream = stream;
    this.token = token;
  }

  get restConnection() {
    return createRestAPIClient({
      url: this.url,
      accessToken: this.token,
    });
  }

  get streamConnection() {
    return createStreamingAPIClient({
      streamingApiUrl: this.stream,
      accessToken: this.token,
    })
  }
}
