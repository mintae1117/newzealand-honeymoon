import { DaySchedule, Memo } from "@/types/schedule";

// Supabase DB 스냅샷 (2026-07-06 기준)
// 네트워크 오류/지연 시 폴백으로만 사용. 이 데이터를 보는 동안에는 수정 불가.
export const MOCK_SCHEDULES: DaySchedule[] = [
  {
    "id": 1,
    "day": 1,
    "date": "10월 31일",
    "day_of_week": "토",
    "title": "출발",
    "subtitle": "인천 → 브리즈번 → 퀸즈타운",
    "region": "travel",
    "drive_info": null,
    "is_rest_day": false,
    "activities": [
      {
        "time": "10.31 토요일 오후 19:40",
        "emoji": "✈️",
        "title": "비행기 탑승",
        "description": "이후 9시간 40분동안 비행"
      },
      {
        "time": "11.01 일요일 오전 06:20 브리즈번 도착, 09:05 콴타스 항공 타고 퀸즈타운으로 출발",
        "emoji": "🔄",
        "title": "브리즈번 경유 (환승)",
        "description": "이후 3시간 30분동안 비행"
      },
      {
        "time": "11.01 15:35 퀸즈타운 도착",
        "emoji": "😴",
        "title": "기내 1박"
      }
    ],
    "tips": [
      {
        "text": "환승 시간 넉넉히 확보"
      },
      {
        "text": "NZeTA 미리 발급"
      }
    ],
    "accommodation": null,
    "links": []
  },
  {
    "id": 2,
    "day": 2,
    "date": "11월 1일",
    "day_of_week": "일",
    "title": "퀸즈타운 도착",
    "subtitle": null,
    "region": "south",
    "drive_info": null,
    "is_rest_day": false,
    "activities": [
      {
        "time": "11.01 15:35 퀸즈타운 도착",
        "emoji": "🛬",
        "title": "퀸즈타운 도착"
      },
      {
        "time": "",
        "emoji": "🚗",
        "title": "렌트카 픽업 (공항에서)"
      },
      {
        "time": "오후",
        "emoji": "🏨",
        "title": "숙소 체크인 후 휴식"
      },
      {
        "time": "",
        "emoji": "🚶",
        "title": "시내 가볍게 산책"
      },
      {
        "time": "저녁",
        "emoji": "🍽️",
        "title": "워터프론트에서 디너"
      }
    ],
    "tips": [
      {
        "text": "시차 적응 - 무리하지 않기!"
      }
    ],
    "accommodation": {
      "name": "퀸즈타운 (1/4박)",
      "note": "호수뷰 추천",
      "options": [
        "Sofitel / QT Queenstown",
        "Novotel Queenstown"
      ]
    },
    "links": [
      {
        "url": "https://queenstownnz.co.nz",
        "label": "퀸즈타운 관광"
      }
    ]
  },
  {
    "id": 3,
    "day": 3,
    "date": "11월 2일",
    "day_of_week": "월",
    "title": "곤돌라 & 애로우타운",
    "subtitle": "퀸즈타운",
    "region": "south",
    "drive_info": "애로우타운 20분",
    "is_rest_day": false,
    "activities": [
      {
        "time": "오전",
        "emoji": "🎿",
        "title": "스카이라인 곤돌라 + 루지",
        "description": "퀸즈타운 전경, 재미있는 루지"
      },
      {
        "time": "점심",
        "emoji": "🍔",
        "title": "퍼그버거 (유명 버거집)"
      },
      {
        "time": "오후",
        "emoji": "🏘️",
        "title": "애로우타운 드라이브",
        "description": "금광 마을, 예쁜 거리 산책, 카페에서 여유"
      },
      {
        "time": "저녁",
        "emoji": "🌙",
        "title": "시내에서 자유롭게"
      }
    ],
    "tips": [],
    "accommodation": {
      "name": "퀸즈타운 (2/4박)",
      "note": null,
      "options": []
    },
    "links": [
      {
        "url": "https://skyline.co.nz/queenstown",
        "label": "스카이라인"
      },
      {
        "url": "https://arrowtown.com",
        "label": "애로우타운"
      }
    ]
  },
  {
    "id": 4,
    "day": 4,
    "date": "11월 3일",
    "day_of_week": "화",
    "title": "밀포드사운드 당일투어",
    "subtitle": null,
    "region": "south",
    "drive_info": "왕복 ~10시간 (투어)",
    "is_rest_day": false,
    "activities": [
      {
        "time": "새벽",
        "emoji": "🚌",
        "title": "투어버스 출발",
        "description": "직접 운전보다 편하게!"
      },
      {
        "time": "",
        "emoji": "📸",
        "title": "밀포드로드 드라이브",
        "description": "미러레이크, 호머터널 등 포토스팟"
      },
      {
        "time": "낮",
        "emoji": "🚢",
        "title": "밀포드사운드 크루즈 (약 2시간)",
        "description": "피오르드 절벽, 폭포, 물개"
      },
      {
        "time": "저녁",
        "emoji": "🏠",
        "title": "퀸즈타운 복귀"
      }
    ],
    "tips": [
      {
        "text": "숙소 그대로! 짐 안 옮겨도 됨"
      }
    ],
    "accommodation": {
      "name": "퀸즈타운 (3/4박)",
      "note": null,
      "options": []
    },
    "links": [
      {
        "url": "https://realnz.com",
        "label": "RealNZ 투어"
      },
      {
        "url": "https://milford-sound.co.nz",
        "label": "밀포드사운드"
      }
    ]
  },
  {
    "id": 5,
    "day": 5,
    "date": "11월 4일",
    "day_of_week": "수",
    "title": "퀸즈타운 자유일",
    "subtitle": null,
    "region": "south",
    "drive_info": null,
    "is_rest_day": true,
    "activities": [
      {
        "time": "오전",
        "emoji": "🏔️",
        "title": "글레노키 드라이브 (선택)",
        "description": "호수 따라 45분, 반지의 제왕 촬영지. 안 가도 됨!"
      },
      {
        "time": "오후",
        "emoji": "♨️",
        "title": "오네센 온천 (호수뷰) - 추천!"
      },
      {
        "time": "오후",
        "emoji": "🍷",
        "title": "와이너리 투어 (선택)"
      },
      {
        "time": "저녁",
        "emoji": "🥩",
        "title": "Botswana Butchery (예약)"
      }
    ],
    "tips": [],
    "accommodation": {
      "name": "퀸즈타운 (4/4박)",
      "note": null,
      "options": []
    },
    "links": [
      {
        "url": "https://onsen.co.nz",
        "label": "오네센 온천"
      },
      {
        "url": "https://glenorchy.nz",
        "label": "글레노키"
      }
    ]
  },
  {
    "id": 6,
    "day": 6,
    "date": "11월 5일",
    "day_of_week": "목",
    "title": "와나카로 이동",
    "subtitle": null,
    "region": "south",
    "drive_info": "약 1시간 30분",
    "is_rest_day": false,
    "activities": [
      {
        "time": "오전",
        "emoji": "👋",
        "title": "여유롭게 체크아웃"
      },
      {
        "time": "",
        "emoji": "🏔️",
        "title": "크라운 레인지 로드 드라이브",
        "description": "절경 산길, 포토스팟 많음"
      },
      {
        "time": "점심",
        "emoji": "☕",
        "title": "와나카 도착 후 카페"
      },
      {
        "time": "오후",
        "emoji": "📸",
        "title": "와나카 트리",
        "description": "인스타 명소, 호수에 있는 나무"
      },
      {
        "time": "",
        "emoji": "🚶",
        "title": "호수 산책"
      },
      {
        "time": "저녁",
        "emoji": "🍽️",
        "title": "와나카 시내 레스토랑"
      }
    ],
    "tips": [],
    "accommodation": {
      "name": "와나카 (1/2박)",
      "note": null,
      "options": [
        "Edgewater Hotel (호숫가)",
        "Wanaka Hotel (중심부)"
      ]
    },
    "links": [
      {
        "url": "https://lakewanaka.co.nz",
        "label": "와나카 관광"
      }
    ]
  },
  {
    "id": 7,
    "day": 7,
    "date": "11월 6일",
    "day_of_week": "금",
    "title": "와나카 자유일",
    "subtitle": null,
    "region": "south",
    "drive_info": null,
    "is_rest_day": true,
    "activities": [
      {
        "time": "오전",
        "emoji": "😴",
        "title": "여유롭게 늦잠"
      },
      {
        "time": "브런치",
        "emoji": "☕",
        "title": "호숫가 카페"
      },
      {
        "time": "오후",
        "emoji": "🚴",
        "title": "호수 산책 / 카약 / 자전거 (선택)"
      },
      {
        "time": "",
        "emoji": "📖",
        "title": "카페에서 책 읽기"
      },
      {
        "time": "저녁",
        "emoji": "🍳",
        "title": "와나카 레스토랑 or 숙소 요리"
      }
    ],
    "tips": [
      {
        "text": "아무것도 안 해도 되는 날!"
      }
    ],
    "accommodation": {
      "name": "와나카 (2/2박)",
      "note": null,
      "options": []
    },
    "links": []
  },
  {
    "id": 8,
    "day": 8,
    "date": "11월 7일",
    "day_of_week": "토",
    "title": "테카포로 이동",
    "subtitle": null,
    "region": "south",
    "drive_info": "약 2시간 30분",
    "is_rest_day": false,
    "activities": [
      {
        "time": "오전",
        "emoji": "🌾",
        "title": "체크아웃, 린디스 패스 드라이브",
        "description": "황금빛 터삭 초원"
      },
      {
        "time": "점심",
        "emoji": "☕",
        "title": "트와이젤 or 오마라마 카페"
      },
      {
        "time": "오후",
        "emoji": "⛪",
        "title": "선한목자교회",
        "description": "Church of the Good Shepherd"
      },
      {
        "time": "",
        "emoji": "💎",
        "title": "밀키블루 호수 산책"
      },
      {
        "time": "저녁",
        "emoji": "🍣",
        "title": "고다이로 일식 or 숙소 요리"
      },
      {
        "time": "밤",
        "emoji": "⭐",
        "title": "별 관측 (날씨 좋으면)"
      }
    ],
    "tips": [],
    "accommodation": {
      "name": "테카포 (1/2박)",
      "note": "호수뷰 필수!",
      "options": [
        "Peppers Bluewater (호수뷰)",
        "Lake Tekapo Lodge"
      ]
    },
    "links": [
      {
        "url": "https://laketekapotourism.co.nz",
        "label": "테카포 관광"
      }
    ]
  },
  {
    "id": 9,
    "day": 9,
    "date": "11월 8일",
    "day_of_week": "일",
    "title": "테카포 자유일 & 별 관측",
    "subtitle": null,
    "region": "south",
    "drive_info": null,
    "is_rest_day": true,
    "activities": [
      {
        "time": "오전",
        "emoji": "😴",
        "title": "늦잠, 여유로운 아침"
      },
      {
        "time": "",
        "emoji": "📸",
        "title": "호수 산책, 포토타임"
      },
      {
        "time": "오후",
        "emoji": "🛒",
        "title": "마트에서 장보기 (저녁 요리용)"
      },
      {
        "time": "",
        "emoji": "☕",
        "title": "카페에서 여유"
      },
      {
        "time": "저녁",
        "emoji": "🍳",
        "title": "숙소에서 직접 요리"
      },
      {
        "time": "밤",
        "emoji": "🌌",
        "title": "Dark Sky Project 별 관측",
        "description": "세계 최고의 밤하늘!"
      }
    ],
    "tips": [],
    "accommodation": {
      "name": "테카포 (2/2박)",
      "note": null,
      "options": []
    },
    "links": [
      {
        "url": "https://darkskyproject.co.nz",
        "label": "Dark Sky Project"
      }
    ]
  },
  {
    "id": 10,
    "day": 10,
    "date": "11월 9일",
    "day_of_week": "월",
    "title": "크라이스트처치로 이동",
    "subtitle": null,
    "region": "south",
    "drive_info": "약 3시간",
    "is_rest_day": false,
    "activities": [
      {
        "time": "오전",
        "emoji": "👋",
        "title": "체크아웃"
      },
      {
        "time": "점심",
        "emoji": "🥧",
        "title": "Fairlie Bakehouse (유명 파이)",
        "description": "꼭 들러야 할 맛집!"
      },
      {
        "time": "오후",
        "emoji": "🏪",
        "title": "리버사이드 마켓 (푸드홀) 구경"
      },
      {
        "time": "",
        "emoji": "🌿",
        "title": "보타닉 가든 산책"
      },
      {
        "time": "",
        "emoji": "🛶",
        "title": "에이번 강 펀팅 (선택)"
      },
      {
        "time": "",
        "emoji": "⛪",
        "title": "골판지 성당 (Cardboard Cathedral)"
      },
      {
        "time": "저녁",
        "emoji": "🍽️",
        "title": "시내 레스토랑"
      }
    ],
    "tips": [],
    "accommodation": {
      "name": "크라이스트처치 (1박)",
      "note": null,
      "options": [
        "The George",
        "Distinction Christchurch"
      ]
    },
    "links": [
      {
        "url": "https://riverside.nz",
        "label": "리버사이드 마켓"
      },
      {
        "url": "https://christchurchnz.com",
        "label": "크라이스트처치"
      }
    ]
  },
  {
    "id": 11,
    "day": 11,
    "date": "11월 10일",
    "day_of_week": "화",
    "title": "오클랜드 이동",
    "subtitle": null,
    "region": "north",
    "drive_info": "국내선 1시간 20분",
    "is_rest_day": false,
    "activities": [
      {
        "time": "오전",
        "emoji": "🚗",
        "title": "렌트카 반납 (크라이스트처치 공항)"
      },
      {
        "time": "",
        "emoji": "✈️",
        "title": "국내선 탑승 (약 1시간 20분)"
      },
      {
        "time": "낮",
        "emoji": "🛬",
        "title": "오클랜드 도착"
      },
      {
        "time": "점심",
        "emoji": "🍽️",
        "title": "시내에서 식사"
      },
      {
        "time": "오후",
        "emoji": "🗼",
        "title": "스카이타워 전망대"
      },
      {
        "time": "",
        "emoji": "⛵",
        "title": "비아덕트 하버 산책"
      },
      {
        "time": "저녁",
        "emoji": "🍷",
        "title": "워터프론트 레스토랑"
      }
    ],
    "tips": [],
    "accommodation": {
      "name": "오클랜드 (1/3박)",
      "note": null,
      "options": [
        "M Social Auckland",
        "Hotel DeBrett",
        "SkyCity Hotel"
      ]
    },
    "links": [
      {
        "url": "https://skycityauckland.co.nz",
        "label": "스카이타워"
      },
      {
        "url": "https://aucklandnz.com",
        "label": "오클랜드"
      }
    ]
  },
  {
    "id": 12,
    "day": 12,
    "date": "11월 11일",
    "day_of_week": "수",
    "title": "호빗마을 & 와이토모",
    "subtitle": "당일치기",
    "region": "north",
    "drive_info": "오클랜드→호빗 2h / 호빗→와이토모 1h / 와이토모→오클랜드 2.5h",
    "is_rest_day": false,
    "activities": [
      {
        "time": "오전",
        "emoji": "🚗",
        "title": "렌트카 픽업, 호빗마을로 출발"
      },
      {
        "time": "",
        "emoji": "🧙",
        "title": "호빗마을 투어 (약 2시간)",
        "description": "44개 호빗집, 파티트리"
      },
      {
        "time": "",
        "emoji": "🍺",
        "title": "그린드래곤 펍에서 맥주"
      },
      {
        "time": "점심",
        "emoji": "🍽️",
        "title": "호빗마을 인근"
      },
      {
        "time": "오후",
        "emoji": "✨",
        "title": "와이토모 반딧불 동굴",
        "description": "보트 타고 동굴 속 반딧불"
      },
      {
        "time": "저녁",
        "emoji": "🌙",
        "title": "오클랜드 복귀, 시내 디너"
      }
    ],
    "tips": [
      {
        "text": "숙소 그대로! 짐 안 옮김"
      }
    ],
    "accommodation": {
      "name": "오클랜드 (2/3박)",
      "note": null,
      "options": []
    },
    "links": [
      {
        "url": "https://hobbitontours.com",
        "label": "호빗마을"
      },
      {
        "url": "https://waitomo.com",
        "label": "와이토모 동굴"
      }
    ]
  },
  {
    "id": 13,
    "day": 13,
    "date": "11월 12일",
    "day_of_week": "목",
    "title": "오클랜드 마지막 날",
    "subtitle": null,
    "region": "north",
    "drive_info": null,
    "is_rest_day": true,
    "activities": [
      {
        "time": "오전",
        "emoji": "🚗",
        "title": "렌트카 반납 (공항 근처)",
        "description": "셔틀로 시내 이동"
      },
      {
        "time": "낮",
        "emoji": "🛍️",
        "title": "퀸스트리트 쇼핑"
      },
      {
        "time": "",
        "emoji": "☕",
        "title": "폰손비 카페 거리"
      },
      {
        "time": "",
        "emoji": "🎁",
        "title": "마지막 기념품 구매"
      },
      {
        "time": "저녁",
        "emoji": "🥂",
        "title": "마지막 밤 특별 디너"
      }
    ],
    "tips": [
      {
        "text": "여유롭게 마무리하는 날"
      }
    ],
    "accommodation": {
      "name": "오클랜드 공항 근처 (1박)",
      "note": "새벽 비행 대비!",
      "options": [
        "Novotel Auckland Airport",
        "Sudima Auckland Airport"
      ]
    },
    "links": [
      {
        "url": "https://queenstreetonline.co.nz",
        "label": "퀸스트리트"
      }
    ]
  },
  {
    "id": 14,
    "day": 14,
    "date": "11월 13일",
    "day_of_week": "금",
    "title": "귀국",
    "subtitle": "인천 도착",
    "region": "travel",
    "drive_info": null,
    "is_rest_day": false,
    "activities": [
      {
        "time": "오전 11:45 인천 직항 비행기 탑승",
        "emoji": "✈️",
        "title": "오클랜드 공항 출발"
      },
      {
        "time": "오후 19:40 인천 도착",
        "emoji": "🎉",
        "title": "인천 도착"
      }
    ],
    "tips": [
      {
        "text": "행복한 추억 가득 안고 귀국!"
      }
    ],
    "accommodation": null,
    "links": []
  }
];

export const MOCK_MEMOS: Memo[] = [
  {
    "id": "e3dbab0f-d402-46d8-b6cf-3a2f87792447",
    "day_id": 1,
    "content": "두근두근",
    "created_at": "2026-03-23T00:35:09.673989+00:00",
    "updated_at": "2026-03-23T00:35:09.673989+00:00"
  }
];
