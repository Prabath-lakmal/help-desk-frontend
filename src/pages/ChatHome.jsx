import React from "react";
import { Button } from '../components/ui/button'
import { Bot } from "lucide-react";
import { useNavigate } from "react-router";

function ChatHome() {

  const navigate = useNavigate();

  const handleChatStartClick=()=>{
    navigate("/chat");
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-5">
            <Bot size={80} />
            <h1 className="text-4xl font-bold">Welcome to the Help Desk Application</h1>
            <Button onClick={handleChatStartClick} className={"cursor-pointer"} variant={"outline"}>Start Getting Help</Button>

    </div>
  );
}

export default ChatHome;