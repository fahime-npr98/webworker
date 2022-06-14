//VARIABLES
let count = 0;
let myInterval;
let getDataPromis = null;
let pendingStop = false;

const DataSource = {
  user: [],
  //==============START GETTING DATA AND SAVE DATA=============
  start: function () {
    pendingStop = false;
    myInterval = setInterval(
      function () {
        getDataPromis = this.getData();
        getDataPromis.then((data) => {
          DataSource.user.push(data.data);
          if (pendingStop) {
            clearInterval(myInterval);
            return;
          }
          getDataPromis = null;
          postMessage(DataSource.user);
          DataSource.user.splice(0);
        });
      }.bind(this),
      2000
    );
  },
  //==================STOP====================
  stop: function () {
    if (getDataPromis == null) {
      clearInterval(myInterval);
    } else {
      pendingStop = true;
    }
  },
  //===================RESET====================
  reset: function () { 
    count = 0;
    this.user = [];
    postMessage(this.user);   
  },
  //==================GET DATA FROM ENDPOINT=================
  getData: async function () {
    count += 1;
    let url = `https://reqres.in/api/users/${count}`;
    try {
      const result = await fetch(url);
      const data = await result.json();
      if (!result.ok) {
        this.stop();
        const error = new Error(result.statusText);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};
//==================RECIEVE FROM MAIN====================
this.onmessage = (e) => {
  const status = e.data.status;
  switch (status) {
    case "start":
      DataSource.start();
      break;
    case "stop":
      DataSource.stop();
      break;
    case "reset":
      DataSource.stop();
      DataSource.reset();
      DataSource.start();
      break;
  }
};
