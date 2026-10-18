import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize server-side Gemini client per skill instructions
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Qloo Taste Graph Fallback Knowledge Base
const KNOWLEDGE_GRAPH = [
  {
    id: 'film-1',
    name: 'In the Mood for Love',
    domain: 'cinema',
    year: '2000',
    creator: 'Wong Kar-wai',
    aestheticTags: ['Nocturnal Melancholy', 'Saturated Velvet', 'Chamber Romance', 'Temporal Distance'],
    affinityScore: 97,
    serendipityIndex: 78,
    whyItFits: 'Shares high-dimensional vector alignment with introspective dream pop, modernist Hong Kong architecture, and themes of unspoken longing.',
    crossDomainBridge: 'Bridges nocturnal urban soundscapes with mid-century interior aesthetics.',
    quoteOrTheme: 'He remembers those vanished years. As though looking through a dusty window pane.',
  },
  {
    id: 'film-2',
    name: 'Stalker',
    domain: 'cinema',
    year: '1979',
    creator: 'Andrei Tarkovsky',
    aestheticTags: ['Philosophical Dystopia', 'Industrial Decay', 'Spiritual Metaphysics', 'Slow Cinema'],
    affinityScore: 94,
    serendipityIndex: 92,
    whyItFits: 'Strong cross-affinity with ambient drone music (Brian Eno, Stars of the Lid) and existentialist literature (Arkady and Boris Strugatsky).',
    crossDomainBridge: 'Connects brutalist industrial landscape photography with atmospheric sound design.',
    quoteOrTheme: 'Let everything that has been planned come true. Let them believe.',
  },
  {
    id: 'film-3',
    name: 'Past Lives',
    domain: 'cinema',
    year: '2023',
    creator: 'Celine Song',
    aestheticTags: ['In-Yun Affinity', 'Quiet Naturalism', 'Transcontinental Nostalgia', 'Subtle Emotional Realism'],
    affinityScore: 95,
    serendipityIndex: 74,
    whyItFits: 'Correlates with indie folk melancholia (Phoebe Bridgers, Sufjan Stevens) and diaspora poetry (Ocean Vuong).',
    crossDomainBridge: 'Unites contemporary minimalist architecture with intimate emotional diaspora narratives.',
    quoteOrTheme: 'There is a word in Korean: In-Yun. It means providence or fate.',
  },
  {
    id: 'film-4',
    name: 'Solaris',
    domain: 'cinema',
    year: '1972',
    creator: 'Andrei Tarkovsky',
    aestheticTags: ['Cosmic Solitude', 'Lyrical Sci-Fi', 'Memory & Grief', 'Meditative Pacing'],
    affinityScore: 92,
    serendipityIndex: 88,
    whyItFits: 'Shares cultural latent space with Stanisław Lem, electronic modular synthesis, and brutalist observation decks.',
    crossDomainBridge: 'Bridges deep speculative philosophy with slow analog spatial design.',
    quoteOrTheme: 'We have no need of other worlds. We need mirrors.',
  },
  {
    id: 'film-5',
    name: 'Drive My Car',
    domain: 'cinema',
    year: '2021',
    creator: 'Ryusuke Hamaguchi',
    aestheticTags: ['Murakami Realism', 'Theatrical Grief', 'Nocturnal Highways', 'Red Saab 900 Aesthetic'],
    affinityScore: 96,
    serendipityIndex: 81,
    whyItFits: 'Direct affinity vector linking Haruki Murakami short fiction, Chekhov plays, and ambient Japanese jazz fusion.',
    crossDomainBridge: 'Channels solitary highway journeys through literature into cinematic catharsis.',
    quoteOrTheme: 'Those who survive keep thinking about the dead. In one way or another, this will continue.',
  },
  {
    id: 'music-1',
    name: 'Untrue',
    domain: 'music',
    year: '2007',
    creator: 'Burial',
    aestheticTags: ['Rain-Slicked South London', 'Vinyl Crackle', 'Ghostly 2-Step', 'Hauntology'],
    affinityScore: 98,
    serendipityIndex: 89,
    whyItFits: 'The definitive sonic companion to neo-noir cinema, brutalist estates, and Mark Fisher hauntology essays.',
    crossDomainBridge: 'Mirrors the solitary nocturnal neon cinematography of Blade Runner and Wong Kar-wai.',
    quoteOrTheme: 'A sonic portrait of late-night night buses and distant pirate radio signals.',
  },
  {
    id: 'music-2',
    name: 'Heaven or Las Vegas',
    domain: 'music',
    year: '1990',
    creator: 'Cocteau Twins',
    aestheticTags: ['Ethereal Dream Pop', 'Glossolalia Vocals', 'Lush Shimmer', 'Sublime Romanticism'],
    affinityScore: 94,
    serendipityIndex: 76,
    whyItFits: 'High cultural correlation with Wong Kar-wai (Faye Wong famously covered this), fashion photography, and poetic surrealism.',
    crossDomainBridge: 'Transposes impressionist visual color palettes into auditory euphoria.',
    quoteOrTheme: 'Transcendent glossolalia that feels like emotional telepathy.',
  },
  {
    id: 'music-3',
    name: 'Selected Ambient Works Volume II',
    domain: 'music',
    year: '1994',
    creator: 'Aphex Twin',
    aestheticTags: ['Liminal Acoustics', 'Microtonal Microclimates', 'Isolationist Ambient', 'Rust & Memory'],
    affinityScore: 93,
    serendipityIndex: 91,
    whyItFits: 'Correlates directly with speculative science fiction, brutalist architecture, and solitary creative workspaces.',
    crossDomainBridge: 'Bridges physical architectural concrete with psychological interiority.',
    quoteOrTheme: 'Wordless microclimates of memory, industrial dreams, and subterranean peace.',
  },
  {
    id: 'music-4',
    name: 'Sunset Mission',
    domain: 'music',
    year: '2000',
    creator: 'Bohren & der Club of Gore',
    aestheticTags: ['Dark Jazz', 'Slow-Motion Doom Noir', 'Rhodes Piano', 'Smoky Rainy Diners'],
    affinityScore: 95,
    serendipityIndex: 85,
    whyItFits: 'Direct taste bridge to David Lynch filmography, Edward Hopper nocturnal paintings, and Raymond Chandler detective fiction.',
    crossDomainBridge: 'The auditory embodiment of a solitary cigarette under flickering streetlight.',
    quoteOrTheme: 'Jazz slowed down to the pulse of a midnight shadow.',
  },
  {
    id: 'music-5',
    name: 'Promises',
    domain: 'music',
    year: '2021',
    creator: 'Floating Points, Pharoah Sanders & London Symphony Orchestra',
    aestheticTags: ['Spiritual Jazz', 'Minimalist Arpeggios', 'Cosmic Transcendence', 'Orchestral Breath'],
    affinityScore: 97,
    serendipityIndex: 87,
    whyItFits: 'Resonates with fans of contemplative cinema, architectural sacred spaces, and metaphysical philosophy.',
    crossDomainBridge: 'Unites avant-garde electronic precision with raw ancestral spiritual jazz.',
    quoteOrTheme: 'A nine-movement meditation on beauty, aging, and infinite space.',
  },
  {
    id: 'lit-1',
    name: 'Norwegian Wood / Kafka on the Shore',
    domain: 'literature',
    year: '1987 / 2002',
    creator: 'Haruki Murakami',
    aestheticTags: ['Magical Realism', 'Jazz Cafe Solitude', 'Nocturnal Loneliness', 'Cat Metaphors'],
    affinityScore: 96,
    serendipityIndex: 79,
    whyItFits: 'The quintessential literary counterpart to dream pop, quiet cinema, and rain-washed Tokyo coffee houses.',
    crossDomainBridge: 'Transforms casual daily rituals into portals of existential mystery.',
    quoteOrTheme: 'Memories warm you up from the inside. But they also tear you apart.',
  },
  {
    id: 'lit-2',
    name: 'On Earth We\'re Briefly Gorgeous',
    domain: 'literature',
    year: '2019',
    creator: 'Ocean Vuong',
    aestheticTags: ['Poetic Prose', 'Queer Diaspora', 'Tender Fragility', 'Generational Trauma'],
    affinityScore: 93,
    serendipityIndex: 82,
    whyItFits: 'High affinity with A24 films (Past Lives, Moonlight), modern chamber music, and contemplative visual arts.',
    crossDomainBridge: 'Translates cinematic visual texture into lyrical prose of breathtaking intimacy.',
    quoteOrTheme: 'You once told me that the human eye is god\'s loneliest creation.',
  },
  {
    id: 'lit-3',
    name: 'Ghosts of My Life: Writings on Depression, Hauntology and Lost Futures',
    domain: 'literature',
    year: '2014',
    creator: 'Mark Fisher',
    aestheticTags: ['Cultural Theory', 'Hauntology', 'Lost Futures', 'Nocturnal Melancholia'],
    affinityScore: 95,
    serendipityIndex: 90,
    whyItFits: 'Theoretical foundation for fans of Burial, Tarkovsky, Joy Division, and dystopian cinema.',
    crossDomainBridge: 'Provides the intellectual framework for why certain nostalgic media deeply moves us.',
    quoteOrTheme: 'The slow cancellation of the future has been accompanied by a deflation of expectations.',
  },
  {
    id: 'lit-4',
    name: 'Invisible Cities',
    domain: 'literature',
    year: '1972',
    creator: 'Italo Calvino',
    aestheticTags: ['Poetic Urbanism', 'Imaginary Architecture', 'Philosophical Geometry', 'Labyrinthine Dreams'],
    affinityScore: 94,
    serendipityIndex: 93,
    whyItFits: 'Intersecting affinity with Studio Ghibli worldbuilding, contemporary spatial architecture, and ambient music.',
    crossDomainBridge: 'Connects architectural theory with magical realism and literary fantasy.',
    quoteOrTheme: 'Cities, like dreams, are made of desires and fears.',
  },
  {
    id: 'arch-1',
    name: 'The Barbican Estate & Arts Centre',
    domain: 'architecture',
    year: '1982',
    creator: 'Chamberlin, Powell and Bon',
    aestheticTags: ['Brutalist Utopianism', 'Bush-Hammered Concrete', 'Elevated Walkways', 'Submerged Lakes'],
    affinityScore: 92,
    serendipityIndex: 86,
    whyItFits: 'Cultural nexus for lovers of ambient electronic music, 1970s sci-fi cinema, and archival modernist design.',
    crossDomainBridge: 'The physical spatial equivalent of an ambient synth drone and quiet cinematic contemplation.',
    quoteOrTheme: 'A city within a city, suspended between monumental concrete and verdant water gardens.',
  },
  {
    id: 'arch-2',
    name: 'Church of the Light',
    domain: 'architecture',
    year: '1989',
    creator: 'Tadao Ando',
    aestheticTags: ['Minimalist Concrete', 'Cross of Pure Light', 'Zen Void', 'Acoustic Reverence'],
    affinityScore: 96,
    serendipityIndex: 88,
    whyItFits: 'High correlation with Arvo Pärt sacred minimalism, Andrei Tarkovsky films, and quiet literary contemplation.',
    crossDomainBridge: 'Where raw engineering yields pure spiritual serenity through daylight geometry.',
    quoteOrTheme: 'Light creates space. Concrete gives it silence.',
  },
];

