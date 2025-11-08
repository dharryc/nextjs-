from typing import Optional, Literal
from pydantic import BaseModel

class CardDTO(BaseModel):
    card_name: str
    path_to_image: str
    blurb: Optional[str] = None
    card_rarity: Literal['common', 'uncommon', 'rare', 'legendary']

class Card(CardDTO):
    id: int
    card_name: str
    path_to_image: str
    blurb: Optional[str] = None
    card_rarity: Literal['common', 'uncommon', 'rare', 'legendary']