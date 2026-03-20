import Link from 'next/link';

export default function Forbidden() {
  return (
    <div>
      <h1>Access Denied</h1>
      <div>You do not have permission to access this note</div>
      <div>
        This may be an antipattern for security, because of "information
        exposure": it tells the user that a note with this id exists
      </div>
      <div>
        <Link href="/notes">Back to notes</Link>
      </div>
    </div>
  );
}
