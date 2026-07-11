import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AQLogo from '../components/AQLogo'; // Imported brand logo component

const skillBadges = ['Python', 'JavaScript', 'HTML', 'CSS', 'TypeScript', 'React', 'Java', 'SQL', 'C++'];

const achievements = [
  { icon: '🏆', title: 'First Blood', desc: 'Completed your first lesson', date: 'Jun 14, 2026' },
  { icon: '🔥', title: '7-Day Streak', desc: 'Studied 7 days in a row', date: 'Jun 16, 2026' },
  { icon: '⚡', title: 'Speed Coder', desc: 'Completed a lesson in under 5 minutes', date: 'Jun 17, 2026' },
  { icon: '🧠', title: 'Quiz Master', desc: 'Scored 100% on a quiz', date: 'Jun 18, 2026' },
];

const stats = [
  { label: 'Total XP', value: '1,850' },
  { label: 'Lessons Done', value: '12' },
  { label: 'Quizzes Passed', value: '8' },
  { label: 'Day Streak', value: '7 🔥' },
  { label: 'Rank', value: '#4' },
  { label: 'Level', value: '3' },
];

const tabs = ['Overview', 'Projects', 'Posts'];

export default function Profile() {
  const navigate = useNavigate();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : { username: 'munira04', xp: 1850, level: 3 };
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div style={{ minHeight: '100vh', background: '#08080C', color: '#fff', fontFamily: 'Inter, sans-serif' }}>

      {/* Header */}
      <div style={{ background: '#120F1F', borderBottom: '1px solid #2d1f4e', padding: '12px 32px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
          <AQLogo size={20} />
          <span style={{ color: '#8B5CF6', fontWeight: 700, fontSize: 15 }}>
            Academic<span style={{ color: '#fff' }}>Quest</span>
          </span>
        </div>
        <span style={{ color: '#444' }}>/</span>
        <span style={{ color: '#fff', fontSize: 14 }}>@{user.username}</span>
      </div>

      {/* Banner */}
      <div style={{ height: 180, background: 'linear-gradient(135deg, #1A102B 0%, #211538 50%, #0B0B0F 100%)', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, #8B5CF620 0%, transparent 60%), radial-gradient(circle at 80% 20%, #A78BFA15 0%, transparent 50%)' }} />
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>

        {/* Avatar overlapping banner */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20, marginTop: -56, marginBottom: 24 }}>
          <div style={{ width: 112, height: 112, borderRadius: '50%', background: 'linear-gradient(135deg, #8B5CF6, #A78BFA)', border: '4px solid #08080C', display: 'flex', alignItems: 'center', justifycontent: 'center', fontSize: 40, fontWeight: 700, flexShrink: 0 }}>
            {user.username?.[0]?.toUpperCase()}
          </div>
          <div style={{ paddingBottom: 8 }}>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{user.username}</h1>
            <p style={{ fontSize: 13, color: '#A1A1AA' }}>@{user.username} · Joined June 2026</p>
          </div>
          <button
            onClick={() => navigate('/account')}
            style={{ marginLeft: 'auto', padding: '8px 18px', borderRadius: 8, border: '1px solid #2d1f4e', background: 'none', color: '#A1A1AA', fontSize: 13, cursor: 'pointer', marginBottom: 8 }}
          >
            Edit Profile
          </button>
        </div>

        {/* Main layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 28 }}>

          {/* LEFT: Vitals */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Bio */}
            <div style={{ background: '#120F1F', border: '1px solid #2d1f4e', borderRadius: 12, padding: 18 }}>
              <p style={{ fontSize: 13, color: '#A1A1AA', lineHeight: 1.6 }}>
                CS student at USIU-Africa 🎓 Building AcademicQuest. Loves Python and problem-solving.
              </p>
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  { icon: '🎓', text: 'USIU-Africa' },
                  { icon: '📍', text: 'Nairobi, Kenya' },
                  { icon: '🌐', text: 'github.com/Munira04' },
                ].map(item => (
                  <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#A1A1AA' }}>
                    <span>{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Followers */}
            <div style={{ background: '#120F1F', border: '1px solid #2d1f4e', borderRadius: 12, padding: 18 }}>
              <div style={{ display: 'flex', gap: 20 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>24</div>
                  <div style={{ fontSize: 11, color: '#555' }}>Following</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>61</div>
                  <div style={{ fontSize: 11, color: '#555' }}>Followers</div>
                </div>
              </div>
            </div>

            {/* Skills Grid */}
            <div style={{ background: '#120F1F', border: '1px solid #2d1f4e', borderRadius: 12, padding: 18 }}>
              <p style={{ fontSize: 11, color: '#8B5CF6', fontWeight: 600, letterSpacing: 1, marginBottom: 12 }}>SKILLS</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {skillBadges.map(skill => (
                  <span key={skill} style={{ fontSize: 11, background: '#1A1028', border: '1px solid #2d1f4e', color: '#A78BFA', padding: '3px 10px', borderRadius: 20 }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Tabbed content */}
          <div>
            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid #2d1f4e', marginBottom: 24 }}>
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{ padding: '10px 20px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: activeTab === tab ? '#fff' : '#A1A1AA', borderBottom: activeTab === tab ? '2px solid #8B5CF6' : '2px solid transparent', fontWeight: activeTab === tab ? 600 : 400 }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Overview tab */}
            {activeTab === 'Overview' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                  {stats.map(s => (
                    <div key={s.label} style={{ background: '#120F1F', border: '1px solid #2d1f4e', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                      <div style={{ fontSize: 20, fontWeight: 700, color: '#8B5CF6', marginBottom: 4 }}>{s.value}</div>
                      <div style={{ fontSize: 11, color: '#555' }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                <div>
                  <p style={{ fontSize: 12, color: '#8B5CF6', fontWeight: 600, letterSpacing: 1, marginBottom: 14 }}>RECENT ACHIEVEMENTS</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {achievements.map(a => (
                      <div key={a.title} style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#120F1F', border: '1px solid #2d1f4e', borderRadius: 10, padding: 14 }}>
                        <span style={{ fontSize: 24 }}>{a.icon}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{a.title}</div>
                          <div style={{ fontSize: 12, color: '#A1A1AA' }}>{a.desc}</div>
                        </div>
                        <span style={{ fontSize: 11, color: '#555' }}>{a.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Projects tab */}
            {activeTab === 'Projects' && (
              <div style={{ textAlign: 'center', padding: '60px 20px', background: '#120F1F', borderRadius: 12, border: '1px solid #2d1f4e' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🏗️</div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 8 }}>No projects yet</h3>
                <p style={{ fontSize: 13, color: '#A1A1AA', marginBottom: 20 }}>
                  You don't have any projects yet. Add one to the Project Showcase!
                </p>
                <button
                  onClick={() => navigate('/build')}
                  style={{ padding: '8px 20px', borderRadius: 8, border: 'none', background: '#8B5CF6', color: '#fff', fontSize: 13, cursor: 'pointer' }}
                >
                  Go to Build →
                </button>
              </div>
            )}

            {/* Posts tab */}
            {activeTab === 'Posts' && (
              <div style={{ textAlign: 'center', padding: '60px 20px', background: '#120F1F', borderRadius: 12, border: '1px solid #2d1f4e' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>💬</div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 8 }}>No posts yet</h3>
                <p style={{ fontSize: 13, color: '#A1A1AA', marginBottom: 20 }}>
                  You haven't made any posts yet. Why not say hi to our Community in #introductions?
                </p>
                <button
                  onClick={() => navigate('/community')}
                  style={{ padding: '8px 20px', borderRadius: 8, border: 'none', background: '#8B5CF6', color: '#fff', fontSize: 13, cursor: 'pointer' }}
                >
                  Go to Community →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}