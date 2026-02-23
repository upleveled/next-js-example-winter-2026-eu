import Image from 'next/image';
import { notFound } from 'next/navigation';
import { updateAnimalInsecure } from '../../../../database/animals';
import { formatDate, getDaysUntilNextBirthDay } from '../../../../util/dates';

export const metadata = {
  title: 'Animal Management - Update animal',
  description: 'We offer various animals',
};
export default async function AnimalManagmentUpdateAnimalPage(props) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  console.log(searchParams);
  const updatedAnimal = await updateAnimalInsecure({
    id: Number(params.animalId),
    firstName: searchParams.firstName,
    type: searchParams.type,
    accessory: searchParams.accessory,
    birthDate: searchParams.birthDate,
  });
  console.log(updatedAnimal);

  if (!updatedAnimal) {
    notFound();
  }

  const currentDate = new Date();

  // Create new date object to avoid mutating the original birth date
  const nextBirthDate = new Date(updatedAnimal.birthDate);

  const daysUntilNextBirthDay = getDaysUntilNextBirthDay(
    currentDate,
    nextBirthDate,
  );

  return (
    <div>
      <div>
        <Image
          src={`/animals/${updatedAnimal.id}.png`}
          width="300"
          height="164"
          alt={`${updatedAnimal.firstName} the ${updatedAnimal.type}, with their ${updatedAnimal.accessory}`}
        />
      </div>
      {updatedAnimal.firstName}, born on {formatDate(updatedAnimal.birthDate)} (
      {daysUntilNextBirthDay} days until next birthday)
    </div>
  );
}
