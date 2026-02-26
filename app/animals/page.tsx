import Image from 'next/image';
import Link from 'next/link';
import { getAnimalsInsecure } from '../../database/animals';

export const metadata = {
  title: 'Animals',
  description: 'We offer various animals',
};

export default async function AnimalsPage() {
  const animals = await getAnimalsInsecure();
  return (
    <div>
      {animals.map((animal) => {
        return (
          <Link key={`animal-${animal.id}`} href={`/animals/${animal.id}`}>
            <div>
              <Image
                src={`/animals/${animal.id}.png`}
                width="300"
                height="164"
                alt={`${animal.firstName} the ${animal.type}, with their ${animal.accessory}`}
              />
            </div>
            {animal.firstName}
          </Link>
        );
      })}
    </div>
  );
}
