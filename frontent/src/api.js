const BASE_URL = "api";

async function callApi(endpoint, options = {}) {
  options.headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "http://localhost:8000",
    "Access-Control-Allow-Credentials": "true",
  };
  options.credentials = "include";
  const url = BASE_URL + endpoint;
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}

const api = {
  auth: {
    getUsers() {
      return callApi(`/auth`);
    },
    getContactUser(params) {
      return callApi(`/auth/contact`, {
        method: "POST",
        body: JSON.stringify(params),
      })
    },
    addUser(params) {
      return callApi(`/auth`, {
        method: "POST",
        body: JSON.stringify(params),
      })
    },
    login(params) {
      return callApi(`/auth/login`, {
        method: "POST",
        body: JSON.stringify(params),
      })
    },
  },
  post: {
    addPost(params) {
       return callApi(`/post`, {
        method: "POST",
        body: JSON.stringify(params),
      })
    },
    addImage(name, params) {
      return callApi(`/image/${name}`, {
       method: "POST",
       body: params,
     })
   },
    getPosts(params) {
       return callApi(`/post/post`, {
        method: "POST",
        body: JSON.stringify(params),
      })
    },
    getPostsLimit(limit) {
      return callApi(`/post/limit`, {
       method: "POST",
       body: JSON.stringify(limit),
     })
   },
    
    remove(params) {
      return callApi(`/post`, {
       method: "DELETE",
       body: JSON.stringify(params),
     })
   },
    like(params) {
      return callApi(`/post`, {
       method: "PUT",
       body: JSON.stringify(params),
     })
   },
  }
};

export default api;
