import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContactFilter.module.css';

const ContactFilter = ({ value, onChange }) => {
  return (
    <label>
      <input
        type="text"
        value={value}
        className={styles.ContactFilterInput}
        placeholder={'..to Find'}
        onChange={onChange}
      />
    </label>
  );
};

ContactFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ContactFilter;
