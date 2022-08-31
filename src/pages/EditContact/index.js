import { useParams } from 'react-router-dom';
import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';

export default function EditContact() {
  const { id } = useParams();

  console.log(id);

  function handleSubmit() {
    console.log('submiting');
  }

  return (
    <>
      <PageHeader
        title="Editar Luís Felipe"
      />

      <ContactForm
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}
