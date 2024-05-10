import userProfile from 'app/entities/user-profile/user-profile.reducer';
import address from 'app/entities/address/address.reducer';
import bankAccount from 'app/entities/bank-account/bank-account.reducer';
import transaction from 'app/entities/transaction/transaction.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  userProfile,
  address,
  bankAccount,
  transaction,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
