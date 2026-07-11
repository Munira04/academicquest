import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';

const files = [
  { name: 'index.html', lang: 'html', icon: '🏗️', starter: '<!DOCTYPE html>\n<html>\n<head>\n  <title>My Project</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Hello AcademicQuest!</h1>\n  <p>Edit this file to get started.</p>\n  <script src="app.js"></script>\n</body>\n</html>' },
  { name: 'style.css', lang: 'css', icon: '🎨', starter: 'body {\n  font-family: sans-serif;\n  background: #0f0f0f;\n  color: #ffffff;\n  margin: 0;\n  padding: 20px;\n}\n\nh1 {\n  color: #8B5CF6;\n}' },
  { name: 'app.js', lang: 'javascript', icon: '⚡', starter: '// Your JavaScript goes here\nconsole.log("AcademicQuest Build loaded!");\n\ndocument.querySelector("h1").addEventListener("click", () => {\n  alert("You clicked the heading!");\n});' },
];

const inspirationProjects = [
  { icon: '🌐', title: 'Personal Portfolio', desc: 'Build a responsive portfolio showcasing your work.', steps: 5, xp: 300, tags: ['HTML', 'CSS', 'JS'] },
  { icon: '✅', title: 'Todo App', desc: 'A fully functional todo list with local storage.', steps: 4, xp: 250, tags: ['JavaScript'] },
  { icon: '🎮', title: 'Quiz Game', desc: 'Interactive quiz game with score tracking.', steps: 6, xp: 400, tags: ['JS', 'CSS'] },
  { icon: '🌤️', title: 'Weather App', desc: 'Fetch and display real weather using an API.', steps: 5, xp: 350, tags: ['JS', 'API'] },
  { icon: '💬', title: 'Chat Interface', desc: 'Chat UI with message bubbles and timestamps.', steps: 4, xp: 200, tags: ['HTML', 'CSS'] },
  { icon: '🐍', title: 'Python Calculator', desc: 'Build a CLI calculator with full operations.', steps: 3, xp: 150, tags: ['Python'] },
];

interface Project {
  id: string;
  name: string;
  lang: string;
  icon: string;
  lastEdited: string;
  color: string;
}

