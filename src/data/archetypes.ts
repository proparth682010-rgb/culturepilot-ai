import { CulturalArchetype } from '../types';

export const CULTURAL_ARCHETYPES: CulturalArchetype[] = [
  {
    id: 'tokyo-flaneur',
    name: 'Neo-Tokyo Melancholic Flâneur',
    subtitle: 'Wong Kar-wai · Burial · Haruki Murakami · Shinjuku Rain',
    description: 'Drawn to nocturnal urbanism, rain-slicked neon reflections, slow-moving analog textures, and unhurried emotional withholding.',
    seeds: {
      cinema: 'In the Mood for Love, Chungking Express, Fallen Angels',
      music: 'Burial, Cocteau Twins, Portishead, Massive Attack',
      literature: 'Haruki Murakami, Mark Fisher, Banana Yoshimoto',
      spaces: 'Tokyo Jazz Kissaten, Shinjuku Golden Gai, Brutalist elevated highway underpasses',
    },
    dominantVibe: 'Nocturnal Melancholy & Hauntology',
  },
  {
    id: 'a24-naturalist',
    name: 'A24 Melancholic Naturalist',
    subtitle: 'Past Lives · Phoebe Bridgers · Ocean Vuong · Pine Mist',
    description: 'Resonates with quiet emotional vulnerability, tactile organic cinematography, diaspora grief, and poetic realism.',
    seeds: {
      cinema: 'Past Lives, Aftersun, First Cow, Moonlight',
      music: 'Phoebe Bridgers, Sufjan Stevens, Adrianne Lenker, Bon Iver',
      literature: 'Ocean Vuong, Sally Rooney, Joan Didion',
      spaces: 'Pacific Northwest cedar cabins, Seoul Hanok tearooms, Scandinavian natural light studios',
    },
    dominantVibe: 'Tender Naturalism & Intimacy',
  },
  {
    id: 'cyber-ontologist',
    name: 'Cyber-Dystopian Ontologist',
    subtitle: 'Blade Runner 2049 · Aphex Twin · Philip K. Dick · Barbican',
    description: 'Explores the boundary of consciousness, monumental concrete architecture, speculative artificiality, and synthesized solitude.',
    seeds: {
      cinema: 'Blade Runner 2049, Ghost in the Shell (1995), Solaris, Children of Men',
      music: 'Aphex Twin, Vangelis, Oneohtrix Point Never, Tim Hecker',
      literature: 'Philip K. Dick, William Gibson, Ursula K. Le Guin',
      spaces: 'The Barbican Estate, High-tech server rooms, Kyoto dry rock gardens',
    },
    dominantVibe: 'Speculative Brutalism & Solitude',
  },
  {
    id: 'lynchian-surrealist',
    name: 'Mid-Century Lynchian Surrealist',
    subtitle: 'Mulholland Drive · Bohren & der Club of Gore · Franz Kafka · Diners',
    description: 'Fascinated by the uncanny dread beneath wholesome facades, subterranean jazz reverb, and psychological labyrinths.',
    seeds: {
      cinema: 'Mulholland Drive, Blue Velvet, Eraserhead, Twin Peaks',
      music: 'Bohren & der Club of Gore, Angelo Badalamenti, Roy Orbison, Dale Cooper Quartet',
      literature: 'Franz Kafka, Jorge Luis Borges, Shirley Jackson',
      spaces: '1950s red-booth American diners, wood-paneled subterranean jazz lounges, hotel hallways at 3 AM',
    },
    dominantVibe: 'Subterranean Noir & Surrealism',
  },
  {
    id: 'pastoral-analog',
    name: 'Analog Pastoral Meditator',
    subtitle: 'My Neighbor Totoro · Joe Hisaishi · Italo Calvino · Moss Gardens',
    description: 'Cherishes timeless hand-drawn warmth, animistic reverence for nature, quiet folk melodies, and contemplative wonder.',
    seeds: {
      cinema: 'My Neighbor Totoro, Spirited Away, The Tale of the Princess Kaguya, Petite Maman',
      music: 'Joe Hisaishi, Ryuichi Sakamoto, Vashti Bunyan, Ichiko Aoba',
      literature: 'Italo Calvino, Wendell Berry, Matsuo Bashō, Tove Jansson',
      spaces: 'Traditional Sukiya wooden teahouses, sunlit botanical glasshouses, mountain moss trails',
    },
    dominantVibe: 'Animistic Peace & Handcrafted Solace',
  },
  {
    id: 'dark-academia',
    name: 'Dark Academia Metaphysicist',
    subtitle: 'The Secret History · Agnes Obel · Tarkovsky · Gothic Cloisters',
    description: 'Passionate about esoteric scholarly pursuits, classical tragedy, baroque acoustics, and weathered leather-bound archives.',
    seeds: {
      cinema: 'Stalker, Dead Poets Society, The Seventh Seal, The Double Life of Véronique',
      music: 'Agnes Obel, Max Richter, Arvo Pärt, Johann Sebastian Bach',
      literature: 'Donna Tartt, Umberto Eco, Mary Shelley, Fyodor Dostoevsky',
      spaces: 'Oxford Gothic libraries, rainy stone cloisters, candlelit Victorian reading rooms',
    },
    dominantVibe: 'Scholarly Reverence & Esoterica',
  },
];
