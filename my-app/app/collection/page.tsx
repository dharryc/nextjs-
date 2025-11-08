import Image from 'next/image';
import getCards from '@/public/services/getCards';
import { CardDTO } from '@/public/models/card';
import Card from './Card';

export default async function CollectionPage() {
  const cards: CardDTO[] = await getCards();

  return (
    <div className="py-12 px-6">
      <h1 className="text-3xl font-semibold mb-6 text-center text-zinc-900 dark:text-zinc-50">
        Your Collection
      </h1>

      {cards.length === 0 ? (
        <p className="text-center text-zinc-600 dark:text-zinc-400">No cards found.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {cards.map((card: CardDTO) => (
              <div key={card.id ?? card.card_name}>
                <Card card={card} />
              </div>
          ))}
        </div>
      )}
    </div>
  );
}