import { DaySchedule, Memo } from "@/types/schedule";

// Supabase DB 스냅샷 (2026-08-03 기준)
// 2026-10-14: day 1·3·10 에 렌트카(Apex 4202766)·국내선(제트스타 JQ232) 상세를 수동으로 추가함 — DB 는 일시중지 상태라 미반영.
//             재개 후 scripts/sync-days-to-db.mjs 를 실행하면 이 파일의 day 1·3·10 을 DB 에 올리고 스냅샷을 재생성한다
// 2026-10-26: day 3 을 곤돌라+루지 → 1번 버스 → 렌트카 픽업(14:00) → 키위파크 순으로 재구성(애로우타운 제외). 역시 DB 미반영, 같은 스크립트로 올림.
// 네트워크 오류/지연 시 폴백으로만 사용. 이 데이터를 보는 동안에는 수정 불가.
export const MOCK_SCHEDULES: DaySchedule[] = [
  {
    "id": 0,
    "day": 0,
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
    "id": 1,
    "day": 1,
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
        "emoji": "🚕",
        "title": "택시/버스로 숙소 이동",
        "description": "공항에서 숙소까지 차로 10분 (렌트카는 DAY 3 14:00 공항점 픽업)"
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
      },
      {
        "text": "다음 날 새벽 밀포드 투어 출발 - 일찍 자기!"
      }
    ],
    "accommodation": {
      "url": "https://www.booking.com/hotel/nz/alexis-motor-lodge.ko.html?checkin=2026-11-01&checkout=2026-11-05&group_adults=2&no_rooms=1&group_children=0",
      "name": "퀸즈타운 (1/4박)",
      "note": "예약 완료 · 10/29까지 무료취소 가능",
      "options": [
        "알렉시스 모텔 & 아파트먼트",
        "69 Frankton Road, Queenstown"
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
    "id": 2,
    "day": 2,
    "date": "11월 2일",
    "day_of_week": "월",
    "title": "밀포드사운드 당일투어",
    "subtitle": null,
    "region": "south",
    "drive_info": "왕복 ~12시간 (투어)",
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
      },
      {
        "text": "투어 사전 예약 필수 - 숙소 픽업 가능한 투어 추천 (아직 차 없음)"
      },
      {
        "text": "멀미약 챙기기 (버스 구간 구불구불)"
      }
    ],
    "accommodation": {
      "url": "https://www.booking.com/hotel/nz/alexis-motor-lodge.ko.html?checkin=2026-11-01&checkout=2026-11-05&group_adults=2&no_rooms=1&group_children=0",
      "name": "퀸즈타운 (2/4박)",
      "note": null,
      "options": [
        "알렉시스 모텔 & 아파트먼트",
        "69 Frankton Road, Queenstown"
      ]
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
    "id": 3,
    "day": 3,
    "date": "11월 3일",
    "day_of_week": "화",
    "title": "곤돌라 & 키위파크",
    "subtitle": "퀸즈타운",
    "region": "south",
    "drive_info": "공항 ↔ 시내 차로 10분",
    "is_rest_day": false,
    "activities": [
      {
        "time": "오전 9:30",
        "emoji": "🚡",
        "title": "스카이라인 곤돌라 (Brecon St 베이스)",
        "description": "첫 곤돌라 09:30 · 봅스피크 전망대에서 퀸즈타운·와카티푸 호수 전경 · 숙소에서 도보 25~30분 또는 1번 버스 → Stanley St 허브 하차 후 Brecon St 도보 10분"
      },
      {
        "time": "10:00",
        "emoji": "🛷",
        "title": "루지 (첫 탑승 10:00 세션)",
        "description": "1,600m 트랙, 리프트 타고 반복 · 1회 약 15분 → 3회권이면 12시 전 충분 · Gondola+3 Luge 성인 NZ$99 (5회 $104 · 6회 $106) · 온라인 예약 시 첫 루지 시간(30분 세션) 선택 · 비 오면 루지 일시 중단"
      },
      {
        "time": "12:15",
        "emoji": "🍔",
        "title": "퍼그버거 (42 Shotover St)",
        "description": "곤돌라 베이스에서 도보 5분 · 매일 07:00~02:30 · 점심 줄 20~40분 각오 → 늦어도 13:10엔 출발"
      },
      {
        "time": "13:14",
        "emoji": "🚌",
        "title": "1번 버스로 공항 이동 (Stanley St 버스허브 B → 공항 약 20분)",
        "description": "퍼그버거에서 허브까지 도보 3분 · 15분 간격(12:59 · 13:14 · 13:29) · 성인 Bee Card $2.50 / 현금 $10 (카드 결제 불가) · 급하면 택시·우버 약 15분(NZ$35~45) 으로 Apex(32 Lucas Place) 직행"
      },
      {
        "time": "14:00",
        "emoji": "🚗",
        "title": "렌트카 픽업 · Apex 퀸즈타운 공항점 (32 Lucas Place)",
        "description": "현대 투싼 2WD급 중형 SUV · 예약번호 4202766 · 터미널에서 차로 2분, 걸어서 5분 · 여기부터 남섬 드라이브 시작!",
        "image": "/images/apex-queenstown-pickup.png"
      },
      {
        "time": "15:00",
        "emoji": "🥝",
        "title": "키위파크 (51 Brecon St, 곤돌라 베이스 바로 아래)",
        "description": "공항에서 차로 10분 · 주차는 스카이라인 입체주차장(297면, 도보 2분, 키위파크 티켓 실물 제시 시 20% 할인) · 여름 운영 09:30~18:30, 마지막 입장 17:45 · 성인 NZ$68 · 예약 시 Kiwi Encounter 시간 선택(15:00 / 16:15 / 17:00, 15분 전 도착) · 컨서베이션 쇼 15:30 · 17:30 (30분) · 관람 1.5~2시간"
      },
      {
        "time": "17:00",
        "emoji": "🌙",
        "title": "숙소 복귀 후 시내에서 자유롭게",
        "description": "키위파크 → 알렉시스 모텔 차로 5분 · 해 지는 시간 20:25 쯤이라 저녁 드라이브도 여유"
      }
    ],
    "tips": [
      {
        "text": "국제운전면허증 + 한국 면허증 둘 다 지참 (렌트카 필수)"
      },
      {
        "text": "좌측통행! 첫 운전은 천천히"
      },
      {
        "text": "픽업 가는 법 ① 공항 터미널에서 무료전화 0800 304 300 으로 Apex 셔틀 호출(또는 확인 메일의 Ready to Collect 버튼) → 터미널 나와 오른쪽 출발층 쪽에서 탑승, 짐은 직접 싣기"
      },
      {
        "text": "픽업 가는 법 ② 걸어서 약 5분: 터미널에서 Sir Henry Wigley Dr 로 나와 로터리에서 좌회전 → Lucas Place 250m 오른쪽"
      },
      {
        "text": "결제는 픽업 때 실물 신용/체크카드로 NZ$1,115.17 · 카드 명의자(민태) 본인이 계약서 서명 · 영문 면허(국제면허증) 필수"
      },
      {
        "text": "포함: $0 면책(Excess Reduction) · 무제한 km · 로드사이드 커버 · 추가 운전자 무료 · 7일 남섬 한정"
      },
      {
        "text": "스카이라인·키위파크 둘 다 온라인 예약 권장 — 루지는 첫 탑승 시간, 키위파크는 Kiwi Encounter 시간을 고름(키위파크는 48시간 전까지 전액 환불) · 스카이라인 주간 운영시간표는 방문 주에 다시 확인"
      },
      {
        "text": "키위파크는 곤돌라 승강장 바로 아래(도보 2분) → 비로 루지가 멈추면 순서만 바꾸면 됨: 오전 키위파크(10:00 인카운터) → 점심 → 픽업 → 오후 곤돌라·루지"
      },
      {
        "text": "키위 하우스 안은 사진·휴대폰 사용 금지 · 파크는 언덕에 자갈길·경사 → 운동화 · 버스는 현금 또는 Bee Card 만 (카드 결제 불가)"
      }
    ],
    "accommodation": {
      "url": "https://www.booking.com/hotel/nz/alexis-motor-lodge.ko.html?checkin=2026-11-01&checkout=2026-11-05&group_adults=2&no_rooms=1&group_children=0",
      "name": "퀸즈타운 (3/4박)",
      "note": null,
      "options": [
        "알렉시스 모텔 & 아파트먼트",
        "69 Frankton Road, Queenstown"
      ]
    },
    "links": [
      {
        "url": "https://queenstown.skyline.co.nz/",
        "label": "스카이라인 (예약·요금)"
      },
      {
        "url": "https://queenstown.skyline.co.nz/opening-hours/",
        "label": "스카이라인 주간 운영시간"
      },
      {
        "url": "https://kiwibird.co.nz/",
        "label": "키위파크 (운영시간·쇼 시간)"
      },
      {
        "url": "https://kiwibird.co.nz/products/",
        "label": "키위파크 입장권 예약"
      },
      {
        "url": "https://www.orc.govt.nz/orbus/queenstown-buses/check-your-timetables/1-sunshine-bay-to-remarkables-shops",
        "label": "Orbus 1번 버스 시간표 (시내 → 공항)"
      },
      {
        "url": "https://www.apexrentals.co.nz/location-instructions.aspx?type=pickup&id=BZ3083852",
        "label": "Apex 픽업 안내 (지도·영상)"
      }
    ]
  },
  {
    "id": 4,
    "day": 4,
    "date": "11월 4일",
    "day_of_week": "수",
    "title": "퀸즈타운 자유일",
    "subtitle": null,
    "region": "south",
    "drive_info": null,
    "is_rest_day": true,
    "activities": [
      {
        "time": "오전 10:00",
        "emoji": "♨️",
        "title": "오네센 온천 (호수뷰) - 예약 확정"
      },
      {
        "time": "오후",
        "emoji": "🏔️",
        "title": "글레노키 드라이브 (선택)",
        "description": "호수 따라 45분, 반지의 제왕 촬영지. 안 가도 됨!"
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
    "tips": [
      {
        "text": "오네센 온천 오전 10시 예약 확정 · 여유 있게 조금 일찍 도착"
      }
    ],
    "accommodation": {
      "url": "https://www.booking.com/hotel/nz/alexis-motor-lodge.ko.html?checkin=2026-11-01&checkout=2026-11-05&group_adults=2&no_rooms=1&group_children=0",
      "name": "퀸즈타운 (4/4박)",
      "note": null,
      "options": [
        "알렉시스 모텔 & 아파트먼트",
        "69 Frankton Road, Queenstown"
      ]
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
    "id": 5,
    "day": 5,
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
        "time": "낮",
        "emoji": "🧩",
        "title": "퍼즐링 월드 (선택)",
        "description": "와나카 초입, 착시 미술관 + 대형 미로. 1시간 코스"
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
      "url": "https://www.booking.com/hotel/nz/aspiringlofts-wanaka.ko.html?checkin=2026-11-05&checkout=2026-11-07&group_adults=2&no_rooms=1&group_children=0",
      "name": "와나카 (1/2박)",
      "note": "예약 완료 · 조식 포함 · 11/1 전까지 무료취소 가능",
      "options": [
        "Aspiringlofts",
        "42 Manuka Crescent, Wanaka"
      ]
    },
    "links": [
      {
        "url": "https://lakewanaka.co.nz",
        "label": "와나카 관광"
      },
      {
        "url": "https://www.puzzlingworld.co.nz",
        "label": "퍼즐링 월드"
      }
    ]
  },
  {
    "id": 6,
    "day": 6,
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
        "time": "오후",
        "emoji": "💜",
        "title": "와나카 라벤더 팜",
        "description": "라벤더 밭 + 동물 먹이주기(양·알파카 등) + 라벤더 아이스크림·기념품 숍. 시내에서 차 7분, 입장료 있음. 만개 시즌은 12~2월이라 11월 초엔 꽃이 덜할 수 있음"
      },
      {
        "time": "늦은 오후",
        "emoji": "🍷",
        "title": "Rippon 와이너리 셀러도어",
        "description": "호수를 내려다보는 포도밭 뷰로 유명한 와나카 대표 와이너리(비오디나미 농법). 피노 누아·리슬링 시음, 예약 권장. 시내에서 차 5분"
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
      },
      {
        "text": "Rippon 시음은 홈페이지에서 예약하고 가는 게 안전. 운전자는 시음 자제 — 음주운전 단속 기준 엄격!"
      }
    ],
    "accommodation": {
      "url": "https://www.booking.com/hotel/nz/aspiringlofts-wanaka.ko.html?checkin=2026-11-05&checkout=2026-11-07&group_adults=2&no_rooms=1&group_children=0",
      "name": "와나카 (2/2박)",
      "note": null,
      "options": [
        "Aspiringlofts",
        "42 Manuka Crescent, Wanaka"
      ]
    },
    "links": [
      {
        "url": "https://www.rippon.co.nz",
        "label": "Rippon 와이너리"
      },
      {
        "url": "https://www.wanakalavenderfarm.com",
        "label": "와나카 라벤더 팜"
      }
    ]
  },
  {
    "id": 7,
    "day": 7,
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
        "time": "이동 중",
        "emoji": "🏜️",
        "title": "클레이 클리프 (선택)",
        "description": "오마라마에서 20분 우회, 침식 절벽 협곡. 차량당 입장료 $5"
      },
      {
        "time": "이동 중",
        "emoji": "📸",
        "title": "레이크 푸카키 뷰포인트",
        "description": "밀키블루 호수 너머 마운트쿡 조망, 경로상이라 잠깐 세우면 됨"
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
      "url": "https://www.booking.com/hotel/nz/shepherd-39-s-view.ko.html?checkin=2026-11-07&checkout=2026-11-09&group_adults=2&no_rooms=1&group_children=0",
      "name": "테카포 (1/2박)",
      "note": "예약 완료 · 10/22까지 무료취소 가능",
      "options": [
        "Shepherd's View - Lake Tekapo",
        "1 Bill Apes Lane, Lake Tekapo"
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
    "id": 8,
    "day": 8,
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
        "time": "오전~오후",
        "emoji": "🏔️",
        "title": "마운트쿡 후커밸리 트랙 (선택)",
        "description": "차로 편도 1시간, 왕복 3시간 평탄한 트레킹. 뉴질랜드 대표 절경!"
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
        "title": "Dark Sky Project 별 관측 (선택)",
        "description": "세계 최고의 밤하늘! 11월엔 투어가 밤 10~11시 시작"
      }
    ],
    "tips": [
      {
        "text": "Dark Sky Project는 사전 예약 필수"
      }
    ],
    "accommodation": {
      "url": "https://www.booking.com/hotel/nz/shepherd-39-s-view.ko.html?checkin=2026-11-07&checkout=2026-11-09&group_adults=2&no_rooms=1&group_children=0",
      "name": "테카포 (2/2박)",
      "note": null,
      "options": [
        "Shepherd's View - Lake Tekapo",
        "1 Bill Apes Lane, Lake Tekapo"
      ]
    },
    "links": [
      {
        "url": "https://darkskyproject.co.nz",
        "label": "Dark Sky Project"
      },
      {
        "url": "https://www.doc.govt.nz/parks-and-recreation/places-to-go/canterbury/places/aoraki-mount-cook-national-park/things-to-do/tracks/hooker-valley-track/",
        "label": "후커밸리 트랙"
      }
    ]
  },
  {
    "id": 9,
    "day": 9,
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
      "url": "https://www.booking.com/hotel/nz/urban-retreat-christchurch-central-city.ko.html?checkin=2026-11-09&checkout=2026-11-10&group_adults=2&no_rooms=1&group_children=0",
      "name": "크라이스트처치 (1박)",
      "note": "예약 완료 · 11/3까지 무료취소 가능",
      "options": [
        "Urban Retreat in Central City Christchurch",
        "g10/20 Bath Street, Christchurch"
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
    "id": 10,
    "day": 10,
    "date": "11월 10일",
    "day_of_week": "화",
    "title": "오클랜드 이동",
    "subtitle": null,
    "region": "north",
    "drive_info": "국내선 JQ232 09:55 → 11:15 (1시간 20분)",
    "is_rest_day": false,
    "activities": [
      {
        "time": "09:00 반납",
        "emoji": "🚗",
        "title": "렌트카 반납 · Apex 크라이스트처치 공항점 (28 Ron Guthrey Rd)",
        "description": "Russley Rd 에서 진입 · 반납 후 Apex 무료 셔틀로 터미널 이동 · 주유는 Russley Rd 남쪽 2~3km 주유소",
        "image": "/images/apex-christchurch-dropoff.png"
      },
      {
        "time": "09:55 출발",
        "emoji": "✈️",
        "title": "제트스타 JQ232 크라이스트처치 → 오클랜드",
        "description": "에어버스 A320 · 이코노미(스타터 운임) · 비행 1시간 20분 · 크라이스트처치 국내선 터미널"
      },
      {
        "time": "11:15 도착",
        "emoji": "🛬",
        "title": "오클랜드 도착",
        "description": "오클랜드 국내선 터미널"
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
    "tips": [
      {
        "text": "렌트카 반납 09:00 → JQ232 출발 09:55 (여유 55분) · 반납·셔틀 시간 감안해 더 일찍 도착 권장 · 예약번호 4202766"
      },
      {
        "text": "제트스타 JQ232 (2026.08.01 예약) · 탑승객 MS Naeun Kim, MR Mintae Kim"
      },
      {
        "text": "수하물 1인당 휴대 7kg + 위탁 25kg · 좌석은 아직 미지정(좌석 선택 가능)"
      }
    ],
    "accommodation": {
      "url": "https://www.booking.com/hotel/nz/imagine-beach-road.ko.html?checkin=2026-11-10&checkout=2026-11-13&group_adults=2&no_rooms=1&group_children=0",
      "name": "오클랜드 (1/3박)",
      "note": "예약 완료 · 무료취소 불가",
      "options": [
        "Imagine Beach Road",
        "31 Beach Road, Auckland"
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
      },
      {
        "url": "https://www.apexrentals.co.nz/location-instructions.aspx?type=dropoff&id=BZ3083852",
        "label": "Apex 반납 안내 (지도)"
      },
      {
        "url": "https://maps.app.goo.gl/pmHPY7rB5ez9hLQ19",
        "label": "반납 지점 길찾기 (Google 지도)"
      }
    ]
  },
  {
    "id": 11,
    "day": 11,
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
      },
      {
        "text": "호빗마을·와이토모 투어 예약 필수 (매진 잦음)"
      }
    ],
    "accommodation": {
      "url": "https://www.booking.com/hotel/nz/imagine-beach-road.ko.html?checkin=2026-11-10&checkout=2026-11-13&group_adults=2&no_rooms=1&group_children=0",
      "name": "오클랜드 (2/3박)",
      "note": null,
      "options": [
        "Imagine Beach Road",
        "31 Beach Road, Auckland"
      ]
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
    "id": 12,
    "day": 12,
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
      "url": "https://www.booking.com/hotel/nz/imagine-beach-road.ko.html?checkin=2026-11-10&checkout=2026-11-13&group_adults=2&no_rooms=1&group_children=0",
      "name": "오클랜드 (3/3박)",
      "note": "다음 날 오전 11:45 비행, 공항까지 차로 약 30분",
      "options": [
        "Imagine Beach Road",
        "31 Beach Road, Auckland"
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
    "id": 13,
    "day": 13,
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
        "text": "국제선 3시간 전 공항 도착 권장"
      },
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
    "day_id": 0,
    "content": "두근두근",
    "created_at": "2026-03-23T00:35:09.673989+00:00",
    "updated_at": "2026-03-23T00:35:09.673989+00:00"
  }
];
