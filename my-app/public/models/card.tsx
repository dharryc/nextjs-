export type CardRarity = 'common' | 'uncommon' | 'rare' | 'legendary';

export interface CardDTO {
  id?: number | null;
  card_name: string;
  path_to_image: string;
  blurb?: string | null;
  card_rarity: CardRarity;
}