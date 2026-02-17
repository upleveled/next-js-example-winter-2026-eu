import Image from 'next/image';
import Link from 'next/link';
import { animals } from '../../database/animals';

export default function AnimalsPage() {
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
