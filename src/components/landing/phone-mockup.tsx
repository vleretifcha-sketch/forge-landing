import { Asset } from "@/components/landing/ui";

type PhoneMockupProps = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  screenRadius?: number;
  className?: string;
};

const FRAME_W = 340.065;
const FRAME_H = 702.718;
const SCREEN_W = 313.009;
const SCREEN_H = 680.378;
const INSET_X = (FRAME_W - SCREEN_W) / 2;
const INSET_Y = 10.922;

export function PhoneMockup({
  src,
  alt = "",
  width = FRAME_W,
  height = FRAME_H,
  screenRadius = 45,
  className,
}: PhoneMockupProps) {
  const scaleX = width / FRAME_W;
  const scaleY = height / FRAME_H;
  const screenW = SCREEN_W * scaleX;
  const screenH = SCREEN_H * scaleY;
  const left = INSET_X * scaleX;
  const top = INSET_Y * scaleY;

  return (
    <div className={className} style={{ width, height, position: "relative" }}>
      <Asset
        src="/images/iphone-air.png"
        alt=""
        width={width}
        height={height}
        className="pointer-events-none absolute inset-0 max-w-none"
      />
      <img
        src={src}
        alt={alt}
        width={screenW}
        height={screenH}
        className="absolute object-cover"
        style={{
          width: screenW,
          height: screenH,
          left,
          top,
          borderRadius: screenRadius * scaleX,
        }}
      />
    </div>
  );
}
