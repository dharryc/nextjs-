# BSSE TCG — Cohort Trading Card Game

A silly, simple, opt-in Trading Card Game (TCG) for the BSSE cohort. The goal is is to make a little game where students collect cards representing cohort members and teachers, and trade or upgrade them, collection new cards through participation.

## Quick summary

- Opt-in: participation is optional for students and teachers.
- Everyone in the cohort can be a card; teachers may also be cards with rarities linked to tenure.
- Cohort member cards share the same base rarity; teacher rarities vary by tenure.
- Players earn packs (random card drops) by completing tasks or participating in events (maybe turning assignments in on time?).
- Overall goal is to collect a full set and upgrade cards to rarer variants.

## How it works

1. Card minting
   - Each participant has a card with a name, role (student/teacher), avatar, and a short blurb.
   - Cohort member cards use the cohort's base rarity.
2. Teacher rarities
   - Teacher card rarity increases with tenure: longer service → higher rarity tier.
   - Teacher cards have the same structure (name, picture, blurb, etc)
3. Collecting & progression
   - Players open packs to receive cards (randomized draws).
   - Duplicate cards can be traded or consumed to upgrade a card's level.

## Rarity tiers (example)

| Rarity    | Description                                                   |
|-----------|---------------------------------------------------------------|
| Common    | Some basic coding languages/concepts                          |
| Uncommon  | Members of the cohort, maybe some languages as well           |
| Rare      | More advanced classes and languages/concepts (FANG companies?)|
| Legendary | Professors                                                    |


## Game mechanics ideas

- packs: earned by completing micro-tasks (attending workshops, helping others). packs grant (n) cards.
- Upgrades: combine duplicates to upgrade a card.
- Trading: allow peer-to-peer swaps with a simple trade UI or messaging system.
- Events & promos: temporary cards for hackathons, lectures, or milestones.

## Privacy & consent

- Opt-in only. Provide a clear flow for people to opt-in and delete their card if they want.
- Allow people to edit or remove personal text/avatars from their card.

## Example card fields

- `id`: unique identifier
- `name`: full name or display name
- `role`: student | teacher | staff
- `rarity`: tier name
- `tenure`: years (teachers only, optional)
- `avatar`: image URL or emoji
- `blurb`: 1–2 sentence description

## Next steps / Implementation notes

1. Finalize rarity mapping and pack drop rates.
2. Design a simple card JSON schema and storage (database or flat file).
3. Build a minimal UI to view/open packs and trade cards.
4. Draft a consent form and opt-in flow for cohort members and teachers.


| Level      | Common | Uncommon | Rare | Legendary |
| :-----     | -----: | -------: | ---: | --------: |
| 1          |      1 |        1 |    1 |         1 |
| 1 → 2      |      5 |        4 |    2 |         1 |
| 2 → 3      |     10 |        8 |    3 |         1 |
| 3 → 4      |     25 |       15 |    4 |         2 |
| 4 → 5      |     50 |       25 |    8 |         3 |
| 5 → 6      |     75 |       40 |   16 |         5 |
| 6 → 7      |    100 |       80 |   25 |         8 |
| 7 → 8      |    200 |      125 |   40 |        12 |
| 8 → 9      |    500 |      175 |   60 |        16 |
| 9 → 10     |   1000 |      300 |  100 |        20 |
|Total cards |   1966 |      733 |  259 |        69 |