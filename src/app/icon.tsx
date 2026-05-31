import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#243A4C",
          borderRadius: 18,
        }}
      >
        <svg width="46" height="46" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="12" fill="#F5B800" />
          <path d="M40 3 43 30H37L40 3Z" fill="#F5B800" />
          <path d="M7 40 32 37v6L7 40Z" fill="#F5B800" />
          <path d="M73 40 48 37v6l25-3Z" fill="#F5B800" />
          <path d="M24 18 37 30l-6 5-7-17Z" fill="#F5B800" />
          <path d="M56 18 49 35l-6-5 13-12Z" fill="#F5B800" />
          <path d="M32 31c3-5 8-8 13-8 6 0 11 3 14 8l-5 2c-2-3-5-5-9-5-4 0-7 2-9 5l-4-2Z" fill="#F5B800" />
          <path d="M55 47c-2 4-5 6-9 7l-2-5c2 0 4-2 5-4l6 2Z" fill="#243A4C" />
        </svg>
      </div>
    ),
    size
  );
}
