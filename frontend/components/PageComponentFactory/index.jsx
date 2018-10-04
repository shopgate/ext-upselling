import React, { Component } from 'react';

/* eslint-disable react/prefer-stateless-function */
/**
 * Page component factory.
 * Helper factory for Routes.
 * @param {function} View View component.
 * @param {function} ComponentProto Page component.
 * @returns {function}
 */
const pageComponentFactory = ({ View, ComponentProto }) => (
  class extends Component {
    /**
     * Renders.
     * @returns {JSX}
     */
    render() {
      return (
        <ComponentProto View={View} />
      );
    }
  }
);
/* eslint-enable react/prefer-stateless-function */
export default pageComponentFactory;
