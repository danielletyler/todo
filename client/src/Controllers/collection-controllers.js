//crud operations using fetch api

//change to appropriate api
const api = "http://localhost:4000/collections";

export const getCollections = async () => {
  const data = await fetch(`${api}`, {
    method: "GET",
  });
  const res = await data.json();
  console.log(res);
};

export const addCollection = async (coll) => {
  const new_coll = JSON.stringify(coll);
  const data = await fetch(`${api}`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: new_coll,
  });
  const res = await data.json();
  console.log(res);
};

export const updateCollection = async ({ coll, id }) => {
  const updated_coll = JSON.stringify(coll);
  const data = await fetch(`${api}/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: updated_coll,
  });
  const res = await data.json();
  console.log(res);
};

export const deleteCollection = async (id) => {
  const data = await fetch(`${api}/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });
  const res = await data.json();
  console.log(res);
};
