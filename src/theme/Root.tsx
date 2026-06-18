import React, {useEffect, useState} from 'react';

function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };

    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 'var(--ifm-navbar-height)',
        left: 0,
        width: `${progress}%`,
        height: '3px',
        background: 'var(--ifm-color-primary)',
        zIndex: 999,
        transition: 'width 0.1s linear',
        pointerEvents: 'none',
      }}
    />
  );
}

export default function Root({children}: {children: React.ReactNode}): JSX.Element {
  return (
    <>
      <ReadingProgressBar />
      {children}
    </>
  );
}
