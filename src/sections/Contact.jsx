import { useState } from "react";
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/react/16/solid";
import { contactInfo } from "../utilities/data";
import { FormSchema } from "../utilities/constants";
import { useFormik } from "formik";
import emailjs from 'emailjs-com';
import { toast } from "react-toastify";


export default function Contact() {

/*
- Following useState is for managing locking the send message button while message is sending 
*/

const [isSubmitting, setIsSubmitting] = useState(false);

/*
- Following function is for handelling the form submit
*/

const handleFormSubmit = async (e) => {
  e.preventDefault();

  if (isSubmitting) return;

  const errors = await formik.validateForm();

  formik.setTouched({
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
    textMessage: true
  });
  
  if (Object.keys(errors).length > 0) {   
    toast.error("Kindly fill the required fields correctly before submitting.");
    return;
  }
  
  try {
    setIsSubmitting(true); // This will lock the button
    await formik.handleSubmit(); // This will send the email
  } finally {
    setIsSubmitting(false); // This will unlock the button after done
  }
};

 {/* Following is the formik setup */}

  const formik = useFormik({
    initialValues:{
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      textMessage: ''
    },
    validationSchema: FormSchema,
    onSubmit: (values,{resetForm})=>{
      setIsSubmitting(true);
      const templateParams = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        textMessage: values.textMessage,
        phone: values.phone,
        time: new Date().toLocaleString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
        }),
      }
      
      emailjs.send(
        'service_ooaiot3',
        'template_kmtdsvj',
        templateParams,
        'i-5NmWCERCl-XNOvY'
      ).then((response)=>{
        console.log(response);
        toast.success("Message sent");
        resetForm();
      }).catch((err)=>{
        console.log('Failed...', err);
        toast.error("Failed to send message");
      }).finally(() => {
      setIsSubmitting(false);
    });
    },
  });

  return (
    <>
      <section id="contact" className="py-20 pb-20 px-4 bg-gray-100 dark:from-gray-800 dark:to-gray-900 dark:bg-gradient-to-t text-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-10">

          {/* Left section*/}

          <div className="md:w-1/2 space-y-6 dark:text-white">
            <h3 className="text-7xl font-bold">Get in touch</h3>
            <p className="text-gray-600 dark:text-blue-300 text-xl pl-2">
              <em>Feel free to use the form or drop me an email. Old fashioned phone calls work too.</em>
            </p>
            <div className="space-y-4 pl-2">
              <div className="flex items-center gap-2">
                <PhoneIcon className="size-5 text-green-500" />
                <p><span className="font-medium">Phone: </span>{contactInfo.phone}</p>
            </div>
              <div className="flex items-center gap-2">
                <EnvelopeIcon className="size-5 text-blue-500" />
                <p><span className="font-medium">Email: </span>{contactInfo.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="size-5 text-red-500" />
                <p><span className="font-medium">Location: </span>{contactInfo.location}</p>
              </div>
            </div>
          </div>


          {/* Right Section */}
            <div className="md:w-1/2 bg-white dark:from-gray-800 dark:to-gray-900 dark:bg-gradient-to-b dark:text-white shadow-md rounded-md p-6">
              <form onSubmit={formik.handleSubmit} className="space-y-4" noValidate>

                {/* Name */}

                <label htmlFor="firstName" className="block mb-1 text-lg font-medium">Name <span className="text-red-500">*</span></label>
                  <div id="name" className="flex gap-2 w-full">
                    <div className="flex flex-col w-1/2">
                      <input
                        type="text"
                        placeholder="First"
                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        required
                        id="firstName"
                        name="firstName"
                        {...formik.getFieldProps('firstName')}
                      />
                      {formik.touched.firstName && formik.errors.firstName && 
                      (<span className="text-red-500 text-sm">{formik.errors.firstName}</span>)}
                    </div>
                    <div className="flex flex-col w-1/2">
                      <input
                        type="text"
                        placeholder="Last"
                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        required
                        id="lastName"
                        name="lastName"
                        {...formik.getFieldProps('lastName')}
                      />
                      {formik.touched.lastName && formik.errors.lastName && 
                      (<span className="text-red-500 text-sm">{formik.errors.lastName}</span>)}
                    </div>
                  </div>

                {/* Email */}

                <label htmlFor="email" className="block mb-1 text-lg font-medium">Email <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  className={`w-full px-4 py-2 ${formik.touched.email && formik.errors.email ? 'my-0' : ''} border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                  required
                  id="email"
                  name="email"
                  {...formik.getFieldProps('email')}
                  autoComplete="off"
                />
                
                {formik.touched.email && formik.errors.email && 
                (<span className="text-red-500 text-sm ">{formik.errors.email}</span>)}
                
                {/* Phone Number */}

                <label htmlFor="phone" className="block mb-1 text-lg font-medium">Phone (optional)</label>
                <input
                  type="tel"
                  placeholder="xxx-xxx-xxxx"
                  className={`w-full px-4 py-2 ${formik.touched.phone && formik.errors.phone ? 'my-0' : ''} border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                  id="phone"
                  name="phone"
                  {...formik.getFieldProps('phone')}
                  autoComplete="off"
                />
                
                {formik.touched.phone && formik.errors.phone && 
                (<span className="text-red-500 text-sm">{formik.errors.phone}</span>)}

                {/* Text Message */}

                <label htmlFor="textMessage" className="block mb-1 text-lg font-medium">Message <span className="text-red-500">*</span></label>
                <div className="flex flex-col w-full">
                  <textarea
                    placeholder="Type your Message..."
                    rows="4"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    required
                    id="textMessage"
                    name="textMessage"
                    {...formik.getFieldProps('textMessage')}
                  ></textarea>
                  {formik.touched.textMessage && formik.errors.textMessage && 
                  (<span className="text-red-500 text-sm">{formik.errors.textMessage}</span>)}

                  <button
                    type="submit"
                    className="w-full min-[900px]:w-1/3 bg-indigo-600 hover:bg-indigo-700 my-2 text-white px-6 py-2 rounded-md transition duration-200 disabled:opacity-50"
                    onClick={handleFormSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
