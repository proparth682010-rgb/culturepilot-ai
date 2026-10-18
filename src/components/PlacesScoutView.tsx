import React, { useState } from 'react';
import { MapPin, Compass, Search, Wine, Film, Landmark, BookOpen, ExternalLink, Sparkles } from 'lucide-react';

interface PlaceItem {
  name: string;
  category: 'listening_bar' | 'arthouse_cinema' | 'architecture' | 'bookstore_gallery';
  neighborhood: string;
  aestheticResonance: string;
  recommendedExperience: string;
  coordinates: string;
}

interface PlacesScoutViewProps {
  currentAestheticVibe: string;
}

export const PlacesScoutView: React.FC<PlacesScoutViewProps> = ({ currentAestheticVibe }) => {
  const [city, setCity] = useState('Tokyo');
  const [isScouting, setIsScouting] = useState(false);
  const [places, setPlaces] = useState<PlaceItem[]>([
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
  ]);

  const handleScout = async (targetCity = city) => {
    setIsScouting(true);
    try {
      const res = await fetch('/api/places/scout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          city: targetCity,
          aestheticVibe: currentAestheticVibe || 'Nocturnal Jazz Kissaten, Brutalist Art, and Arthouse Cinema',
        }),
      });
      const data = await res.json();
      if (data.places) {
        setPlaces(data.places);
      }
    } catch (err) {
      console.error('Failed to scout places:', err);
    } finally {
      setIsScouting(false);
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'listening_bar':
        return <Wine className="w-4 h-4 text-amber-400" />;
      case 'arthouse_cinema':
        return <Film className="w-4 h-4 text-cyan-400" />;
      case 'architecture':
        return <Landmark className="w-4 h-4 text-rose-400" />;
      case 'bookstore_gallery':
        return <BookOpen className="w-4 h-4 text-emerald-400" />;
      default:
        return <MapPin className="w-4 h-4 text-[#d4a373]" />;
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'listening_bar':
        return 'Acoustic Listening Sanctuary';
      case 'arthouse_cinema':
        return 'Auteur Retrospective Cinema';
      case 'architecture':
        return 'Architectural Landmark';
      case 'bookstore_gallery':
        return 'Archival Gallery / Bookstore';
      default:
        return 'Cultural Sanctuary';
    }
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-stone-800 pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#d4a373] flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>Spatial & Geographic Latent Mapping</span>
          </div>
          <h2 className="text-3xl font-serif text-[#f2efe9] mt-1">
            Physical Cultural Sanctuaries
          </h2>
          <p className="text-sm text-stone-400 font-light max-w-2xl mt-1 leading-relaxed">
            Qloo maps the physical world as an extension of media taste. Discover listening bars, arthouse cinemas, and architectural shrines matching your aesthetic vectors.
          </p>
        </div>

        {/* Global City Switchers */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-stone-500 font-mono mr-1">Global Hubs:</span>
          {['Tokyo', 'London', 'New York', 'Paris', 'Berlin', 'Kyoto'].map((c) => (
            <button
              key={c}
              onClick={() => {
                setCity(c);
                handleScout(c);
              }}
              disabled={isScouting}
              className={`px-2.5 py-1 rounded border text-[11px] font-mono transition-colors cursor-pointer ${
                city === c
                  ? 'border-[#d4a373] bg-[#d4a373]/10 text-white font-medium'
                  : 'border-stone-800 bg-stone-900 text-stone-400 hover:text-stone-200 hover:border-stone-700'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleScout();
        }}
        className="flex items-center gap-3 bg-[#101214] border border-stone-800 rounded-xl p-3"
      >
        <MapPin className="w-4 h-4 text-stone-500 ml-2" />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter any global city (e.g. Vienna, Seoul, Copenhagen, San Francisco)..."
          className="flex-1 bg-transparent text-sm text-[#f2efe9] placeholder:text-stone-600 focus:outline-none font-medium"
        />
        <button
          type="submit"
          disabled={isScouting || !city.trim()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#d4a373] text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#e0b488] active:scale-95 transition-all cursor-pointer disabled:opacity-50"
        >
          {isScouting ? (
            <>
              <Compass className="w-3.5 h-3.5 animate-spin" />
              <span>Scouting...</span>
            </>
          ) : (
            <>
              <Search className="w-3.5 h-3.5" />
              <span>Scout Sanctuaries</span>
            </>
          )}
        </button>
      </form>

      {/* Grid of 4 Physical Sanctuaries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {places.map((place, idx) => (
          <div
            key={idx}
            className="bg-[#121417] border border-stone-800 rounded-xl p-6 space-y-4 hover:border-stone-700 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-stone-400">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(place.category)}
                  <span className="uppercase text-stone-300 font-medium">
                    {getCategoryLabel(place.category)}
                  </span>
                </div>
                <span className="text-stone-500">{place.neighborhood}</span>
              </div>

              <div>
                <h3 className="text-xl font-serif font-medium text-[#f2efe9]">
                  {place.name}
                </h3>
                <div className="text-xs text-stone-500 font-mono mt-0.5">
                  {place.coordinates}
                </div>
              </div>

              <p className="text-xs text-stone-300 font-light leading-relaxed">
                {place.aestheticResonance}
              </p>
            </div>

            {/* Recommended Ritual / Experience */}
            <div className="bg-stone-900/60 border border-stone-800/80 rounded-lg p-3 space-y-1 pt-2.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#d4a373] block flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#d4a373]" />
                Recommended Curatorial Ritual:
              </span>
              <p className="text-xs text-stone-300 font-light italic leading-relaxed">
                “{place.recommendedExperience}”
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
