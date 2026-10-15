'use client';

import Script from 'next/script';

const WIDGET_URL =
  'https://www.gofundme.com/f/help-me-save-my-mom-and-build-our-way-out-27zrk/widget/large?attribution_id=sl%3A1775eaae-9a58-4d62-8e26-2c7780f8e189';

export default function GoFundMeWidget() {
  return (
    <>
      <div className="gfm-embed" data-url={WIDGET_URL} />
      <Script src="https://www.gofundme.com/static/js/embed.js" strategy="lazyOnload" />
    </>
  );
}
