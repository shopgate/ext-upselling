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
    if (!this.props.productIds.length) {
      return null;
    }

    return (
      <div className={styles.wrapper}>
        {this.props.headline && <h3 className={styles.headline}>{this.props.headline}</h3> }
        <GridComponent className={styles.wrapper} wrap>
          {
            this.props.productIds.map((id) => {
              const product = this.props.products[id];
              const key = product ? `product-${id}` : `placeholder-${id}`;

              return (
                <GridComponent.Item key={key} className={styles.item(this.props.itemsPerLine)}>
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
