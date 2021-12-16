import axios from "axios";
export const createOrUpdate = async (authtoken, name) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-or-update-user`,
    {},
    {
      headers: {
        authtoken: authtoken,
        name: name,
      },
    }
  );
};
export const currentUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-user`,
    {},
    {
      headers: {
        authtoken: authtoken,
      },
    }
  );
};
export const currentAdmin = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-admin`,
    {},
    {
      headers: {
        authtoken: authtoken,
      },
    }
  );
};
