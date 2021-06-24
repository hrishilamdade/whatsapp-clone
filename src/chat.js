import { Avatar } from '@material-ui/core'
import React, { useState,useEffect } from 'react'
import "./chat.css"
import {IconButton} from "@material-ui/core"
import MoreVertIcon from '@material-ui/icons/MoreVert';
// import  from '@material-ui/icons/DonutLarge'; 
import {AttachFile, SearchOutlined} from '@material-ui/icons'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase'

function Chat() {
    const [input,setInput]=useState("")
    const [seed,setSeed]=useState("");
    const {roomId}=useParams(); 
    const [roomName,setRoomName]=useState("")
    const [messages,setMessages]=useState([])
    const [{user}]=useStateValue()

    useEffect (()=>{
        if(roomId){
            db.collection("rooms").doc(roomId).onSnapshot(snapshot=>(
                setRoomName(snapshot.data().name)
            ))
            db.collection("rooms").doc(roomId).collection('messages').orderBy('timestamp','asc').onSnapshot(snapshot=>(
                setMessages(snapshot.docs.map(doc=>doc.data()))
            ))
        }
    },[roomId])
    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000))
    },[roomId])
    const sendMessage=((e)=>{
        e.preventDefault();
        db.collection("rooms").doc(roomId).collection("messages").add({
            message:input,
            name:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput("")
    })

    return (
        <div className="chat">
            <div className="chatHeader">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chatHeader-info">
                    <h3>{roomName}</h3>
                    <p>Last seen{" "}{new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>
                <div className="chatHeaderRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile></AttachFile>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
            <div className="chat-body">
                {messages.map((message) =>(
                    <p  className={`chat-message ${message.name===user.displayName && " chat-receiver"}`}>
                    <span className="chat-name">{message.name}</span>
                        {message.message}
                    <span className="chat-timestamp">
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                </p>
                ))
            }
                
            </div>
            <div className="chat-footer">
                    <IconButton>
                        <InsertEmoticonIcon/>
                    </IconButton>
                    <form>
                        <input value={input} onChange={e=> setInput(e.target.value)} type="text" placeholder="Type a message"/>
                        <button onClick={sendMessage} type="submit">Send</button>
                    </form>
                    <IconButton>
                        <MicIcon/>
                    </IconButton>
                </div>
        </div>
    )
}

export default Chat
