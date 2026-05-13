import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-xl text-on-surface">
      <div className="text-center">
        <h2 className="font-display-xl text-display-xl mb-md">404</h2>
        <p className="text-headline-md text-on-surface-variant mb-xl">ページが見つかりませんでした。</p>
        <Link
          href="/"
          className="student-gradient text-white px-lg py-md rounded-full font-headline-md shadow-xl"
        >
          ホームに戻る
        </Link>
      </div>
    </div>
  );
}
