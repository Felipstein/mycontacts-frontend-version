import delay from '../../utils/delay';

export default class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(path) {
    await delay(500);

    const response = await fetch(`${this.baseUrl}${path}`);

    const body = await response.json();

    if (response.ok) {
      return body;
    }

    throw new Error(body.error);
  }
}
