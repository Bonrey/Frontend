import React from 'react';
import { Formik } from "formik";
import * as Yup from 'yup';
import { motion } from 'framer-motion';

import styles from "./Form.module.scss";
import {ReactComponent as ErrorIcon} from '../../assets/images/icon-error.svg';

const Form = () => {

  return (
    <div className={styles.Wrapper}>
      <header className={styles.FreeTrial}>
        <p>Try it free 7 days <span>then $20/mo. thereafter</span></p>
      </header>
      <Formik 
        initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
        validationSchema={Yup.object({
          firstName: Yup.string().max(15, "First Name must be 15 characters or less")
            .required("First Name cannot be empty"),
          lastName: Yup.string().max(20, "Last Name must be 20 characters or less")
            .required("Last Name cannot be empty"),
          email: Yup.string().email("Looks like this is not an email")
            .required("Email Address cannot be empty"),
          password: Yup.string().required("Password cannot be empty"),
        })}
        onSubmit={values => {
          alert(JSON.stringify(values, null, 4));
        }}
      >
        {formik => {
          const errors = {
            firstName: formik.touched.firstName && formik.errors.firstName,
            lastName: formik.touched.lastName && formik.errors.lastName,
            email: formik.touched.email && formik.errors.email,
            password: formik.touched.password && formik.errors.password
          }
          return (
            <form className={styles.Form} onSubmit={formik.handleSubmit}>
              <div className={styles.InputContainer}>
                <input
                  className={errors.firstName && styles.InputError}
                  type="text"
                  aria-label="Enter your first name"
                  placeholder="First Name"
                  {...formik.getFieldProps("firstName")}
                />
                {errors.firstName && <ErrorIcon />}
              </div>
              {errors.firstName && <p className={styles.ErrorMessage}>{formik.errors.firstName}</p>}
              <div className={styles.InputContainer}>
                <input
                  className={errors.lastName && styles.InputError}
                  type="text"
                  aria-label="Enter your last name"
                  placeholder="Last Name"
                  {...formik.getFieldProps("lastName")}
                />
                {formik.touched.lastName && formik.errors.lastName && <ErrorIcon />}
              </div>
              {formik.touched.lastName && formik.errors.lastName && 
                <p className={styles.ErrorMessage}>{formik.errors.lastName}</p>
              }
              <div className={styles.InputContainer}>
                <input
                  className={errors.email && styles.InputError}
                  type="text"
                  aria-label="Enter your email address"
                  placeholder="Email Address"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email && <ErrorIcon />}
              </div>
              {formik.touched.email && formik.errors.email &&
                <p className={styles.ErrorMessage}>{formik.errors.email}</p>
              }
              <div className={styles.InputContainer}>
                <input
                  className={errors.password && styles.InputError}
                  type="password"
                  aria-label="Enter the password"
                  placeholder="Password"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password && <ErrorIcon />}
              </div>
              {formik.touched.password && formik.errors.password && 
                <p className={styles.ErrorMessage}>{formik.errors.password}</p>
              }
              <motion.button 
                type="submit"
                whileHover={{ filter: "brightness(1.1)" }}
                whileTap={{ filter: "none", y: "0.125rem" }}
              >
                Claim your free trial
              </motion.button>
              <p className={styles.TermsAndServices}>
                By clicking the button, you are agreeing to our
                <span onClick={_ => window.location.reload()}>Terms and Services</span>
              </p>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}

export default Form;