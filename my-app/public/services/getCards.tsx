import { CardDTO } from '../models/card';

export default async function getCards(): Promise<CardDTO[]> {
  const response = await fetch('http://127.0.0.1:8000/cards');
  if (!response.ok) {
    throw new Error('Failed to fetch cards');
  }
  const data = await response.json();
  return data;
}