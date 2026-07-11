import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AQLogo from '../components/AQLogo'; // Imported brand logo component

const accountSections = ['Profile', 'Billing', 'Email Notifications', 'Settings'];

const socialPlatforms = [
  { key: 'github', label: 'GitHub', prefix: 'github.com/' },
  { key: 'twitter', label: 'X (Twitter)', prefix: 'x.com/' },
  { key: 'linkedin', label: 'LinkedIn', prefix: 'linkedin.com/in/' },
  { key: 'instagram', label: 'Instagram', prefix: 'instagram.com/' },
  { key: 'youtube', label: 'YouTube', prefix: 'youtube.com/@' },
  { key: 'twitch', label: 'Twitch', prefix: 'twitch.tv/' },
  { key: 'tiktok', label: 'TikTok', prefix: 'tiktok.com/@' },
];

export default function Account() {
  const navigate = useNavigate();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : { username: 'munira04', email: '' };

  const [activeSection, setActiveSection] = useState('Profile');
  const [form, setForm] = useState({
    name: user.username || '',
    username: user.username || '',
    location: '',
    work: '',
    education: 'USIU-Africa',
    website: '',
    bio: '',
  });
  const [socials, setSocials] = useState<Record<string, string>>({
    github: 'Munira04', twitter: '', linkedin: '', instagram: '', youtube: '', twitch: '', tiktok: '',
  });
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [saved, setSaved] = useState(false);

  const updateForm = (key: string, val: string) => {
    setForm(prev => ({ ...prev, [key]: val }));
    if (key === 'username') {
      setUsernameAvailable(val !== 'admin' && val !== 'test' && val.length > 2);
    }
  };

  const handleSave = () => {
    const updated = { ...user, username: form.username };
    localStorage.setItem('user', JSON.stringify(updated));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', background: '#0D0B1A', border: '1px solid #2d1f4e', borderRadius: 8,
    padding: '10px 12px', fontSize: 13, color: '#fff', outline: 'none', boxSizing: 'border-box' as any,
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 12, color: '#A1A1AA', marginBottom: 6, display: 'block', fontWeight: 500,
  };

  const groupStyle: React.CSSProperties = {
    display: 'flex', flexDirection: 'column', gap: 4,
  };

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
        <span style={{ color: '#fff', fontSize: 14 }}>Account Settings</span>
      </div>

      <div style={{ maxWidth: 1000, margin: '40px auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '200px 1fr', gap: 32 }}>

        {/* LEFT: Nav */}
        <div style={{ background: '#120F1F', border: '1px solid #2d1f4e', borderRadius: 12, padding: 12, height: 'fit-content' }}>
          {accountSections.map(section => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              style={{ width: '100%', textAlign: 'left', padding: '10px 12px', borderRadius: 8, background: activeSection === section ? '#1A1028' : 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: activeSection === section ? '#fff' : '#A1A1AA', fontWeight: activeSection === section ? 500 : 400, marginBottom: 2 }}
            >
              {section}
            </button>
          ))}
        </div>

        {/* RIGHT: Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {activeSection === 'Profile' && (
            <>
              {/* Avatar section */}
              <div style={{ background: '#120F1F', border: '1px solid #2d1f4e', borderRadius: 12, padding: 24 }}>
                <p style={{ fontSize: 12, color: '#8B5CF6', fontWeight: 600, letterSpacing: 1, marginBottom: 16 }}>AVATAR</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, #8B5CF6, #A78BFA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 700 }}>
                    {form.username?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <button style={{ padding: '7px 14px', borderRadius: 7, border: '1px solid #2d1f4e', background: 'none', color: '#A1A1AA', fontSize: 12, cursor: 'pointer', marginRight: 8 }}>
                      Upload photo
                    </button>
                    <p style={{ fontSize: 11, color: '#555', marginTop: 6 }}>JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>
              </div>

              {/* Core metadata */}
              <div style={{ background: '#120F1F', border: '1px solid #2d1f4e', borderRadius: 12, padding: 24 }}>
                <p style={{ fontSize: 12, color: '#8B5CF6', fontWeight: 600, letterSpacing: 1, marginBottom: 20 }}>CORE INFORMATION</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div style={groupStyle}>
                    <label style={labelStyle}>Display Name</label>
                    <input value={form.name} onChange={e => updateForm('name', e.target.value)} style={inputStyle} />
                  </div>

                  <div style={groupStyle}>
                    <label style={labelStyle}>Username</label>
                    <input value={form.username} onChange={e => updateForm('username', e.target.value)} style={{ ...inputStyle, borderColor: form.username.length > 2 ? (usernameAvailable ? '#22C55E' : '#EF4444') : '#2d1f4e' }} />
                    {form.username.length > 2 && (
                      <span style={{ fontSize: 11, color: usernameAvailable ? '#22C55E' : '#EF4444', marginTop: 2 }}>
                        {usernameAvailable ? '✓ Username is available' : '✗ Username is taken'}
                      </span>
                    )}
                  </div>

                  <div style={groupStyle}>
                    <label style={labelStyle}>Location</label>
                    <input value={form.location} onChange={e => updateForm('location', e.target.value)} placeholder="e.g. Nairobi, Kenya" style={inputStyle} />
                  </div>

                  <div style={groupStyle}>
                    <label style={labelStyle}>Work</label>
                    <input value={form.work} onChange={e => updateForm('work', e.target.value)} placeholder="e.g. Software Engineer at..." style={inputStyle} />
                  </div>

                  <div style={groupStyle}>
                    <label style={labelStyle}>Education</label>
                    <input value={form.education} onChange={e => updateForm('education', e.target.value)} placeholder="e.g. USIU-Africa" style={inputStyle} />
                  </div>

                  <div style={groupStyle}>
                    <label style={labelStyle}>Website</label>
                    <input value={form.website} onChange={e => updateForm('website', e.target.value)} placeholder="https://yoursite.com" style={inputStyle} />
                  </div>
                </div>

                <div style={{ ...groupStyle, marginTop: 16 }}>
                  <label style={labelStyle}>Bio</label>
                  <textarea
                    value={form.bio}
                    onChange={e => updateForm('bio', e.target.value)}
                    rows={4}
                    placeholder="Tell the community a bit about yourself..."
                    style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                  />
                  <span style={{ fontSize: 11, color: '#555' }}>{form.bio.length} / 200 characters</span>
                </div>
              </div>

              {/* Social Identity Hub */}
              <div style={{ background: '#120F1F', border: '1px solid #2d1f4e', borderRadius: 12, padding: 24 }}>
                <p style={{ fontSize: 12, color: '#8B5CF6', fontWeight: 600, letterSpacing: 1, marginBottom: 20 }}>SOCIAL LINKS</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {socialPlatforms.map(platform => (
                    <div key={platform.key} style={groupStyle}>
                      <label style={labelStyle}>{platform.label}</label>
                      <div style={{ display: 'flex', alignItems: 'center', background: '#0D0B1A', border: '1px solid #2d1f4e', borderRadius: 8, overflow: 'hidden' }}>
                        <span style={{ padding: '10px 12px', fontSize: 12, color: '#555', background: '#120F1F', borderRight: '1px solid #2d1f4e', whiteSpace: 'nowrap', flexShrink: 0 }}>
                          {platform.prefix}
                        </span>
                        <input
                          value={socials[platform.key]}
                          onChange={e => setSocials(prev => ({ ...prev, [platform.key]: e.target.value }))}
                          placeholder="username"
                          style={{ flex: 1, background: 'transparent', border: 'none', padding: '10px 12px', fontSize: 13, color: '#fff', outline: 'none' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Save button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                {saved && <span style={{ fontSize: 13, color: '#22C55E', alignSelf: 'center' }}>✓ Changes saved!</span>}
                <button
                  onClick={handleSave}
                  style={{ padding: '10px 24px', borderRadius: 8, border: 'none', background: '#8B5CF6', color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
                >
                  Save Changes
                </button>
              </div>
            </>
          )}

          {activeSection === 'Billing' && (
            <div style={{ background: '#120F1F', border: '1px solid #2d1f4e', borderRadius: 12, padding: 40, textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>💳</div>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 8 }}>You're on the Free Plan</h3>
              <p style={{ fontSize: 13, color: '#A1A1AA', marginBottom: 24 }}>Upgrade to Pro to unlock unlimited AI queries, advanced tracks, and more.</p>
              <button style={{ padding: '10px 24px', borderRadius: 8, border: 'none', background: '#8B5CF6', color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
                Upgrade to Pro ⚡
              </button>
            </div>
          )}

          {activeSection === 'Email Notifications' && (
            <div style={{ background: '#120F1F', border: '1px solid #2d1f4e', borderRadius: 12, padding: 24 }}>
              <p style={{ fontSize: 12, color: '#8B5CF6', fontWeight: 600, letterSpacing: 1, marginBottom: 20 }}>NOTIFICATION PREFERENCES</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  'Weekly XP summary email',
                  'New follower notifications',
                  'Community replies to your posts',
                  'New lesson releases in your tracks',
                  'Streak reminder emails',
                ].map(item => (
                  <div key={item} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #2d1f4e' }}>
                    <span style={{ fontSize: 13, color: '#fff' }}>{item}</span>
                    <input type="checkbox" defaultChecked style={{ accentColor: '#8B5CF6', width: 16, height: 16, cursor: 'pointer' }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'Settings' && (
            <div style={{ background: '#120F1F', border: '1px solid #2d1f4e', borderRadius: 12, padding: 24 }}>
              <p style={{ fontSize: 12, color: '#8B5CF6', fontWeight: 600, letterSpacing: 1, marginBottom: 20 }}>ACCOUNT SETTINGS</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ padding: '14px 0', borderBottom: '1px solid #2d1f4e' }}>
                  <h4 style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 4 }}>Change Password</h4>
                  <p style={{ fontSize: 12, color: '#A1A1AA', marginBottom: 10 }}>Update your password to keep your account secure.</p>
                  <button style={{ padding: '7px 14px', borderRadius: 7, border: '1px solid #2d1f4e', background: 'none', color: '#A1A1AA', fontSize: 12, cursor: 'pointer' }}>
                    Change Password →
                  </button>
                </div>
                <div style={{ padding: '14px 0' }}>
                  <h4 style={{ fontSize: 14, fontWeight: 600, color: '#EF4444', marginBottom: 4 }}>Delete Account</h4>
                  <p style={{ fontSize: 12, color: '#A1A1AA', marginBottom: 10 }}>Once deleted, your account cannot be recovered.</p>
                  <button style={{ padding: '7px 14px', borderRadius: 7, border: '1px solid #EF444433', background: 'none', color: '#EF4444', fontSize: 12, cursor: 'pointer' }}>
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}