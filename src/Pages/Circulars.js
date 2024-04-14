import React, { useState } from 'react';

const Circulars = () => {
  const [circulars, setCirculars] = useState([
    { id: 1, title: 'Notice 1', content: 'Lorem ipsum dolor sit amet.' },
    { id: 2, title: 'Notice 2', content: 'Consectetur adipiscing elit.' },
  ]);

  const [newCircular, setNewCircular] = useState({ title: '', content: '' });

  const handleInputChange = (e) => {
    setNewCircular({
      ...newCircular,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddCircular = () => {
    if (!newCircular.title || !newCircular.content) return;
    setCirculars([
      ...circulars,
      { id: Date.now(), title: newCircular.title, content: newCircular.content },
    ]);
    setNewCircular({ title: '', content: '' });
  };

  const handleDeleteCircular = (id) => {
    setCirculars(circulars.filter((circular) => circular.id !== id));
  };

  return (
<div className="container mx-auto px-4 py-8">
  <h1 className="text-3xl font-semibold mb-4">Circulars & Notices</h1>

  <div className="flex flex-col gap-4">
    <input
      type="text"
      name="title"
      placeholder="Title"
      value={newCircular.title}
      onChange={handleInputChange}
      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <textarea
      name="content"
      placeholder="Content"
      value={newCircular.content}
      onChange={handleInputChange}
      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      rows={4}
    />
    <button
      onClick={handleAddCircular}
      className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 self-start"
    >
      Add Circular
    </button>
  </div>

  {/* Circulars List */}
  <div className='mt-10'>
    {circulars.map((circular) => (
      <div key={circular.id} className="border border-gray-300 rounded px-4 py-2 mb-4">
        <h2 className="text-xl font-semibold mb-2">{circular.title}</h2>
        <p>{circular.content}</p>
        <button
          onClick={() => handleDeleteCircular(circular.id)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
    ))}
  </div>
</div>

  );
};

export default Circulars;
