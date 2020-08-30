import { push } from 'connected-react-router';
const config = {};

export function setNavigator(nav) {
  if (nav) {
    config.dispatch = nav;
  }
}
export function navigate(routeName, params) {
  if (config.dispatch && routeName) {
    if (routeName === 'WebView') {
      window.location.href = params.uri;
    } else {
      if (params) {
        config.dispatch(
          push({
            pathname: routeName,
            state: params
          })
        );
      } else {
        config.dispatch(push(routeName));
      }
    }
  }
}
