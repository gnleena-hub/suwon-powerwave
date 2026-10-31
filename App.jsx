import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('worship');
  
  // 관리자 인증 상태 (비밀번호: 0617)
  const [isEditing, setIsEditing] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [pendingTab, setPendingTab] = useState(null);

  const handleEditClick = (tabName) => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      setPendingTab(tabName);
      setPasswordInput('');
      setShowPasswordModal(true);
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === '0617') {
      setIsEditing(true);
      setShowPasswordModal(false);
      setPasswordInput('');
      alert('관리자 인증이 완료되었습니다. 수정 모드가 활성화됩니다.');
    } else {
      alert('비밀번호가 올바르지 않습니다.');
      setPasswordInput('');
    }
  };

  // 주일 예배 상태
  const [worshipData, setWorshipData] = useState({
    theme: '은혜와 진리 안에서 자라가는 청소년',
    hymns: ['주 이름 찬양', '내 마음을 가득 채운'],
    bibleBook: '요한복음',
    bibleChapter: '3',
    bibleVerse: '16',
    announcement: '다음 주일은 청소년부 연합 찬양예배로 드립니다.',
    instagram: 'https://instagram.com',
    breadImage: null
  });

  // 교사 탭 상태 (중등부/고등부 부서 분류, 학년별 반 및 교사 이름)
  const [teacherData, setTeacherData] = useState({
    middle: {
      '1': { '1-1': ['김교사', '이교사'] },
      '2': { '2-1': ['박교사'] },
      '3': { '3-1': ['정교사'] }
    },
    high: {
      '1': { '1-1': ['최교사'] },
      '2': { '2-1': ['강교사'] },
      '3': { '3-1': ['조교사'] }
    }
  });
  const [selectedDeptTeacher, setSelectedDeptTeacher] = useState('middle');
  const [selectedGradeTeacher, setSelectedGradeTeacher] = useState('1');
  const [selectedClassTeacher, setSelectedClassTeacher] = useState('1-1');

  // 학생 탭 상태 (중등부/고등부 및 학년별 독립적인 반 목록 관리)
  const [studentData, setStudentData] = useState({
    middle: {
      '1': { classes: ['1-1', '1-2'], students: { '1-1': ['김민수', '이지은'], '1-2': ['박서준'] } },
      '2': { classes: ['2-1'], students: { '2-1': ['정우진'] } },
      '3': { classes: ['3-1'], students: { '3-1': ['한지우'] } }
    },
    high: {
      '1': { classes: ['1-1'], students: { '1-1': ['오하은'] } },
      '2': { classes: ['2-1'], students: { '2-1': ['윤도현'] } },
      '3': { classes: ['3-1'], students: { '3-1': ['강서윤'] } }
    }
  });
  const [selectedDeptStudent, setSelectedDeptStudent] = useState('middle');
  const [selectedGradeStudent, setSelectedGradeStudent] = useState('1');
  const [selectedClassStudent, setSelectedClassStudent] = useState('1-1');

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', fontFamily: 'sans-serif', backgroundColor: '#f8f5fd', minHeight: '100vh', paddingBottom: '40px', boxSizing: 'border-box' }}>
      {/* 상단 헤더 */}
      <div style={{ backgroundColor: '#7c3aed', color: '#fff', padding: '20px', textAlign: 'center', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px', boxShadow: '0 4px 12px rgba(124, 58, 237, 0.2)' }}>
        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>2026 수원 파워웨이브</h1>
        <p style={{ margin: '5px 0 0', fontSize: '13px', opacity: 0.9 }}>청소년부 공식 웹 앱</p>
      </div>

      {/* 탭 네비게이션 */}
      <div style={{ display: 'flex', justifyContent: 'space-around', backgroundColor: '#fff', padding: '10px', margin: '15px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <button onClick={() => { setActiveTab('worship'); setIsEditing(false); }} style={{ flex: 1, padding: '10px', border: 'none', background: activeTab === 'worship' ? '#7c3aed' : 'transparent', color: activeTab === 'worship' ? '#fff' : '#666', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s' }}>주일 예배</button>
        <button onClick={() => { setActiveTab('teacher'); setIsEditing(false); }} style={{ flex: 1, padding: '10px', border: 'none', background: activeTab === 'teacher' ? '#7c3aed' : 'transparent', color: activeTab === 'teacher' ? '#fff' : '#666', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s' }}>교사</button>
        <button onClick={() => { setActiveTab('student'); setIsEditing(false); }} style={{ flex: 1, padding: '10px', border: 'none', background: activeTab === 'student' ? '#7c3aed' : 'transparent', color: activeTab === 'student' ? '#fff' : '#666', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s' }}>학생</button>
      </div>

      {/* 컨텐츠 영역 */}
      <div style={{ padding: '0 15px' }}>
        {/* 주일 예배 탭 */}
        {activeTab === 'worship' && (
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h2 style={{ margin: 0, color: '#4c1d95', fontSize: '18px' }}>📖 주일 예배 안내</h2>
              <button onClick={() => handleEditClick('worship')} style={{ padding: '6px 12px', background: isEditing ? '#dc2626' : '#7c3aed', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>
                {isEditing ? '수정 완료' : '수정 (비밀번호)'}
              </button>
            </div>

            {isEditing ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#333' }}>
                  예배 주제:
                  <input type="text" value={worshipData.theme} onChange={(e) => setWorshipData({...worshipData, theme: e.target.value})} style={{ width: '100%', padding: '8px', marginTop: '4px', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '6px' }} />
                </label>
                <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#333' }}>
                  찬양 목록 (쉼표로 구분):
                  <input type="text" value={worshipData.hymns.join(', ')} onChange={(e) => setWorshipData({...worshipData, hymns: e.target.value.split(',').map(s => s.trim())})} style={{ width: '100%', padding: '8px', marginTop: '4px', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '6px' }} />
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <label style={{ flex: 1, fontSize: '13px', fontWeight: 'bold', color: '#333' }}>
                    성경 책:
                    <input type="text" value={worshipData.bibleBook} onChange={(e) => setWorshipData({...worshipData, bibleBook: e.target.value})} style={{ width: '100%', padding: '8px', marginTop: '4px', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '6px' }} />
                  </label>
                  <label style={{ width: '70px', fontSize: '13px', fontWeight: 'bold', color: '#333' }}>
                    장:
                    <input type="text" value={worshipData.bibleChapter} onChange={(e) => setWorshipData({...worshipData, bibleChapter: e.target.value})} style={{ width: '100%', padding: '8px', marginTop: '4px', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '6px' }} />
                  </label>
                  <label style={{ width: '70px', fontSize: '13px', fontWeight: 'bold', color: '#333' }}>
                    절:
                    <input type="text" value={worshipData.bibleVerse} onChange={(e) => setWorshipData({...worshipData, bibleVerse: e.target.value})} style={{ width: '100%', padding: '8px', marginTop: '4px', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '6px' }} />
                  </label>
                </div>
                <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#333' }}>
                  광고 및 소식:
                  <textarea value={worshipData.announcement} onChange={(e) => setWorshipData({...worshipData, announcement: e.target.value})} style={{ width: '100%', padding: '8px', marginTop: '4px', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '6px', height: '60px' }} />
                </label>
              </div>
            ) : (
              <div>
                <div style={{ backgroundColor: '#f3e8ff', padding: '12px', borderRadius: '8px', marginBottom: '12px' }}>
                  <strong>오늘의 주제:</strong> {worshipData.theme}
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <strong>성경말씀:</strong> {worshipData.bibleBook} {worshipData.bibleChapter}장 {worshipData.bibleVerse}절
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <strong>찬양콘티:</strong>
                  <ul style={{ margin: '5px 0 0 20px', padding: 0 }}>
                    {worshipData.hymns.map((h, i) => <li key={i}>{h}</li>)}
                  </ul>
                </div>
                <div style={{ backgroundColor: '#faf5ff', padding: '12px', borderRadius: '8px', border: '1px solid #e9d5ff' }}>
                  <strong>공지사항:</strong> {worshipData.announcement}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 교사 탭 */}
        {activeTab === 'teacher' && (
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h2 style={{ margin: 0, color: '#4c1d95', fontSize: '18px' }}>👩‍🏫 교사 및 반 배정</h2>
              <button onClick={() => handleEditClick('teacher')} style={{ padding: '6px 12px', background: isEditing ? '#dc2626' : '#7c3aed', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>
                {isEditing ? '수정 완료' : '수정 (비밀번호)'}
              </button>
            </div>

            {/* 부서 선택 */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
              <button onClick={() => setSelectedDeptTeacher('middle')} style={{ flex: 1, padding: '8px', background: selectedDeptTeacher === 'middle' ? '#7c3aed' : '#eee', color: selectedDeptTeacher === 'middle' ? '#fff' : '#333', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>중등부</button>
              <button onClick={() => setSelectedDeptTeacher('high')} style={{ flex: 1, padding: '8px', background: selectedDeptTeacher === 'high' ? '#7c3aed' : '#eee', color: selectedDeptTeacher === 'high' ? '#fff' : '#333', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>고등부</button>
            </div>

            {/* 학년 선택 */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: '15px' }}>
              {['1', '2', '3'].map((grade) => (
                <button key={grade} onClick={() => { setSelectedGradeTeacher(grade); setSelectedClassTeacher(`${grade}-1`); }} style={{ flex: 1, padding: '6px', background: selectedGradeTeacher === grade ? '#ddd' : '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>{grade}학년</button>
              ))}
            </div>

            {/* 반 선택 */}
            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '5px' }}>반 선택:</label>
              <select value={selectedClassTeacher} onChange={(e) => setSelectedClassTeacher(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ddd' }}>
                {Object.keys(teacherData[selectedDeptTeacher][selectedGradeTeacher] || {}).map((cls) => (
                  <option key={cls} value={cls}>{cls}반</option>
                ))}
              </select>
            </div>

            {/* 교사 명단 */}
            <div style={{ backgroundColor: '#f8fafc', padding: '15px', borderRadius: '10px' }}>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#333' }}>{selectedClassTeacher}반 교사 명단</h4>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {(teacherData[selectedDeptTeacher][selectedGradeTeacher][selectedClassTeacher] || []).map((t, i) => (
                  <li key={i} style={{ marginBottom: '5px' }}>{t}</li>
                ))}
              </ul>
              {isEditing && (
                <div style={{ marginTop: '10px', display: 'flex', gap: '5px' }}>
                  <input type="text" id="newTeacherInput" placeholder="교사 이름 입력" style={{ flex: 1, padding: '6px', borderRadius: '4px', border: '1px solid #ddd' }} />
                  <button onClick={() => {
                    const input = document.getElementById('newTeacherInput');
                    if (!input.value) return;
                    const updated = {...teacherData};
                    const list = updated[selectedDeptTeacher][selectedGradeTeacher][selectedClassTeacher] || [];
                    updated[selectedDeptTeacher][selectedGradeTeacher][selectedClassTeacher] = [...list, input.value];
                    setTeacherData(updated);
                    input.value = '';
                  }} style={{ padding: '6px 12px', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>추가</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 학생 탭 */}
        {activeTab === 'student' && (
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h2 style={{ margin: 0, color: '#4c1d95', fontSize: '18px' }}>🎓 학생 명단 관리</h2>
              <button onClick={() => handleEditClick('student')} style={{ padding: '6px 12px', background: isEditing ? '#dc2626' : '#7c3aed', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>
                {isEditing ? '수정 완료' : '수정 (비밀번호)'}
              </button>
            </div>

            {/* 부서 선택 */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
              <button onClick={() => setSelectedDeptStudent('middle')} style={{ flex: 1, padding: '8px', background: selectedDeptStudent === 'middle' ? '#7c3aed' : '#eee', color: selectedDeptStudent === 'middle' ? '#fff' : '#333', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>중등부</button>
              <button onClick={() => setSelectedDeptStudent('high')} style={{ flex: 1, padding: '8px', background: selectedDeptStudent === 'high' ? '#7c3aed' : '#eee', color: selectedDeptStudent === 'high' ? '#fff' : '#333', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>고등부</button>
            </div>

            {/* 학년 선택 */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: '15px' }}>
              {['1', '2', '3'].map((grade) => (
                <button key={grade} onClick={() => { setSelectedGradeStudent(grade); setSelectedClassStudent(`${grade}-1`); }} style={{ flex: 1, padding: '6px', background: selectedGradeStudent === grade ? '#ddd' : '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>{grade}학년</button>
              ))}
            </div>

            {/* 반 선택 및 동적 추가 드롭다운 */}
            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '5px' }}>반 선택 / 추가:</label>
              <select value={selectedClassStudent} onChange={(e) => {
                const val = e.target.value;
                if (val === '__add_new__') {
                  const currentClasses = studentData[selectedDeptStudent][selectedGradeStudent].classes;
                  const newClassName = `${selectedGradeStudent}-${currentClasses.length + 1}`;
                  const updated = JSON.parse(JSON.stringify(studentData));
                  updated[selectedDeptStudent][selectedGradeStudent].classes.push(newClassName);
                  updated[selectedDeptStudent][selectedGradeStudent].students[newClassName] = [];
                  setStudentData(updated);
                  setSelectedClassStudent(newClassName);
                } else {
                  setSelectedClassStudent(val);
                }
              }} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ddd' }}>
                {(studentData[selectedDeptStudent][selectedGradeStudent].classes || []).map((cls) => (
                  <option key={cls} value={cls}>{cls}반</option>
                ))}
                {isEditing && <option value="__add_new__" style={{ color: '#7c3aed', fontWeight: 'bold' }}>+ 반 추가하기</option>}
              </select>
            </div>

            {/* 학생 명단 */}
            <div style={{ backgroundColor: '#f8fafc', padding: '15px', borderRadius: '10px' }}>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#333' }}>{selectedClassStudent}반 학생 명단</h4>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {(studentData[selectedDeptStudent][selectedGradeStudent].students[selectedClassStudent] || []).map((s, i) => (
                  <li key={i} style={{ marginBottom: '5px' }}>{s}</li>
                ))}
              </ul>
              {isEditing && (
                <div style={{ marginTop: '10px', display: 'flex', gap: '5px' }}>
                  <input type="text" id="newStudentInput" placeholder="학생 이름 입력" style={{ flex: 1, padding: '6px', borderRadius: '4px', border: '1px solid #ddd' }} />
                  <button onClick={() => {
                    const input = document.getElementById('newStudentInput');
                    if (!input.value) return;
                    const updated = JSON.parse(JSON.stringify(studentData));
                    const list = updated[selectedDeptStudent][selectedGradeStudent].students[selectedClassStudent] || [];
                    updated[selectedDeptStudent][selectedGradeStudent].students[selectedClassStudent] = [...list, input.value];
                    setStudentData(updated);
                    input.value = '';
                  }} style={{ padding: '6px 12px', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>추가</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 비밀번호 인증 모달 */}
      {showPasswordModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', width: '80%', maxWidth: '300px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
            <h3 style={{ margin: '0 0 10px', color: '#4c1d95', fontSize: '16px' }}>관리자 인증</h3>
            <p style={{ margin: '0 0 15px', fontSize: '13px', color: '#666' }}>수정하려면 관리자 비밀번호를 입력하세요.</p>
            <form onSubmit={handlePasswordSubmit}>
              <input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} placeholder="비밀번호" autoFocus aria-label="관리자 비밀번호" style={{ width: '100%', padding: '10px', marginBottom: '12px', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '6px', textAlign: 'center' }} />
              <div style={{ display: 'flex', gap: '8px' }}>
                <button type="button" onClick={() => { setShowPasswordModal(false); setPasswordInput(''); }} style={{ flex: 1, padding: '8px', background: '#eee', color: '#333', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>취소</button>
                <button type="submit" style={{ flex: 1, padding: '8px', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>확인</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
