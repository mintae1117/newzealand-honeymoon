'use client';

import { useEffect, useState, CSSProperties } from 'react';
import { ArrowLeft, Car, Lightbulb, MapPin, ExternalLink, BedDouble, ChevronLeft, ChevronRight, Pencil, Check, X, Plus, Trash2 } from 'lucide-react';
import { DaySchedule, Activity, Accommodation, LinkInfo } from '@/types/schedule';
import { useScheduleStore } from '@/store/schedule-store';
import { useAuth } from '@/hooks/useAuth';
import { regionTheme } from '@/lib/region-theme';
import MemoSection from '@/components/MemoSection';
import PasswordModal from '@/components/PasswordModal';
import dynamic from 'next/dynamic';

const MapSection = dynamic(() => import('@/components/MapSection'), { ssr: false });

interface DayDetailProps {
  day: DaySchedule;
  prevDay: DaySchedule | null;
  nextDay: DaySchedule | null;
  onBack: () => void;
  onNavigate: (id: number) => void;
}

const inputClass =
  'bg-[var(--paper)] rounded-lg px-2 py-1 border border-[var(--line)] focus:outline-none focus:border-[var(--ink)]/40';

// 섹션 카드 공통(수첩 종이 카드)
const cardClass =
  'bg-[var(--card)] rounded-2xl p-4 border border-[var(--line-soft)] shadow-[0_1px_2px_rgba(38,34,27,0.06)]';

