import React from 'react';
import PropTypes from 'prop-types';
import styles from './style';

/**
 * Placeholder card.
 * @param {number} titleRows Expected title rows.
 * @param {boolean} hideName Hide name.
 * @param {boolean} hidePrice Hide price.
 * @returns {JSX}
 */
const PlaceholderCard = ({ titleRows, hideName, hidePrice }) => (
  <div className={styles.wrapper}>
    <div data-test-id="upselling-placeholder-image">
      <img
        alt=""
        className={styles.image}
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAbgAAAG4CAQAAACdwzo4AAADg0lEQVR42u3TMQ0AAAzDsJU/6f0F0MuGECk5YCYSgOHAcIDhwHCA4cBwYDjAcGA4wHBgODAcYDgwHGA4MBxgODAcGA4wHBgOMBwYDgwHGA4MBxgODAcYDgwHhgMMB4YDDAeGA8MBhgPDAYYDwwGGA8OB4QDDgeEAw4HhwHCA4cBwgOHAcGA4wHBgOMBwYDjAcGA4MBxgODAcYDgwHBgOMBwYDjAcGA4wHBgODAcYDgwHGA4MB4YDDAeGAwwHhgMMB4YDwwGGA8MBhgPDgeEAw4HhAMOB4cBwgOHAcIDhwHCA4cBwYDjAcGA4wHBgODAcYDgwHGA4MBxgODAcGA4wHBgOMBwYDgwHGA4MBxgODAcYDgwHhgMMB4YDDAeGA8MBhgPDAYYDw4HhAMOB4QDDgeEAw4HhwHCA4cBwgOHAcGA4wHBgOMBwYDjAcGA4MBxgODAcYDgwHBgOMBwYDjAcGA4wHBgODAcYDgwHGA4MB4YDDAeGAwwHhgPDAYYDwwGGA8MBhgPDgeEAw4HhAMOB4cBwgOHAcIDhwHCA4cBwYDjAcGA4wHBgODAcYDgwHGA4MBxgODAcGA4wHBgOMBwYDgwHGA4MBxgODAeGAwwHhgMMB4YDDAeGA8MBhgPDAYYDw4HhAMOB4QDDgeEAw4HhwHCA4cBwgOHAcGA4wHBgOMBwYDjAcGA4MBxgODAcYDgwHBgOMBwYDjAcGA4MJwEYDgwHGA4MBxgODAeGAwwHhgMMB4YDwwGGA8MBhgPDAYYDw4HhAMOB4QDDgeHAcIDhwHCA4cBwgOHAcGA4wHBgOMBwYDgwHGA4MBxgODAcYDgwHBgOMBwYDjAcGA4MBxgODAcYDgwHhgMMB4YDDAeGAwwHhgPDAYYDwwGGA8OB4QDDgeEAw4HhAMOB4cBwgOHAcIDhwHBgOMBwYDjAcGA4wHBgODAcYDgwHGA4MBwYDjAcGA4wHBgODAcYDgwHGA4MBxgODAeGAwwHhgMMB4YDwwGGA8MBhgPDAYYDw4HhAMOB4QDDgeHAcIDhwHCA4cBwgOHAcGA4wHBgOMBwYDgwHGA4MBxgODAcGA4wHBgOMBwYDjAcGA4MBxgODAcYDgwHhgMMB4YDDAeGAwwHhgPDAYYDwwGGA8OB4QDDgeEAw4HhAMOB4cBwgOHAcIDhwHBgOMBwYDjAcGA4MBxgODAcYDgwHNAedDYBuQI5h3IAAAAASUVORK5CYII="
      />
    </div>
    {!(hideName && hidePrice) &&
      <div className={styles.details} data-test-id="upselling-placeholder-details">
        <div
          className={[
            styles.paragraph(titleRows, hideName, hidePrice),
            styles.title,
          ].join(' ')}
          aria-hidden
        >
          .
        </div>
      </div>
    }
  </div>
);

PlaceholderCard.propTypes = {
  hideName: PropTypes.bool.isRequired,
  hidePrice: PropTypes.bool.isRequired,
  titleRows: PropTypes.number.isRequired,
};

export default PlaceholderCard;
