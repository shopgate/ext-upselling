import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getProductRelationsAction from '@shopgate/pwa-common-commerce/product/actions/getProductRelations';
import { getRelatedProductsFiltered } from '../../selectors';
import DefaultSlider from './components/DefaultSlider';
import getStyles from '../../styles/slider';

const styles = getStyles();

class Slider extends Component {
  static propTypes = {
    productId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    headline: PropTypes.string,
    showName: PropTypes.bool,
    showPrice: PropTypes.bool,
  };

  static defaultProps = {
    headline: null,
    showName: false,
    showPrice: false,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getProductRelationsAction({
      productId: this.props.productId,
      type: this.props.type,
    }));
  }

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

const mapStateToProps = (state, props) => ({
  products: getRelatedProductsFiltered({
    productId: props.productId,
    type: props.type,
  })(state),
});

export default connect(mapStateToProps)(Slider);
