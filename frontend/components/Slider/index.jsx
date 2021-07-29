import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchProductRelations from '@shopgate/pwa-common-commerce/product/actions/fetchProductRelations';
import {
  getProductRelationsFiltered,
  getProductRelationIdsFromProperty,
  getProductsDataFromProperty,
  getRelatedProductsByIdFiltered,
} from '../../selectors';
import DefaultSlider from './components/DefaultSlider';
import getStyles from '../../styles/slider';
import { TYPE_PROPERTY } from '../../helpers/constants';

const styles = getStyles();

/**
 * Slider component. Takes productId, type and additional props and renders Slider with real
 * products.
 */
class Slider extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    productId: PropTypes.string.isRequired,
    productIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    type: PropTypes.string.isRequired,
    headline: PropTypes.string,
    products: PropTypes.shape({}),
    showName: PropTypes.bool,
    showPrice: PropTypes.bool,
    titleRows: PropTypes.number,
  }

  static defaultProps = {
    headline: null,
    products: [],
    showName: false,
    showPrice: false,
    titleRows: 2,
  };

  /**
   * @inheritDoc
   */
  constructor(props) {
    super(props);
    this.placeholderTimeout = undefined;
    this.state = {
      allowPlaceholders: true,
    };
    this.fatal = false;
  }

  /**
   * Fetches the products on component did mouont.
   */
  componentDidMount() {
    const { dispatch } = this.props;
    if (this.props.type !== TYPE_PROPERTY) {
      dispatch(fetchProductRelations({
        productId: this.props.productId,
        type: this.props.type,
      }));
    }
    this.placeholderTimeout = setTimeout(() => {
      this.setState({
        allowPlaceholders: false,
      });
    }, 3000);
  }

  /**
   * @inheritDoc
   */
  componentWillUnmount() {
    clearTimeout(this.placeholderTimeout);
  }

  /**
   * Renders.
   * @returns {JSX}
   */
  render() {
    if (this.fatal || !this.props.productIds.length) {
      return null;
    }

    let availableProductIds = this.props.productIds;
    if (this.state.allowPlaceholders === false) {
      availableProductIds = this.props.productIds.filter(id => this.props.products[id]);

      if (availableProductIds.length === 0) {
        // Should never happen in real life. But if after timeout, there's still not even one
        // product available. Hide the whole thing and behave like it never happened.
        this.fatal = true;
        return null;
      }
    }

    return (
      <div className={styles.wrapper}>
        {this.props.headline && <h3 className={`${styles.headline} headline`}>{this.props.headline}</h3> }
        <DefaultSlider
          products={this.props.products}
          productIds={availableProductIds}
          showPrice={this.props.showPrice}
          showName={this.props.showName}
          titleRows={this.props.titleRows}
          allowPlaceholders={this.state.allowPlaceholders}
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
const mapStateToProps = (state, props) => {
  const params = {
    productId: props.productId,
    type: props.type,
  };

  if (params.type === TYPE_PROPERTY) {
    return {
      productIds: getProductRelationIdsFromProperty(state, props),
      products: getProductsDataFromProperty(state, props),
    };
  }

  return {
    productIds: getProductRelationsFiltered(params)(state),
    products: getRelatedProductsByIdFiltered(params)(state),
  };
};

export default connect(mapStateToProps)(Slider);
