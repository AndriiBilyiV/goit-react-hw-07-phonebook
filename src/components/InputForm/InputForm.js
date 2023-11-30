import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { FieldTitle, StyledForm, ValidError } from './InputForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';
import { addContact } from 'redux/operations';

const cardSchema = Yup.object().shape({
  name: Yup.string().min(3, 'Too short').required('This field is required'),
  tel: Yup.number().required('This field is required'),
});

export const InputForm = () => {
  const dispach = useDispatch();
  const contacts = useSelector(getContacts);

  const checkAvailability = name => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is alredy in contact list`);
      return false;
    } else {
      return true;
    }
  };

  const sendDispach = values => dispach(addContact(values));

  return (
    <div>
      <Formik
        initialValues={{
          name: '',
          tel: '',
        }}
        validationSchema={cardSchema}
        onSubmit={(values, actions) => {
          if (checkAvailability(values.name)) {
            sendDispach(values);
            actions.resetForm();
          }
        }}
      >
        <StyledForm>
          <FieldTitle>
            Name
            <Field name="name" />
            <ValidError name="name" component="div" />
          </FieldTitle>
          <FieldTitle>
            Number
            <Field type="number" name="tel" />
            <ValidError name="tel" component="div" />
          </FieldTitle>
          <button type="submit">Add contact</button>
        </StyledForm>
      </Formik>
    </div>
  );
};
