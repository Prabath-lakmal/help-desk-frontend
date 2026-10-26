import React, {useEffect, useRef, useState} from "react";
import {Search, MoreVertical, Send, Plus, Sidebar, Icon, LogOut} from "lucide-react";
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import {ScrollArea, ScrollBar} from "../components/ui/scroll-area";
import {Separator} from "../components/ui/separator";
import {Avatar, AvatarFallback, AvatarImage, AvatarBadge} from "../components/ui/avatar";
import MessageBubble from "../components/MessageBubble";
import { sendMessageToServer } from "../services/chat.service";
import {v4 as v444} from "uuid";
import {Spinner} from "../components/ui/spinner";
import { useNavigate } from "react-router";

const CHATS=[
  {
    id: 1,
    name: "Spring Boot...",
    lastMessage: "Hi, How to create a Spring Boot application?",
    unread: 2,
    initials: "PL",
  },
  {
    id: 2,
    name: "React Support",
    lastMessage: "How do I manage state in React?",
    unread: 0,
    initials: "RS",
  },
  {
    id: 3,
    name: "Database Help",
    lastMessage: "Can you help me with a SQL query?",
    unread: 1,
    initials: "DH",
  },
  {
    id: 4,
    name: "API Integration",
    lastMessage: "The endpoint is returning a 404 error.",
    unread: 0,
    initials: "AI",
  },
  {
    id: 5,
    name: "Build Issues",
    lastMessage: "My application fails during the build.",
    unread: 3,
    initials: "BI",
  },
  {
    id: 6,
    name: "Account Support",
    lastMessage: "I need help updating my account details.",
    unread: 0,
    initials: "AS",
  }
];


const CONVERSATION = [
  {
    id: 1,
    author: "bot",
    text: "Hello! How can I assist you today?",
    at: new Date().toLocaleTimeString(),
  }
  // {
  //   id: 2,
  //   author: "user",
  //   text: "Can you help me with the Server data migration?",
  //   at: "10:01 AM",
  // },
  // {
  //   id: 3,
  //   author: "Nova",
  //   text: "Ok, can you provide me to details of the server setup?",
  //   at: "10:02 AM",
  // },
  // {
  //   id: 4,
  //   author: "Nova",
  //   text: "Ok, can you provide me to details of the server setup?",
  //   at: "10:02 AM",
  // },
  // {
  //   id: 5,
  //   author: "user",
  //   text: "Ok, can you provide me to details of the server setup?",
  //   at: "10:02 AM",
  // },
  // {
  //   id: 6,
  //   author: "Nova",
  //   text: "Ok, can you provide me to details of the server setup?",
  //   at: "10:02 AM",
  // }

];

