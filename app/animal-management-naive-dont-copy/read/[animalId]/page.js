import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAnimalInsecure } from '../../../../database/animals';
import { formatDate, getDaysUntilNextBirthDay } from '../../../../util/dates';

export async function generateMetadata(props) {
  const params = await props.params;

  const animal = await getAnimalInsecure(Number(params.animalId));

  if (!animal) {
    return {
      title: 'Animal not found',
    };
  }

  return {
    title: `Animal Management - ${animal.firstName}`,
    description: `${animal.firstName} the ${animal.type}, with their ${animal.accessory}`,
  };
}

export default async function AnimalManagmentAnimalPage(props) {
  const params = await props.params;

  const animal = await getAnimalInsecure(Number(params.animalId));

  if (!animal) {
    notFound();
  }

  const currentDate = new Date();

  // Create new date object to avoid mutating the original birth date
  const nextBirthDate = new Date(animal.birthDate);

  const daysUntilNextBirthDay = getDaysUntilNextBirthDay(
    currentDate,
    nextBirthDate,
  );

  return (
    <div>
      <div>
        <Image
          src={`/animals/${animal.id}.png`}
          width="300"
          height="164"
          alt={`${animal.firstName} the ${animal.type}, with their ${animal.accessory}`}
        />
      </div>
      {animal.firstName}, born on {formatDate(animal.birthDate)} (
      {daysUntilNextBirthDay} days until next birthday)
    </div>
  );
}
