import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

import ContactsService from '../../services/ContactsService';

import formatPhone from '../../utils/formatPhone';

import {
  Container,
  InputSearchContainer,
  Header,
  ListHeader,
  Card,
  ErrorContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/sad.svg';

import Loader from '../../components/Loader';
import Button from '../../components/Button';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [order, setOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const filteredContacts = useMemo(() => (
    contacts.filter((contact) => (
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  ), [contacts, searchTerm]);

  async function loadContacts() {
    try {
      setIsLoading(true);

      const contactsList = await ContactsService.listContacts(order);

      setContacts(contactsList);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadContacts();
  }, [order]);

  function handleToggleOrderBy() {
    setOrder((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <InputSearchContainer>
        <input
          value={searchTerm}
          type="text"
          placeholder="Pesquise pelo nome..."
          onChange={handleChangeSearchTerm}
        />
      </InputSearchContainer>

      <Header hasError={hasError}>
        {!hasError && (
          <strong>
            {filteredContacts.length}
            {filteredContacts.length === 1 ? ' contato' : ' contatos'}
          </strong>
        )}
        <Link to="/new">Novo contato</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="Sad" />
          <div className="details">
            <strong>
              Ocorreu um erro ao obter os seus contatos!
            </strong>
            <Button type="button" onClick={handleTryAgain}>
              Tentar novamente
            </Button>
          </div>
        </ErrorContainer>
      )}

      {filteredContacts.length > 0 && (
        <ListHeader orderBy={order}>
          <button type="button" onClick={handleToggleOrderBy}>
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </ListHeader>
      )}

      {filteredContacts.map((contact) => (
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
