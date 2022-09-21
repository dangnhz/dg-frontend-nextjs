import React, { useState } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { requestLogin } from '@lib/api/login.service';
import { useMutation } from 'react-query';
import  Link  from 'next/link';
import { BeatLoader } from 'react-spinners';
import GlassesIcon from '@assets/icons/glasses-icon.png';
import { TextField } from '../ContactForm/ContactForm';
import WarningIcon from '@components/icons/WarningIcon';
import Image from 'next/future/image';
import loginBackground from '@public/footer-leaves/login-background.svg';
import classNames from 'classnames/bind';
import styles from './LoginForm.module.scss';

const cx = classNames.bind(styles)

export const LoginError = ({ message = 'Oops. Something went wrong. Please check your details and try again.', setIsShowForm, setIsError }: any) => {
	return (
		<div className={cx("form-response")}>
			<WarningIcon />
			<h5 className={cx("message" , "margin-t-2 margin-b-5")}>{message}</h5>
			<button
				className={cx("btn-submit")}
				onClick={() => {
					setIsError(false);
					setIsShowForm(true);
				}}
				data-cursor-type="none">
				Try again
			</button>
		</div>
	);
};

const LoginSuccess = () => {
	return (
		<div className={cx("form-response")}>
			<h5 className={cx("message", "margin-t-2 margin-b-5")}>
				Thank you. <br /> Please check your inbox to access case study.
			</h5>
			<div className={cx("icon-success" , "margin-b-3")}>
				<Image src={GlassesIcon.src} alt="success" width={131} height={44} style={{height: 'auto'}}/>
			</div>
			<Link href="/work" >
				<a className={cx("btn-submit")} data-cursor-type="none">Go Back</a>
			</Link>
		</div>
	);
};

const LoginForm = ({ projectPath } : {projectPath: string}) => {
	const validate = Yup.object({
		email: Yup.string().email('Email is invalid').required('Email is required'),
		name: Yup.string().required('Name is required'),
		company: Yup.string().required('Company name is required'),
	});

	const mutation = useMutation((data : any) => requestLogin(data));

	const [message, setMessage] = useState('');
	const [isShowForm, setIsShowForm] = useState(true);
	const [isError, setIsError] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const handleSubmit = async (values: { name: string; email: string; company: string; }, actions: FormikHelpers<{ name: string; email: string; company: string; }>) => {
		setMessage('');
		try {
			const response = await mutation.mutateAsync({ ...values, path: projectPath });
			if (response) {
				setIsSuccess(true);
				setIsError(false);
				setIsShowForm(false);
				actions.resetForm();
			}
		} catch (error : any) {
			if (error.response.data.message) {
				setMessage(error.response.data.message);
			}
			setIsError(true);
			setIsShowForm(false);
		}
	};
	return (
		<div className="container">
			<div className={cx("login-form",  "mx-auto margin-b-3")} id="login-form" style={{ backgroundImage: `url(${loginBackground.src})` }}>
			{!isSuccess && !isError && <h5>Please get in touch with us at Digital Garden to access case study</h5>}
			{
				<Formik
					initialValues={{
						name: '',
						email: '',
						company: '',
					}}
					validationSchema={validate}
					onSubmit={(values, actions) => {
						handleSubmit(values, actions);
					}}>
					{(formik) => (
						<Form>
							<div className={cx('login-form-container', {'hidden' : !isShowForm})}>
								<div className={cx("login-form-wrapper")}>
									<TextField label="Name *" name="name" type="text" />
									<TextField label="Email *" name="email" type="email" />
									<TextField label="Company Name *" name="company" type="text" />
								</div>

								<button disabled={mutation.isLoading} className={cx("btn-submit")} type="submit" data-cursor-type="none">
									<div className={cx("btn-inner")}>
										{mutation.isLoading ? (
											<span>
												Submitting <BeatLoader color="#fff" size={5} margin={3} />
											</span>
										) : (
											'Submit'
										)}
									</div>
								</button>
							</div>
						</Form>
					)}
				</Formik>
			}
			{!isShowForm && isError && <LoginError message={message ? message : undefined} setIsShowForm={setIsShowForm} setIsError={setIsError} />}

			{!isShowForm && isSuccess && <LoginSuccess />}
			</div>
		</div>
	);
};

export default LoginForm;
