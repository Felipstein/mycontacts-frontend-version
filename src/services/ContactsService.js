import HttpClient from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listContacts(orderBy = 'asc') {
    return this.httpClient.get(`/contacts/517ece03-ef45-4fbd-976e-4d9c3dbfd952?orderBy=${orderBy}`);
  }
}

export default new ContactsService();
