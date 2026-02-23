import Image from 'next/image';
import { notFound } from 'next/navigation';
import { deleteAnimalInsecure } from '../../../../database/animals';
import { formatDate, getDaysUntilNextBirthDay } from '../../../../util/dates';

export const metadata = {
  title: 'Animal Management - Delete animal',
  description: 'We offer various animals',
};
export default async function AnimalManagmentDeleteAnimalPage(props) {
  const params = await props.params;

  const deletedAnimal = await deleteAnimalInsecure({
    id: Number(params.animalId),
  });
  console.log(deletedAnimal);

  if (!deletedAnimal) {
    notFound();
  }

  const currentDate = new Date();

  // Create new date object to avoid mutating the original birth date
  const nextBirthDate = new Date(deletedAnimal.birthDate);

  const daysUntilNextBirthDay = getDaysUntilNextBirthDay(
    currentDate,
    nextBirthDate,
  );

  return (
    <div>
      <div>
        <Image
          src={`/animals/${deletedAnimal.id}.png`}
          width="300"
          height="164"
          alt={`${deletedAnimal.firstName} the ${deletedAnimal.type}, with their ${deletedAnimal.accessory}`}
        />
      </div>
      {deletedAnimal.firstName}, born on {formatDate(deletedAnimal.birthDate)} (
      {daysUntilNextBirthDay} days until next birthday)
    </div>
  );
}
