import React, {
  useState,
  useRef,
  InputHTMLAttributes,
  ClassAttributes,
  TextareaHTMLAttributes,
} from 'react'
import * as Yup from 'yup'
import { Formik, Form, ErrorMessage, useField, FormikHelpers, FieldHookConfig } from 'formik'
import { useMutation } from 'react-query'
import { BeatLoader } from 'react-spinners'
import ErrorIcon from '@components/icons/ErrorIcon'
import ReCAPTCHA from 'react-google-recaptcha'
import { sendContactDetail } from '@lib/api/contact.service'
import classNames from 'classnames/bind'

import styles from './ContactForm.module.scss'

const cx = classNames.bind(styles)

type TextFieldProps = {
  label: string
}

export const TextField = ({
  label,
  ...props
}: TextFieldProps &
  InputHTMLAttributes<HTMLInputElement> &
  ClassAttributes<HTMLInputElement> &
  FieldHookConfig<string>) => {
  const [field, meta] = useField(props)

  return (
    <div className={cx('contact-form-field', 'text-field')}>
      <label htmlFor={field.name}>{label}</label>
      <input
        className={cx('form-control', { 'is-invalid': meta.touched && meta.error })}
        {...field}
        {...props}
        autoComplete="off"
        data-cursor-type="none"
      />
      <ErrorMessage name={field.name}>
        {(msg) => (
          <div className={cx('error')}>
            <ErrorIcon />
            <span className={cx('error-message')}>{msg}</span>
          </div>
        )}
      </ErrorMessage>
    </div>
  )
}

export const TextArea = ({
  label,
  ...props
}: TextFieldProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> &
  ClassAttributes<HTMLTextAreaElement> &
  FieldHookConfig<string>) => {
  const [field, meta] = useField<any>(props)
  return (
    <div className={cx('contact-form-field', 'text-area')}>
      <label htmlFor={field.name}>{label}</label>
      <textarea
        className={cx('form-control', { 'is-invalid': meta.touched && meta.error })}
        {...field}
        {...props}
        autoComplete="off"
        data-cursor-type="none"
      />
      <ErrorMessage name={field.name}>
        {(msg) => (
          <div className={cx('error')}>
            <ErrorIcon />
            <span className={cx('error-message')}>{msg}</span>
          </div>
        )}
      </ErrorMessage>
    </div>
  )
}


const FILE_SIZE = 10 * 1024 * 1024
const SUPPORTED_FORMATS = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'application/pdf',
  'application/doc',
  'application/docx',
  'application/xlxs',
  'application/xls',
  'application/pptx',
]

