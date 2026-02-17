import Image from 'next/image';
import ClientComponentBrowserApis from './ClientComponentBrowserApis';
import GenerateButton from './GenerateButton';

export const metadata = {
  // For the homepage, you need to include
  // the entire title
  // - https://github.com/vercel/next.js/issues/46859
  title: 'Home page - Widgets Anonymous',
  description: 'This is our home page',
};

export default function HomePage() {
  return (
    <div>
      <GenerateButton />
      <ClientComponentBrowserApis />
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