const DayDetail = ({ day, prevDay, nextDay, onBack, onNavigate }: DayDetailProps) => {
  const { updateSchedule, isFallback } = useScheduleStore();
  const { isAuthenticated, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editActivities, setEditActivities] = useState<Activity[]>([]);
  const [editAccommodation, setEditAccommodation] = useState<Accommodation | null>(null);
  const [editLinks, setEditLinks] = useState<LinkInfo[]>([]);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const theme = regionTheme[day.region];

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsEditing(false);
  }, [day.id]);

  // 편집 모드 시작
  const enterEditMode = () => {
    setSaveError(null);
    setEditActivities(day.activities.map((a) => ({ ...a })));
    setEditAccommodation(day.accommodation ? { ...day.accommodation, options: [...day.accommodation.options] } : null);
    setEditLinks(day.links.map((l) => ({ ...l })));
    setIsEditing(true);
  };

  const startEditing = () => {
    if (isAuthenticated) {
      enterEditMode();
    } else {
      setShowPasswordModal(true);
    }
  };

  const handleAuthSuccess = () => {
    setShowPasswordModal(false);
    enterEditMode();
  };

  // 편집 취소
  const cancelEditing = () => {
    setSaveError(null);
    setIsEditing(false);
  };

  // 편집 저장
  const saveEditing = async () => {
    setSaveError(null);
    setSaving(true);

    try {
      await updateSchedule(day.id, {
        activities: editActivities,
        accommodation: editAccommodation,
        links: editLinks,
      });
      setIsEditing(false);
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : '저장 중 오류가 발생했어요.');
    } finally {
      setSaving(false);
    }
  };

  // --- 활동 ---
  const addActivity = () => {
    setEditActivities((prev) => [...prev, { time: '', title: '', description: '', emoji: '' }]);
  };

  const removeActivity = (index: number) => {
    setEditActivities((prev) => prev.filter((_, i) => i !== index));
  };

  const updateActivity = (index: number, field: keyof Activity, value: string) => {
    setEditActivities((prev) =>
      prev.map((a, i) => (i === index ? { ...a, [field]: value } : a))
    );
  };

  // --- 숙소 ---
  const addAccommodation = () => {
    setEditAccommodation({ name: '', options: [], note: '' });
  };

  const removeAccommodation = () => {
    setEditAccommodation(null);
  };

  const updateAccommodationField = (field: 'name' | 'note', value: string) => {
    setEditAccommodation((prev) => prev ? { ...prev, [field]: value } : prev);
  };

  const addAccommodationOption = () => {
    setEditAccommodation((prev) => prev ? { ...prev, options: [...prev.options, ''] } : prev);
  };

  const removeAccommodationOption = (index: number) => {
    setEditAccommodation((prev) => prev ? { ...prev, options: prev.options.filter((_, i) => i !== index) } : prev);
  };

  const updateAccommodationOption = (index: number, value: string) => {
    setEditAccommodation((prev) => prev ? { ...prev, options: prev.options.map((o, i) => (i === index ? value : o)) } : prev);
  };

  // --- 링크 ---
  const addLink = () => {
    setEditLinks((prev) => [...prev, { label: '', url: '' }]);
  };

  const removeLink = (index: number) => {
    setEditLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const updateLink = (index: number, field: keyof LinkInfo, value: string) => {
    setEditLinks((prev) =>
      prev.map((l, i) => (i === index ? { ...l, [field]: value } : l))
    );
  };

  const currentActivities = isEditing ? editActivities : day.activities;
  const currentAccommodation = isEditing ? editAccommodation : day.accommodation;
  const currentLinks = isEditing ? editLinks : day.links;

  // 섹션 제목 공통(세리프 + 지역색 아이콘)
  const sectionTitle = (icon: React.ReactNode, text: string) => (
    <h2 className="font-disp text-[18px] font-black text-[var(--ink)] flex items-center gap-2">
      <span style={{ color: theme.main }}>{icon}</span>
      {text}
    </h2>
  );

  return (
    <div className="min-h-screen pb-10">
      {/* 헤더 — 지역색 지형도(등고선) 패널 + 입국 도장풍 DAY 뱃지 */}
      <div
        className="contour px-5 pt-4 pb-7"
        style={{ background: theme.deep }}
      >
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-white/85 text-sm active:opacity-60 -ml-1"
          >
            <ArrowLeft size={18} />
            <span>돌아가기</span>
          </button>
          {/* 이전/다음 날 네비게이션 */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => prevDay && onNavigate(prevDay.id)}
              disabled={!prevDay}
              className="flex items-center gap-0.5 text-white/75 text-xs px-2 py-1 rounded-lg active:opacity-60 disabled:opacity-30 transition-opacity"
            >
              <ChevronLeft size={14} />
              <span>{prevDay ? `DAY ${prevDay.day}` : ''}</span>
            </button>
            <div className="w-px h-3 bg-white/30" />
            <button
              onClick={() => nextDay && onNavigate(nextDay.id)}
              disabled={!nextDay}
              className="flex items-center gap-0.5 text-white/75 text-xs px-2 py-1 rounded-lg active:opacity-60 disabled:opacity-30 transition-opacity"
            >
              <span>{nextDay ? `DAY ${nextDay.day}` : ''}</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        <div className="flex items-start gap-4">
          {/* 입국 도장 뱃지 */}
          <div className="stamp shrink-0 w-16 h-16 flex flex-col items-center justify-center text-white mt-1">
            <span className="text-[8px] font-bold tracking-[0.18em] opacity-80">
              DAY
            </span>
            <span className="font-disp text-2xl font-black leading-none">
              {day.day}
            </span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="bg-white/15 border border-white/25 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                {theme.label}
              </span>
              {day.is_rest_day && (
                <span className="bg-white/15 border border-white/25 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                  자유일
                </span>
              )}
            </div>
            <h1 className="font-disp text-[26px] font-black text-white mt-1.5 leading-tight">
              {day.title}
            </h1>
            <p className="text-white/70 text-[13px] mt-1">
              {day.date} ({day.day_of_week})
              {day.subtitle && ` · ${day.subtitle}`}
            </p>
            {day.drive_info && (
              <div className="inline-flex items-center gap-1.5 mt-2.5 text-white/85 text-xs bg-white/12 border border-white/20 rounded-full px-2.5 py-1">
                <Car size={13} />
                <span>{day.drive_info}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 -mt-3 space-y-4">
        {/* 활동 타임라인 */}
        <section className={cardClass}>
          <div className="flex items-center justify-between mb-4">
            {sectionTitle(<MapPin size={16} />, '일정')}
            {!isEditing ? (
              !isFallback && (
                <button
                  onClick={startEditing}
                  className="flex items-center gap-1 text-xs text-[var(--ink)]/40 hover:text-[var(--ink)]/70 active:opacity-60 transition-colors px-2 py-1 rounded-lg"
                >
                  <Pencil size={12} />
                  <span>수정하기</span>
                </button>
              )
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={cancelEditing}
                  className="flex items-center gap-1 text-xs text-[var(--ink)]/40 hover:text-red-500 active:opacity-60 transition-colors px-2 py-1 rounded-lg"
                >
                  <X size={12} />
                  <span>취소</span>
                </button>
                <button
                  onClick={saveEditing}
                  disabled={saving}
                  className="flex items-center gap-1 text-xs text-white active:opacity-60 transition-colors px-3 py-1.5 rounded-lg disabled:opacity-50"
                  style={{ background: theme.main }}
                >
                  <Check size={12} />
                  <span>{saving ? '저장 중...' : '저장'}</span>
                </button>
              </div>
            )}
          </div>
          {saveError && (
            <p className="mb-3 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-600">
              {saveError}
            </p>
          )}
          <div>
            {currentActivities.map((activity, i) => (
              <div key={i} className="flex gap-3 relative">
                {/* 타임라인 라인 */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0 mt-1.5"
                    style={{ background: theme.main } as CSSProperties}
                  />
                  {i < currentActivities.length - 1 && (
                    <div className="w-0 flex-1 border-l border-dashed border-[var(--line)] my-1" />
                  )}
                </div>
                {/* 내용 */}
                <div className="pb-5 min-w-0 flex-1">
                  {isEditing ? (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={activity.time || ''}
                          onChange={(e) => updateActivity(i, 'time', e.target.value)}
                          placeholder="시간 (예: 오전, 점심)"
                          className={`text-[10px] font-semibold text-[var(--ink)]/45 uppercase tracking-wider flex-1 ${inputClass}`}
                        />
                        <button
                          onClick={() => removeActivity(i)}
                          className="ml-2 p-1.5 text-[var(--ink)]/25 hover:text-red-500 active:opacity-60 transition-colors rounded-lg shrink-0"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="flex gap-1.5">
                        <input
                          type="text"
                          value={activity.emoji || ''}
                          onChange={(e) => updateActivity(i, 'emoji', e.target.value)}
                          placeholder="🎯"
                          className={`text-sm w-10 text-center ${inputClass}`}
                        />
                        <input
                          type="text"
                          value={activity.title}
                          onChange={(e) => updateActivity(i, 'title', e.target.value)}
                          placeholder="활동 제목"
                          className={`text-sm font-medium text-[var(--ink)] flex-1 ${inputClass}`}
                        />
                      </div>
                      <input
                        type="text"
                        value={activity.description || ''}
                        onChange={(e) => updateActivity(i, 'description', e.target.value)}
                        placeholder="설명 (선택사항)"
                        className={`text-xs text-[var(--ink)]/45 w-full ${inputClass}`}
                      />
                    </div>
                  ) : (
                    <>
                      {activity.time && (
                        <span
                          className="text-[10px] font-bold uppercase tracking-wider"
                          style={{ color: theme.main }}
                        >
                          {activity.time}
                        </span>
                      )}
                      <p className="text-sm font-semibold text-[var(--ink)]">
                        {activity.emoji} {activity.title}
                      </p>
                      {activity.description && (
                        <p className="text-xs text-[var(--ink)]/45 mt-0.5 leading-relaxed">
                          {activity.description}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
            {/* 일정 추가 버튼 - 편집 모드에서만 */}
            {isEditing && (
              <button
                onClick={addActivity}
                className="flex items-center gap-2 w-full py-2 text-[var(--ink)]/40 hover:text-[var(--ink)]/70 active:opacity-60 transition-colors"
              >
                <div className="flex flex-col items-center">
                  <div className="w-2.5 h-2.5 rounded-full border-2 border-dashed border-[var(--line)] shrink-0" />
                </div>
                <div className="flex items-center gap-1.5">
                  <Plus size={14} />
                  <span className="text-xs font-medium">일정 추가</span>
                </div>
              </button>
            )}
          </div>
        </section>

        {/* 팁 — 수첩에 붙인 메모지 느낌 */}
        {day.tips.length > 0 && (
          <section className="rounded-2xl p-4 bg-[var(--road-tint)] border border-[var(--road)]/25">
            <h2 className="font-disp text-[18px] font-black text-[var(--road-deep)] mb-2 flex items-center gap-2">
              <Lightbulb size={16} />
              여행 팁
            </h2>
            <ul className="space-y-1.5">
              {day.tips.map((tip, i) => (
                <li
                  key={i}
                  className="text-xs text-[var(--road-deep)]/85 leading-relaxed flex gap-1.5"
                >
                  <span className="shrink-0">·</span>
                  {tip.text}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 숙소 */}
        {(currentAccommodation || isEditing) && (
          <section className={cardClass}>
            <div className="mb-2">{sectionTitle(<BedDouble size={16} />, '숙소')}</div>
            {currentAccommodation ? (
              isEditing ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editAccommodation?.name || ''}
                      onChange={(e) => updateAccommodationField('name', e.target.value)}
                      placeholder="숙소명 (예: 퀸즈타운 1/4박)"
                      className={`text-sm font-medium text-[var(--ink)] flex-1 ${inputClass}`}
                    />
                    <button
                      onClick={removeAccommodation}
                      className="p-1.5 text-[var(--ink)]/25 hover:text-red-500 active:opacity-60 transition-colors rounded-lg shrink-0"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  {editAccommodation?.options.map((opt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-xs text-[var(--ink)]/40">·</span>
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => updateAccommodationOption(i, e.target.value)}
                        placeholder="옵션 (예: 호텔명)"
                        className={`text-xs text-[var(--ink)]/60 flex-1 ${inputClass}`}
                      />
                      <button
                        onClick={() => removeAccommodationOption(i)}
                        className="p-1 text-[var(--ink)]/25 hover:text-red-500 active:opacity-60 transition-colors rounded shrink-0"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addAccommodationOption}
                    className="flex items-center gap-1.5 text-xs text-[var(--ink)]/40 hover:text-[var(--ink)]/70 active:opacity-60 transition-colors py-1"
                  >
                    <Plus size={12} />
                    <span>옵션 추가</span>
                  </button>
                  <input
                    type="text"
                    value={editAccommodation?.note || ''}
                    onChange={(e) => updateAccommodationField('note', e.target.value)}
                    placeholder="참고사항 (선택)"
                    className={`text-xs w-full ${inputClass}`}
                    style={{ color: theme.main }}
                  />
                </div>
              ) : (
                <>
                  <p className="text-sm font-semibold text-[var(--ink)]">
                    {currentAccommodation.name}
                  </p>
                  {currentAccommodation.options.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {currentAccommodation.options.map((opt, i) => (
                        <li key={i} className="text-xs text-[var(--ink)]/50">
                          · {opt}
                        </li>
                      ))}
                    </ul>
                  )}
                  {currentAccommodation.note && (
                    <p
                      className="text-xs mt-2 font-semibold"
                      style={{ color: theme.main }}
                    >
                      {currentAccommodation.note}
                    </p>
                  )}
                </>
              )
            ) : (
              isEditing && (
                <button
                  onClick={addAccommodation}
                  className="flex items-center gap-1.5 text-xs text-[var(--ink)]/40 hover:text-[var(--ink)]/70 active:opacity-60 transition-colors py-1"
                >
                  <Plus size={14} />
                  <span>숙소 추가</span>
                </button>
              )
            )}
          </section>
        )}

        {/* 링크 */}
        {(currentLinks.length > 0 || isEditing) && (
          <section className={cardClass}>
            <div className="mb-3">
              {sectionTitle(<ExternalLink size={16} />, '관련 링크')}
            </div>
            {isEditing ? (
              <div className="space-y-2">
                {editLinks.map((link, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="flex-1 space-y-1">
                      <input
                        type="text"
                        value={link.label}
                        onChange={(e) => updateLink(i, 'label', e.target.value)}
                        placeholder="링크 이름"
                        className={`text-sm text-[var(--ink)] w-full ${inputClass}`}
                      />
                      <input
                        type="text"
                        value={link.url}
                        onChange={(e) => updateLink(i, 'url', e.target.value)}
                        placeholder="https://..."
                        className={`text-xs text-[var(--ink)]/45 w-full ${inputClass}`}
                      />
                    </div>
                    <button
                      onClick={() => removeLink(i)}
                      className="p-1.5 mt-1 text-[var(--ink)]/25 hover:text-red-500 active:opacity-60 transition-colors rounded-lg shrink-0"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addLink}
                  className="flex items-center gap-1.5 text-xs text-[var(--ink)]/40 hover:text-[var(--ink)]/70 active:opacity-60 transition-colors py-1"
                >
                  <Plus size={14} />
                  <span>링크 추가</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {currentLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-[var(--paper)] border border-[var(--line-soft)] active:opacity-70 transition-opacity"
                  >
                    <span className="text-sm font-medium text-[var(--ink)]/80">
                      {link.label}
                    </span>
                    <ExternalLink size={14} style={{ color: theme.main }} />
                  </a>
                ))}
              </div>
            )}
          </section>
        )}

        {/* 지도 */}
        <MapSection dayNumber={day.day} />

        {/* 메모 */}
        <MemoSection dayId={day.id} isAuthenticated={isAuthenticated} login={login} />
      </div>

      {/* 비밀번호 모달 */}
      <PasswordModal
        isOpen={showPasswordModal}
        onSuccess={handleAuthSuccess}
        onClose={() => setShowPasswordModal(false)}
        login={login}
      />
    </div>
  );
};

export default DayDetail;
