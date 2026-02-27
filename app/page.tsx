import Image from 'next/image';
import AntipatternDocumentCookie from './AntipatternDocumentCookie';
import ClientComponentBrowserApis from './ClientComponentBrowserApis';
import GenerateButton from './GenerateButton';
import styles from './page.module.scss';

export const metadata = {
  // For the homepage, you need to include the entire title
  // - https://github.com/vercel/next.js/issues/46859
  title: 'Home page - Widgets Anonymous',
  description: 'This is our home page',
};

export default function HomePage() {
  return (
    <div className={styles.content}>
      <h1>Widgets Anonymous</h1>
      <h2>Generate Button</h2>
      <GenerateButton />
      <h2>Client Components - Browser APIs</h2>
      <ClientComponentBrowserApis />
      <h2>
        <code>document.cookie</code> - do not use
      </h2>
      <AntipatternDocumentCookie />
      <h2>Images</h2>
      <div>Regular HTML &lt;img&gt; element</div>
      <img
        src="/widget.jpg"
        alt="Factory worker with large widget"
        width="500"
      />
      <div>Next.js &lt;Image /&gt; component from next/image (optimized)</div>
      <Image
        src="/widget.jpg"
        alt="Factory worker with large widget"
        width="500"
        height="280"
      />
    </div>
  );
}
