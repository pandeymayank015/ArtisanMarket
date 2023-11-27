import React, { useState, useEffect } from 'react';
import '../styles/community-forum.css';
import axios from 'axios';
 
const CommunityForum = () => {
  const [threads, setThreads] = useState([]);
  const [newThread, setNewThread] = useState({
    title: '',
    author: '',
    content: '',
  });
 
  useEffect(() => {
    fetchThreads();
  }, []);
 
  const fetchThreads = async () => {
    try {
      const response = await axios.get('http://localhost:9091/api/threads/getAll');
      setThreads(response.data);
    } catch (error) {
      console.error('Error fetching threads:', error);
    }
  };
 
  const handleNewThread = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
   
      console.log('JWT Token:', localStorage.getItem('jwtToken'));
      console.log('Current User:', currentUser);
   
      if (currentUser && currentUser.username) {
        console.log('Author:', currentUser.username);
   
        const threadPayload = {
          username: currentUser.username,
          threadTitle: newThread.title,
          threadContent: newThread.content,
        };
   
        await axios.post('http://localhost:9091/api/threads/create', threadPayload);
   
        fetchThreads();
   
        setNewThread({ title: '', author: '', content: '' });
      } else {
        console.error('User details or username not found in localStorage.');
      }
    } catch (error) {
      console.error('Error creating thread:', error);
    }
  };
 
  return (
    <div className="page-container view-container">
      <div className="community-forum-container">
        <h2>Community Forum</h2>
 
        {/* New Thread Form */}
        <div className="new-thread-form">
          <input
            type="text"
            placeholder="Thread Title"
            value={newThread.title}
            onChange={(e) => setNewThread({ ...newThread, title: e.target.value })}
          />
          <textarea
            placeholder="Thread Content"
            value={newThread.content}
            onChange={(e) => setNewThread({ ...newThread, content: e.target.value })}
          />
          <button className="forum-button" onClick={handleNewThread}>
            Create Thread
          </button>
        </div>
 
        <div className="thread-list">
          {threads.map((thread) => (
            <div key={thread.id} className="thread">
              <h3>{thread.threadTitle}</h3>
              <p>{`by ${thread.username}`}</p>
              <p>{thread.threadContent}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
 
export default CommunityForum;