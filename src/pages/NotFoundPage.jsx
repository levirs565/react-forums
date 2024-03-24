import React from 'react';
import image404Url from '../assets/404.svg';
import './NotFoundPage.css';
import { useI8n } from '../provider/context';
import FancyLink from '../components/FancyLink';

export default function NotFoundPage() {
  const { getText } = useI8n();

  return (
    <main className="app-main not-found-page">
      <img alt="404 not found" className="not-found-page--image" src={image404Url} />
      <div className="not-found-page--content">
        <h2 className="not-found-page--title">{getText('notFoundTitle')}</h2>
        <p className="not-found-page--text">{getText('checkUrlMessage')}</p>
        <p className="not-found-page--text">
          <FancyLink to="/">{getText('homeAction')}</FancyLink>
        </p>
      </div>
    </main>
  );
}
