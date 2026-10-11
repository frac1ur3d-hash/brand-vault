import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          backgroundColor: '#0f172a',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            marginBottom: '28px',
          }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, #4f46e5, #a855f7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              color: 'white',
              fontWeight: 900,
            }}
          >
            B
          </div>
          <div style={{ fontSize: '64px', fontWeight: 900, color: 'white', letterSpacing: '-2px' }}>
            BRAND VAULT
          </div>
        </div>
        <div style={{ fontSize: '34px', color: '#fbbf24', fontWeight: 600 }}>
          Check your business name everywhere before you file
        </div>
        <div style={{ fontSize: '24px', color: '#64748b', marginTop: '20px' }}>
          Domains &bull; Social handles &bull; 50-state LLC registries
        </div>
      </div>
    ),
    { ...size }
  );
}
