//crud operations using fetch api

//change to appropriate api
const api = "http://localhost:4000/tasks";

export const getTasks = async () => {
  const data = await fetch(`${api}`, {
    method: "GET",
  });
  const res = await data.json();
  return res;
};

export const getTasksbyColl = async (coll) => {
  const data = await fetch(`${api}/${coll}`, {
    method: "GET",
  });
  const res = await data.json();
  return res;
};

export const addTask = async (task) => {
  const new_task = JSON.stringify(task);
  const data = await fetch(`${api}`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: new_task,
  });
  const res = await data.json();
  console.log(res);
};

export const updateTask = async ({ task, id }) => {
  const updated_task = JSON.stringify(task);
  const data = await fetch(`${api}/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: updated_task,
  });
  const res = await data.json();
  console.log(res);
};

export const deleteTask = async (id) => {
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
