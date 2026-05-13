'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Root Error Boundary caught:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-xl text-on-surface">
      <div className="glass-card p-xl rounded-2xl border-error/20 max-w-md w-full text-center">
        <h2 className="font-headline-lg text-headline-lg mb-md text-error">レンダリングエラー</h2>
        <p className="text-on-surface-variant mb-lg leading-relaxed">
          申し訳ありません。ページの表示中にエラーが発生しました。<br />
          <span className="text-sm font-mono bg-white/5 p-xs block mt-base rounded">
            Digest: {error.digest || 'No digest available'}
          </span>
        </p>
        <div className="flex gap-base justify-center">
          <button
            onClick={() => reset()}
            className="px-lg py-md bg-primary text-white rounded-full font-headline-md shadow-lg"
          >
            再読み込み
          </button>
          <Link
            href="/"
            className="px-lg py-md border border-white/20 rounded-full font-headline-md"
          >
            ホームへ
          </Link>
        </div>
      </div>
    </div>
  );
}
