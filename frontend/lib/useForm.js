import { useEffect, useState } from 'react';

const useForm = (initial = {}) => {
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join('');

  useEffect(() => {
    setInputs(initial);
  }, [initialValues]);

  const handleChange = ({ target }) => {
    let { name, value, type } = target;
    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      [value] = target.files;
    }
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const resetForm = () => {
    setInputs(initial);
  };

  const clearForm = () => {
    const blankState = Object.entries(inputs).reduce((prev, curr) => {
      prev[curr[0]] = '';
      return prev;
    }, {});
    setInputs({ ...blankState });
  };

  return { inputs, handleChange, resetForm, clearForm };
};

export default useForm;
