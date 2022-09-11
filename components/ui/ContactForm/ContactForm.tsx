import React, { useState, useRef, forwardRef } from 'react';
import * as Yup from 'yup';
import { Formik, Form, ErrorMessage, useField } from 'formik';
import { useMutation } from 'react-query';
import { BeatLoader } from 'react-spinners';
import ErrorIcon from '@components/icons/ErrorIcon';
import ReCAPTCHA from 'react-google-recaptcha';
import { sendContactDetail } from '@lib/api/contact.service';


import styles from './ContactForm.module.scss';

// export const TextField = ({ label, ...props }) => {
// 	const [field, meta] = useField(props);
// 	return (
// 		<div className="contact-form__field text-field">
// 			<label htmlFor={field.name}>{label}</label>
// 			<input className={`form-control ${meta.touched && meta.error && 'is-invalid'}`} {...field} {...props} autoComplete="off" data-cursor-type="none" />
// 			<ErrorMessage name={field.name}>
// 				{(msg) => (
// 					<div className="error">
// 						<ErrorIcon />
// 						<span className="error-message">{msg}</span>
// 					</div>
// 				)}
// 			</ErrorMessage>
// 		</div>
// 	);
// };

// export const TextArea = ({ label, ...props }) => {
// 	const [field, meta] = useField(props);
// 	return (
// 		<div className="contact-form__field text-area">
// 			<label htmlFor={field.name}>{label}</label>
// 			<textarea className={`form-control ${meta.touched && meta.error && 'is-invalid'}`} {...field} {...props} autoComplete="off" data-cursor-type="none" />
// 			<ErrorMessage name={field.name}>
// 				{(msg) => (
// 					<div className="error">
// 						<ErrorIcon />
// 						<span className="error-message">{msg}</span>
// 					</div>
// 				)}
// 			</ErrorMessage>
// 		</div>
// 	);
// };

// const RecaptchaField = forwardRef(({ setFieldValue, ...props }, ref) => {
// 	const [field] = useField(props);
// 	return (
// 		<div className="contact-form__recaptcha" data-cursor-type="none">
// 			<ReCAPTCHA
// 				ref={ref}
// 				sitekey={SITE_KEY}
// 				onChange={(value) => {
// 					setFieldValue('recaptcha', value);
// 				}}
// 			/>
// 			<ErrorMessage name={field.name}>
// 				{(msg) => (
// 					<div className="error">
// 						<ErrorIcon />
// 						<span className="error-message">{msg}</span>
// 					</div>
// 				)}
// 			</ErrorMessage>
// 		</div>
// 	);
// });

// const SITE_KEY = process.env.NEXT_PUBLIC_SITE_KEY;


// const FILE_SIZE = 10 * 1024 * 1024;
// const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'application/pdf', 'application/doc', 'application/docx', 'application/xlxs', 'application/xls', 'application/pptx'];

// const ContactForm = () => {
// 	const validate = Yup.object({
// 		name: Yup.string().required('Name is required'),
// 		company: Yup.string().required('Company is required'),
// 		email: Yup.string().email('Email is invalid').required('Email is required'),
// 		message: Yup.string().required('Message is required'),
// 		recaptcha: Yup.string().required('reCAPTCHA is required'),
// 		attachment: Yup.mixed()
// 			.notRequired()
// 			.nullable()
// 			.test('fileSize', 'This file is too large to upload. The maximum supported file size is 10 MB', (value) => {
// 				if (value) {
// 					return value.size <= FILE_SIZE;
// 				} else return true
// 			})
// 			.test('fileFormat', 'Unsupported Format. Allowed file types: doc, docx, jpg, jpeg, png, pdf, pptx, xls, xlxs.', (value) => {
// 				if (value) {
// 					return SUPPORTED_FORMATS.includes(value.type)
// 				} else return true
// 			}),
// 	});

// 	const mutation = useMutation((data) => sendContactDetail(data));

// 	const [message, setMessage] = useState('');
// 	const [isShowForm, setIsShowForm] = useState(true);

