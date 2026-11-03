import React from 'react';
import PropTypes from 'prop-types';
import Card from '@shopgate/engage/components/Card';
import { makeStyles, keyframes } from '@shopgate/engage/styles';

const DEFAULT_TITLE_ROWS = 2;

const placeholderCycle = keyframes({
  '0%': {
    backgroundPosition: '-240% 0',
  },
  '100%': {
    backgroundPosition: '240% 0',
  },
});

const useStyles = makeStyles()((theme, { titleRows, hideName, hidePrice }) => {
  const glow = theme.alpha(theme.palette.background.surface, 0.35);
  const band = theme.alpha(theme.palette.grey.medium, 0.4);

  return {
    root: {
      height: '100%',
      position: 'relative',
      // Glow animation
      '&:after': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        background: `linear-gradient(to right, transparent 0%, ${glow} 29%, ${glow} 70%, transparent 100%)`,
        backgroundSize: '60% 100%',
        backgroundRepeat: 'no-repeat',
        animation: `${placeholderCycle} 1s infinite`,
        transform: 'translate3d(0,0,0)',
      },
    },
    image: {
      display: 'block',
      width: '100%',
      background: theme.alpha(theme.palette.grey.medium, 0.2),
    },
    details: {
      padding: theme.components.productCard.textPadding,
      lineHeight: 1.35,
    },
    paragraph: {
      display: 'grid',
      background: `linear-gradient(to bottom, transparent 0%, transparent 20%, ${band} 20.1%, ${band} 80%, transparent 80.1%, transparent 100%) repeat`,
      backgroundSize: `100% ${100 / titleRows}%`,
      gridTemplateRows: hideName ? '0' : `repeat(${titleRows}, 1fr)`,
      // Reserve the space of the price line.
      marginBottom: hidePrice ? 0 : '1.8em',
      color: 'transparent',
      fontSize: theme.typography.body2.fontSize,
      fontWeight: theme.typography.fontWeightMedium,
      lineHeight: 1.15,
      marginTop: 1,
    },
  };
});

/**
 * Placeholder card which is shown while the product data is loading.
 * @param {Object} props Props.
 * @param {number|null} props.titleRows Expected title rows.
 * @param {boolean} props.hideName Hide name.
 * @param {boolean} props.hidePrice Hide price.
 * @param {Object} [props.style] Optional inline styles.
 * @returns {JSX}
 */
const PlaceholderCard = ({
  titleRows,
  hideName,
  hidePrice,
  style,
}) => {
  const { classes } = useStyles({
    titleRows: titleRows || DEFAULT_TITLE_ROWS,
    hideName,
    hidePrice,
  });

  return (
    <Card className={classes.root} style={style} data-test-id="upselling-placeholder">
      <div data-test-id="upselling-placeholder-image">
        <img
          alt=""
          className={classes.image}
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAbgAAAG4CAQAAACdwzo4AAADg0lEQVR42u3TMQ0AAAzDsJU/6f0F0MuGECk5YCYSgOHAcIDhwHCA4cBwYDjAcGA4wHBgODAcYDgwHGA4MBxgODAcGA4wHBgOMBwYDgwHGA4MBxgODAcYDgwHhgMMB4YDDAeGA8MBhgPDAYYDwwGGA8OB4QDDgeEAw4HhwHCA4cBwgOHAcGA4wHBgOMBwYDjAcGA4MBxgODAcYDgwHBgOMBwYDjAcGA4wHBgODAcYDgwHGA4MB4YDDAeGAwwHhgMMB4YDwwGGA8MBhgPDgeEAw4HhAMOB4cBwgOHAcIDhwHCA4cBwYDjAcGA4wHBgODAcYDgwHGA4MBxgODAcGA4wHBgOMBwYDgwHGA4MBxgODAcYDgwHhgMMB4YDDAeGA8MBhgPDAYYDw4HhAMOB4QDDgeEAw4HhwHCA4cBwgOHAcGA4wHBgOMBwYDjAcGA4MBxgODAcYDgwHBgOMBwYDjAcGA4wHBgODAcYDgwHGA4MB4YDDAeGAwwHhgPDAYYDwwGGA8MBhgPDgeEAw4HhAMOB4cBwgOHAcIDhwHCA4cBwYDjAcGA4wHBgODAcYDgwHGA4MBxgODAcGA4wHBgOMBwYDgwHGA4MBxgODAeGAwwHhgMMB4YDDAeGA8MBhgPDAYYDw4HhAMOB4QDDgeEAw4HhwHCA4cBwgOHAcGA4wHBgOMBwYDjAcGA4MBxgODAcYDgwHBgOMBwYDjAcGA4MJwEYDgwHGA4MBxgODAeGAwwHhgMMB4YDwwGGA8MBhgPDAYYDw4HhAMOB4QDDgeHAcIDhwHCA4cBwgOHAcGA4wHBgOMBwYDgwHGA4MBxgODAcYDgwHBgOMBwYDjAcGA4MBxgODAcYDgwHhgMMB4YDDAeGAwwHhgPDAYYDwwGGA8OB4QDDgeEAw4HhAMOB4cBwgOHAcIDhwHBgOMBwYDjAcGA4wHBgODAcYDgwHGA4MBwYDjAcGA4wHBgODAcYDgwHGA4MBxgODAeGAwwHhgMMB4YDwwGGA8MBhgPDAYYDw4HhAMOB4QDDgeHAcIDhwHCA4cBwgOHAcGA4wHBgOMBwYDgwHGA4MBxgODAcGA4wHBgOMBwYDjAcGA4MBxgODAcYDgwHhgMMB4YDDAeGAwwHhgPDAYYDwwGGA8OB4QDDgeEAw4HhAMOB4cBwgOHAcIDhwHBgOMBwYDjAcGA4MBxgODAcYDgwHNAedDYBuQI5h3IAAAAASUVORK5CYII="
        />
      </div>
      {!(hideName && hidePrice) && (
        <div className={classes.details} data-test-id="upselling-placeholder-details">
          <div className={classes.paragraph} aria-hidden>
            .
          </div>
        </div>
      )}
    </Card>
  );
};

PlaceholderCard.propTypes = {
  hideName: PropTypes.bool.isRequired,
  hidePrice: PropTypes.bool.isRequired,
  style: PropTypes.shape(),
  titleRows: PropTypes.number,
};

PlaceholderCard.defaultProps = {
  style: null,
  titleRows: null,
};

export default PlaceholderCard;
