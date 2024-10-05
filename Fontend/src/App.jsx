import React, { useState, useEffect } from 'react';
import CategorySelector from './components/CategorySelector.jsx';
import './App.css';
import Form from './Form';
import Chat from './chat.jsx';

function App() {
  const [categories, setCategories] = useState([]);
  const [SelectedCategory, setSelectedCategory] = useState(null);
  const [showForm, setShowForm] = useState(false); // State to show/hide the form
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/categories");
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategorySelect = async (category) => {
    setSelectedCategory(category);

    try {
      await fetch(`http://127.0.0.1:8000/questions/${category}`);
      console.log(`Selected category sent to FastAPI: ${category}`);
    } catch (error) {
      console.error("Error sending category to FastAPI:", error);
    }
  };

  const handleFormSubmit = async (formData) => {
    console.log('Form submitted with:', formData);
  
    try {
      const response = await fetch('http://127.0.0.1:8000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData),  // Properly format form data
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Response from server:', data);
        setSuccessMessage('Form Submitted Successfully!');
        setShowForm(false);
        
      } else {
        console.error('Error submitting form:', response.statusText);
        setSuccessMessage('Error submitting form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSuccessMessage('Error submitting form. Please try again.');
    }
  };

  return (
    <div className='Home'>
      <div className='App'>
        {/* Display category selector if no category is selected */}
        {!SelectedCategory ? (
          <CategorySelector
            categories={categories}
            onSelectCategory={handleCategorySelect}
          />
        ) : (
          <div className='selected'>
            <h2>Selected Category: {SelectedCategory}</h2>
          </div>
        )}
      </div>
      {/* Chat Component */}
      <Chat category={SelectedCategory} setShowForm={setShowForm} />
      {/* Conditionally render the form based on the showForm state */}
      {showForm && (
        <div className="form-container">
          <Form SelectedCategory={SelectedCategory} onSubmit={handleFormSubmit} />
        </div>
      )}
      <div className='submit_msg'>
        {successMessage && <p>{successMessage}</p>}
      </div>
    </div>
  );
}

export default App;
