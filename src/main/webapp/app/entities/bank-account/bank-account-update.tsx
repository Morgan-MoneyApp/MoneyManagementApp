import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IUserProfile } from 'app/shared/model/user-profile.model';
import { getEntities as getUserProfiles } from 'app/entities/user-profile/user-profile.reducer';
import { IBankAccount } from 'app/shared/model/bank-account.model';
import { Type } from 'app/shared/model/enumerations/type.model';
import { getEntity, updateEntity, createEntity, reset } from './bank-account.reducer';

export const BankAccountUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const userProfiles = useAppSelector(state => state.userProfile.entities);
  const bankAccountEntity = useAppSelector(state => state.bankAccount.entity);
  const loading = useAppSelector(state => state.bankAccount.loading);
  const updating = useAppSelector(state => state.bankAccount.updating);
  const updateSuccess = useAppSelector(state => state.bankAccount.updateSuccess);
  const typeValues = Object.keys(Type);

  const handleClose = () => {
    navigate('/bank-account' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getUserProfiles({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    if (values.accountNumber !== undefined && typeof values.accountNumber !== 'number') {
      values.accountNumber = Number(values.accountNumber);
    }
    if (values.routingNumber !== undefined && typeof values.routingNumber !== 'number') {
      values.routingNumber = Number(values.routingNumber);
    }
    if (values.balance !== undefined && typeof values.balance !== 'number') {
      values.balance = Number(values.balance);
    }

    const entity = {
      ...bankAccountEntity,
      ...values,
      accountHolder: userProfiles.find(it => it.id.toString() === values.accountHolder?.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          type: 'CHECKING',
          ...bankAccountEntity,
          accountHolder: bankAccountEntity?.accountHolder?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="moneyappApp.bankAccount.home.createOrEditLabel" data-cy="BankAccountCreateUpdateHeading">
            Create or edit a Bank Account
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="bank-account-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Account Number"
                id="bank-account-accountNumber"
                name="accountNumber"
                data-cy="accountNumber"
                type="text"
                validate={{
                  min: { value: 0, message: 'This field should be at least 0.' },
                  max: { value: 999999999, message: 'This field cannot be more than 999999999.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Routing Number"
                id="bank-account-routingNumber"
                name="routingNumber"
                data-cy="routingNumber"
                type="text"
                validate={{
                  min: { value: 123456789, message: 'This field should be at least 123456789.' },
                  max: { value: 123456789, message: 'This field cannot be more than 123456789.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField label="Balance" id="bank-account-balance" name="balance" data-cy="balance" type="text" />
              <ValidatedField label="Type" id="bank-account-type" name="type" data-cy="type" type="select">
                {typeValues.map(type => (
                  <option value={type} key={type}>
                    {type}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                id="bank-account-accountHolder"
                name="accountHolder"
                data-cy="accountHolder"
                label="Account Holder"
                type="select"
              >
                <option value="" key="0" />
                {userProfiles
                  ? userProfiles.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/bank-account" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default BankAccountUpdate;
