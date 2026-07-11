import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import AQLogo from '../components/AQLogo'; // Added the import here

const tags = ['All', '#help', '#showcase', '#python', '#javascript', '#career', '#tips'];

const posts = [
  { id: 1, author: 'munira04', avatar: 'M', tag: '#showcase', title: 'Built my first Python calculator!', body: 'Just finished lesson 3 on Python Fundamentals and decided to build a small calculator. Check out my code!', likes: 24, comments: 8, time: '2h ago', tier: 'gold' },
  { id: 2, author: 'fox_coder', avatar: 'F', tag: '#help', title: 'Why is my print() not working?', body: 'I keep getting a SyntaxError on line 3 but I can\'t figure out what\'s wrong. Anyone able to help?', likes: 5, comments: 12, time: '4h ago', tier: 'silver' },
  { id: 3, author: 'panda_py', avatar: 'P', tag: '#python', title: 'Understanding recursion finally clicked!', body: 'After struggling for days, the flashcard in lesson 5 made everything click. Recursion is just a function calling itself with a base case!', likes: 41, comments: 6, time: '6h ago', tier: 'bronze' },
  { id: 4, author: 'lion_dev', avatar: 'L', tag: '#career', title: 'Got my first coding internship!', body: 'Used the DSA track to prepare for interviews. Landed a summer internship. AcademicQuest genuinely helped.', likes: 89, comments: 22, time: '1d ago', tier: 'diamond' },
  { id: 5, author: 'code_queen', avatar: 'C', tag: '#tips', title: 'Tip: Use the /debug command in Quest AI', body: 'Paste your broken code and type /debug before it. Quest AI will find the exact line with the error and explain it clearly.', likes: 35, comments: 4, time: '1d ago', tier: 'gold' },
];

const leaderboard = [
  { rank: 1, name: 'lion_dev', xp: 4820, tier: 'diamond', avatar: 'L' },
  { rank: 2, name: 'code_queen', xp: 3640, tier: 'gold', avatar: 'C' },
  { rank: 3, name: 'panda_py', xp: 2910, tier: 'gold', avatar: 'P' },
  { rank: 4, name: 'munira04', xp: 1850, tier: 'silver', avatar: 'M' },
  { rank: 5, name: 'fox_coder', xp: 1200, tier: 'silver', avatar: 'F' },
  { rank: 6, name: 'dev_nova', xp: 980, tier: 'bronze', avatar: 'D' },
  { rank: 7, name: 'syntax_sam', xp: 710, tier: 'bronze', avatar: 'S' },
];

const tierStyles: Record<string, { color: string; label: string }> = {
  diamond: { color: '#67E8F9', label: '💎 Diamond' },
  gold: { color: '#F59E0B', label: '🥇 Gold' },
  silver: { color: '#A1A1AA', label: '🥈 Silver' },
  bronze: { color: '#D97706', label: '🥉 Bronze' },
};

