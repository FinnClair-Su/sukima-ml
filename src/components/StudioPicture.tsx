import React from 'react';

type Props = {
  base: string;
  alt: string;
  className?: string;
  eager?: boolean;
};

export default function StudioPicture({ base, alt, className, eager = false }: Props) {
  return (
    <picture className={className}>
      <source media="(max-width: 700px)" srcSet={`${base}-1280.webp`} />
      <img
        src={`${base}-1600.webp`}
        alt={alt}
        width="1600"
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
        decoding={eager ? 'sync' : 'async'}
      />
    </picture>
  );
}