export default function Build() {
  const navigate = useNavigate();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const [view, setView] = useState<'hub' | 'editor'>('hub');
  const [activeFile, setActiveFile] = useState(0);
  const [codes, setCodes] = useState(files.map(f => f.starter));
  const [previewOpen, setPreviewOpen] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectLang, setNewProjectLang] = useState('Python');
  const [projects, setProjects] = useState<Project[]>([
    { id: '1', name: 'My Portfolio Site', lang: 'HTML/CSS/JS', icon: '🌐', lastEdited: '2 hours ago', color: '#8B5CF6' },
    { id: '2', name: 'Python Calculator', lang: 'Python', icon: '🐍', lastEdited: 'Yesterday', color: '#3B82F6' },
  ]);

  const updateCode = (val: string | undefined) => {
    const updated = [...codes];
    updated[activeFile] = val || '';
    setCodes(updated);
  };

  const getPreviewSrc = () => {
    const html = codes[0];
    const css = `<style>${codes[1]}</style>`;
    const js = `<script>${codes[2]}<\/script>`;
    const full = html.replace('</head>', `${css}</head>`).replace('</body>', `${js}</body>`);
    return `data:text/html;charset=utf-8,${encodeURIComponent(full)}`;
  };

  const createProject = () => {
    if (!newProjectName.trim()) return;
    const icons: Record<string, string> = { Python: '🐍', JavaScript: '⚡', HTML: '🏗️', CSS: '🎨', TypeScript: '🔷', Java: '☕' };
    const colors: Record<string, string> = { Python: '#3B82F6', JavaScript: '#F59E0B', HTML: '#8B5CF6', CSS: '#06B6D4', TypeScript: '#0EA5E9', Java: '#EF4444' };
    const newProject: Project = {
      id: Date.now().toString(),
      name: newProjectName,
      lang: newProjectLang,
      icon: icons[newProjectLang] || '💻',
      lastEdited: 'Just now',
      color: colors[newProjectLang] || '#8B5CF6',
    };
    setProjects(prev => [newProject, ...prev]);
    setNewProjectName('');
    setShowNewModal(false);
    setView('editor');
  };

  // EDITOR VIEW
  if (view === 'editor') {
    return (
      <div style={{ height: '100vh', background: '#08080C', color: '#fff', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#120F1F', borderBottom: '1px solid #2d1f4e', padding: '8px 20px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <button onClick={() => setView('hub')} style={{ background: 'none', border: '1px solid #2d1f4e', borderRadius: 6, padding: '4px 10px', color: '#A1A1AA', fontSize: 12, cursor: 'pointer' }}>← Build Hub</button>
          <span style={{ color: '#A1A1AA', fontSize: 13 }}>Workspace</span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
            <button onClick={() => setPreviewOpen(o => !o)} style={{ padding: '5px 14px', borderRadius: 6, border: 'none', background: '#8B5CF6', color: '#fff', fontSize: 12, cursor: 'pointer' }}>
              {previewOpen ? 'Hide Preview' : '▶ Live Preview'}
            </button>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ display: 'flex', background: '#120F1F', borderBottom: '1px solid #2d1f4e', padding: '0 8px' }}>
              {files.map((f, i) => (
                <button key={f.name} onClick={() => setActiveFile(i)}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', fontSize: 12, color: activeFile === i ? '#fff' : '#A1A1AA', background: 'none', border: 'none', borderBottom: activeFile === i ? '2px solid #8B5CF6' : '2px solid transparent', cursor: 'pointer' }}>
                  {f.icon} {f.name}
                </button>
              ))}
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <Editor height="100%" language={files[activeFile].lang} value={codes[activeFile]} onChange={updateCode} theme="vs-dark"
                options={{ fontSize: 13, minimap: { enabled: false }, fontFamily: 'Fira Code, monospace', automaticLayout: true, padding: { top: 12 } }} />
            </div>
          </div>

          {previewOpen && (
            <div style={{ width: '45%', display: 'flex', flexDirection: 'column', borderLeft: '1px solid #2d1f4e' }}>
              <div style={{ padding: '8px 14px', background: '#120F1F', borderBottom: '1px solid #2d1f4e', fontSize: 12, color: '#A1A1AA', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', display: 'inline-block' }} /> Live Preview
              </div>
              <iframe src={getPreviewSrc()} style={{ flex: 1, border: 'none', background: '#fff' }} title="preview" sandbox="allow-scripts" />
            </div>
          )}
        </div>
      </div>
    );
  }

  // HUB VIEW
  return (
    <div style={{ minHeight: '100vh', background: '#08080C', color: '#fff', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column' }}>

      {/* Global Header */}
      <header style={{ background: '#120F1F', borderBottom: '1px solid #2d1f4e', padding: '0 32px', display: 'flex', alignItems: 'center', height: 56, flexShrink: 0 }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 40 }}>
          <span style={{ fontSize: 22 }}>🤖</span>
          <span style={{ color: '#8B5CF6', fontWeight: 700, fontSize: 15, cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
            Academic<span style={{ color: '#fff' }}>Quest</span>
          </span>
        </div>

        {/* Center Nav */}
        <nav style={{ display: 'flex', gap: 4, flex: 1, justifyContent: 'center' }}>
          {['Learn', 'Practice', 'Build', 'Community'].map(link => (
            <button
              key={link}
              onClick={() => navigate(`/${link.toLowerCase()}`)}
              style={{
                padding: '6px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13,
                background: link === 'Build' ? '#8B5CF620' : 'none',
                color: link === 'Build' ? '#A78BFA' : '#A1A1AA',
                borderBottom: link === 'Build' ? '2px solid #8B5CF6' : '2px solid transparent',
                fontWeight: link === 'Build' ? 600 : 400,
              }}
            >
              {link}
            </button>
          ))}
        </nav>

        {/* Right: Bell + Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, position: 'relative', padding: 4 }}>
            🔔
            <span style={{ position: 'absolute', top: 2, right: 2, width: 7, height: 7, borderRadius: '50%', background: '#EF4444', border: '1px solid #120F1F' }} />
          </button>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #8B5CF6, #A78BFA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', cursor: 'pointer' }}
            onClick={() => navigate('/profile')}>
            {user?.username?.[0]?.toUpperCase() || 'U'}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ background: 'linear-gradient(135deg, #1A102B 0%, #120F1F 60%, #08080C 100%)', padding: '60px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, #8B5CF615 0%, transparent 60%), radial-gradient(circle at 80% 30%, #A78BFA10 0%, transparent 50%)' }} />
        <div style={{ position: 'relative', maxWidth: 640, margin: '0 auto' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🛠️</div>
          <h1 style={{ fontSize: 34, fontWeight: 800, color: '#fff', marginBottom: 14, lineHeight: 1.2 }}>
            Build right here on <span style={{ color: '#8B5CF6' }}>AcademicQuest</span>
          </h1>
          <p style={{ fontSize: 15, color: '#A1A1AA', lineHeight: 1.7, marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
            Create unlimited personal projects, test your ideas, and practice everything you've learned — all without leaving the platform.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button
              onClick={() => setShowNewModal(true)}
              style={{ padding: '12px 28px', borderRadius: 10, border: 'none', background: '#8B5CF6', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
            >
              + Create New Project
            </button>
            <button
              onClick={() => setView('editor')}
              style={{ padding: '12px 28px', borderRadius: 10, border: '1px solid #2d1f4e', background: 'none', color: '#A1A1AA', fontSize: 14, cursor: 'pointer' }}
            >
              Open Sandbox
            </button>
          </div>
        </div>
      </section>

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 32px', width: '100%', boxSizing: 'border-box' }}>

        {/* Your Workspace */}
        <section style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Your Workspace</h2>
              <p style={{ fontSize: 13, color: '#A1A1AA' }}>{projects.length} active project{projects.length !== 1 ? 's' : ''}</p>
            </div>
            <button
              onClick={() => setShowNewModal(true)}
              style={{ padding: '8px 18px', borderRadius: 8, border: '1px solid #2d1f4e', background: 'none', color: '#A78BFA', fontSize: 13, cursor: 'pointer' }}
            >
              + New Project
            </button>
          </div>

          {projects.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: '#120F1F', borderRadius: 14, border: '1px dashed #2d1f4e' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📂</div>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 8 }}>No projects yet</h3>
              <p style={{ fontSize: 13, color: '#A1A1AA', marginBottom: 20 }}>Create your first project to get started building!</p>
              <button onClick={() => setShowNewModal(true)} style={{ padding: '8px 20px', borderRadius: 8, border: 'none', background: '#8B5CF6', color: '#fff', fontSize: 13, cursor: 'pointer' }}>
                Create First Project
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
              {projects.map(project => (
                <div
                  key={project.id}
                  onClick={() => setView('editor')}
                  style={{ background: '#120F1F', border: '1px solid #2d1f4e', borderRadius: 14, overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = '#8B5CF6')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = '#2d1f4e')}
                >
                  <div style={{ height: 6, background: project.color }} />
                  <div style={{ padding: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 28 }}>{project.icon}</span>
                        <div>
                          <h3 style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 2 }}>{project.name}</h3>
                          <span style={{ fontSize: 11, color: '#A1A1AA' }}>{project.lang}</span>
                        </div>
                      </div>
                      <button
                        onClick={e => { e.stopPropagation(); setProjects(prev => prev.filter(p => p.id !== project.id)); }}
                        style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: 16, padding: 4 }}
                      >×</button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 11, color: '#555' }}>Last edited {project.lastEdited}</span>
                      <button
                        onClick={e => { e.stopPropagation(); setView('editor'); }}
                        style={{ fontSize: 12, padding: '4px 12px', borderRadius: 6, border: 'none', background: '#8B5CF620', color: '#A78BFA', cursor: 'pointer' }}
                      >
                        Open →
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add new card */}
              <div
                onClick={() => setShowNewModal(true)}
                style={{ background: '#120F1F', border: '1px dashed #2d1f4e', borderRadius: 14, padding: 20, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 120, gap: 8 }}
              >
                <span style={{ fontSize: 28, color: '#2d1f4e' }}>+</span>
                <span style={{ fontSize: 13, color: '#555' }}>New Project</span>
              </div>
            </div>
          )}
        </section>

        {/* Inspiration / Tutorials */}
        <section>
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Inspiration & Tutorials</h2>
            <p style={{ fontSize: 13, color: '#A1A1AA' }}>Step-by-step project blueprints to build real things</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {inspirationProjects.map(project => (
              <div
                key={project.title}
                style={{ background: '#120F1F', border: '1px solid #2d1f4e', borderRadius: 14, padding: 20, cursor: 'pointer', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#8B5CF6')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#2d1f4e')}
                onClick={() => setView('editor')}
              >
                <div style={{ fontSize: 32, marginBottom: 12 }}>{project.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 6 }}>{project.title}</h3>
                <p style={{ fontSize: 12, color: '#A1A1AA', lineHeight: 1.6, marginBottom: 14 }}>{project.desc}</p>
                <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
                  {project.tags.map(tag => (
                    <span key={tag} style={{ fontSize: 10, background: '#1A1028', border: '1px solid #2d1f4e', color: '#A78BFA', padding: '2px 8px', borderRadius: 20 }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                  <span style={{ color: '#555' }}>{project.steps} steps</span>
                  <span style={{ color: '#22C55E' }}>+{project.xp} XP</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ background: '#120F1F', borderTop: '1px solid #2d1f4e', padding: '32px', marginTop: 'auto' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 18 }}>🤖</span>
              <span style={{ color: '#8B5CF6', fontWeight: 700, fontSize: 14 }}>Academic<span style={{ color: '#fff' }}>Quest</span></span>
            </div>
            <p style={{ fontSize: 12, color: '#555' }}>Made with ❤️ in Nairobi, Kenya</p>
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            {['About', 'Blog', 'Community', 'Help Center'].map(link => (
              <button key={link} style={{ background: 'none', border: 'none', color: '#555', fontSize: 12, cursor: 'pointer' }}>{link}</button>
            ))}
          </div>
          <p style={{ fontSize: 11, color: '#444' }}>© 2026 AcademicQuest. All rights reserved.</p>
        </div>
      </footer>

      {/* Create Project Modal */}
      {showNewModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: 20 }}>
          <div style={{ background: '#120F1F', border: '1px solid #2d1f4e', borderRadius: 16, padding: 32, width: '100%', maxWidth: 440 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 6 }}>New Project</h3>
            <p style={{ fontSize: 13, color: '#A1A1AA', marginBottom: 24 }}>Give your project a name and choose a language to start with.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, color: '#A1A1AA', marginBottom: 6, display: 'block' }}>Project Name</label>
                <input
                  value={newProjectName}
                  onChange={e => setNewProjectName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && createProject()}
                  placeholder="e.g. My Portfolio Site"
                  autoFocus
                  style={{ width: '100%', background: '#0D0B1A', border: '1px solid #2d1f4e', borderRadius: 8, padding: '10px 12px', fontSize: 13, color: '#fff', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: 12, color: '#A1A1AA', marginBottom: 6, display: 'block' }}>Primary Language</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                  {['Python', 'JavaScript', 'HTML', 'CSS', 'TypeScript', 'Java'].map(lang => (
                    <button
                      key={lang}
                      onClick={() => setNewProjectLang(lang)}
                      style={{ padding: '8px 0', borderRadius: 8, border: `1px solid ${newProjectLang === lang ? '#8B5CF6' : '#2d1f4e'}`, background: newProjectLang === lang ? '#8B5CF620' : 'none', color: newProjectLang === lang ? '#A78BFA' : '#A1A1AA', fontSize: 12, cursor: 'pointer' }}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <button onClick={() => setShowNewModal(false)} style={{ flex: 1, padding: '10px', borderRadius: 8, border: '1px solid #2d1f4e', background: 'none', color: '#A1A1AA', fontSize: 13, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button onClick={createProject} disabled={!newProjectName.trim()} style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', background: '#8B5CF6', color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer', opacity: newProjectName.trim() ? 1 : 0.5 }}>
                  Create Project →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}