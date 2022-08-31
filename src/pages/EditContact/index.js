import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import Loader from '../../components/Loader';

import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contact, setContact] = useState(null);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadContact() {
      try {
        setIsLoading(true);

        const contactData = await ContactsService.getContactById(id);

        setContact(contactData);
        setIsLoading(false);
      } catch {
        history.push('/');
        toast({
          type: 'danger',
          text: 'Contato não encontrado',
        });
      }
    }

    loadContact();
  }, [id, history]);

  function handleSubmit() {
    console.log('submiting');
  }

  return (
    <>
      <Loader isLoading={isLoading} />

      <PageHeader
        title={`Editar ${contact?.name}`}
      />

      <ContactForm
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}
