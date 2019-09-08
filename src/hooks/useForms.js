import { useState } from "react";

import api from "../services/api";

const useForm = callback => {
  const [values, setValues] = useState({});
  const [file, setFile] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = event => {
    const auxValues = { ...values };

    auxValues[event.target.name] = event.target.value;
    setValues(auxValues);
  };

  const handleChangeImages = event => {
    setFile(event.target.files);
  };

  const handleSubmit = callback => async event => {
    event.preventDefault();

    setLoading(true);
    callback();
    setLoading(false);
  };
  return [
    { values, loading, file },
    handleChange,
    handleSubmit,
    handleChangeImages
  ];
};

export default useForm;
