import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getProductRelationsAction from '@shopgate/pwa-common-commerce/product/actions/getProductRelations';
import { getRelatedProductsFiltered } from '../../selectors';
import DefaultSlider from './components/DefaultSlider';
import getStyles from '../../styles/slider';

const styles = getStyles();

/**
 * Slider component. Takes productId, type and additional props and renders Slider with real
 * products.
 */
class Slider extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    productId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    headline: PropTypes.string,
    products: PropTypes.arrayOf(PropTypes.shape({})),
    showName: PropTypes.bool,
    showPrice: PropTypes.bool,
  };

  static defaultProps = {
    headline: null,
    products: [],
    showName: false,
    showPrice: false,
  };

  /**
   * Fetches the products on component did mouont.
   */
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getProductRelationsAction({
      productId: this.props.productId,
      type: this.props.type,
    }));
  }

  /**
   * Renders.
   * @returns {JSX}
   */
  render() {
    if (!this.props.products.length) {
      return null;
    }

    return (
      <div className={styles.wrapper}>
        {this.props.headline && <h3 className={styles.headline}>{this.props.headline}</h3> }
        <DefaultSlider
          products={this.props.products}
          showPrice={this.props.showPrice}
          showName={this.props.showName}
        />
      </div>
    );
  }
}

/**
 * Returns products from redux.
 * @param {Object} state State.
 * @param {Object} props Props.
 * @returns {Object}
 */
const mapStateToProps = (state, props) => ({
  products: getRelatedProductsFiltered({
    productId: props.productId,
    type: props.type,
  })(state),
});

export default connect(mapStateToProps)(Slider);
