import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IAddress } from 'app/shared/model/address.model';
import { getEntity, updateEntity, createEntity, reset } from './address.reducer';

export const AddressUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const addressEntity = useAppSelector(state => state.address.entity);
  const loading = useAppSelector(state => state.address.loading);
  const updating = useAppSelector(state => state.address.updating);
  const updateSuccess = useAppSelector(state => state.address.updateSuccess);

  const handleClose = () => {
    navigate('/address');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
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
    if (values.houseNumber !== undefined && typeof values.houseNumber !== 'number') {
      values.houseNumber = Number(values.houseNumber);
    }
    if (values.apartmentNumber !== undefined && typeof values.apartmentNumber !== 'number') {
      values.apartmentNumber = Number(values.apartmentNumber);
    }

    const entity = {
      ...addressEntity,
      ...values,
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
          ...addressEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="moneyappApp.address.home.createOrEditLabel" data-cy="AddressCreateUpdateHeading">
            Create or edit a Address
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="address-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="House Number"
                id="address-houseNumber"
                name="houseNumber"
                data-cy="houseNumber"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  min: { value: 1, message: 'This field should be at least 1.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Street"
                id="address-street"
                name="street"
                data-cy="street"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  pattern: {
                    value: /[a-zA-Z]+\s(St|Rd|Ave|Blvd|Cir|Dr|Pl|Sq)./,
                    message: 'This field should follow pattern for [a-zA-Z]+\\s(St|Rd|Ave|Blvd|Cir|Dr|Pl|Sq).',
                  },
                }}
              />
              <ValidatedField
                label="Apartment Number"
                id="address-apartmentNumber"
                name="apartmentNumber"
                data-cy="apartmentNumber"
                type="text"
                validate={{
                  min: { value: 1, message: 'This field should be at least 1.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="City"
                id="address-city"
                name="city"
                data-cy="city"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  pattern: { value: /[a-zA-Z]+/, message: 'This field should follow pattern for [a-zA-Z].' },
                }}
              />
              <ValidatedField
                label="State"
                id="address-state"
                name="state"
                data-cy="state"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  pattern: { value: /[a-zA-Z]{2}/, message: translate('entity.validation.pattern', { pattern: '[a-zA-Z]{2}' }) },
                }}
              />
              <ValidatedField
                label="Zip"
                id="address-zip"
                name="zip"
                data-cy="zip"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  pattern: { value: /[0-9]{5}/, message: translate('entity.validation.pattern', { pattern: '[0-9]{5}' }) },
                }}
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/address" replace color="info">
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

export default AddressUpdate;