// 1. Synthesize Taste Profile & Curate Media Recommendations via Gemini
app.post('/api/taste/synthesize', async (req, res) => {
  try {
    const { seeds, archetype, weights } = req.body;
    const seedCinema = seeds?.cinema || 'Wong Kar-wai, Blade Runner 2049';
    const seedMusic = seeds?.music || 'Burial, Cocteau Twins, Brian Eno';
    const seedLiterature = seeds?.literature || 'Haruki Murakami, Mark Fisher';
    const seedSpaces = seeds?.spaces || 'Brutalist Concrete, Tokyo Jazz Kissaten';

    const prompt = `You are the Lead Cultural Intelligence & Taste Graph Architect at Qloo.
Qloo maps the global cultural latent space across film, music, literature, fashion, and spaces to calculate cross-domain cultural affinity.

Analyze the user's cultural seed profile:
- Cinema: ${seedCinema}
- Music / Sound: ${seedMusic}
- Literature: ${seedLiterature}
- Spaces / Aesthetics: ${seedSpaces}
- Selected Cultural Archetype: ${archetype || 'Custom Cultural Seeker'}

Execute the 4-stage Agentic Taste Pipeline:
1. Affinity Decoder Agent: Extract the latent cultural coordinates (psychological temperament, aesthetic palette, subcultural lineage).
2. Qloo Correlation Agent: Bridge cross-domain affinity vectors (why someone with these tastes will love specific media in other domains).
3. Serendipity Agent: Select 6-8 hyper-personalized media recommendations (2 cinema, 2 music, 2 literature, 1 architecture/space) with at least 2 non-obvious orthogonal discoveries (high serendipity).
4. Capsule Architect: Create a cohesive Evening Immersion Capsule (twilight sound, feature screening, midnight reading, sensory setting).

Return ONLY valid JSON with this exact schema:
{
  "archetype": "Descriptive curatorial title for their taste profile",
  "dominantAesthetics": ["Tag 1", "Tag 2", "Tag 3", "Tag 4"],
  "culturalTemperament": "2-3 sentences explaining their psychological/aesthetic taste disposition",
  "latentVectorDescription": "Explanation of how their taste seeds bridge across domains",
  "agentInsights": [
    {"agent": "Affinity Decoder", "insight": "Analysis of core motifs"},
    {"agent": "Qloo Correlation Engine", "insight": "Cross-domain statistical affinity logic"},
    {"agent": "Serendipity Agent", "insight": "How echoes and unexpected discoveries were balanced"},
    {"agent": "Capsule Architect", "insight": "Curatorial synthesis for multi-sensory immersion"}
  ],
  "recommendations": [
    {
      "id": "rec-1",
      "name": "Title of Media",
      "domain": "cinema | music | literature | architecture",
      "year": "Release Year",
      "creator": "Director / Artist / Author / Architect",
      "aestheticTags": ["Tag A", "Tag B", "Tag C"],
      "affinityScore": 95,
      "serendipityIndex": 82,
      "whyItFits": "Detailed curatorial explanation grounded in cultural sociology and shared aesthetic vectors.",
      "crossDomainBridge": "How this links back to their other domain seeds.",
      "quoteOrTheme": "Notable quote, atmospheric lyric, or central thesis"
    }
  ],
  "eveningCapsule": {
    "title": "Name of the Evening Immersion",
    "twilightSound": {"title": "Album / Piece", "artist": "Creator", "rationale": "Why at 19:00"},
    "featureScreening": {"title": "Film", "director": "Director", "rationale": "Why at 21:00"},
    "midnightReading": {"title": "Book / Essay", "author": "Author", "rationale": "Why at 23:30"},
    "ambientSetting": "Lighting, temperature, atmosphere note",
    "beveragePairing": "Specific drink or tea with cultural resonance",
    "sensoryNote": "Final evocative curatorial thought"
  },
  "graphNodes": [
    {"id": "core", "label": "User Core Taste", "group": "core", "domain": "all"},
    {"id": "bridge-1", "label": "Latent Aesthetic Motif 1", "group": "bridge", "domain": "concept"},
    {"id": "bridge-2", "label": "Latent Aesthetic Motif 2", "group": "bridge", "domain": "concept"}
  ],
  "graphLinks": [
    {"source": "core", "target": "bridge-1", "strength": 0.9},
    {"source": "core", "target": "bridge-2", "strength": 0.85}
  ]
}`;

    if (process.env.GEMINI_API_KEY) {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      const text = response.text;
      if (text) {
        try {
          const parsed = JSON.parse(text);
          return res.json(parsed);
        } catch (parseError) {
          console.warn('Failed to parse Gemini JSON output, falling back to knowledge base', parseError);
        }
      }
    }

    // High-Fidelity Fallback if API key is unconfigured or rate limited
    return res.json({
      archetype: archetype || 'Neo-Tokyo Melancholic Flâneur',
      dominantAesthetics: ['Nocturnal Neon', 'Hauntological Lo-Fi', 'Existential Introspection', 'Brutalist Contemplation'],
      culturalTemperament: 'You gravitate toward liminal, atmospheric works where space, rain, and silence carry as much emotional weight as dialogue or tempo.',
      latentVectorDescription: 'High statistical correlation between slow-cinema framing (Wong Kar-wai), dubstep/ambient production (Burial), and solitary psychological fiction (Murakami).',
      agentInsights: [
        { agent: 'Affinity Decoder', insight: 'Extracted high presence of solitary nocturnal urbanism and analog nostalgia.' },
        { agent: 'Qloo Correlation Engine', insight: 'Mapped 96% vector similarity between late 90s ambient electronics and Asian neo-noir cinematography.' },
        { agent: 'Serendipity Agent', insight: 'Introduced Tadao Ando architecture and Bohren & der Club of Gore to expand from screen to physical and sonic environments.' },
        { agent: 'Capsule Architect', insight: 'Structured a three-phase evening transition from dusk dubstep to late-night slow cinema and midnight essays.' }
      ],
      recommendations: KNOWLEDGE_GRAPH,
      eveningCapsule: {
        title: 'Nocturne in Bush-Hammered Concrete',
        twilightSound: { title: 'Untrue', artist: 'Burial', rationale: 'Sets the twilight urban rain atmosphere at 19:00' },
        featureScreening: { title: 'In the Mood for Love', director: 'Wong Kar-wai', rationale: 'Rich color palette and slow waltz pacing at 21:00' },
        midnightReading: { title: 'Ghosts of My Life', author: 'Mark Fisher', rationale: 'Introspective cultural theory to wind down at 23:30' },
        ambientSetting: 'Dim 2200K incandescent filament lamp, rain soundtrack, phone in airplane mode',
        beveragePairing: 'Single malt peated whiskey with hand-carved ice sphere, or roasted hojicha tea',
        sensoryNote: 'Allow the boundary between cinema, sound, and memory to gently dissolve.'
      },
      graphNodes: [
        { id: 'core', label: 'User Core Taste', group: 'core', domain: 'all' },
        { id: 'b-noir', label: 'Nocturnal Melancholy', group: 'bridge', domain: 'concept' },
        { id: 'b-space', label: 'Brutalist Silence', group: 'bridge', domain: 'concept' },
        { id: 'b-analog', label: 'Hauntology & Tape Hiss', group: 'bridge', domain: 'concept' },
        ...KNOWLEDGE_GRAPH.map(k => ({ id: k.id, label: k.name, group: 'media', domain: k.domain }))
      ],
      graphLinks: [
        { source: 'core', target: 'b-noir', strength: 0.95 },
        { source: 'core', target: 'b-space', strength: 0.88 },
        { source: 'core', target: 'b-analog', strength: 0.92 },
        { source: 'b-noir', target: 'film-1', strength: 0.97 },
        { source: 'b-noir', target: 'film-5', strength: 0.94 },
        { source: 'b-noir', target: 'music-4', strength: 0.95 },
        { source: 'b-analog', target: 'music-1', strength: 0.98 },
        { source: 'b-analog', target: 'music-2', strength: 0.94 },
        { source: 'b-analog', target: 'lit-3', strength: 0.93 },
        { source: 'b-space', target: 'film-2', strength: 0.96 },
        { source: 'b-space', target: 'arch-1', strength: 0.92 },
        { source: 'b-space', target: 'arch-2', strength: 0.96 }
      ]
    });
  } catch (error: any) {
    console.error('Error in /api/taste/synthesize:', error);
    res.status(500).json({ error: error.message || 'Internal error in cultural synthesis' });
  }
});

