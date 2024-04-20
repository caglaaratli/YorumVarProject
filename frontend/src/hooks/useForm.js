
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
    let error = '';
    if (validateSchema[name].required && !value.trim()) {
      error = `${validateSchema[name].name} is required`;
    }
    setErrors({ ...errors, [name]: error });
  };

  const validate = () => {
    let newErrors = {};
    Object.keys(validateSchema).forEach(key => {
      if (validateSchema[key].required && !values[key].trim()) {
        newErrors[key] = `${validateSchema[key].name} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // No errors if true
  };

  return { values, errors, handleChange, setErrors, validate };
};

export default useForm;
