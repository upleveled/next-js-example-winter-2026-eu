'use client';

import { useState, useSyncExternalStore } from 'react';
import { parseJsonFeatureBanner } from '../util/json';

const localStorageKey = 'featureBannerIsHidden';

const emptySubscribe = () => () => {};

export default function FeatureBanner() {
  const isHiddenFromLocalStorage = useSyncExternalStore(
    // No need to subscribe to changes, because we will update the state
    emptySubscribe,
    // On client, hide only if localStorage value is `true`
    () =>
      parseJsonFeatureBanner(window.localStorage.getItem(localStorageKey)) ===
      true,
    // On server, hide to avoid FOUC
    () => true,
  );

  // // If your state variable has 2 possible types,
  // // you can pass in the possible types in angle
  // // brackets
  // const [isHidden, setIsHidden] = useState<boolean | undefined>();

  const [isHidden, setIsHidden] = useState(false);

  return (
    !isHiddenFromLocalStorage &&
    !isHidden && (
      <div
        style={{
          backgroundColor: '#dd6666',
          padding: '20px',
          justifyContent: 'space-between',
          display: 'flex',
        }}
      >
        <div>Learn about our new widget features</div>
        <button
          onClick={() => {
            // Hide the banner immediately
            setIsHidden(true);
            // Save `featureBannerIsHidden=true` in localStorage
            // to hide the banner on reload
            window.localStorage.setItem(localStorageKey, JSON.stringify(true));
          }}
        >
          ×
        </button>
      </div>
    )
  );
}
