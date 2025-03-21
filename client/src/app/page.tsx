import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to My Media Library</h1>
      <Link href="/test">
        <button>Go to Test Page</button>
      </Link>
    </div>
  );
}