// 2. Cultural Hadron Collider (Collision of contrasting cultural vectors)
app.post('/api/taste/collide', async (req, res) => {
  try {
    const { entityA, entityB } = req.body;
    const a = entityA || 'Taylor Swift';
    const b = entityB || 'David Lynch';

    const prompt = `You are the Cultural Hadron Collider Agent at Qloo.
Your mission: Take two seemingly contradictory cultural entities and find the latent cultural wormhole that bridges them.

Entity A: "${a}"
Entity B: "${b}"

Calculate the high-dimensional latent intersection:
1. The Latent Wormhole (unspoken thematic, emotional, or structural bridge between them).
2. Synthesized Aesthetic Title (e.g. "Americana Melodramatic Surrealism").
3. Curatorial Thesis explaining why a human mind can deeply love both.
4. Curated hybrid media recommendations (3 items across Film, Music, Literature) that perfectly resolve the tension between them.

Return ONLY valid JSON:
{
  "entityA": "${a}",
  "entityB": "${b}",
  "latentWormhole": "The hidden bridge between them in 1-2 powerful sentences",
  "synthesizedAesthetic": "Curatorial aesthetic label",
  "curatorialThesis": "Rich paragraph explaining the psychological harmony behind this apparent contrast",
  "hybridRecommendations": [
    {
      "title": "Title",
      "domain": "cinema | music | literature",
      "creator": "Creator",
      "year": "Year",
      "reconcilingElement": "How it unites Entity A's sensibility with Entity B's sensibility"
    }
  ]
}`;

    if (process.env.GEMINI_API_KEY) {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.8,
        },
      });

      const text = response.text;
      if (text) {
        return res.json(JSON.parse(text));
      }
    }

    // Default high-concept collision response
    return res.json({
      entityA: a,
      entityB: b,
      latentWormhole: 'Both examine the gothic subconscious of small-town Americana, obsessive romantic idealization, and the eerie fracture behind pristine domestic facades.',
      synthesizedAesthetic: 'Pastoral Gothic Melodrama & Subversive Dreamscape',
      curatorialThesis: `While on the surface ${a} represents hyper-polished narrative songcraft and ${b} represents avant-garde surrealist dread, both share a profound obsession with feminine yearning, retro mid-century nostalgia, heartbreak as an all-consuming reality distortion, and the uncanny secret lives hidden beneath diner neon.`,
      hybridRecommendations: [
        {
          title: 'Twin Peaks: Fire Walk with Me / Julee Cruise',
          domain: 'cinema / music',
          creator: 'David Lynch & Angelo Badalamenti',
          year: '1989-1992',
          reconcilingElement: 'Combines the heartbreaking 1950s prom-queen ballad melodrama loved by pop listeners with Lynchian subterranean reverb.'
        },
        {
          title: 'Norman Fucking Rockwell!',
          domain: 'music',
          creator: 'Lana Del Rey',
          year: '2019',
          reconcilingElement: 'Bridges radio-ready American confessionals with bleached Laurel Canyon noir and cinematic disillusionment.'
        },
        {
          title: 'The Virgin Suicides',
          domain: 'literature & cinema',
          creator: 'Jeffrey Eugenides / Sofia Coppola',
          year: '1993 / 1999',
          reconcilingElement: 'Balances teenage suburban mythology and sun-drenched lyricism with an unshakable existential undertow.'
        }
      ]
    });
  } catch (error: any) {
    console.error('Error in /api/taste/collide:', error);
    res.status(500).json({ error: error.message || 'Collision failed' });
  }
});

