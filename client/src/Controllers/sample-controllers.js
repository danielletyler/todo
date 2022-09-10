//crud operations using fetch api

//change to appropriate api
const api = "http://localhost:4000";

export const getItems = async () => {
  const data = await fetch(`${api}/items`, {
    method: "GET",
  });
  const res = await data.json();
  console.log(res);
};

export const addItem = async (item) => {
  const new_item = JSON.stringify(item);
  const data = await fetch(`${api}/items`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: new_item,
  });
  const res = await data.json();
  console.log(res);
};

export const updateItem = async ({ item, id }) => {
  const updated_item = JSON.stringify(item);
  const data = await fetch(`${api}/items/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: updated_item,
  });
  const res = await data.json();
  console.log(res);
};

export const deleteItem = async (id) => {
  const data = await fetch(`${api}/items/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });
  const res = await data.json();
  console.log(res);
};
