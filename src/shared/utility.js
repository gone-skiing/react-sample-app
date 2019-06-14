export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export const checkValidity = (value, rules) => {
  if (!rules) {
    return true;
  }

  let isValid = true;
  if (rules.required) {
    isValid = value.trim() !== '';
  }

  if (rules.minLength && isValid) {
    isValid = value.trim().length >= rules.minLength;
  }

  if (rules.maxLength && isValid) {
    isValid = value.trim().length <= rules.maxLength;
  }

  if (rules.isEmail && isValid) {
    isValid = /\S+@\S+\.\S+/.test(value);
  }

  return isValid;
};