function Chat() {

  const [messages, setMessages] = useState(CONVERSATION);
  const [draft, setDraft] = useState("");
  const endRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [conversationId, setConversationId] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [activeChat, setActivechat] = useState(CHATS[0]);

  useEffect(() => {
    const id = v444();
    setConversationId(id);
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({behavior: "smooth"})
  },[messages]);

  async function sendMessage(){
    const textMessage = draft.trim();

    if(!textMessage) return;

    setSending(true);

    console.log(draft);

    // console.log(conversationId);
        setMessages((previousMsg) =>
          [...previousMsg, {
        id: v444(),
        author: "user",
        text: draft,
        at: new Date().toLocaleTimeString(),
      },
    ]);

    const responseFromAI = await sendMessageToServer(draft, conversationId);
      console.log(responseFromAI);
      
    setMessages((previousMsg) =>
      [...previousMsg, {
        id: v444(),
        author: "bot",
        text: responseFromAI,
        at: new Date().toLocaleTimeString(),
      },
    ]);

    setSending(false);

    //call api to send message

    //set messages to update the conversation 
    //setMessages(...);

    setDraft("");
    inputRef.current.focus();
  }

  return (
    <div className={"fixed top-0 left-0 right-0 mx-auto min-h-screen max-w-7xl grid grid-cols-1 md:grid-cols-[300px_minmax(0,1fr)] border-x"}>
      <div>
        {/* Sidebar */} 
        <aside className={"hidden-md:flex-col border-r"}>
          <div className="p-3 flex items-center gap-2">
            <Button size={Icon} variant="outline" className={"h-8 w-8"}>
              <Plus className="h-4 w-4"/>              
            </Button>
            <div className="relative w-full">
              <Input placeholder="Search chats..." type="text" className="h-9 pl-8 border rounder"/>
              <Search className="h-4 w-4 pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"/>
            </div>
          </div>
          <Separator />
          <ScrollArea className="flex-1">
            <ul className="p-2 space-y-1">
              {CHATS.map((chat) => (
                <li key={chat.id}>
                  {/* <ChatListItem chat = {chat}/> */}
                  <button onClick={() => setActivechat(chat)} className={`w-full rounded-xl px-3 py-2 text-left hover:bg-accent transition ${
                    activeChat.id === chat.id ? "bg-accent" : ""
                  }`}>
                    <div className="flex items-center gap-3">
                      <Avatar className={"h-9 w-9"}>
                        <AvatarImage src="" alt={chat.name}/>
                        <AvatarFallback className="text-xs">
                          {chat.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="truncate text-sm font-medium">
                            {chat.name}
                          </span>
                          {chat.unread ? (
                            <span className="ml-auto inline-flex h-5 min-w-5 items-center rounded-full bg-primay/10 px-1 text-[10px] font-semibold text-primary">
                              {chat.unread}
                            </span>
                          ) : null}
                        </div>
                        <p className="truncate text-xs text-muted-foreground">
                          {chat.lastMessage}
                        </p>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </aside>
      </div>
      {/*Right chat area*/}
      <section className="h-full border-l">
        {/* Chat Area */}
        
        {/* Header */}

        <div className="flex item-center justify-between gap-3 px-4 py-3 border-b">
          <div className={"flex gap-3"}>
            <Avatar>
            <AvatarImage src=""/>
            <AvatarFallback className={"text-xs"}>AB</AvatarFallback>
            <AvatarBadge className="bg-emerald-500"/>
            {/* {isOnline && <AvatarBadge className="bg-emerald-500" />} */}
          </Avatar>
          <div className="leading-tight">
            <div className="text-sm font-medium">Nova Support</div>
            <div className="text-xs text-muted-foreground">online . Typing...</div>
          </div>
          </div>
          <div>
            <Button onClick={() => {
                navigate("/");
              }}
              variant={"ghost"} size={"icon"} className={"h-8 w-8"}>
              <LogOut className={"h-4 w-3"} />
            </Button>
            <Button variant={"ghost"} size={"icon"} className={"h-8 w-8"}>
              <MoreVertical className={"h-4 w-3"}/>
            </Button>
          </div>
        </div>

        {/* Chat area */}
        <ScrollArea className="flex-1 h-[calc(100vh-150px)]">
          <div ref={endRef} className="mx-auto max-w-3xl px-6 py-6 space-y-6">
            {messages.map((chat,index) => (
              <MessageBubble key={index} author={chat.author} at={chat.at}>
                {chat.text}
              </MessageBubble>
            ))}
          </div>
        </ScrollArea>
        {/* composer */}
          <div className="border-t p-3">
            <div className="mx-auto flex max-w-3xl items-center gap-3">
              <Input 
              ref={inputRef} 
              value={draft} 
              onChange={(e) => setDraft(e.target.value)} 
              // onKeyDown={(e) => {
              //   if (e.key === "Enter") {
              //     e.preventDefault();
              //     if (!sending) sendMessage();
              //   }
              // }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (!sending) sendMessage();
                }
              }}
              className={"flex-1 rounded-3xl"} 
              placeholder="Type a message..." />
              <Button disabled={sending} onClick={sendMessage} className={"rounded-2xl px-5"}>
                {sending ? <Spinner /> : <Send className="mr-2 h-4 w-4"/>}
                Send
              </Button>
            </div>

          </div>
      </section>
    </div>
  );
}

export default Chat;