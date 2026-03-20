import Link from 'next/link';

export default function NoteNotFound() {
  return (
    <div>
      <h1>Note Not Found</h1>
      <div>Oops, we couldn't find that note. Wrong URL?</div>
      <div>
        <Link href="/notes">Back to notes</Link>
      </div>
    </div>
  );
}