// 	const recaptchaRef = useRef();
// 	const attachmentRef = useRef();
// 	const formTitleRef = useRef();

// 	const handleSubmit = async (values, actions) => {
// 		setMessage('');
// 		try {

// 				let formData = new FormData()
// 				formData.append('name', values.name)
// 				formData.append('company_name', values.company);
// 				formData.append('email', values.email);
// 				formData.append('phone', values.phone);
// 				formData.append('budget', values.budget);
// 				formData.append('message', values.message);
// 				formData.append('attachment', values.attachment);

// 				const response = await mutation.mutateAsync(formData);
// 				if (response) {
// 					setMessage('Thank you. We’ll be in touch shortly.');
// 					setIsShowForm(false);
// 					actions.resetForm();
// 					recaptchaRef.current.reset();
// 					attachmentRef.current.value = '';
// 					formTitleRef.current.classList.add('hidden');
// 				}

// 		} catch (error) {
// 			console.log(error);
// 			setMessage('Oops, something went wrong while submitting the form.');
// 			setIsShowForm(false);
// 			recaptchaRef.current.reset();
// 		}
// 	};

// 	return (
// 		<div className="contact-form container padding-v-5" id="contact-form">
// 			<h3 className='contact-form__title' ref={formTitleRef}>Tell us a bit about your project</h3>
// 			{
// 				<Formik
// 					initialValues={{
// 						name: '',
// 						email: '',
// 						company: '',
// 						phone: '',
// 						budget: '',
// 						message: '',
// 						attachment: undefined,
// 						recaptcha: '',
// 					}}
// 					validationSchema={validate}
// 					onSubmit={(values, actions) => {
// 						handleSubmit(values, actions);
// 					}}>
// 					{(formik) => (
// 						<Form>
// 							<div className={`contact-form__container ${isShowForm === false ? 'hidden' : ''}`}>
// 								<div className="contact-form__wrapper">
// 									<div className="contact-form__left-column">
// 										<TextField label="Name *" name="name" type="text" />
// 										<TextField label="Company Name *" name="company" type="text" />
// 										<TextField label="Email *" name="email" type="email" />
// 										<TextField label="Phone Number" name="phone" type="text" />
// 										<TextField label="Budget" name="budget" type="text" />
// 									</div>
// 									<div className="contact-form__left-column">
// 										<TextArea label="Message *" name="message" />

// 										<div className="contact-form__field attachment" data-cursor-type="none">
// 											<label htmlFor="file">Attachment</label>
// 											<input
// 												ref={attachmentRef}
// 												id="attachment"
// 												name="attachment"
// 												type="file"
// 												style={{ width: '100%' }}
// 												onChange={(event) => {
// 													formik.setFieldValue('attachment', event.currentTarget.files[0]);
// 												}}
// 											/>

// 											{formik.errors.attachment && (
// 												<div className="error">
// 													<ErrorIcon />
// 													<span className="error-message">{formik.errors.attachment}</span>
// 												</div>
// 											)}
// 										</div>
// 									</div>
// 								</div>
// 								<RecaptchaField name="recaptcha" ref={recaptchaRef} setFieldValue={formik.setFieldValue} />
// 								<button disabled={mutation.isLoading} className="btn-contact-submit pre-footer__button" type="submit" data-cursor-type="none">
// 									<div className="btn-inner">
// 										{mutation.isLoading ? (
// 											<span>
// 												Submitting <BeatLoader color="#fff" size={5} margin={3} />
// 											</span>
// 										) : (
// 											'Submit'
// 										)}
// 									</div>
// 								</button>
// 							</div>
// 						</Form>
// 					)}
// 				</Formik>
// 			}
// 			{!isShowForm && message && (
// 				<div className="form-response">
// 					<h4 className="message">{message}</h4>
// 					<button className="btn-contact-submit pre-footer__button" onClick={() => {setIsShowForm(true); formTitleRef.current.classList.remove('hidden')}} data-cursor-type="none">
// 						Back
// 					</button>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default ContactForm;
