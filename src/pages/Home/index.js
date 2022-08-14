import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import formatPhone from '../../utils/formatPhone';

import {
  Container, InputSearchContainer, Header, ListHeader, Card,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    fetch(`http://localhost:3001/contacts?orderBy=${order}`)
      .then(async (response) => {
        const json = await response.json();
        setContacts(json);
      })
      .catch((error) => {
        console.log('erro', error);
      });
  }, [order]);

  function handleToggleOrderBy() {
    setOrder((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  console.log(contacts);

  return (
    <Container>

      <InputSearchContainer>
        <input type="text" placeholder="Pesquise pelo nome..." />
      </InputSearchContainer>

      <Header>
        <strong>
          {contacts.length}
          {contacts.length === 1 ? ' contato' : ' contatos'}
        </strong>
        <Link to="/new">Novo contato</Link>
      </Header>

      <ListHeader>
        <button
          type="button"
          onClick={handleToggleOrderBy}
        >
          <span>Nome</span>
          <img src={arrow} alt="Arrow" />
        </button>
      </ListHeader>

      {contacts.map((contact) => (
        <Card key={contact.id}>
          <div className="info">
            <div className="contact-name">
              <strong>{contact.name}</strong>
              {contact.category_name && (
              <small>{contact.category_name}</small>
              )}
            </div>
            <span>{contact.email}</span>
            <span>{formatPhone(contact.phone)}</span>
          </div>

          <div className="actions">
            <Link to={`/edit/${contact.id}`}>
              <img src={edit} alt="Edit" />
            </Link>
            <button type="button">
              <img src={trash} alt="Delete" />
            </button>
          </div>
        </Card>
      ))}

    </Container>
  );
}
