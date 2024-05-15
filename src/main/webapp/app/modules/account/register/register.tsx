import React, { useState, useEffect } from 'react';
import { ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { Row, Col, Alert, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { handleRegister, reset } from './register.reducer';

export const RegisterPage = () => {
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  useEffect(
    () => () => {
      dispatch(reset());
    },
    [],
  );

  const handleValidSubmit = ({
    username,
    email,
    firstPassword,
    firstName,
    lastName,
    dateOfBirth,
    houseNumber,
    street,
    apartmentNumber,
    city,
    state,
    zip,
  }) => {
    // console.log(firstName, lastName);
    dispatch(
      handleRegister({
        login: username,
        email,
        password: firstPassword,
        firstName,
        lastName,
        dateOfBirth,
        langKey: 'en',
        address: {
          houseNumber,
          street,
          apartmentNumber: apartmentNumber || null,
          city,
          state,
          zip,
        },
      }),
    );
  };

  const updatePassword = event => setPassword(event.target.value);

  const successMessage = useAppSelector(state => state.register.successMessage);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h1 id="register-title" data-cy="registerTitle">
            Registration
          </h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          <ValidatedForm id="register-form" onSubmit={handleValidSubmit}>
            <ValidatedField
              name="username"
              label="Username"
              placeholder="Your username"
              validate={{
                required: { value: true, message: 'Your username is required.' },
                pattern: {
                  value: /^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$/,
                  message: 'Your username is invalid.',
                },
                minLength: { value: 1, message: 'Your username is required to be at least 1 character.' },
                maxLength: { value: 50, message: 'Your username cannot be longer than 50 characters.' },
              }}
              data-cy="username"
            />
            <ValidatedField
              name="email"
              label="Email"
              placeholder="Your email"
              type="email"
              validate={{
                required: { value: true, message: 'Your email is required.' },
                minLength: { value: 5, message: 'Your email is required to be at least 5 characters.' },
                maxLength: { value: 254, message: 'Your email cannot be longer than 50 characters.' },
                validate: v => isEmail(v) || 'Your email is invalid.',
              }}
              data-cy="email"
            />
            <ValidatedField
              name="firstPassword"
              label="New password"
              placeholder="New password"
              type="password"
              onChange={updatePassword}
              validate={{
                required: { value: true, message: 'Your password is required.' },
                minLength: { value: 4, message: 'Your password is required to be at least 4 characters.' },
                maxLength: { value: 50, message: 'Your password cannot be longer than 50 characters.' },
              }}
              data-cy="firstPassword"
            />
            <PasswordStrengthBar password={password} />
            <ValidatedField
              name="secondPassword"
              label="New password confirmation"
              placeholder="Confirm the new password"
              type="password"
              validate={{
                required: { value: true, message: 'Your confirmation password is required.' },
                minLength: { value: 4, message: 'Your confirmation password is required to be at least 4 characters.' },
                maxLength: { value: 50, message: 'Your confirmation password cannot be longer than 50 characters.' },
                validate: v => v === password || 'The password and its confirmation do not match!',
              }}
              data-cy="secondPassword"
            />
            <ValidatedField
              name="firstName"
              label="First name"
              placeholder="First name"
              type="text"
              validate={{
                required: { value: true, message: 'Your first name is required.' },
              }}
              data-cy="firstName"
            />
            <ValidatedField
              name="lastName"
              label="Last name"
              placeholder="Last name"
              type="text"
              validate={{
                required: { value: true, message: 'Your last name is required.' },
              }}
              data-cy="lastName"
            />
            <ValidatedField
              name="dateOfBirth"
              label="Date of birth"
              placeholder="1970-01-01"
              type="date"
              validate={{
                required: { value: true, message: 'Your date of birth is required.' },
              }}
              data-cy="dateOfBirth"
            />
            <ValidatedField
              name="houseNumber"
              label="House Number"
              placeholder="0"
              type="number"
              validate={{
                required: { value: true, message: 'Your house number is required.' },
                min: 1,
              }}
              data-cy="houseNumber"
            />
            <ValidatedField
              name="street"
              label="Street"
              placeholder="Street"
              type="text"
              validate={{
                required: { value: true, message: 'Your Street Name is required.' },
                pattern: {
                  value: /^[a-zA-Z0-9\s]+?(St|Rd|Ave|Blvd|Cir|Dr|Pl|Sq)\.$/,
                  message: 'Your format is wrong, please use only letters and abbreviate Street type(ex: St. Rd.)',
                },
              }}
              data-cy="street"
            />
            <ValidatedField
              name="apartmentNumber"
              label="Apartment number"
              placeholder="0"
              type="number"
              validate={{
                min: 1,
              }}
              data-cy="apartmentNumber"
            />
            <ValidatedField
              name="city"
              label="City"
              placeholder="City"
              type="text"
              validate={{
                required: { value: true, message: 'Your city is required.' },
                pattern: { value: /[a-zA-Z]+/, message: 'Your city should be letters only.' },
              }}
              data-cy="city"
            />
            <ValidatedField
              name="state"
              label="State"
              placeholder="??"
              type="text"
              validate={{
                required: { value: true, message: 'Your state is required.' },
                pattern: { value: /[a-zA-Z]+/, message: 'Your state must be letters.' },
                maxLength: { value: 2, message: 'Please use a two-letter abbreviation.' },
                minLength: { value: 2, message: 'Please use a two-letter abbreviation.' },
              }}
              data-cy="state"
            />
            <ValidatedField
              name="zip"
              label="Zip code"
              placeholder="00000"
              type="number"
              validate={{
                required: { value: true, message: 'Your zip code is required.' },
                minLength: 5,
                maxLength: 5,
              }}
              data-cy="zip"
            />

            <Button id="register-submit" color="primary" type="submit" data-cy="submit">
              Register
            </Button>
          </ValidatedForm>
          <p>&nbsp;</p>
          <Alert color="warning">
            <span>If you want to </span>
            <Link to="/login" className="alert-link">
              sign in
            </Link>
            <span>
              , you can try the default accounts:
              <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;) <br />- User (login=&quot;user&quot; and
              password=&quot;user&quot;).
            </span>
          </Alert>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterPage;
