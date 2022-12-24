import { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import arrow from '../../../../assets/images/icons/arrow.svg';
import edit from '../../../../assets/images/icons/edit.svg';
import trash from '../../../../assets/images/icons/trash.svg';

import formatPhone from '../../../../utils/formatPhone';

import { ListHeader, Card } from './styles';

function ContactsList({
  filteredContacts,
  orderBy,
  onToggleOrderBy,
  onDeleteContact,
}) {
  return (
    <>
      {filteredContacts.length > 0 && (
      <ListHeader orderBy={orderBy}>
        <button type="button" onClick={onToggleOrderBy}>
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
              {contact.category.name && (
              <small>{contact.category.name}</small>
              )}
            </div>
            <span>{contact.email}</span>
            <span>{formatPhone(contact.phone ?? '')}</span>
          </div>

          <div className="actions">
            <Link to={`/edit/${contact.id}`}>
              <img src={edit} alt="Edit" />
            </Link>
            <button
              type="button"
              onClick={() => onDeleteContact(contact)}
            >
              <img src={trash} alt="Delete" />
            </button>
          </div>
        </Card>
      ))}
    </>
  );
}

ContactsList.propTypes = {
  filteredContacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    category: PropTypes.shape({
      name: PropTypes.string,
    }),
  })),
  orderBy: PropTypes.string.isRequired,
  onToggleOrderBy: PropTypes.func.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

ContactsList.defaultProps = {
  filteredContacts: [],
};

export default memo(ContactsList);
