import ajaxBuilder from "../libs/ajax";

const ajax = ajaxBuilder({
  client: "https://todo-backend-axon.herokuapp.com",
  onDeAuthentication: () => console.log(""),
  onNetworkError: () => console.log(""),
  onServerError: () => console.log(""),
  timeout: 10000,
});

export default ajax;
