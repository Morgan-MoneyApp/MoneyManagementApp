import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './bank-account.reducer';

export const BankAccountDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const bankAccountEntity = useAppSelector(state => state.bankAccount.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="bankAccountDetailsHeading">Bank Account</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{bankAccountEntity.id}</dd>
          <dt>
            <span id="accountNumber">Account Number</span>
          </dt>
          <dd>{bankAccountEntity.accountNumber}</dd>
          <dt>
            <span id="routingNumber">Routing Number</span>
          </dt>
          <dd>{bankAccountEntity.routingNumber}</dd>
          <dt>
            <span id="balance">Balance</span>
          </dt>
          <dd>{bankAccountEntity.balance}</dd>
          <dt>
            <span id="type">Type</span>
          </dt>
          <dd>{bankAccountEntity.type}</dd>
          <dt>Account Holder</dt>
          <dd>{bankAccountEntity.accountHolder ? bankAccountEntity.accountHolder.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/bank-account" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/bank-account/${bankAccountEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default BankAccountDetail;
