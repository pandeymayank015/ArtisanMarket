import React, { useState } from 'react';
import '../styles/community-forum.css';


const CommunityForum = () => {
  const [threads, setThreads] = useState([
    {
      id: 1,
      title: 'Introduction Thread',
      author: 'JohnDoe',
      date: '2023-12-01',
      content: 'Welcome to our community! Introduce yourself here.',
      comments: [
        { id: 1, author: 'JaneSmith', date: '2023-12-02', content: 'Hello, everyone!' },
        { id: 2, author: 'BobJohnson', date: '2023-12-02', content: 'Nice to meet you all!' },
      ],
    },
    // Add more threads as needed
  ]);

  const [newThread, setNewThread] = useState({
    title: '',
    author: 'CurrentUser', // Replace with actual user authentication
    content: '',
  });

  const handleNewThread = () => {
    // Implement logic to create a new thread
    const updatedThreads = [...threads, { ...newThread, id: threads.length + 1, date: new Date().toISOString(), comments: [] }];
    setThreads(updatedThreads);
    setNewThread({ title: '', author: 'CurrentUser', content: '' });
  };

  return (
    <div className="page-container">
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

        {/* List of Threads */}
        <div className="thread-list">
          {threads.map((thread) => (
            <div key={thread.id} className="thread">
              <h3>{thread.title}</h3>
              <p>{`by ${thread.author} on ${new Date(thread.date).toLocaleDateString()}`}</p>
              <p>{thread.content}</p>

              {/* Comments Section */}
              <div className="comments-section">
                <h4>Comments</h4>
                {thread.comments.map((comment) => (
                  <div key={comment.id} className="comment">
                    <p>{`by ${comment.author} on ${new Date(comment.date).toLocaleDateString()}`}</p>
                    <p>{comment.content}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityForum;
