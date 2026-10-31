import React, { useState } from 'react';
import Icon from './icon.jsx';
import { BIBLE_BOOKS } from './bible-data.js';

const TESTAMENTS = [
  { key: 'old', label: '구약' },
  { key: 'new', label: '신약' },
];

export const formatPassage = (book, chapter, start, end) => {
  if (!start) return `${book} ${chapter}장`;
  if (!end || end === start) return `${book} ${chapter}장 ${start}절`;
  return `${book} ${chapter}장 ${start}절~${end}절`;
};

export default function BiblePicker({ onClose, onApply }) {
  const [testament, setTestament] = useState('old');
  const [bookIndex, setBookIndex] = useState(0);
  const [chapter, setChapter] = useState(null);
  const [range, setRange] = useState({ start: null, end: null });

  const book = BIBLE_BOOKS[bookIndex];
  const books = BIBLE_BOOKS.map((b, i) => ({ ...b, index: i })).filter((b) => b.testament === testament);

  const selectTestament = (key) => {
    setTestament(key);
    setBookIndex(BIBLE_BOOKS.findIndex((b) => b.testament === key));
  };

  const openChapter = (c) => {
    setChapter(c);
    setRange({ start: null, end: null });
  };

  const pickVerse = (v) => {
    const { start, end } = range;
    if (start === null || end !== null || v < start) setRange({ start: v, end: null });
    else setRange({ start, end: v });
  };

  const verseState = (v) => {
    const { start, end } = range;
    if (v === start || v === end) return ' selected';
    if (start !== null && end !== null && v > start && v < end) return ' in-range';
    return '';
  };

  const banner = (() => {
    const { start, end } = range;
    if (start === null) return `${chapter}장 - 시작할 절을 선택하세요`;
    if (end === null) return `${chapter}장 ${start}절 선택됨 · 끝 절을 선택하세요`;
    return `${chapter}장 ${start}절 ~ ${end}절 선택됨`;
  })();

  const apply = () => {
    if (chapter === null) return;
    onApply(formatPassage(book.name, chapter, range.start, range.end));
  };

  const title = chapter === null ? '성경 선택' : `${book.name} ${chapter}장 절 선택`;

  return (
    <div className="modal-backdrop" onClick={onClose} onKeyDown={(e) => e.key === 'Escape' && onClose()}>
      <div className="card bible-modal" role="dialog" aria-modal="true" aria-labelledby="bible-title" onClick={(e) => e.stopPropagation()}>
        <header className="bible-head">
          {chapter !== null ? (
            <button type="button" className="icon-btn" onClick={() => setChapter(null)} aria-label="장 선택으로 돌아가기">
              <Icon name="chevronLeft" size={20} />
            </button>
          ) : (
            <span className="icon-btn-spacer" aria-hidden="true" />
          )}
          <h3 id="bible-title">{title}</h3>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="닫기">
            <Icon name="x" size={18} />
          </button>
        </header>

        {chapter === null ? (
          <>
            <div className="bible-testaments" role="tablist" aria-label="구약/신약">
              {TESTAMENTS.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  role="tab"
                  aria-selected={testament === t.key}
                  className={`testament-btn${testament === t.key ? ' active' : ''}`}
                  onClick={() => selectTestament(t.key)}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="bible-body">
              <ul className="book-list" aria-label="성경 권">
                {books.map((b) => (
                  <li key={b.name}>
                    <button
                      type="button"
                      className={`book-btn${b.index === bookIndex ? ' active' : ''}`}
                      aria-current={b.index === bookIndex}
                      onClick={() => setBookIndex(b.index)}
                    >
                      {b.name}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="num-panel">
                <p className="num-caption">{book.name} · 장을 선택하세요</p>
                <div className="num-grid" aria-label={`${book.name} 장 선택`}>
                  {book.verses.map((_, i) => (
                    <button key={i} type="button" className="num-btn" onClick={() => openChapter(i + 1)}>
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="bible-banner" aria-live="polite">{banner}</div>
            <div className="verse-scroll">
              <div className="num-grid verse-grid" aria-label={`${book.name} ${chapter}장 절 선택`}>
                {Array.from({ length: book.verses[chapter - 1] }, (_, i) => i + 1).map((v) => (
                  <button
                    key={v}
                    type="button"
                    className={`num-btn${verseState(v)}`}
                    aria-pressed={v === range.start || v === range.end}
                    onClick={() => pickVerse(v)}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        <footer className="bible-foot">
          <button type="button" className="btn ghost" onClick={onClose}>취소</button>
          <button type="button" className="btn" onClick={apply} disabled={chapter === null}>본문 적용하기</button>
        </footer>
      </div>
    </div>
  );
}
