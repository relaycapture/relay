import { ImageResponse } from 'next/og';

export const alt = 'Relay Capture — High-Leverage Pipeline Infrastructure';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        tw="relative flex h-full w-full flex-col items-center justify-center bg-neutral-950"
        style={{
          fontFamily: 'sans-serif',
        }}
      >
        {/* Subtle glowing radial gradient in the center */}
        <div
          tw="absolute flex h-[480px] w-[640px] rounded-full"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.18) 0%, rgba(30, 27, 40, 0.4) 40%, rgba(10, 10, 12, 0) 70%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Center content container */}
        <div tw="relative flex flex-col items-center justify-center z-10">
          {/* Tilted white triangle (-15 deg) */}
          <div
            tw="flex items-center justify-center mb-8"
            style={{
              transform: 'rotate(-15deg)',
            }}
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L1 21H23L12 2Z"
                fill="#ffffff"
              />
            </svg>
          </div>

          {/* Title: RELAY CAPTURE */}
          <div tw="text-5xl font-bold tracking-widest text-white uppercase mb-4">
            RELAY CAPTURE
          </div>

          {/* Subtitle: High-Leverage Pipeline Infrastructure */}
          <div tw="text-xl tracking-wider text-neutral-400 font-normal">
            High-Leverage Pipeline Infrastructure
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
