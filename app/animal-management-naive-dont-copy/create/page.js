import Image from 'next/image';
import { notFound } from 'next/navigation';
import { createAnimalInsecure } from '../../../database/animals';
import { formatDate, getDaysUntilNextBirthDay } from '../../../util/dates';

export const metadata = {
  title: 'Animal Management - Create animal',
  description: 'We offer various animals',
};
export default async function AnimalManagmentCreateAnimalPage(props) {
  const searchParams = await props.searchParams;

  const createdAnimal = await createAnimalInsecure({
    firstName: searchParams.firstName,
    type: searchParams.type,
    accessory: searchParams.accessory,
    birthDate: searchParams.birthDate,
  });
  console.log(createdAnimal);

  if (!createdAnimal) {
    notFound();
  }

  const currentDate = new Date();

  // Create new date object to avoid mutating the original birth date
  const nextBirthDate = new Date(createdAnimal.birthDate);

  const daysUntilNextBirthDay = getDaysUntilNextBirthDay(
    currentDate,
    nextBirthDate,
  );

  return (
    <div>
      <div>
        <Image
          src={`/animals/${createdAnimal.id}.png`}
          width="300"
          height="164"
          alt={`${createdAnimal.firstName} the ${createdAnimal.type}, with their ${createdAnimal.accessory}`}
        />
      </div>
      {createdAnimal.firstName}, born on {formatDate(createdAnimal.birthDate)} (
      {daysUntilNextBirthDay} days until next birthday)
    </div>
  );
}
