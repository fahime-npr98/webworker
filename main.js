//VARIABLES
const tables = document.querySelector(".tbl");
//CREATE-START-BTN
let startBtn = document.createElement("button");
document.body.appendChild(startBtn);
startBtn.innerText = "Start";
//CREATE-STOP-BTN
let stopBtn = document.createElement("button");
document.body.appendChild(stopBtn);
stopBtn.innerText = "Stop";
//CREATE-RESET-BTN
let resetBtn = document.createElement("button");
document.body.appendChild(resetBtn);
resetBtn.innerText = "Reset";
//WORKER
let myWorker = new Worker("myWorker.js");
//POST TO WORKER
startBtn.addEventListener("click", () => {
  myWorker.postMessage({ status: "start" });
});
stopBtn.addEventListener("click", () => {
  myWorker.postMessage({ status: "stop" });
});
resetBtn.addEventListener("click", () => {
  myWorker.postMessage({ status: "reset" });
});
//RECIEV FROM WORKER
myWorker.onmessage = (e) => {
  const result = e.data;
  if (result.length == 1) {
    result.map((user) => {
      var row = tables.insertRow();
      var cell = row.insertCell(user.index);
      cell.innerText = user.first_name;
    });
  }else{
      tables.innerHTML="";
  }
};
