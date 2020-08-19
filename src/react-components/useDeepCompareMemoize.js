import {useMemo} from 'react';
import isEqual from 'lodash.isequal';

export default function useDeepCompareMemoize(value) {
  const getMemoized = useMemo(() => {
    let memoized;
    return current => {
      if (!isEqual(current, memoized)) {
        memoized = current;
      }
      return memoized;
    };
  }, []);
  return getMemoized(value);
}
