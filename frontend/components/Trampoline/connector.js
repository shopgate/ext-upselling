import { connect } from 'react-redux';
import { getHistoryPathname } from '@shopgate/pwa-common/selectors/history';
import replaceHistory from '@shopgate/pwa-common/actions/history/replaceHistory';
import Trampoline from '../../components/Trampoline';

/**
 * Maps state to props.
 * @param {Object} state State.
 * @returns {Object}
 */
const mapStateToProps = state => ({
  redirectTo: getHistoryPathname(state).replace(Trampoline.TRAMPOLINE_PATH, ''),
});

/**
 * Maps dispatch to props.
 * @param {function} dispatch Dispatch.
 * @returns {Object}
 */
const mapDispatchToProps = dispatch => ({
  redirect: redirectTo => dispatch(replaceHistory({ pathname: redirectTo })),
});

export default connect(mapStateToProps, mapDispatchToProps);
