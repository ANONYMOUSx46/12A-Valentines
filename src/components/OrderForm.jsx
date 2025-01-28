import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { products } from '../data/products';

const OrderForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    grade: '',
    email: '',
    products: [], // Change to an array to hold multiple products
    comment: ''
  });
  const [submissionCount, setSubmissionCount] = useState(0);
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        products: checked
          ? [...prev.products, value]
          : prev.products.filter(product => product !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submissionCount >= 100) {
      alert('The daily submission limit has been reached. Please try again tomorrow.');
      return;
    }

    // Track the submission
    setSubmissionCount(prevCount => prevCount + 1);
    if (submissionCount + 1 === 100) {
      setIsFormDisabled(true);
    }

    // Reset the form
    setFormData({
      name: '',
      surname: '',
      grade: '',
      email: '',
      products: [],
      comment: ''
    });

    // Submit the form data to Netlify
    const formElement = e.target;
    try {
      const formDataObj = new FormData(formElement);
      const params = new URLSearchParams(formDataObj);
      console.log('Form Data:', [...params.entries()]); // Log form data

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params,
      });

      if (!response.ok) {
        throw new Error(`Error submitting form: ${response.statusText}`);
      }

      // Handle success
      onSubmit();
      onClose();
      setTimeout(() => {
        window.location.href = '/';
      }, 1000); // Delay to show a success message or animation
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form
      name="order-form"
      method="POST"
      netlify
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="space-y-4"
      disabled={isFormDisabled}
    >
      <input type="hidden" name="form-name" value="order-form" />
      <div className="hidden">
        <label htmlFor="bot-field">Don’t fill this out:</label>
        <input name="bot-field" onChange={() => {}} />
      </div>
      <div>
        <label htmlFor="name-input" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          id="name-input"
          type="text"
          name="name"
          value={formData.name}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
          onChange={handleChange}
          disabled={isFormDisabled}
        />
      </div>
      <div>
        <label htmlFor="surname-input" className="block text-sm font-medium text-gray-700">Surname</label>
        <input
          id="surname-input"
          type="text"
          name="surname"
          value={formData.surname}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
          onChange={handleChange}
          disabled={isFormDisabled}
        />
      </div>
      <div>
        <label htmlFor="grade-input" className="block text-sm font-medium text-gray-700">Grade</label>
        <input
          id="grade-input"
          type="text"
          name="grade"
          value={formData.grade}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
          onChange={handleChange}
          disabled={isFormDisabled}
        />
      </div>
      <div>
        <label htmlFor="email-input" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email-input"
          type="email"
          name="email"
          value={formData.email}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
          onChange={handleChange}
          disabled={isFormDisabled}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Select Products</label>
        <div className="mt-2 space-y-1">
          {products.map(product => (
            <div key={product.id} className="flex items-center">
              <input
                id={`product-${product.id}`}
                type="checkbox"
                name="products"
                value={product.name}
                checked={formData.products.includes(product.name)}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                onChange={handleChange}
                disabled={isFormDisabled}
              />
              <label htmlFor={`product-${product.id}`} className="ml-2 block text-sm text-gray-900">
                {product.name} - R{product.price.toFixed(2)}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="comment-input" className="block text-sm font-medium text-gray-700">Comments/Special Requests</label>
        <textarea
          id="comment-input"
          name="comment"
          value={formData.comment}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
          onChange={handleChange}
          disabled={isFormDisabled}
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300 flex items-center justify-center gap-2"
        disabled={isFormDisabled}
      >
        Submit Order
        <Send className="w-4 h-4" />
      </button>
      <p className="text-sm text-gray-600 mt-2">Submissions so far: {submissionCount}</p>
      {isFormDisabled && (
        <p className="text-sm text-red-500 mt-2">Daily submission limit reached. Please try again tomorrow.</p>
      )}
    </form>
  );
};

export default OrderForm;
