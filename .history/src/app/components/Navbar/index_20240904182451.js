"use client";

import React, { useState } from "react";
import classes from "./navbar.module.css";
import Modal from "../Modal";
import { authService } from "@/services/auth";
import { getUserData, removeUserData } from "../../../../utils/localstorage";

const NavbarCustom = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const userData = getUserData();

  const [formErrors, setFormErrors] = useState({});

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    setFormErrors({});
    setLoginForm({ email: "", password: "" });
  };

  const openSignupModal = () => setSignupModalOpen(true);
  const closeSignupModal = () => {
    setSignupModalOpen(false);
    setFormErrors({});
    setSignupForm({ name: "", email: "", password: "", confirmPassword: "" });
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleSignupInputChange = (e) => {
    const { name, value } = e.target;
    setSignupForm({ ...signupForm, [name]: value });
  };

  const validateLogin = () => {
    const errors = {};
    if (!loginForm.email) errors.email = "E-mail is required";
    if (!loginForm.password) errors.password = "Password is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateSignup = () => {
    const errors = {};
    if (!signupForm.name) errors.name = "Name is required";
    if (!signupForm.email) errors.email = "E-mail is required";
    if (!signupForm.password) errors.password = "Password is required";
    if (signupForm.password !== signupForm.confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (validateLogin()) {
      const payload = {
        identifier: loginForm.email,
        password: loginForm.password,
      };

      const user = await authService.login(payload);
      if (user.status === 200) {
        setUserData("user", JSON.stringify(user.data.data));
        // closeLoginModal();
      }
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (validateSignup()) {
      const payload = {
        name: loginForm.name,
        email: loginForm.email,
        password: loginForm.password,
      };

      const user = await authService.signUp(payload);
      if (user.status === 200) {
        setUserData("user", JSON.stringify(user.data.data));
        closeSignupModal();
      }
    }
  };

  console.log(`userData =>`, userData);

  return (
    <>
      <div className={classes.navbarContainer}>
        <div className={classes.brandBox}>
          <a>Property Listing</a>
        </div>
        <div className={classes.linksWrapper}>
          {!userData ? (
            <>
              <div className={classes.loginBtn} onClick={openLoginModal}>
                Login
              </div>
              <div className={classes.signupBtn} onClick={openSignupModal}>
                Sign up
              </div>
            </>
          ) : (
            <>
              userData?.user?.name
              <div className={classes.loginBtn} onClick={removeUserData}>
                Login
              </div>
            </>
          )}
        </div>
      </div>

      {/* Login Modal */}
      <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
        <div className={classes.modalHeader}>Login</div>
        <div className={classes.modalBody}>
          <form className={classes.formWrapper} onSubmit={handleLoginSubmit}>
            <div className={classes.inputWrapper}>
              <input
                type="email"
                name="email"
                className={classes.input}
                placeholder="E-mail"
                id="email"
                aria-label="E-mail"
                value={loginForm.email}
                onChange={handleLoginInputChange}
                required
              />
              {formErrors.email && (
                <span className={classes.errorText}>{formErrors.email}</span>
              )}
            </div>
            <div className={classes.inputWrapper}>
              <input
                type="password"
                name="password"
                className={classes.input}
                placeholder="Password"
                id="password"
                aria-label="Password"
                value={loginForm.password}
                onChange={handleLoginInputChange}
                required
              />
              {formErrors.password && (
                <span className={classes.errorText}>{formErrors.password}</span>
              )}
            </div>
            <label className={classes.mycheckbox}>
              <input type="checkbox" className={classes.checkBoxInput} />
              <span>
                <span> Remember Me </span>
              </span>
            </label>

            <div className={classes.signInForgotPass}>
              <button className={classes.signInBtn} type="submit">
                Login
              </button>
              <button className={classes.forgotBtn} type="button">
                Forget Password
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Signup Modal */}
      <Modal isOpen={isSignupModalOpen} onClose={closeSignupModal}>
        <div className={classes.modalHeader}>Signup</div>
        <div className={classes.modalBody}>
          <form className={classes.formWrapper} onSubmit={handleSignupSubmit}>
            <div className={classes.inputWrapper}>
              <input
                type="text"
                name="name"
                className={classes.input}
                placeholder="Name"
                id="name"
                aria-label="Name"
                value={signupForm.name}
                onChange={handleSignupInputChange}
                required
              />
              {formErrors.name && (
                <span className={classes.errorText}>{formErrors.name}</span>
              )}
            </div>
            <div className={classes.inputWrapper}>
              <input
                type="email"
                name="email"
                className={classes.input}
                placeholder="E-mail"
                id="email"
                aria-label="E-mail"
                value={signupForm.email}
                onChange={handleSignupInputChange}
                required
              />
              {formErrors.email && (
                <span className={classes.errorText}>{formErrors.email}</span>
              )}
            </div>
            <div className={classes.inputWrapper}>
              <input
                type="password"
                name="password"
                className={classes.input}
                placeholder="Password"
                id="password"
                aria-label="Password"
                value={signupForm.password}
                onChange={handleSignupInputChange}
                required
              />
              {formErrors.password && (
                <span className={classes.errorText}>{formErrors.password}</span>
              )}
            </div>
            <div className={classes.inputWrapper}>
              <input
                type="password"
                name="confirmPassword"
                className={classes.input}
                placeholder="Confirm Password"
                id="confirmPassword"
                aria-label="Confirm Password"
                value={signupForm.confirmPassword}
                onChange={handleSignupInputChange}
                required
              />
              {formErrors.confirmPassword && (
                <span className={classes.errorText}>
                  {formErrors.confirmPassword}
                </span>
              )}
            </div>
            <label className={classes.mycheckbox}>
              <input type="checkbox" className={classes.checkBoxInput} />
              <span>
                <span>
                  {" "}
                  By creating an account you agree on{" "}
                  <strong>Property Turkey</strong>
                </span>
              </span>
            </label>
            <div className={classes.signInForgotPass}>
              <button className={classes.signInBtn} type="submit">
                Register
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default NavbarCustom;
