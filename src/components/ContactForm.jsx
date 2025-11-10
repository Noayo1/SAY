"use client";
import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState(''); // 'loading', 'success', 'error'

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Using EmailJS - FREE and easy to set up
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'service_v3fcfba', // Replace with your EmailJS service ID
          template_id: 'template_fiaz179', // Replace with your EmailJS template ID
          user_id: 'WW26eFN9466ZLETVIYaJV', // Replace with your EmailJS public key
          template_params: {
            to_email: 'nyo1254@gmail.com',
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
          }
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' }); // Clear form
        setTimeout(() => setStatus(''), 5000); // Clear success message after 5s
      } else {
        setStatus('error');
        setTimeout(() => setStatus(''), 5000);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('error');
      setTimeout(() => setStatus(''), 5000);
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
      
      {/* Success Message */}
      {status === 'success' && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800">✓ Message sent successfully!</p>
        </div>
      )}

      {/* Error Message */}
      {status === 'error' && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">✗ Failed to send message. Please try again.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            required
            disabled={status === 'loading'}
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            required
            disabled={status === 'loading'}
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            required
            disabled={status === 'loading'}
          ></textarea>
        </div>
        
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
