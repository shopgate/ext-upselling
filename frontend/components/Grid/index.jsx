import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getProductRelationsAction from '@shopgate/pwa-common-commerce/product/actions/getProductRelations';
import GridComponent from '@shopgate/pwa-common/components/Grid';
import {
  getProductRelationsFiltered,
  getRelatedProductsByIdFiltered,
} from '../../selectors';
import styles from '../../styles/grid';
import Item from '../Item';

const REQUEST_TIMEOUT = 2000;

/**
 * Grid component. Takes productId, type and additional props and renders Slider with real
 * products.
 */
class Grid extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    productId: PropTypes.string.isRequired,
    productIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    type: PropTypes.string.isRequired,
    headline: PropTypes.string,
    itemsPerLine: PropTypes.number,
    products: PropTypes.shape({}),
    showName: PropTypes.bool,
    showPrice: PropTypes.bool,
    titleRows: PropTypes.number,
  };

  static defaultProps = {
    headline: null,
    itemsPerLine: 3,
    products: [],
    showName: false,
    showPrice: false,
    titleRows: 2,
  };

  /**
   * Constructor.
   * @inheritDoc
   */
  constructor(props) {
    super(props);
    this.destroyPlaceHolderTimeout = setTimeout(this.checkDestroyPlaceholders, REQUEST_TIMEOUT);
    this.state = {
      destroyPlaceHolders: false,
    };
  }

  /**
   * Fetches the products on component did mount.
   */
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getProductRelationsAction({
      productId: this.props.productId,
      type: this.props.type,
    }));
  }

  /**
   * Checks if destroyPlaceHolderTimeout can be cleared
   * @param {Object} nextProps New props coming in.
   */
  componentWillReceiveProps(nextProps) {
    const nextAvailableProductIds = nextProps.productIds.filter(id => nextProps.products[id]);
    if (nextAvailableProductIds.length === nextProps.productIds.length) {
      clearTimeout(this.destroyPlaceHolderTimeout);
    }
  }

  /**
   * Sets destroyPlaceHolders state to true if there are more product ids than products
   */
  checkDestroyPlaceholders = () => {
    const availableProductIds = this.props.productIds.filter(id => this.props.products[id]);
    if (availableProductIds.length < this.props.productIds.length) {
      this.setState({ destroyPlaceHolders: true });
    }
  }

  /**
   * Renders.
   * @returns {JSX}
   */
  render() {
    const productIdsToUse = this.state.destroyPlaceHolders
      ? this.props.productIds.filter(id => this.props.products[id])
      : this.props.productIds;

    if (!productIdsToUse.length) {
      return null;
    }

    return (
      <div className={styles.wrapper}>
        {this.props.headline && <h3 className={styles.headline}>{this.props.headline}</h3> }
        <GridComponent className={styles.wrapper} wrap key={`product-relation-grid-${productIdsToUse.length}`}>
          {
            productIdsToUse.map((id) => {
              const product = this.props.products[id];
              const key = product ? `product-${id}` : `placeholder-${id}`;

              return (
                <GridComponent.Item
                  key={key}
                  className={styles.item(this.props.itemsPerLine)}
                >
                  <Item
                    product={product}
                    showPrice={this.props.showPrice}
                    showName={this.props.showName}
                    titleRows={this.props.titleRows}
                  />
                </GridComponent.Item>
              );
            })
          }
        </GridComponent>
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
  return {
    productIds: getProductRelationsFiltered(params)(state),
    products: getRelatedProductsByIdFiltered(params)(state),
  };
};

export default connect(mapStateToProps)(Grid);
