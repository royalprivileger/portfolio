{/* This file is for making the constant/custom/resuable functions for whole project */}

import * as yp from 'yup';

 export const FormSchema = yp.object().shape({
  firstName: yp.string()
    .transform((value) => value.trim())
    .min(2, 'Firstname must be at least 2 characters')
    .max(20, 'Firstname cannot exceed 20 characters')
    .matches(/^[A-Za-z ]+$/, 'First name can only contain letters')
    .required('First name is required'),
  lastName: yp.string()
    .transform((value) => value.trim())
    .min(2, 'Lastname must be at least 2 characters')
    .max(20, 'Lastname cannot exceed 20 characters')
    .matches(/^[A-Za-z ]+$/, 'Lastname can only contain letters')
    .required('Lastname is required'),
  email: yp.string()
    .transform((value) => value.trim())
    .email('Invalid email format')
    .required('Email is required'),
  phone: yp.string()
    .transform((value) => value.trim())
    .matches(/^\d{10}$/, 'Phone must be 10 digits')
    .optional(),
  textMessage: yp.string()
    .transform((value) => value.trim())
    .max(100, 'Text message cannot exceed 100 characters')
    .matches(/^[a-zA-Z0-9 \\/_@.]+$/, 'Message can only contain letters')
    .required('Message is required'),
})


export const fadeRight = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

export const fadeLeft = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };


