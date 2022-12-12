/* web based logic */
const API_URL = "https://fetictac.azurewebsites.net/";
const socket = io(API_URL);

function createRoom(callback) {
  let board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
  fetch(API_URL + "room", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ board: board }),
  })
    .then((resp) => resp.json())
    .then((data) => {
      callback({ id: data.id, board: data.board });
    });
}

function joinRoom(id, callback) {
  fetch(API_URL + "room/" + id)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      callback({ id: data.id, board: data.board });
    });
}

function onRoomUpdate(id, callback) {
  socket.on("tic-update-" + id, (room) => {
    callback({ id: id, board: room.board });
  });
}

function updateRoom(id, board) {
  socket.emit("tic-update", { id: id, board: board });
}
