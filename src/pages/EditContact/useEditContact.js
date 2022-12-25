import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import useIsMounted from '../../hooks/useIsMounted';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';
import useSafeAsyncState from '../../hooks/useSafeAsyncState';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function useEditContact() {
  const [isLoading, setIsLoading] = useSafeAsyncState(true);
  const [contactName, setContactName] = useSafeAsyncState('');
  const contactFormRef = useRef(null);

  const { id } = useParams();
  const navigate = useNavigate();
  const isMounted = useIsMounted();
  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    const controller = new AbortController();

    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(id, controller.signal);

        safeAsyncAction(() => {
          contactFormRef.current.setFieldsValue(contact);
          setContactName(contact.name);
          setIsLoading(false);
        });
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }

        safeAsyncAction(() => {
          navigate('/', { replace: true });
          toast({
            type: 'danger',
            text: 'Contato não encontrado',
          });
        });
      }
    }

    loadContact();

    return () => {
      controller.abort();
    };
  }, [id, navigate, isMounted, safeAsyncAction, setContactName, setIsLoading]);

  async function handleSubmit(contact) {
    try {
      const contactData = await ContactsService.updateContact(id, contact);

      setContactName(contactData.name);

      toast({
        type: 'success',
        text: 'Contato editado com sucesso!',
      });

      navigate('/');
    } catch (error) {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o contato!',
      });
    }
  }

  return {
    isLoading, contactName, contactFormRef, handleSubmit,
  };
}