// 3. Agent Debate / Interrogation with Search Grounding
app.post('/api/taste/interrogate', async (req, res) => {
  try {
    const { question, userContext, history, persona } = req.body;
    const personaPrompt = persona === 'cinema_scholar'
      ? 'You are an Auteur Cinema & Film Theory Curator, deeply versed in French New Wave, Asian Neo-Noir, slow cinema, and visual semiotics.'
      : persona === 'sonic_theorist'
      ? 'You are a Sonic Hauntologist & Audio Curator, specialized in ambient electronics, dubstep, dark jazz, and acoustic architecture.'
      : persona === 'literary_metaphysicist'
      ? 'You are a Literary Metaphysicist & Cultural Essayist, focused on magical realism, existential philosophy, and poetic urbanism.'
      : persona === 'spatial_architect'
      ? 'You are a Spatial & Architectural Theorist, connecting physical brutalism, minimalist void spaces, and acoustic interiors.'
      : 'You are the Qloo Chief Cultural Sociologist & Media Recommender Agent.';

    const prompt = `${personaPrompt}
You understand cultural affinity graphs, cross-domain taste vectors (music, film, literature, fashion, architecture), and human subcultural history.

Context of user profile: ${JSON.stringify(userContext || {})}
Conversation History: ${JSON.stringify(history || [])}
User's Question: "${question}"

Provide a sophisticated, insightful, concise curatorial answer (2-3 paragraphs maximum).
Explain the cultural sociology, shared artistic ancestry, and latent taste vectors.
Use real cultural citations and critical consensus where relevant.
Speak with curatorial clarity, intellectual rigor, and cultural warmth. Avoid generic AI corporate fluff.`;

    if (process.env.GEMINI_API_KEY) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            tools: [{ googleSearch: {} }],
          },
        });

        const text = response.text || '';
        const searchChunks = (response.candidates?.[0] as any)?.groundingMetadata?.groundingChunks || [];
        const webSources = searchChunks
          .map((chunk: any) => chunk.web)
          .filter(Boolean)
          .map((w: any) => ({ title: w.title, uri: w.uri }));

        return res.json({ answer: text, sources: webSources });
      } catch (searchErr) {
        // Fallback without search if tools fail
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
        });
        return res.json({ answer: response.text, sources: [] });
      }
    }

    return res.json({
      answer: `From a Qloo taste-vector perspective, cultural affinity operates not through rigid genre borders, but through shared aesthetic temperaments and emotional textures. When you connect works like Wong Kar-wai's cinema with Burial's production, the underlying latent vector is what cultural theorist Mark Fisher identified as "hauntology"—the presence of lost futures, rain-slicked nocturnal isolation, and analog warmth surviving in a hyper-digital world.\n\nRather than asking "Do you like indie rock?", the Qloo graph asks "Do you respond to reverberant space, deliberate emotional withholding, and tactile textures?" This cross-domain bridge is why someone who admires Brutalist architecture also disproportionately finds solace in modal ambient jazz and existential speculative fiction.`,
      sources: []
    });
  } catch (error: any) {
    console.error('Error in /api/taste/interrogate:', error);
    res.status(500).json({ error: error.message || 'Interrogation error' });
  }
});

