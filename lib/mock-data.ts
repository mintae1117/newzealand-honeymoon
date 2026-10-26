import { DaySchedule, Memo } from "@/types/schedule";

// Supabase DB 스냅샷 (2026-08-03 기준)
// 2026-10-14: day 1·3·10 에 렌트카(Apex 4202766)·국내선(제트스타 JQ232) 상세를 수동으로 추가함 — DB 는 일시중지 상태라 미반영.
//             재개 후 scripts/sync-days-to-db.mjs 를 실행하면 이 파일의 day 1·3·10 을 DB 에 올리고 스냅샷을 재생성한다
// 2026-10-26: day 3 을 곤돌라+루지 → 1번 버스 → 렌트카 픽업(14:00) → 키위파크 순으로 재구성, 애로우타운은 day 4 자유일 선택 항목으로 이동. 역시 DB 미반영, 같은 스크립트로 올림.
// 2026-10-26: 동선 위 추가 추천 장소를 전 일정에 삽입. 추가분은 활동 제목·팁·링크 라벨 앞 "[추천]" 접두사로 구분 (기존 항목은 그대로). 역시 DB 미반영, 같은 스크립트로 올림.
// 2026-10-26: day 2 밀포드 투어를 GetYourGuide 예약(GYGWZALM8Q3V) 기준으로 재작성 — 07:07 Copthorne Lakeview 픽업, 정차지·포함 내역·준비물. PIN·개인정보는 공개 리포라 미기재. DB 미반영.
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
        "time": "",
        "emoji": "🌳",
        "title": "[추천] 퀸즈타운 가든 반도 산책",
        "description": "워터프론트 끝에서 이어지는 반도 공원, 한 바퀴 30분 · 시차 풀기에 딱 · 호수 건너 리마커블스 조망"
      },
      {
        "time": "저녁",
        "emoji": "🍽️",
        "title": "워터프론트에서 디너"
      },
      {
        "time": "디저트",
        "emoji": "🍦",
        "title": "[추천] Patagonia 초콜릿 아이스크림",
        "description": "워터프론트(Rees St) · 디너 후 호숫가에서 한 컵"
      }
    ],
    "tips": [
      {
        "text": "시차 적응 - 무리하지 않기!"
      },
      {
        "text": "다음 날 07:07 Copthorne Lakeview(88 Frankton Rd, 숙소 건너편) 앞 픽업 - 일찍 자기!"
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
    "drive_info": "약 13시간 투어 · 07:07 픽업 → 20시쯤 복귀",
    "is_rest_day": false,
    "activities": [
      {
        "time": "06:55",
        "emoji": "🚶",
        "title": "Copthorne Lakeview 앞으로 이동 (88 Frankton Rd)",
        "description": "숙소(69 Frankton Rd) 바로 건너편, 도보 1~2분 · 픽업 5분 전엔 건물 밖에서 대기 · 기사는 여러 숙소를 돌며 ±10분 변동, 늦은 손님은 못 기다림"
      },
      {
        "time": "07:07",
        "emoji": "🚌",
        "title": "투어버스 픽업 · 소규모 그룹 가이드 투어 (영어)",
        "description": "GetYourGuide 예약 GYGWZALM8Q3V · 성인 2명 · 호텔 픽업·하차 포함, 하차도 같은 자리"
      },
      {
        "time": "오전",
        "emoji": "📸",
        "title": "밀포드로드 드라이브 (정차 7곳)",
        "description": "와카티푸 호수·Devils Staircase 차창 → 테아나우 30분 휴식(카페는 자비) → Eglinton Valley 10분 → 미러레이크 30분 → 건 호수 15분 → Hollyford River 5분 → 호머터널"
      },
      {
        "time": "낮",
        "emoji": "🚢",
        "title": "밀포드사운드 부티크 크루즈 (1시간 30분)",
        "description": "밀포드 체류 약 105분 · 피오르드 절벽·폭포·물개·돌고래 · 피크닉 점심(생수·간식 포함)"
      },
      {
        "time": "오후 (선택)",
        "emoji": "🛩️",
        "title": "[추천] 경비행기로 퀸즈타운 복귀 (추가 옵션)",
        "description": "이 투어는 밀포드→퀸즈타운 비행 복귀를 선택 옵션으로 제공(현재 미포함) · 외부 항공사라 가용성·요금 변동, 비싸지면 전액 환불로 취소 가능 · 원하면 GetYourGuide 예약 수정 또는 운영사 문의 · 날씨 되면 피오르드 위 40분 비행이 이 여행 최고의 한 방"
      },
      {
        "time": "20시쯤",
        "emoji": "🏠",
        "title": "Copthorne Lakeview 하차 → 숙소 도보 복귀",
        "description": "총 소요 약 13시간 · 픽업과 같은 장소에 내려줌"
      }
    ],
    "tips": [
      {
        "text": "숙소 그대로! 짐 안 옮겨도 됨"
      },
      {
        "text": "예약 완료 · GetYourGuide 예약번호 GYGWZALM8Q3V · 성인 2명(Naeun Kim 명의) · ₩647,412 결제 · PIN 은 예약 메일 참조"
      },
      {
        "text": "픽업 장소·시간은 바뀔 수 있음 → 투어 전날 운영사 안내 메일 꼭 확인 (픽업 장소는 GetYourGuide 에서 언제든 변경 가능)"
      },
      {
        "text": "픽업은 출발 최대 20분 전부터 돌기 시작 → 07:00 전엔 밖에서, 가이드는 늦는 손님을 기다리지 않음"
      },
      {
        "text": "준비물: 편한 운동화 · 선글라스 · 카메라 · 우비/방수·방풍 재킷 · 방충제(샌드플라이) · 겹쳐 입을 옷 — 밀포드 날씨는 예측 불가"
      },
      {
        "text": "포함: 호텔 픽업·하차, 소규모 가이드 투어, 부티크 크루즈 90분, 피크닉 점심 · 미포함: 테아나우 카페, 비행 복귀(선택 안 함)"
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
        "url": "https://www.getyourguide.com/ko-kr/bookings/",
        "label": "GetYourGuide 내 예약 (픽업 변경)"
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
      },
      {
        "time": "저녁 (선택)",
        "emoji": "🏞️",
        "title": "[추천] 밥스 코브 (Bob's Cove) 저녁 드라이브",
        "description": "글레노키 방향 20분, 30분 루프 트랙 · 에메랄드빛 호수와 산 반영 · 일몰 20:25 라 17시 이후도 여유 · 첫 운전 날이라 45분 걸리는 글레노키 대신 여기 추천"
      },
      {
        "time": "저녁 (선택)",
        "emoji": "📸",
        "title": "[추천] 레이크 헤이즈 (Lake Hayes) 반영 사진",
        "description": "숙소에서 15분 · 바람 없는 저녁에 산이 호수에 비침 · 밥스 코브와 반대 방향이라 둘 중 하나"
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
        "time": "11:30",
        "emoji": "🚤",
        "title": "[추천] 쇼토버 제트 (Shotover Jet)",
        "description": "오네센 온천과 같은 Arthurs Point, 차로 2분 · 협곡 사이 25분 제트보트, 360도 스핀 · 성인 NZ$199 안팎 · 사전 예약 필수 · 온천 → 제트 → 애로우타운 순이면 이동 최소"
      },
      {
        "time": "점심 (선택)",
        "emoji": "🍽️",
        "title": "[추천] Amisfield 비스트로 점심",
        "description": "레이크 헤이즈 옆, 뉴질랜드 최상급 레스토랑 · 코스 NZ$200~ · 예약 필수 · 저녁 Botswana 와 겹치니 점심으로"
      },
      {
        "time": "오후",
        "emoji": "🏘️",
        "title": "애로우타운 (선택)",
        "description": "온천에서 Malaghans Rd 로 15~20분(시내에서는 20분) · 1860년대 금광 마을, Buckingham St 산책·카페, 중국인 정착촌 유적 · 깁스턴 와이너리와 같은 방향이라 묶기 좋음, 글레노키는 반대 방향이라 둘 중 하나만"
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
        "time": "오후",
        "emoji": "🌉",
        "title": "[추천] 카와라우 번지 다리 (선택)",
        "description": "AJ Hackett 원조 번지(43m) · 안 뛰어도 무료 전망대에서 구경 · 깁스턴 와이너리 가는 길목"
      },
      {
        "time": "오후",
        "emoji": "🍷",
        "title": "[추천] 깁스턴 와이너리: Kinross · Gibbston Valley",
        "description": "Kinross 는 여러 와이너리를 한 셀러도어에서 시음 · Gibbston Valley 는 와인 동굴 투어+치즈 · 애로우타운에서 15분 · 운전자는 시음 자제"
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
      },
      {
        "text": "[추천] 애로우타운은 Day 5 아침 크라운 레인지 가는 길목이라 그때 들러도 자연스러움 → 오늘은 온천·쇼토버 제트·카와라우 번지·깁스턴 와이너리에 집중 가능"
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
        "url": "https://arrowtown.com",
        "label": "애로우타운"
      },
      {
        "url": "https://glenorchy.nz",
        "label": "글레노키"
      },
      {
        "url": "https://www.shotoverjet.com",
        "label": "[추천] 쇼토버 제트 예약"
      },
      {
        "url": "https://www.amisfield.co.nz",
        "label": "[추천] Amisfield 비스트로"
      },
      {
        "url": "https://www.bungy.co.nz",
        "label": "[추천] AJ Hackett 카와라우 번지"
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
        "time": "오전",
        "emoji": "🏘️",
        "title": "[추천] 애로우타운 (Day 4 에 안 갔으면)",
        "description": "퀸즈타운에서 20분, 크라운 레인지 입구 바로 옆이라 동선 그대로 · Buckingham St 산책·카페 1시간"
      },
      {
        "time": "",
        "emoji": "🏔️",
        "title": "크라운 레인지 로드 드라이브",
        "description": "절경 산길, 포토스팟 많음"
      },
      {
        "time": "",
        "emoji": "🔭",
        "title": "[추천] 크라운 레인지 정상 전망대",
        "description": "고갯길 꼭대기 주차장 · 와카티푸 분지가 내려다보이는 지그재그 길 뷰"
      },
      {
        "time": "점심",
        "emoji": "🍺",
        "title": "[추천] 카드로나 호텔 (Cardrona Hotel)",
        "description": "크라운 레인지 길 위 1863년 펍 · 앞에 세워둔 옛날 차가 뉴질랜드 대표 사진 스팟 · 가든바 점심 · 와나카까지 25분 남음"
      },
      {
        "time": "",
        "emoji": "🥃",
        "title": "[추천] 카드로나 증류소 (선택)",
        "description": "호텔 바로 옆 · 진·위스키·보드카 시음, 75분 가이드 투어(예약) · 운전자는 시음 자제 · 길가 '브라 펜스' 도 이 근처"
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
        "time": "늦은 오후",
        "emoji": "🥾",
        "title": "[추천] 마운트 아이언 (Mt Iron) 트랙",
        "description": "시내에서 3분, 1.5시간 루프 · 완만한 오르막 끝에 와나카 호수·시내 전경 · 로이스피크 폐쇄 기간 대체로 가장 쉬운 전망 코스"
      },
      {
        "time": "저녁",
        "emoji": "🍽️",
        "title": "와나카 시내 레스토랑"
      },
      {
        "time": "저녁",
        "emoji": "🎬",
        "title": "[추천] 시네마 파라디소 (Cinema Paradiso)",
        "description": "소파·옛날 차 좌석에 앉아 보는 동네 영화관 · 중간 휴식에 갓 구운 쿠키 · 상영표 확인 후 예매"
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
      },
      {
        "url": "https://www.cardronahotel.co.nz",
        "label": "[추천] 카드로나 호텔"
      },
      {
        "url": "https://cardronadistillery.com",
        "label": "[추천] 카드로나 증류소"
      },
      {
        "url": "https://www.paradiso.net.nz",
        "label": "[추천] 시네마 파라디소 상영표"
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
        "time": "오전 (선택)",
        "emoji": "🥾",
        "title": "[추천] 다이아몬드 레이크 · 로키 마운틴 트랙",
        "description": "시내에서 20분(Glendhu Bay 방향) · 2~3시간 · 호수·마운트 어스파이어링 조망 · 로이스피크는 11/10 까지 양 출산기로 폐쇄라 이 코스가 대안"
      },
      {
        "time": "오후",
        "emoji": "🚴",
        "title": "호수 산책 / 카약 / 자전거 (선택)"
      },
      {
        "time": "오후 (선택)",
        "emoji": "🚗",
        "title": "[추천] 하웨아 호수 전망대 → The Neck 드라이브",
        "description": "하스트 방향 15분, 레이크 하웨아 전망대 → The Neck → 와나카 동쪽 호숫가로 돌아오는 40분 루프 · 블루풀까지 가면 편도 1시간(다리 복구 완료, 샌드플라이 기피제 필수)"
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
      },
      {
        "text": "[추천] 식당 후보: Big Fig(슬로우푸드), Francesca's Italian Kitchen, Kika(파인다이닝, 예약)"
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
        "time": "이동 중 (선택)",
        "emoji": "🛁",
        "title": "[추천] 오마라마 핫텁 (Hot Tubs Omarama)",
        "description": "둘만 쓰는 나무 욕조에서 산 보며 1시간 · 예약제 · Day 4 온천과 겹치면 생략해도 됨"
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
        "time": "이동 중",
        "emoji": "🍣",
        "title": "[추천] 연어 사시미 (High Country Salmon / Mt Cook Alpine Salmon)",
        "description": "트와이젤 남쪽 수상 양식장(High Country Salmon) 또는 푸카키 뷰포인트 옆 Mt Cook Alpine Salmon 매장 · 사시미 사서 마운트쿡 보며 먹기 — 이 구간 명장면"
      },
      {
        "time": "도착 후 (14시 전이면)",
        "emoji": "☕",
        "title": "[추천] 마운트 존 Astro Café",
        "description": "맥켄지 분지·테카포 호수 360도 전망 · 정상 도로 차량 NZ$14(09~16시, 카드만) · 카페 14시 마감(마지막 주문 13:30) → 못 맞추면 Day 9 아침 체크아웃 전(09시 오픈)이나 Tekapo Springs 주차장에서 걸어서 왕복 1.5시간"
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
        "time": "일몰·밤",
        "emoji": "⛪",
        "title": "[추천] 선한목자교회 일몰·밤 재방문",
        "description": "낮보다 일몰(20:45 쯤)과 별 뜬 밤이 훨씬 예쁨 · 숙소에서 가까우니 두 번 가기 · 밤엔 손전등 빨간불로"
      },
      {
        "time": "밤",
        "emoji": "⭐",
        "title": "별 관측 (날씨 좋으면)"
      }
    ],
    "tips": [
      {
        "text": "[추천] 11/9 가 신월 → 오늘·내일 밤은 달빛 없는 최적 조건. 별 투어는 이틀에 나눠 예약하면 날씨 보험"
      }
    ],
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
      },
      {
        "url": "https://www.darkskyproject.co.nz/dine/astro-cafe/",
        "label": "[추천] Astro Café · Mt John 도로 안내"
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
        "time": "가는 길",
        "emoji": "📸",
        "title": "[추천] 피터스 룩아웃 (Peter's Lookout)",
        "description": "마운트쿡 도로(SH80) 초입 · 푸카키 호수 너머 마운트쿡 정면, 5분 정차"
      },
      {
        "time": "오전~오후",
        "emoji": "🏔️",
        "title": "마운트쿡 후커밸리 트랙 (선택)",
        "description": "차로 편도 1시간, 왕복 3시간 평탄한 트레킹. 뉴질랜드 대표 절경!"
      },
      {
        "time": "오후 (선택)",
        "emoji": "🧊",
        "title": "[추천] 태즈먼 빙하 전망 트랙 (Tasman Glacier View)",
        "description": "후커밸리에서 차로 10분 · 왕복 40분, 계단 오르면 빙산 떠 있는 태즈먼 호수 · 후커밸리는 7/28 새 189m 현수교 개통으로 전 구간 통행 가능"
      },
      {
        "time": "오후 (선택)",
        "emoji": "🚤",
        "title": "[추천] Glacier Explorers 빙산 보트",
        "description": "태즈먼 호수에서 빙산 사이 보트 2.5시간 · 성인 NZ$209 안팎 · 11월 운영, 예약 필수(48시간 내 취소 50%) · 후커밸리와 묶으면 마운트쿡 하루 꽉 참"
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
      },
      {
        "time": "밤",
        "emoji": "♨️",
        "title": "[추천] Tekapo Springs 온천 별 관측 투어",
        "description": "온천에 몸 담그고 가이드와 별 보기 90분 · 성인 NZ$95~139, 수건 포함 · 환불 불가 · Dark Sky Project 와 하루씩 나누면 날씨 보험 (11/9 신월이라 최적)"
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
      },
      {
        "url": "https://tekaposprings.co.nz",
        "label": "[추천] Tekapo Springs 별 투어"
      },
      {
        "url": "https://www.glacierexplorers.com",
        "label": "[추천] Glacier Explorers"
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
        "time": "이동 중",
        "emoji": "🍯",
        "title": "[추천] 제럴딘 Barker's 매장",
        "description": "페얼리에서 30분, 길목 · 잼·처트니·시럽 시식, 선물용으로 좋음 · 옆 Talbot Forest 치즈도"
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
        "time": "",
        "emoji": "🎨",
        "title": "[추천] 뉴 리젠트 스트리트 · 헤리티지 트램",
        "description": "파스텔 스페인풍 거리(New Regent St), 트램이 지나가는 사진 스팟 · 트램은 시내 한 바퀴 루프"
      },
      {
        "time": "",
        "emoji": "🏚️",
        "title": "[추천] Quake City (선택)",
        "description": "2011 지진 기념관, 작지만 울림 있음 · 1시간 · 리버사이드 마켓에서 도보 5분"
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
        "emoji": "🌹",
        "title": "[추천] 파넬 장미정원 (Parnell Rose Gardens)",
        "description": "숙소(Beach Rd)에서 도보 15분 · 11월이 장미 만개 시즌 · 축제(보통 11월 둘째 일요일)는 도착 전에 끝났을 가능성 큼, 꽃은 그대로"
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
        "time": "일몰",
        "emoji": "🌋",
        "title": "[추천] 마운트 이든 (Mt Eden) 일몰",
        "description": "시내에서 차·버스 10분, 분화구 정상 · 스카이타워·하버 전경 · 정상까지 걸어서 15분"
      },
      {
        "time": "저녁",
        "emoji": "🍷",
        "title": "워터프론트 레스토랑"
      },
      {
        "time": "디저트",
        "emoji": "🍦",
        "title": "[추천] Giapo 아이스크림",
        "description": "숙소 근처 Gore St · 오클랜드 대표 수제 아이스크림, 줄 서는 곳"
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
      },
      {
        "text": "[추천] 렌트카 반납 09:00 → 09:55 출발은 빠듯 · 제트스타 국내선 수하물 마감 출발 30분 전 → 08:15 반납 권장"
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
        "time": "오후",
        "emoji": "🕳️",
        "title": "[추천] 루아쿠리 동굴 (Ruakuri) 콤보",
        "description": "Glowworm 단독보다 Glowworm+Ruakuri 콤보(셀프 NZ$98 / 가이드 NZ$197) · Ruakuri 는 나선 입구·2시간, 사진 촬영 가능"
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
      },
      {
        "text": "[추천] 호빗마을 → 와이토모는 1시간이 아니라 1시간 30분으로 잡기 · 와이토모 투어 시간은 호빗 투어 종료 +2시간 뒤로"
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
        "time": "이른 아침 (선택)",
        "emoji": "🐦",
        "title": "[추천] 무리와이 가넷 군락 (반납 전)",
        "description": "시내에서 서쪽 45분, 무료 · 11월이 번식기 피크(수천 마리) · 검은 모래 해변 · 보고 나서 공항으로 반납하면 동선 자연스러움"
      },
      {
        "time": "오전",
        "emoji": "🚗",
        "title": "렌트카 반납 (공항 근처)",
        "description": "셔틀로 시내 이동"
      },
      {
        "time": "낮",
        "emoji": "⛴️",
        "title": "[추천] 와이헤케 섬 + Mudbrick 점심",
        "description": "다운타운 페리 40분(Fullers360) · Matiatia 선착장에서 Mudbrick 까지 택시 5분 · 바다 보며 와인·점심 · 퀸스트리트 쇼핑 대신 이걸 권함 · 16~17시 페리로 복귀"
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
      },
      {
        "text": "[추천] 무리와이+와이헤케 둘 다 하면 쇼핑 시간은 없음 → 기념품은 Day 10 저녁이나 공항에서"
      },
      {
        "text": "[추천] 마지막 디너 후보: Mudbrick(와이헤케), 시내 Amano·Depot·Cassia, 폰손비 Kol"
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
      },
      {
        "url": "https://www.fullers.co.nz",
        "label": "[추천] Fullers360 와이헤케 페리"
      },
      {
        "url": "https://www.mudbrick.co.nz",
        "label": "[추천] Mudbrick 와이너리"
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
