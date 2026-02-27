import Image from 'next/image';
import {
  getAnimalInsecure,
  getAnimalsWithFoodsInsecure,
} from '../../../../database/animals';
import { collapseAnimalWithFoods } from '../../../../util/animalWithFoods';

export async function generateMetadata(props: Props) {
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

type Props = {
  params: Promise<{ animalId: string }>;
};

export default async function AnimalPage(props: Props) {
  const params = await props.params;

  const animalWithFoods = await getAnimalsWithFoodsInsecure(
    Number(params.animalId),
  );

  console.log(animalWithFoods);

  const animal = collapseAnimalWithFoods(animalWithFoods);

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
