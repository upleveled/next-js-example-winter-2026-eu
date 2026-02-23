import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  getAnimalInsecure,
  getAnimalsWithFoodsInsecure,
} from '../../../../database/animals';

export async function generateMetadata(props) {
  const params = await props.params;

  const animal = await getAnimalInsecure(Number(params.animalId));

  if (!animal) {
    return {
      title: 'Animal not found',
    };
  }

  return {
    title: animal.firstName,
    description: `${animal.firstName} the ${animal.type}, with their ${animal.accessory}`,
  };
}

export default async function AnimalPage(props) {
  const params = await props.params;

  const animalWithFoods = await getAnimalsWithFoodsInsecure(
    Number(params.animalId),
  );

  console.log(animalWithFoods);

  const animal = animalWithFoods[0];

  if (!animalWithFoods || !animal) {
    notFound();
  }

  animal.foods = animalWithFoods
    .map(({ foodId, foodName }) => {
      // Return null if food info not present
      if (!foodId) return null;
      return {
        id: foodId,
        name: foodName,
      };
    })
    // Remove any array items that don't contain food information
    .filter((food) => food !== null);

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

      {animal.firstName}

      <div>
        Foods
        <ul>
          {animal.foods.map((food) => {
            return (
              <li key={`animal-foods-${food.name}-${food.id}`}>{food.name}</li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
