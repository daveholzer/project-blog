import React from 'react';

import { NOT_FOUND_TITLE } from '../constants';

import styles from './homepage.module.css';

export const metadata = {
  title: NOT_FOUND_TITLE,
  description: 'The requested page does not exist',
}

async function NotFound() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>
        404 Not Found
      </h1>
      <p>This page does not exist. Please check the URL and try again.</p>
    </div>
  );
}

export default NotFound;
