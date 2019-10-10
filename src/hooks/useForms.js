import { useState } from "react";

const useForm = callback => {
  const [values, setValues] = useState({});
  const [file, setFile] = useState({});
  const [thumb, setThumb] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = event => {
    const auxValues = { ...values };

    auxValues[event.target.name] = event.target.value;
    setValues(auxValues);
  };

  const handleChangeImages = event => {
    setFile(event.target.files);
  };

  const handleChangeThumb = event => {
    setThumb(event.target.files);
  };

  const handleSubmit = callback => async event => {
    event.preventDefault();

    setLoading(true);
    callback();
    setLoading(false);
  };
  return [
    { values, loading, file, thumb },
    handleChange,
    handleSubmit,
    handleChangeImages,
    handleChangeThumb
  ];
};

export default useForm;
