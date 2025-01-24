import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { products } from '../data/products';

interface OrderFormProps {
  onClose: () => void;
  onSubmit: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    grade: '',
    email: '',
    product: '',
    comment: ''
  });

  const [submissionCount, setSubmissionCount] = useState(0);
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
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
      product: '',
      comment: ''
    });

    // Close the form and handle submission
    onClose();
    onSubmit();
  };

  return (
    <form
      name="order-form"
      method="POST"
      action="/success"
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
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          id="name"
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
        <label htmlFor="surname" className="block text-sm font-medium text-gray-700">Surname</label>
        <input
          id="surname"
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
        <label htmlFor="grade" className="block text-sm font-medium text-gray-700">Grade</label>
        <input
          id="grade"
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
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
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
        <label htmlFor="product" className="block text-sm font-medium text-gray-700">Select Product</label>
        <select
          id="product"
          name="product"
          value={formData.product}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
          onChange={handleChange}
          disabled={isFormDisabled}
        >
          <option value="">Select a product</option>
          {products.map(product => (
            <option key={product.id} value={product.name}>
              {product.name} - R{product.price.toFixed(2)}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comments/Special Requests</label>
        <textarea
          id="comment"
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