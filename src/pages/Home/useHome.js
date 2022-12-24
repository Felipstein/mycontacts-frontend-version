import {
  useEffect, useState, useCallback, useTransition,
} from 'react';

import ContactsService from '../../services/ContactsService';

import toast from '../../utils/toast';

export default function useHome() {
  const [contacts, setContacts] = useState([]);
  const [order, setOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [filteredContacts, setFilteredContacts] = useState([]);

  const [isPending, startTransition] = useTransition();

  // const filteredContacts = useMemo(() => (
  //   contacts.filter((contact) => (
  //     contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   ))
  // ), [contacts, searchTerm]);

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);

      const contactsList = await ContactsService.listContacts(order);

      setHasError(false);
      setContacts(contactsList);
      setFilteredContacts(contactsList);
    } catch (error) {
      setHasError(true);
      setContacts([]);
    } finally {
      setIsLoading(false);
    }
  }, [order]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const handleToggleOrderBy = useCallback(() => {
    setOrder((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }, []);

  function handleChangeSearchTerm(event) {
    const { value } = event.target;

    setSearchTerm(value);

    startTransition(() => {
      setFilteredContacts(contacts.filter((contact) => (
        contact.name.toLowerCase().includes(value.toLowerCase())
      )));
    });
  }

  function handleTryAgain() {
    loadContacts();
  }

  const handleDeleteContact = useCallback((contact) => {
    setContactBeingDeleted(contact);
    setIsDeleteModalVisible(true);
  }, []);

  function handleCloseDeleteContact() {
    setIsDeleteModalVisible(false);
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true);

      await ContactsService.deleteContact(contactBeingDeleted.id);

      setContacts((prevState) => prevState.filter(
        (contact) => contact.id !== contactBeingDeleted.id,
      ));

      handleCloseDeleteContact();

      toast({
        type: 'success',
        text: 'Contato deletado com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao deletadar o contato!',
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return {
    isPending,
    isLoading,
    isDeleteModalVisible,
    isLoadingDelete,
    contactBeingDeleted,
    handleCloseDeleteContact,
    handleConfirmDeleteContact,
    contacts,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    filteredContacts,
    handleTryAgain,
    order,
    handleToggleOrderBy,
    handleDeleteContact,
  };
}
