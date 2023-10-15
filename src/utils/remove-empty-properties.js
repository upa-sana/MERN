const removeEmptyProperties = (obj) => {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      const value = obj[prop];
      if (typeof value === "object" && !Array.isArray(value)) {
        removeEmptyProperties(value);
      } else if (value === "") {
        delete obj[prop];
      }
    }
  }
};

export default removeEmptyProperties;
