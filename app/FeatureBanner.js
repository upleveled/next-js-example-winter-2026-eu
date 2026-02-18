'use client';

import { useEffect, useState } from 'react';
import { parseJson } from '../util/json';

export default function FeatureBanner() {
  const [opened, setOpened] = useState(true);
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setOpened(
      parseJson(window.localStorage.getItem('featureBannerOpened')) ?? true,
    );
    setIsBrowser(true);
  }, []);

  return (
    opened && (
      <div
        style={{
          backgroundColor: '#dd6666',
          padding: '20px',
          justifyContent: 'space-between',
          display:
            // If we're on the server, do not show the banner
            isBrowser ? 'flex' : 'none',
        }}
      >
        <div>Learn about our new widget features</div>
        <button
          onClick={() => {
            setOpened(false);
            window.localStorage.setItem(
              'featureBannerOpened',
              JSON.stringify(false),
            );
          }}
        >
          ×
        </button>
      </div>
    )
  );
}