const ContactForm = () => {

  const SITE_KEY = process.env.NEXT_PUBLIC_SITE_KEY || ''

  const validate = Yup.object({
    name: Yup.string().required('Name is required'),
    company: Yup.string().required('Company is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    message: Yup.string().required('Message is required'),
    recaptcha: Yup.string().required('reCAPTCHA is required'),
    attachment: Yup.mixed()
      .notRequired()
      .nullable()
      .test('fileSize', 'This file is too large to upload. The maximum supported file size is 10 MB', (value) => {
        if (value) {
          return value.size <= FILE_SIZE
        } else return true
      })
      .test(
        'fileFormat',
        'Unsupported Format. Allowed file types: doc, docx, jpg, jpeg, png, pdf, pptx, xls, xlxs.',
        (value) => {
          if (value) {
            return SUPPORTED_FORMATS.includes(value.type)
          } else return true
        }
      ),
  })

  const mutation = useMutation((data: any) => sendContactDetail(data))

  const [message, setMessage] = useState('')
  const [isShowForm, setIsShowForm] = useState(true)

  const recaptchaRef = useRef<any>(null)
  const attachmentRef = useRef<HTMLInputElement>(null)
  const formTitleRef = useRef<HTMLHeadingElement>(null)

  const handleSubmit = async (
    values: any,
    actions: FormikHelpers<{
      name: string
      email: string
      company: string
      phone: string
      budget: string
      message: string
      attachment: any
      recaptcha: string
    }>
  ) => {
    setMessage('')
    try {
      let formData = new FormData()
      formData.append('name', values.name)
      formData.append('company_name', values.company)
      formData.append('email', values.email)
      formData.append('phone', values.phone)
      formData.append('budget', values.budget)
      formData.append('message', values.message)
      formData.append('attachment', values.attachment)

      const response = await mutation.mutateAsync(formData)
      if (response) {
        setMessage('Thank you. We’ll be in touch shortly.')
        setIsShowForm(false)
        actions.resetForm()
        recaptchaRef.current?.reset()
        if (attachmentRef.current?.value) attachmentRef.current.value = ''
        formTitleRef.current?.classList.add('hidden')
      }
    } catch (error) {
      console.log(error)
      setMessage('Oops, something went wrong while submitting the form.')
      setIsShowForm(false)
      recaptchaRef.current?.reset()
    }
  }

  return (
    <div className={cx('contact-form', 'container padding-v-5')} id="contact-form">
      <h3 className={cx('contact-form-title')} ref={formTitleRef}>
        Tell us a bit about your project
      </h3>
      {
        <Formik
          initialValues={{
            name: '',
            email: '',
            company: '',
            phone: '',
            budget: '',
            message: '',
            attachment: undefined,
            recaptcha: '',
          }}
          validationSchema={validate}
          onSubmit={(values, actions) => {
            handleSubmit(values, actions)
          }}
        >
          {(formik) => (
            <Form>
              <div className={cx('contact-form-container', { hidden: !isShowForm })}>
                <div className={cx('contact-form-wrapper')}>
                  <div className={cx('contact-form-left-column')}>
                    <TextField label="Name *" name="name" type="text" />
                    <TextField label="Company Name *" name="company" type="text" />
                    <TextField label="Email *" name="email" type="email" />
                    <TextField label="Phone Number" name="phone" type="text" />
                    <TextField label="Budget" name="budget" type="text" />
                  </div>
                  <div className={cx('contact-form-right-column')}>
                    <TextArea label="Message *" name="message" />

                    <div className={cx('contact-form-field', 'attachment')} data-cursor-type="none">
                      <label htmlFor="file">Attachment</label>
                      <input
                        ref={attachmentRef}
                        id="attachment"
                        name="attachment"
                        type="file"
                        style={{ width: '100%' }}
                        onChange={(event) => {
                          formik.setFieldValue(
                            'attachment',
                            event?.currentTarget?.files && event.currentTarget.files[0]
                          )
                        }}
                      />

                      {formik.errors.attachment && (
                        <div className={cx('error')}>
                          <ErrorIcon />
                          <span className={cx('error-message')}>{formik.errors.attachment}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className={cx('contact-form-recaptcha')} data-cursor-type="none">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={SITE_KEY}
                    onChange={(value) => {
                      formik.setFieldValue('recaptcha', value)
                    }}
                  />
                  <ErrorMessage name="recaptcha">
                    {(msg) => (
                      <div className={cx('error')}>
                        <ErrorIcon />
                        <span className={cx('error-message')}>{msg}</span>
                      </div>
                    )}
                  </ErrorMessage>
                </div>

                <button
                  disabled={mutation.isLoading}
                  className={cx('btn-contact-submit')}
                  type="submit"
                  data-cursor-type="none"
                >
                  <div className={cx('btn-inner')}>
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
      {!isShowForm && message && (
        <div className={cx('form-response')}>
          <h4 className={cx('message')}>{message}</h4>
          <button
            className={cx('btn-contact-submit')}
            onClick={() => {
              setIsShowForm(true)
              formTitleRef?.current?.classList.remove('hidden')
            }}
            data-cursor-type="none"
          >
            Back
          </button>
        </div>
      )}
    </div>
  )
}

export default ContactForm
