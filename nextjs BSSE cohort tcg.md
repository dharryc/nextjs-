# BSSE TCG
## BSSE TCG — Cohort Trading Card Game

A lightweight, opt-in Trading Card Game (TCG) for the BSSE cohort. The goal is simple: collect cards representing cohort members and teachers, trade or upgrade them, and unlock small rewards through play and participation.

## Quick summary

- Opt-in: participation is optional for students and teachers.
- Everyone in the cohort can be a card; teachers may also be cards with rarities linked to tenure.
- Cohort member cards share the same base rarity; teacher rarities vary by tenure.
- Players earn chests (random card drops) by completing tasks or participating in events.
- The meta goal: collect a full set and upgrade cards to rarer variants.

## How it works

1. Opt-in
	- Students and teachers can choose to be represented as cards. Privacy and opt-out options must be respected.
2. Card minting
	- Each participant has a card with a name, role (student/teacher), avatar, and a short blurb.
	- Cohort member cards use the cohort's base rarity.
3. Teacher rarities
	- Teacher card rarity increases with tenure at Snow: longer service -> higher rarity tier.
4. Collecting & progression
	- Players open chests to receive cards (randomized draws).
	- Duplicate cards can be traded or consumed to upgrade a card's level.

## Rarity tiers (example)

| Rarity | Description |
|---|---|
| Common | Most cohort member cards — easy to obtain |
| Uncommon | Slightly rarer variants or early-career teachers |
| Rare | Teachers with moderate tenure or special-edition cohort cards |
| Epic | Long-serving teachers, special event promos |
| Legendary | Hall-of-fame professors, anniversary editions |

> Note: This table is a suggested mapping. Implementation may use fewer tiers or different names.

## Game mechanics ideas

- Chests: earned by completing micro-tasks (attending workshops, submitting bug bounties, helping others). Chests grant 1–3 cards.
- Upgrades: combine duplicates + resources to upgrade a card (visual/metadata change and collector value).
- Trading: allow peer-to-peer swaps with a simple trade UI or messaging system.
- Events & promos: temporary cards for hackathons, lectures, or milestones.
## Game mechanics ideas

- Chests: earned by completing micro-tasks (attending workshops, submitting bug bounties, helping others). Chests grant 1–3 cards.
- Upgrades: combine duplicates + resources to upgrade a card (visual/metadata change and collector value).
- Trading: allow peer-to-peer swaps with a simple trade UI or messaging system.
- Events & promos: temporary cards for hackathons, lectures, or milestones.

## Rewards & prizes

- Cosmetic rewards (badges, profile frames) for completing sets.
- Small physical or digital prizes for seasonal competitions (subject to organizer rules).
- Leaderboards for collectors (optional and privacy-aware).

## Privacy & consent

- Opt-in only. Provide a clear flow for people to opt-in and opt-out.
- Allow people to edit or remove personal text/avatars from their card.

## Example card fields

- id: unique identifier
- name: full name or display name
- role: student | teacher | staff
- rarity: tier name
- tenure: years (teachers only, optional)
- avatar: image URL or emoji
- blurb: 1–2 sentence description

## Next steps / Implementation notes

1. Finalize rarity mapping and chest drop rates.
2. Design simple card JSON schema and storage (database or flat file).
3. Build a minimal UI to view/open chests and trade cards.
4. Draft a consent form and opt-in flow for cohort members and teachers.