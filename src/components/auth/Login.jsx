import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate()
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      handleLogin(values.email, values.password);
    } catch (error) {
      console.error('Login failed:', error);
    }
    setSubmitting(false);
  };

  const handleLogin = (email, password) => {
    const user = JSON.parse(localStorage.getItem('users'))?.find(user => user.email === email && user.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user))
      navigate('/')
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded p-8 shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">Email:</label>
              <Field type="email" name="email" id="email" className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2">Password:</label>
              <Field type="password" name="password" id="password" className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500" />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </Form>
        )}
      </Formik>
      <p className="mt-4">Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link></p>
    </div>
  );
}
