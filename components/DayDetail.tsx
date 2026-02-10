'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, Car, Lightbulb, MapPin, ExternalLink, BedDouble, ChevronLeft, ChevronRight, Pencil, Check, X, Plus, Trash2 } from 'lucide-react';
import { DaySchedule, Activity, Accommodation, LinkInfo } from '@/types/schedule';
import { useScheduleStore } from '@/store/schedule-store';
import { useAuth } from '@/hooks/useAuth';
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

const regionBg: Record<string, string> = {
  south: 'from-emerald-500 to-emerald-600',
  north: 'from-blue-500 to-blue-600',
  travel: 'from-amber-500 to-amber-600',
};

const regionAccent: Record<string, string> = {
  south: 'bg-emerald-500 text-white',
  north: 'bg-blue-500 text-white',
  travel: 'bg-amber-500 text-white',
};

const inputClass = 'bg-zinc-50 dark:bg-zinc-800 rounded px-2 py-1 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-300';

const DayDetail = ({ day, prevDay, nextDay, onBack, onNavigate }: DayDetailProps) => {
  const { updateSchedule } = useScheduleStore();
  const { isAuthenticated, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editActivities, setEditActivities] = useState<Activity[]>([]);
  const [editAccommodation, setEditAccommodation] = useState<Accommodation | null>(null);
  const [editLinks, setEditLinks] = useState<LinkInfo[]>([]);
  const [saving, setSaving] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsEditing(false);
  }, [day.id]);

  // 편집 모드 시작
  const enterEditMode = () => {
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
    setIsEditing(false);
  };

  // 편집 저장
  const saveEditing = async () => {
    setSaving(true);
    await updateSchedule(day.id, {
      activities: editActivities,
      accommodation: editAccommodation,
      links: editLinks,
    });
    setSaving(false);
    setIsEditing(false);
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

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-8">
      {/* 헤더 */}
      <div className={`bg-gradient-to-br ${regionBg[day.region]} px-5 pt-4 pb-6`}>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-white/80 text-sm active:opacity-60 -ml-1"
          >
            <ArrowLeft size={18} />
            <span>돌아가기</span>
          </button>
          {/* 이전/다음 날 네비게이션 */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => prevDay && onNavigate(prevDay.id)}
              disabled={!prevDay}
              className="flex items-center gap-0.5 text-white/70 text-xs px-2 py-1 rounded-lg active:opacity-60 disabled:opacity-30 transition-opacity"
            >
              <ChevronLeft size={14} />
              <span>{prevDay ? `DAY ${prevDay.day}` : ''}</span>
            </button>
            <div className="w-px h-3 bg-white/30" />
            <button
              onClick={() => nextDay && onNavigate(nextDay.id)}
              disabled={!nextDay}
              className="flex items-center gap-0.5 text-white/70 text-xs px-2 py-1 rounded-lg active:opacity-60 disabled:opacity-30 transition-opacity"
            >
              <span>{nextDay ? `DAY ${nextDay.day}` : ''}</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-0.5 rounded-md">
            DAY {day.day}
          </span>
          {day.is_rest_day && (
            <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-0.5 rounded-md">
              자유일
            </span>
          )}
        </div>
        <h1 className="text-2xl font-bold text-white mt-2">{day.title}</h1>
        <p className="text-white/70 text-sm mt-1">
          {day.date} ({day.day_of_week})
          {day.subtitle && ` · ${day.subtitle}`}
        </p>
        {day.drive_info && (
          <div className="flex items-center gap-1.5 mt-3 text-white/70 text-xs">
            <Car size={14} />
            <span>{day.drive_info}</span>
          </div>
        )}
      </div>

      <div className="px-5 -mt-3 space-y-4">
        {/* 활동 타임라인 */}
        <section className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-sm border border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
              <MapPin size={16} />
              일정
            </h2>
            {!isEditing ? (
              <button
                onClick={startEditing}
                className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 active:opacity-60 transition-colors px-2 py-1 rounded-lg"
              >
                <Pencil size={12} />
                <span>수정하기</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={cancelEditing}
                  className="flex items-center gap-1 text-xs text-zinc-400 hover:text-red-500 active:opacity-60 transition-colors px-2 py-1 rounded-lg"
                >
                  <X size={12} />
                  <span>취소</span>
                </button>
                <button
                  onClick={saveEditing}
                  disabled={saving}
                  className={`flex items-center gap-1 text-xs text-white ${regionAccent[day.region]} active:opacity-60 transition-colors px-3 py-1.5 rounded-lg disabled:opacity-50`}
                >
                  <Check size={12} />
                  <span>{saving ? '저장 중...' : '저장'}</span>
                </button>
              </div>
            )}
          </div>
          <div>
            {currentActivities.map((activity, i) => (
              <div key={i} className="flex gap-3 relative">
                {/* 타임라인 라인 */}
                <div className="flex flex-col items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-600 shrink-0 mt-1.5" />
                  {i < currentActivities.length - 1 && (
                    <div className="w-px flex-1 bg-zinc-200 dark:bg-zinc-700 my-1" />
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
                          className={`text-[10px] font-semibold text-zinc-400 uppercase tracking-wider flex-1 ${inputClass}`}
                        />
                        <button
                          onClick={() => removeActivity(i)}
                          className="ml-2 p-1.5 text-zinc-300 hover:text-red-500 dark:text-zinc-600 dark:hover:text-red-400 active:opacity-60 transition-colors rounded-lg shrink-0"
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
                          className={`text-sm font-medium text-zinc-900 dark:text-white flex-1 ${inputClass}`}
                        />
                      </div>
                      <input
                        type="text"
                        value={activity.description || ''}
                        onChange={(e) => updateActivity(i, 'description', e.target.value)}
                        placeholder="설명 (선택사항)"
                        className={`text-xs text-zinc-400 w-full ${inputClass}`}
                      />
                    </div>
                  ) : (
                    <>
                      {activity.time && (
                        <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                          {activity.time}
                        </span>
                      )}
                      <p className="text-sm font-medium text-zinc-900 dark:text-white">
                        {activity.emoji} {activity.title}
                      </p>
                      {activity.description && (
                        <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
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
                className="flex items-center gap-2 w-full py-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 active:opacity-60 transition-colors"
              >
                <div className="flex flex-col items-center">
                  <div className="w-2.5 h-2.5 rounded-full border-2 border-dashed border-zinc-300 dark:border-zinc-600 shrink-0" />
                </div>
                <div className="flex items-center gap-1.5">
                  <Plus size={14} />
                  <span className="text-xs font-medium">일정 추가</span>
                </div>
              </button>
            )}
          </div>
        </section>

        {/* 팁 */}
        {day.tips.length > 0 && (
          <section className="bg-amber-50 dark:bg-amber-950/30 rounded-2xl p-4 border border-amber-100 dark:border-amber-900/50">
            <h2 className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-2 flex items-center gap-2">
              <Lightbulb size={16} />
              팁
            </h2>
            <ul className="space-y-1.5">
              {day.tips.map((tip, i) => (
                <li key={i} className="text-xs text-amber-600 dark:text-amber-400/80 leading-relaxed">
                  {tip.text}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 숙소 */}
        {(currentAccommodation || isEditing) && (
          <section className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-sm border border-zinc-100 dark:border-zinc-800">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
              <BedDouble size={16} />
              숙소
            </h2>
            {currentAccommodation ? (
              isEditing ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editAccommodation?.name || ''}
                      onChange={(e) => updateAccommodationField('name', e.target.value)}
                      placeholder="숙소명 (예: 퀸즈타운 1/4박)"
                      className={`text-sm font-medium text-zinc-700 dark:text-zinc-300 flex-1 ${inputClass}`}
                    />
                    <button
                      onClick={removeAccommodation}
                      className="p-1.5 text-zinc-300 hover:text-red-500 dark:text-zinc-600 dark:hover:text-red-400 active:opacity-60 transition-colors rounded-lg shrink-0"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  {editAccommodation?.options.map((opt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-xs text-zinc-400">·</span>
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => updateAccommodationOption(i, e.target.value)}
                        placeholder="옵션 (예: 호텔명)"
                        className={`text-xs text-zinc-400 flex-1 ${inputClass}`}
                      />
                      <button
                        onClick={() => removeAccommodationOption(i)}
                        className="p-1 text-zinc-300 hover:text-red-500 dark:text-zinc-600 dark:hover:text-red-400 active:opacity-60 transition-colors rounded shrink-0"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addAccommodationOption}
                    className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 active:opacity-60 transition-colors py-1"
                  >
                    <Plus size={12} />
                    <span>옵션 추가</span>
                  </button>
                  <input
                    type="text"
                    value={editAccommodation?.note || ''}
                    onChange={(e) => updateAccommodationField('note', e.target.value)}
                    placeholder="참고사항 (선택)"
                    className={`text-xs text-violet-500 w-full ${inputClass}`}
                  />
                </div>
              ) : (
                <>
                  <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {currentAccommodation.name}
                  </p>
                  {currentAccommodation.options.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {currentAccommodation.options.map((opt, i) => (
                        <li key={i} className="text-xs text-zinc-400">
                          · {opt}
                        </li>
                      ))}
                    </ul>
                  )}
                  {currentAccommodation.note && (
                    <p className="text-xs text-violet-500 mt-2 font-medium">
                      {currentAccommodation.note}
                    </p>
                  )}
                </>
              )
            ) : (
              isEditing && (
                <button
                  onClick={addAccommodation}
                  className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 active:opacity-60 transition-colors py-1"
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
          <section className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-sm border border-zinc-100 dark:border-zinc-800">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
              <ExternalLink size={16} />
              관련 링크
            </h2>
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
                        className={`text-sm text-zinc-700 dark:text-zinc-300 w-full ${inputClass}`}
                      />
                      <input
                        type="text"
                        value={link.url}
                        onChange={(e) => updateLink(i, 'url', e.target.value)}
                        placeholder="https://..."
                        className={`text-xs text-zinc-400 w-full ${inputClass}`}
                      />
                    </div>
                    <button
                      onClick={() => removeLink(i)}
                      className="p-1.5 mt-1 text-zinc-300 hover:text-red-500 dark:text-zinc-600 dark:hover:text-red-400 active:opacity-60 transition-colors rounded-lg shrink-0"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addLink}
                  className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 active:opacity-60 transition-colors py-1"
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
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 active:bg-zinc-100 dark:active:bg-zinc-700 transition-colors"
                  >
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">{link.label}</span>
                    <ExternalLink size={14} className="text-zinc-400" />
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