// 4. Audio Transcription with gemini-3.5-transcribe
app.post('/api/audio/transcribe', async (req, res) => {
  try {
    const { audioBase64, mimeType } = req.body;
    if (!audioBase64) {
      return res.status(400).json({ error: 'Missing audio base64 payload' });
    }

    if (process.env.GEMINI_API_KEY) {
      const audioPart = {
        inlineData: {
          mimeType: mimeType || 'audio/webm',
          data: audioBase64,
        },
      };

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-transcribe',
        contents: {
          parts: [
            audioPart,
            { text: 'Transcribe this voice recording of cultural taste preferences into clean, concise text.' },
          ],
        },
      });

      return res.json({ text: response.text || '' });
    }

    return res.json({ text: 'Wong Kar-wai, Burial, Haruki Murakami, and brutalist architecture' });
  } catch (error: any) {
    console.error('Error in /api/audio/transcribe:', error);
    res.status(500).json({ error: error.message || 'Transcription failed' });
  }
});

// 5. Spatial & Cultural Sanctuaries Scout (Google Maps & Places)
app.post('/api/places/scout', async (req, res) => {
  try {
    const { city, aestheticVibe } = req.body;
    const targetCity = city || 'Tokyo';
    const vibe = aestheticVibe || 'Nocturnal Jazz Kissaten, Brutalist Architecture, and Arthouse Cinema';

    const prompt = `You are the Qloo Spatial & Architectural Cultural Scout.
Discover 4 authentic, real-world cultural sanctuaries in ${targetCity} matching the aesthetic vibe: "${vibe}".
Venues should include:
1. An authentic vinyl listening bar or historic coffee kissaten
2. An independent arthouse cinema or retrospective theater
3. An architectural monument or brutalist/minimalist landmark
4. An archival art bookshop or underground gallery

Return ONLY a valid JSON array of 4 items with this structure:
[
  {
    "name": "Name of Place",
    "category": "listening_bar | arthouse_cinema | architecture | bookstore_gallery",
    "neighborhood": "Neighborhood / District in ${targetCity}",
    "aestheticResonance": "Why someone with this cultural profile will find sanctuary here",
    "recommendedExperience": "A specific drink, seat, gallery wing, or ritual to experience there",
    "coordinates": "Approximate district or street address"
  }
]`;

    if (process.env.GEMINI_API_KEY) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            tools: [{ googleMaps: {} }],
          },
        });

        if (response.text) {
          return res.json({ places: JSON.parse(response.text) });
        }
      } catch (mapsErr) {
        // Fallback without googleMaps if not enabled on key
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });
        if (response.text) {
          return res.json({ places: JSON.parse(response.text) });
        }
      }
    }

    // Curated high-fidelity fallback for Tokyo
    return res.json({
      places: [
        {
          name: 'Lion Kissaten (名曲喫茶ライオン)',
          category: 'listening_bar',
          neighborhood: 'Dogenzaka, Shibuya',
          aestheticResonance: 'Founded in 1926, this cathedral of classical audio forbids talking and features a monumental custom two-story horn speaker system facing forward like pews in a church.',
          recommendedExperience: 'Order an iced black coffee, sit in the velvet second-floor balcony, and listen to orchestral vinyl in strict shared silence.',
          coordinates: '2-19-13 Dogenzaka, Shibuya'
        },
        {
          name: 'Bunkamura Le Cinéma',
          category: 'arthouse_cinema',
          neighborhood: 'Shibuya',
          aestheticResonance: 'Tokyo\'s premier single-screen temple for international retrospective cinema, Criterion restorations, and French auteur films.',
          recommendedExperience: 'Catch a late-afternoon 35mm screening of Eric Rohmer or Yasujiro Ozu.',
          coordinates: '2-24-1 Dogenzaka, Shibuya'
        },
        {
          name: 'Yoyogi National Gymnasium & St. Mary\'s Cathedral',
          category: 'architecture',
          neighborhood: 'Bunkyo / Shibuya',
          aestheticResonance: 'Kenzo Tange\'s monumental concrete masterpieces, where brutalist structural physics meet transcendent spiritual acoustics.',
          recommendedExperience: 'Enter St. Mary\'s Cathedral at 15:00 on an overcast afternoon to witness light slicing through vertical concrete slits.',
          coordinates: '3-16-15 Sekiguchi, Bunkyo'
        },
        {
          name: 'Daikanyama T-Site / Tsutaya Books',
          category: 'bookstore_gallery',
          neighborhood: 'Daikanyama',
          aestheticResonance: 'Klein Dytham architecture blending lattice facades with rare vintage film monographs, imported design periodicals, and analog vinyl stacks.',
          recommendedExperience: 'Browse the archival cinema section on the second floor while listening to ambient jazz.',
          coordinates: '17-5 Sarugakucho, Shibuya'
        }
      ]
    });
  } catch (error: any) {
    console.error('Error in /api/places/scout:', error);
    res.status(500).json({ error: error.message || 'Places scouting error' });
  }
});

// 4. Qloo Status & Proxy Check
app.get('/api/qloo/status', (req, res) => {
  res.json({
    status: 'active',
    model: 'gemini-3.8-flash',
    knowledgeBaseEntities: KNOWLEDGE_GRAPH.length,
    domainsSupported: ['cinema', 'music', 'literature', 'architecture', 'fashion', 'dining'],
    geminiConfigured: !!process.env.GEMINI_API_KEY,
  });
});

// Serve frontend in production or via Vite middlewares in development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Qloo Resonance server running on port ${PORT}`);
  });
}

startServer();
