import socketConnection from "@/actions/PlayerSktConnection"

function Player (){

    // connect socket
    socketConnection();

    return <>
    <div>Player Screen</div>
    </>
}

export default Player

// align in center vertically
// presenter screen -> show code 
// screen 2 -> join room -> if already joined move to other screen  2 
// screen 1 -> id from socket-> create account, if already exist -> exit