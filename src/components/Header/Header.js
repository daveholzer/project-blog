'use client';

import React from 'react';
import clsx from 'clsx';
import { Rss } from 'react-feather';
import { useRouter } from 'next/navigation';

import Logo from '@/components/Logo';
import VisuallyHidden from '@/components/VisuallyHidden';
import DarkLightToggle from '@/components/DarkLightToggle';

import styles from './Header.module.css';

function Header({ theme, className, ...delegated }) {
  const router = useRouter();

  return (
    <header
      className={clsx(styles.wrapper, className)}
      {...delegated}
    >
      <Logo />

      <div className={styles.actions}>
        <button className={styles.action} onClick={() => router.push('/rss.xml')}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: 'translate(2px, -2px)',
            }}
          />
          <VisuallyHidden>
            View RSS feed
          </VisuallyHidden>
        </button>
        <DarkLightToggle initialTheme={theme}/>
      </div>
    </header>
  );
}

export default Header;
