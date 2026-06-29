import React, { createContext, useState } from 'react';

export const TimelineContext = createContext();

export const TimelineProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      author: "Michael Choi",
      date: "January 23rd 2013",
      timestamp: 1358934000000,
      content: "This is my message. This is my message. This is my message. This is my message. This is my message. This is my message. This is my message. This is my message. This is my message.",
      comments: []
    },
    {
      id: 2,
      author: "Cory Whiteland",
      date: "January 15th 2013",
      timestamp: 1358242800000,
      content: "This is my message. This is my message. This is my message. This is my message. This is my message. This is my message. This is my message. This is my message. This is my message.",
      comments: [
        {
          id: 101,
          author: "Victor Tran",
          date: "Feb 1st 2013",
          timestamp: 1359711600000,
          content: "This is a comment. This is a comment. This is a comment. This is a comment."
        },
        {
          id: 102,
          author: "Eva Roa",
          date: "Feb 3rd 2013",
          timestamp: 1359884400000,
          content: "This is a comment. This is a comment. This is a comment. This is a comment."
        }
      ]
    },
    {
      id: 3,
      author: "Cory Whiteland",
      date: "January 1st 2013",
      timestamp: 1357033200000,
      content: "This is my message. This is my message. This is my message. This is my message. This is my message.",
      comments: []
    }
  ]);

  const addMessage = (content) => {
    const newMessage = {
      id: Date.now(),
      author: "Michael Choi",
      date: new Date().toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      }) + ' at ' + new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      timestamp: Date.now(),
      content: content,
      comments: []
    };

    setMessages([newMessage, ...messages]);
  };

  const addComment = (messageId, content) => {
    const newComment = {
      id: Date.now(),
      author: "Victor Tran",
      date: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }) + ' at ' + new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      timestamp: Date.now(),
      content: content
    };

    const updatedMessages = messages.map(msg => {
      if (msg.id === messageId) {
        return {
          ...msg,
          comments: [...msg.comments, newComment]
        };
      }
      return msg;
    });

    setMessages(updatedMessages);
  };

  return (
    <TimelineContext.Provider value={{ messages, addMessage, addComment }}>
      {children}
    </TimelineContext.Provider>
  );
};