export default function Community() {
  const navigate = useNavigate();
  const [activeTag, setActiveTag] = useState('All');
  const [search, setSearch] = useState('');
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const filtered = posts.filter(p => {
    const matchTag = activeTag === 'All' || p.tag === activeTag;
    const matchSearch = search === '' || p.title.toLowerCase().includes(search.toLowerCase()) || p.body.toLowerCase().includes(search.toLowerCase());
    return matchTag && matchSearch;
  });

  const toggleLike = (id: number) => {
    setLikedPosts(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#08080C', color: '#fff', fontFamily: 'Inter, sans-serif' }}>

      {/* Shared Nav Header Component */}
      <Header />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px', display: 'grid', gridTemplateColumns: '1fr 300px', gap: 28 }}>

        {/* LEFT: Forum */}
        <div>
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>🌍 Community</h1>
            <p style={{ color: '#A1A1AA', fontSize: 14, display: 'flex', alignItems: 'center', gap: 4 }}>
              Share, learn, and grow with fellow 
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginLeft: 4 }}>
                <AQLogo size={16} />
                <span style={{ color: '#8B5CF6', fontWeight: 700 }}>Academic<span style={{ color: '#fff' }}>Questers</span></span>
              </span>.
            </p>
          </div>

          {/* Search */}
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search discussions..."
            style={{ width: '100%', background: '#120F1F', border: '1px solid #2d1f4e', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#fff', outline: 'none', marginBottom: 16, boxSizing: 'border-box' }}
          />

          {/* Tag filters */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                style={{ padding: '5px 14px', borderRadius: 20, cursor: 'pointer', fontSize: 12, fontWeight: 500, background: activeTag === tag ? '#8B5CF6' : '#120F1F', color: activeTag === tag ? '#fff' : '#A1A1AA', border: activeTag === tag ? 'none' : '1px solid #2d1f4e' }}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Post button */}
          <button style={{ width: '100%', padding: '12px', borderRadius: 10, border: '1px dashed #2d1f4e', background: 'none', color: '#A1A1AA', fontSize: 13, cursor: 'pointer', marginBottom: 20 }}>
            + Share something with the community...
          </button>

          {/* Posts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {filtered.map(post => (
              <div key={post.id} style={{ background: '#120F1F', border: '1px solid #2d1f4e', borderRadius: 12, padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600 }}>
                    {post.avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: '#fff' }}>{post.author}</div>
                    <div style={{ fontSize: 11, color: '#555' }}>{post.time}</div>
                  </div>
                  <span style={{ marginLeft: 'auto', fontSize: 11, color: tierStyles[post.tier]?.color, fontWeight: 500 }}>
                    {tierStyles[post.tier]?.label}
                  </span>
                </div>

                <span style={{ fontSize: 11, background: '#1A1028', color: '#A78BFA', padding: '2px 8px', borderRadius: 4, marginBottom: 8, display: 'inline-block' }}>
                  {post.tag}
                </span>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 6, marginTop: 8 }}>{post.title}</h3>
                <p style={{ fontSize: 13, color: '#A1A1AA', lineHeight: 1.6, marginBottom: 14 }}>{post.body}</p>

                <div style={{ display: 'flex', gap: 16 }}>
                  <button
                    onClick={() => toggleLike(post.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: likedPosts.includes(post.id) ? '#8B5CF6' : '#555' }}
                  >
                    {likedPosts.includes(post.id) ? '♥' : '♡'} {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                  </button>
                  <button style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: '#555' }}>
                    💬 {post.comments}
                  </button>
                  <button style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: '#555', marginLeft: 'auto' }}>
                    Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Leaderboard */}
        <div>
          <div style={{ background: '#120F1F', border: '1px solid #2d1f4e', borderRadius: 14, padding: 20, position: 'sticky', top: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 4 }}>🏆 Weekly Leaderboard</h3>
            <p style={{ fontSize: 11, color: '#555', marginBottom: 20 }}>Top earners this week</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {leaderboard.map(player => (
                <div
                  key={player.rank}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, background: player.rank <= 3 ? '#1A1028' : 'transparent', border: player.rank <= 3 ? '1px solid #2d1f4e' : 'none' }}
                >
                  <span style={{ fontSize: 12, fontWeight: 700, color: player.rank === 1 ? '#F59E0B' : player.rank === 2 ? '#A1A1AA' : player.rank === 3 ? '#D97706' : '#555', minWidth: 20 }}>
                    #{player.rank}
                  </span>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: tierStyles[player.tier]?.color + '33', border: `1px solid ${tierStyles[player.tier]?.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: tierStyles[player.tier]?.color }}>
                    {player.avatar}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 500, color: '#fff' }}>{player.name}</div>
                    <div style={{ fontSize: 10, color: tierStyles[player.tier]?.color }}>{tierStyles[player.tier]?.label}</div>
                  </div>
                  <span style={{ fontSize: 11, color: '#A78BFA', fontWeight: 600 }}>{player.xp.toLocaleString()} XP</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 20, padding: '10px', background: '#1A1028', borderRadius: 8, border: '1px solid #8B5CF633', textAlign: 'center' }}>
              <p style={{ fontSize: 11, color: '#A1A1AA', marginBottom: 4 }}>Your rank this week</p>
              <p style={{ fontSize: 18, fontWeight: 700, color: '#8B5CF6' }}>#4</p>
              <p style={{ fontSize: 11, color: '#555' }}>1,850 XP earned</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}