const { RTCPeerConnection, RTCSessionDescription } = window
const peerConnection = new RTCPeerConnection();
let isAlreadyCalling = false;
let getCalled = false;

const existingCalls = [];
navigator.getUserMedia(
    {video: true, audio: true},
    stream => {
        const localVideo = document.getElementById("local-video");
        if (localVideo) {
            localVideo.srcObject = stream;
        }
    },
    error => {
        console.error(error.message)
    }
)

const socket = io({transports: ['websocket'], upgrade: false})


socket.on('disconnect', socket => {
    const existingSocket = this.activeSockets.filter(
        existingSocket => existingSocket !== socket.id
    );
    console.log(socket)

    socket.emit("remove-user", {
        'socketId': socket.id
    })
})
socket.on('reload', socket => {
    console.log(socket)
    socket.emit("remove-user", {
        'socketId': socket.id
    })
})

socket.on("update-user-list", ({users}) => {
    updateuserList(users)
})

socket.on("remove-user", ({socketId}) => {
    const elToRemove = document.getElementById(socketId)

    if (elToRemove) {
        elToRemove.remove()
    }
})

function updateuserList(socketIds) {
    const activeUserContainer = document.getElementById("active-user-container")

    socketIds.forEach(socketId => {
        const alreadyExistingUser = document.getElementById(socketId);
        if (!alreadyExistingUser) {
            const userContainerEl = createUserItemContainer(socketId);
            activeUserContainer.appendChild(userContainerEl);
        }
    })
}

function createUserItemContainer(sockeId) {
    const userContainerEl = document.createElement("div");

    const usernameEl = document.createElement("p")

    userContainerEl.setAttribute('class', 'active-user');
    userContainerEl.setAttribute("id", sockeId);
    usernameEl.setAttribute("class", "username")
    usernameEl.innerHTML = `Socket: ${sockeId}`

    userContainerEl.appendChild(usernameEl);

    userContainerEl.addEventListener("click", () => {
        unselectUserFromList();
        userContainerEl.setAttribute("class", "active-user active-user--selected");
        const talkingWithInfo = document.getElementById("talking-with-info");
        talkingWithInfo.innerHTML = `Talking with: "Socket: ${sockeId}"`;
        callUser(sockeId)
    })

    return userContainerEl
}
function unselectUserFromList() {
    const alreadySelectedUser = document.querySelectorAll(
        ".active-user.active-user--selected"
    );

    alreadySelectedUser.forEach(el => {
        el.setAttribute("class", "active-user");
    });
}

async function callUser(socketId) {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(offer))

    socket.emit("call-user", {
        offer,
        to: socketId
    })
}

socket.on("call-made", async data => {
    await peerConnection.setRemoteDescription(
        new RTCSessionDescription(data.offer)
    );
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(answer));

    socket.emit("make-answer", {
        answer,
        to: data.socket
    })
})

socket.on("answer-made", async data => {
    await peerConnection.setRemoteDescription(
        new RTCSessionDescription(data.answer)
    )

    if (!isAlreadyCalling) {
        callUser(data.socket)
        isAlreadyCalling = true
    }
})
navigator.getUserMedia(
    { video: true, audio: true },
    stream => {
        const localVideo = document.getElementById("local-video");
        if (localVideo) {
            localVideo.srcObject = stream;
        }

        stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
    },
    error => {
        console.warn(error.message);
    }
);


peerConnection.ontrack = function({ streams: [stream] }) {
    const remoteVideo = document.getElementById("remote-video");
    if (remoteVideo) {
        remoteVideo.srcObject = stream;
    }
};