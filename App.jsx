import React, { useState } from 'react';

const ADMIN_PASSWORD = '0617';
const GRADES = ['1', '2', '3'];
const DEPTS = [
  { key: 'middle', label: '중등부' },
  { key: 'high', label: '고등부' },
];

const ICON_PATHS = {
  book: 'M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2zM22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z',
  play: 'M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM10 8.5l5 3.5-5 3.5z',
  mic: 'M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v3',
  message: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  instagram: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zM16 11.4A4 4 0 1 1 12.6 8 4 4 0 0 1 16 11.4zM17.5 6.5h.01',
  user: 'M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  edit: 'M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z',
  search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3',
  x: 'M18 6 6 18M6 6l12 12',
  plus: 'M12 5v14M5 12h14',
  check: 'M20 6 9 17l-5-5',
  trash: 'M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6',
  image: 'M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM21 15l-5-5L5 21',
  save: 'M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2zM17 21v-8H7v8M7 3v5h8',
  external: 'M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6',
};

function Icon({ name, size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

const initialTeachers = () => ({
  middle: { '1': { '1-1': '' }, '2': { '2-1': '' }, '3': { '3-1': '' } },
  high: { '1': { '1-1': '' }, '2': { '2-1': '' }, '3': { '3-1': '' } },
});

const initialStudents = () => ({
  middle: { '1': { '1-1': [] }, '2': { '2-1': [] }, '3': { '3-1': [] } },
  high: { '1': { '1-1': [] }, '2': { '2-1': [] }, '3': { '3-1': [] } },
});

const nextClassName = (grade, classes) => {
  const nums = Object.keys(classes).map((c) => Number(c.split('-')[1]) || 0);
  return `${grade}-${(nums.length ? Math.max(...nums) : 0) + 1}`;
};

function SectionHead({ title, subtitle, isEditing, onEdit }) {
  return (
    <div className="section-head">
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <button type="button" className={`edit-btn${isEditing ? ' on' : ''}`} onClick={onEdit} disabled={!onEdit}>
        <Icon name={isEditing ? 'check' : 'edit'} size={14} />
        {isEditing ? '완료' : '수정'}
      </button>
    </div>
  );
}

function DeptToggle({ value, onChange }) {
  return (
    <div className="dept" role="tablist" aria-label="부서 선택">
      {DEPTS.map((d) => (
        <button key={d.key} type="button" role="tab" aria-selected={value === d.key} className={`seg${value === d.key ? ' active' : ''}`} onClick={() => onChange(d.key)}>
          {d.label}
        </button>
      ))}
    </div>
  );
}

function InfoCard({ icon, label, accent, children }) {
  return (
    <section className="card info-card" style={{ '--accent': accent }}>
      <div className="label">
        <Icon name={icon} />
        {label}
      </div>
      {children}
    </section>
  );
}

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const toHref = (url) => (/^https?:\/\//.test(url) ? url : `https://${url}`);
const youtubeId = (url) => url.match(/(?:youtu\.be\/|[?&]v=|shorts\/|embed\/|live\/)([\w-]{11})/)?.[1] ?? null;
const bibleSearchHref = (passage) => `https://www.google.com/search?q=${encodeURIComponent(`개역개정 ${passage}`)}`;

export const emptyWorship = () => ({ theme: '', hymns: [], passage: '', sermon: '', announcement: '', instagram: '', bread: '' });

function WorshipView({ data }) {
  return (
    <div className="stack">
      <InfoCard icon="book" label="주제" accent="#7e57c2">
        <div className="value lg">{data.theme || '등록된 주제가 없습니다.'}</div>
      </InfoCard>

      <InfoCard icon="play" label="찬양" accent="#ec4899">
        {data.hymns.length ? (
          <ul className="yt-list">
            {data.hymns.map((url, i) => {
              const id = youtubeId(url);
              return (
                <li key={`${url}-${i}`}>
                  <a className="yt-item" href={toHref(url)} target="_blank" rel="noopener noreferrer">
                    {id ? (
                      <img src={`https://i.ytimg.com/vi/${id}/mqdefault.jpg`} alt="" className="yt-thumb" />
                    ) : (
                      <span className="yt-thumb fallback"><Icon name="play" size={20} /></span>
                    )}
                    <span className="yt-meta">
                      <span className="yt-title">{`찬양 ${i + 1}`}</span>
                      <span className="yt-url">{url}</span>
                    </span>
                    <Icon name="external" size={14} />
                  </a>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="empty">등록된 찬양이 없습니다.</div>
        )}
      </InfoCard>

      <InfoCard icon="mic" label="말씀" accent="#60a5fa">
        {data.passage && (
          <a className="passage-chip" href={bibleSearchHref(data.passage)} target="_blank" rel="noopener noreferrer">
            <Icon name="book" size={13} />
            {data.passage}
          </a>
        )}
        {data.sermon ? (
          <div className="value pre">{data.sermon}</div>
        ) : (
          !data.passage && <div className="value" style={{ fontSize: 14 }}>등록된 말씀 요약이 없습니다.</div>
        )}
      </InfoCard>

      <InfoCard icon="message" label="광고" accent="#4ade80">
        <div className="inner-box pre">{data.announcement || '이번 주 광고가 없습니다.'}</div>
      </InfoCard>

      <InfoCard icon="instagram" label="파워웨이브 인스타" accent="#a855f7">
        {data.instagram ? (
          <a className="link" href={toHref(data.instagram)} target="_blank" rel="noopener noreferrer">{data.instagram}</a>
        ) : (
          <div className="empty">등록된 인스타그램 링크가 없습니다.</div>
        )}
      </InfoCard>

      <InfoCard icon="image" label="말씀식빵" accent="#fb923c">
        {data.bread ? (
          <img src={data.bread} alt="이번 주 말씀식빵" className="bread-img" />
        ) : (
          <div className="empty">이번 주 말씀식빵 이미지가 없습니다.</div>
        )}
      </InfoCard>
    </div>
  );
}

function WorshipForm({ data, onSave, onCancel }) {
  const [draft, setDraft] = useState(() => ({ ...data, hymns: data.hymns.length ? data.hymns : [''] }));
  const [imageError, setImageError] = useState('');
  const update = (key) => (e) => setDraft({ ...draft, [key]: e.target.value });
  const setHymn = (idx, value) => setDraft({ ...draft, hymns: draft.hymns.map((h, i) => (i === idx ? value : h)) });
  const removeHymn = (idx) => setDraft({ ...draft, hymns: draft.hymns.filter((_, i) => i !== idx) });

  const onImage = (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) return setImageError('이미지 파일만 업로드할 수 있습니다.');
    if (file.size > MAX_IMAGE_BYTES) return setImageError('5MB 이하의 이미지만 업로드할 수 있습니다.');
    setImageError('');
    const reader = new FileReader();
    reader.onload = () => setDraft((d) => ({ ...d, bread: reader.result }));
    reader.readAsDataURL(file);
  };

  const submit = (e) => {
    e.preventDefault();
    onSave({ ...draft, hymns: draft.hymns.map((h) => h.trim()).filter(Boolean) });
  };

  return (
    <form className="card form-card" onSubmit={submit}>
      <label className="form-field">
        <span className="form-label">예배 주제</span>
        <input className="field" value={draft.theme} onChange={update('theme')} placeholder="예) 구원의 확신" />
      </label>

      <div className="form-field">
        <span className="form-label">찬양 (유튜브 링크)</span>
        {draft.hymns.map((url, i) => (
          <div className="input-row" key={i}>
            <input className="field" type="url" inputMode="url" value={url} onChange={(e) => setHymn(i, e.target.value)} placeholder="https://youtu.be/..." aria-label={`찬양 ${i + 1} 링크`} />
            <button type="button" className="trash-btn" onClick={() => removeHymn(i)} aria-label={`찬양 ${i + 1} 삭제`}>
              <Icon name="trash" size={18} />
            </button>
          </div>
        ))}
        <button type="button" className="add-link" onClick={() => setDraft({ ...draft, hymns: [...draft.hymns, ''] })}>
          <Icon name="plus" size={15} />
          찬양 링크 추가
        </button>
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="passage">말씀 본문 (성경 찾기)</label>
        <div className="input-row">
          <input id="passage" className="field" value={draft.passage} onChange={update('passage')} placeholder="예) 창세기 1장~3장" />
          <a
            className={`find-btn${draft.passage.trim() ? '' : ' disabled'}`}
            href={draft.passage.trim() ? bibleSearchHref(draft.passage.trim()) : undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!draft.passage.trim()}
          >
            <Icon name="search" size={15} />
            찾기
          </a>
        </div>
      </div>

      <label className="form-field">
        <span className="form-label">말씀 내용 요약</span>
        <textarea className="field" value={draft.sermon} onChange={update('sermon')} placeholder="설교 본문이나 요약을 적어주세요." />
      </label>

      <label className="form-field">
        <span className="form-label">광고 및 공지</span>
        <textarea className="field" value={draft.announcement} onChange={update('announcement')} placeholder="이번 주 광고 사항을 적어주세요." />
      </label>

      <label className="form-field">
        <span className="form-label">파워웨이브 인스타 (링크)</span>
        <input className="field" type="url" inputMode="url" value={draft.instagram} onChange={update('instagram')} placeholder="https://instagram.com/..." />
      </label>

      <div className="form-field">
        <span className="form-label">말씀식빵 (이미지 업로드)</span>
        {draft.bread ? (
          <div className="upload-preview">
            <img src={draft.bread} alt="말씀식빵 미리보기" />
            <button type="button" className="trash-btn floating" onClick={() => setDraft({ ...draft, bread: '' })} aria-label="이미지 삭제">
              <Icon name="trash" size={16} />
            </button>
          </div>
        ) : (
          <label className="upload">
            <Icon name="image" size={26} />
            클릭하여 이미지 업로드
            <input type="file" accept="image/*" className="sr-only" onChange={onImage} />
          </label>
        )}
        {imageError && <p className="error" role="alert">{imageError}</p>}
      </div>

      <div className="form-actions">
        <button type="button" className="btn ghost" onClick={onCancel}>
          <Icon name="x" size={15} />
          취소
        </button>
        <button type="submit" className="btn">
          <Icon name="save" size={15} />
          저장하기
        </button>
      </div>
    </form>
  );
}

function WorshipTab({ data, setData, isEditing, onEdit, onDone }) {
  return (
    <>
      <SectionHead title="이번 주 예배" subtitle="하나님을 알아가는 믿음의 성장" isEditing={false} onEdit={isEditing ? undefined : onEdit} />
      {isEditing ? (
        <WorshipForm data={data} onCancel={onDone} onSave={(next) => { setData(next); onDone(); }} />
      ) : (
        <WorshipView data={data} />
      )}
    </>
  );
}

function TeacherTab({ data, setData, isEditing, onEdit }) {
  const [dept, setDept] = useState('middle');
  const deptLabel = DEPTS.find((d) => d.key === dept).label;

  const setClass = (grade, cls, value) => {
    setData({ ...data, [dept]: { ...data[dept], [grade]: { ...data[dept][grade], [cls]: value } } });
  };
  const addClass = (grade) => setClass(grade, nextClassName(grade, data[dept][grade]), '');
  const removeClass = (grade, cls) => {
    const { [cls]: _removed, ...rest } = data[dept][grade];
    setData({ ...data, [dept]: { ...data[dept], [grade]: rest } });
  };

  return (
    <>
      <SectionHead title="교사 조직도" subtitle="학부모님을 위한 반별 담당 교사 안내" isEditing={isEditing} onEdit={onEdit} />
      <DeptToggle value={dept} onChange={setDept} />
      {GRADES.map((grade) => (
        <section key={grade} className="grade">
          <h3 className="grade-title">{`${deptLabel} ${grade}학년`}</h3>
          <div className="class-grid">
            {Object.entries(data[dept][grade]).map(([cls, teacher]) => (
              <article key={cls} className="card class-card">
                <span className="badge">{cls}</span>
                {isEditing ? (
                  <>
                    <button type="button" className="icon-btn" onClick={() => removeClass(grade, cls)} aria-label={`${cls}반 삭제`}>
                      <Icon name="x" size={14} />
                    </button>
                    <input className="field" style={{ marginTop: 12, textAlign: 'center' }} value={teacher} onChange={(e) => setClass(grade, cls, e.target.value)} placeholder="교사 이름" aria-label={`${cls}반 ���당 교사`} />
                  </>
                ) : (
                  <div className={`teacher-name${teacher ? '' : ' vacant'}`}>
                    <span style={{ color: 'var(--primary)', display: 'grid' }}><Icon name="user" /></span>
                    {teacher || '공석'}
                  </div>
                )}
              </article>
            ))}
            {isEditing && (
              <button type="button" className="add-card" onClick={() => addClass(grade)}>
                <Icon name="plus" size={18} />
                반 추가
              </button>
            )}
          </div>
        </section>
      ))}
    </>
  );
}

function StudentClassRow({ grade, cls, students, isEditing, onAdd, onRemoveStudent, onRemoveClass }) {
  const [name, setName] = useState('');
  const submit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setName('');
  };

  return (
    <div className="class-row">
      <div className="class-row-head">
        <span className="badge">{cls}</span>
        {isEditing && (
          <button type="button" className="text-btn danger" onClick={onRemoveClass}>반 삭제</button>
        )}
      </div>
      {students.length ? (
        <div className="chips">
          {students.map((s, i) => (
            <span key={`${s}-${i}`} className="chip">
              {s}
              {isEditing && (
                <button type="button" onClick={() => onRemoveStudent(i)} aria-label={`${s} 삭제`}>
                  <Icon name="x" size={12} />
                </button>
              )}
            </span>
          ))}
        </div>
      ) : (
        <div className="empty" style={{ fontSize: 12 }}>등록된 학생이 없습니다.</div>
      )}
      {isEditing && (
        <form className="inline-add" onSubmit={submit}>
          <input className="field" value={name} onChange={(e) => setName(e.target.value)} placeholder={`${grade}학년 ${cls}반 학생 이름`} aria-label={`${cls}반 학생 추가`} />
          <button type="submit" className="btn">추가</button>
        </form>
      )}
    </div>
  );
}

function StudentTab({ data, setData, isEditing, onEdit }) {
  const [dept, setDept] = useState('middle');
  const [query, setQuery] = useState('');
  const deptLabel = DEPTS.find((d) => d.key === dept).label;
  const q = query.trim().toLowerCase();

  const setGrade = (grade, value) => setData({ ...data, [dept]: { ...data[dept], [grade]: value } });

  return (
    <>
      <SectionHead title="학생 명단" subtitle="우리 부서 학생들을 확인하세요" isEditing={isEditing} onEdit={onEdit} />
      <DeptToggle value={dept} onChange={setDept} />
      <div className="search">
        <Icon name="search" />
        <input className="field" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="학생 이름 또는 반(예: 1-1) 검색..." aria-label="학생 검색" />
      </div>

      {GRADES.map((grade) => {
        const classes = data[dept][grade];
        const visible = Object.entries(classes)
          .map(([cls, students]) => [cls, q && !cls.includes(q) ? students.filter((s) => s.toLowerCase().includes(q)) : students])
          .filter(([cls, students]) => !q || cls.includes(q) || students.length);
        const total = visible.reduce((n, [, s]) => n + s.length, 0);

        return (
          <section key={grade} className="card student-card">
            <h3>{`${deptLabel} ${grade}학년`}</h3>
            {total === 0 && !isEditing ? (
              <div className="empty">{q ? '검색 결과가 없습니다.' : '등록된 학생이 없습니다.'}</div>
            ) : (
              visible.map(([cls, students]) => (
                <StudentClassRow
                  key={cls}
                  grade={grade}
                  cls={cls}
                  students={students}
                  isEditing={isEditing}
                  onAdd={(name) => setGrade(grade, { ...classes, [cls]: [...classes[cls], name] })}
                  onRemoveStudent={(idx) => setGrade(grade, { ...classes, [cls]: classes[cls].filter((_, i) => i !== idx) })}
                  onRemoveClass={() => {
                    const { [cls]: _removed, ...rest } = classes;
                    setGrade(grade, rest);
                  }}
                />
              ))
            )}
            {isEditing && (
              <button type="button" className="text-btn" style={{ marginTop: 12 }} onClick={() => setGrade(grade, { ...classes, [nextClassName(grade, classes)]: [] })}>
                + 반 추가
              </button>
            )}
          </section>
        );
      })}
    </>
  );
}

function PasswordModal({ onClose, onSuccess }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (value === ADMIN_PASSWORD) {
      onSuccess();
    } else {
      setError('비밀번호가 올바르지 않습니다.');
      setValue('');
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="card modal" role="dialog" aria-modal="true" aria-labelledby="pw-title" onClick={(e) => e.stopPropagation()}>
        <h3 id="pw-title">관리자 인증</h3>
        <p>수정하려면 관리자 비밀번호를 입력하세요.</p>
        <form onSubmit={submit}>
          <input className="field" type="password" inputMode="numeric" value={value} onChange={(e) => { setValue(e.target.value); setError(''); }} placeholder="비밀번호" autoFocus aria-label="관리자 비밀번호" />
          <p className="error" role="alert">{error}</p>
          <div className="row">
            <button type="button" className="btn ghost" onClick={onClose}>취소</button>
            <button type="submit" className="btn">확인</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const TABS = [
  { key: 'worship', label: '주일 예배' },
  { key: 'teacher', label: '교사' },
  { key: 'student', label: '학생' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('worship');
  const [isEditing, setIsEditing] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [worshipData, setWorshipData] = useState(emptyWorship);
  const [teacherData, setTeacherData] = useState(initialTeachers);
  const [studentData, setStudentData] = useState(initialStudents);

  const handleEdit = () => {
    if (isEditing) setIsEditing(false);
    else if (isAdmin) setIsEditing(true);
    else setShowPasswordModal(true);
  };
  const tabProps = { isEditing, onEdit: handleEdit, onDone: () => setIsEditing(false) };

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1><span className="year">2026</span>수원 파워웨이브</h1>
          <p>청소년부 커뮤니티</p>
        </div>
        {isAdmin && (
          <button
            type="button"
            className="admin-badge"
            onClick={() => { setIsAdmin(false); setIsEditing(false); }}
            title="눌러서 관리자 모드 끄기"
            aria-label="관리자 모드 켜짐, 눌러서 끄기"
          >
            관리자 모드<b>ON</b>
          </button>
        )}
      </header>

      <nav className="tabs" aria-label="메인 메뉴">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            className={`seg${activeTab === t.key ? ' active' : ''}`}
            aria-current={activeTab === t.key ? 'page' : undefined}
            onClick={() => { setActiveTab(t.key); setIsEditing(false); }}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main className="content">
        {activeTab === 'worship' && <WorshipTab data={worshipData} setData={setWorshipData} {...tabProps} />}
        {activeTab === 'teacher' && <TeacherTab data={teacherData} setData={setTeacherData} {...tabProps} />}
        {activeTab === 'student' && <StudentTab data={studentData} setData={setStudentData} {...tabProps} />}
      </main>

      {showPasswordModal && (
        <PasswordModal
          onClose={() => setShowPasswordModal(false)}
          onSuccess={() => { setIsAdmin(true); setIsEditing(true); setShowPasswordModal(false); }}
        />
      )}
    </div>
  );
}
