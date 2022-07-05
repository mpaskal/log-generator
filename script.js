const appMap = new Map();

class Node {
  constructor(val) {
    this.value = val;
    this.next = null;
  }
}
class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.next = null;
    this.length = 0;
  }
  shift() {
    if (!this.head) return undefined;
    let head = this.head;
    this.head = head.next;
    this.length--;
    if (this.length == 0) {
      head.next = null;
    }
    return head;
  }
  unshift(val) {
    let head = new Node(val);
    if (!this.head) {
      this.head = head;
      head.next = null;
    } else {
      head.next = this.head;
      this.head = head;
    }
    this.length++;
    return this;
  }
}

function reset() {
  document.querySelector("#app-error").innerHTML = "";
  document.querySelector("#version-error").innerHTML = "";
  document.querySelector("#app").value = "";
  document.querySelector("#version").value = "";
  app.style.border = "1px solid black";
  version.style.border = "1px solid black";
}

function addLogs() {
  let list = new SinglyLinkedList();
  const app = document.querySelector("#app");
  const version = document.querySelector("#version");
  if (!app.checkValidity() || !version.checkValidity()) {
    if (!app.checkValidity()) {
      document.getElementById("app-error").innerHTML = app.validationMessage;
      app.style.border = "2px solid red";
    } else {
      document.getElementById("app-error").innerHTML = "";
      app.style.border = "1px solid black";
    }
    if (!version.checkValidity()) {
      document.getElementById("version-error").innerHTML =
        version.validationMessage;
      version.style.border = "2px solid red";
    } else {
      document.getElementById("version-error").innerHTML = "";
      version.style.border = "1px solid black";
    }
  } else {
    let date = new Date();
    date = date.toUTCString();
    if (appMap.has(app.value)) {
      list = appMap.get(app.value);
      if (version.value == "rollback") {
        if (list.head.next != null) {
          list.shift();
          version.value = list.head.value;
        } else {
          version.value = list.head.value;
        }
      } else {
        list.unshift(version.value);
        appMap.set(app.value, list);
      }
      const log = document.createElement("div");
      log.innerHTML = `${date} ${app.value} ${version.value}`;
      document.body.appendChild(log);
    } else {
      if (version.value != "rollback") {
        list.unshift(version.value);
        appMap.set(app.value, list);
        const log = document.createElement("div");
        log.innerHTML = `${date} ${app.value} ${version.value}`;
        document.body.appendChild(log);
      }
    }
    reset();
  }
}
