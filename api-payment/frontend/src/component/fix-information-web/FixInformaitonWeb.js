import React, { useState, useEffect } from 'react';

const Container = () => {
  const [websiteInfo, setWebsiteInfo] = useState({ title: '', description: '' });
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    loadWebsiteInfo();
  }, []);

  const loadWebsiteInfo = async () => {
    try {
      const response = await fetch('https://api.example.com/website-info');
      const data = await response.json();
      setWebsiteInfo(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to load website information!');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://api.example.com/website-info', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: newTitle, description: newDescription })
      });
      if (response.ok) {
        alert('Website information updated successfully!');
        loadWebsiteInfo();
      } else {
        throw new Error('Failed to update website information!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update website information!');
    }
  };

  return (
    <main>
      <section id="website-info-section">
        <h2>Current Website Information</h2>
        <button onClick={loadWebsiteInfo}>Load Website Info</button>
        <div id="website-info">
          <p><strong>Title:</strong> <span>{websiteInfo.title}</span></p>
          <p><strong>Description:</strong> <span>{websiteInfo.description}</span></p>
        </div>
      </section>

      <section id="edit-website-info-section">
        <h2>Edit Website Information</h2>
        <form id="edit-website-info-form" onSubmit={handleUpdate}>
          <label htmlFor="new-title">New Title:</label>
          <input
            type="text"
            id="new-title"
            name="new-title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />

          <label htmlFor="new-description">New Description:</label>
          <input
            type="text"
            id="new-description"
            name="new-description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            required
          />

          <button type="submit">Update Website Info</button>
        </form>
      </section>
    </main>
  );
};

export default Container;