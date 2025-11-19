import React, { useEffect, useRef } from 'react';
import { useColorMode } from '@docusaurus/theme-common';

interface GiscusCommentsProps {
  forceTheme?: 'light' | 'dark';
}

export default function GiscusComments({ forceTheme }: GiscusCommentsProps = {}) {
  const { colorMode } = useColorMode();
  const giscusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!giscusRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'FinnClair-Su/sukima-ml');
    script.setAttribute('data-repo-id', 'R_kgDOQS-kXg');
    script.setAttribute('data-category', 'Announcements');
    script.setAttribute('data-category-id', 'DIC_kwDOQS-kXs4Cxyys');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', forceTheme || (colorMode === 'dark' ? 'dark' : 'light'));
    script.setAttribute('data-lang', 'zh-CN');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    giscusRef.current.appendChild(script);

    return () => {
      if (giscusRef.current) {
        giscusRef.current.innerHTML = '';
      }
    };
  }, [colorMode, forceTheme]);

  return <div ref={giscusRef} />;
}
