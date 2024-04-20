
import { useState } from "react";

const useForm = (initialValues, validateSchema) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    if (validateSchema) {
      validateSchema[name] && validateField(name, value);
    }
  };

  const validateField = (name, value) => {
    setErrors((currentErrors) => {
      let error = '';
      if (validateSchema[name].required && value && !value.trim()) {
        error = `${validateSchema[name].name} is required`;
      }
      return { ...currentErrors, [name]: error };
    });
  };

  const validate = () => {
    let isValid = true;
    const newErrors = Object.keys(validateSchema).reduce((acc, key) => {
      if (validateSchema[key].required && (!values[key] || !values[key].trim())) {
        acc[key] = `${validateSchema[key].name} is required`;
        isValid = false;
      }
      return acc;
    }, {});

    setErrors(newErrors);
    return isValid; // True if there are no errors
  };

  return { values, errors, handleChange, setErrors, validate };
};

export default useForm;
