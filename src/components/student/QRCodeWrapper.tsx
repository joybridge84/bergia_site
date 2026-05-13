"use client";

import { QRCodeSVG } from "qrcode.react";

interface QRCodeWrapperProps {
  value: string;
  size?: number;
}

export default function QRCodeWrapper({ value, size = 200 }: QRCodeWrapperProps) {
  return (
    <div className="bg-white p-md rounded-xl inline-block">
      <QRCodeSVG value={value} size={size} />
    </div>
  );
}
