import { DaySchedule, Memo } from "@/types/schedule";

// Supabase DB 스냅샷 (2026-08-03 기준)
// 2026-10-14: day 1·3·10 에 렌트카(Apex 4202766)·국내선(제트스타 JQ232) 상세를 수동으로 추가함 — DB 는 일시중지 상태라 미반영.
//             재개 후 scripts/sync-days-to-db.mjs 를 실행하면 이 파일의 day 1·3·10 을 DB 에 올리고 스냅샷을 재생성한다
// 2026-10-26: day 3 을 곤돌라+루지 → 1번 버스 → 렌트카 픽업(14:00) → 키위파크 순으로 재구성, 애로우타운은 day 4 자유일 선택 항목으로 이동. 역시 DB 미반영, 같은 스크립트로 올림.
// 2026-10-26: 동선 위 추가 추천 장소를 전 일정에 삽입. 추가분은 활동 제목·팁·링크 라벨 앞 "[추천]" 접두사로 구분 (기존 항목은 그대로). 역시 DB 미반영, 같은 스크립트로 올림.
// 2026-10-26: day 2 밀포드 투어를 GetYourGuide 예약(GYGWZALM8Q3V) 기준으로 재작성 — 07:07 Copthorne Lakeview 픽업, 정차지·포함 내역·준비물. PIN·개인정보는 공개 리포라 미기재. DB 미반영.
// 2026-10-26: day 11 호빗마을·와이토모를 GetYourGuide 가이드 투어 예약(GYGN6BZYBG9H, 숙소 픽업) 기준으로 재작성, 북섬 렌트카 전제 제거(day 12 반납 항목 삭제). DB 미반영.
// 2026-10-26: day 2 정차지를 활동 단위로 세로 분리(12개), 비행 복귀 옵션은 예약대로 확정하기로 해 제거. DB 미반영.
// 2026-10-28: 지명을 영어 표기로 통일(Queenstown Gardens, Milford Sound, Te Anau …). day-coordinates 핀 라벨도 같이 바꿈. DB 미반영.
// 2026-10-28: day 1 저녁을 '시내 아무 식당'으로, 저녁 후 Milford 투어 장보기(마트·살 것 목록) 추가, day 1·2 팁에 준비물. DB 미반영.
// 2026-10-28: day 5 를 Queenstown 아침 → 체크아웃 → (Arrowtown) → Crown Range 지그재그·Summit 정차 → Cardrona 통과 → Wanaka 점심(Big Fig) 흐름으로 재구성, Cardrona Hotel·Distillery 제거. DB 미반영.
// 2026-10-28: day 6 Diamond Lake · Rocky Mountain Track 확정(주차장 이동 → 호숫가 → Diamond Lake Lookout → Lake Wanaka Lookout → 정상 루프 → 복귀), DOC 소책자 기준 시간, 핀 3개 추가. DB 미반영.
// 2026-10-28: day 7 을 Lindis Pass → Clay Cliffs(필수) → Twizel → Lake Pukaki Viewpoint(필수) → Mt Cook Alpine Salmon 점심 → Tekapo 로 재구성, Hot Tubs Omarama 제거, 핀 좌표 수정(Clay Cliffs 주차장·Pukaki 방문자센터)·Omarama·Twizel 핀 추가. DB 미반영.
// 2026-10-28: day 12 를 Waiheke 하루(패키지 없음)로 확정 — Fullers 09:30 → Matiatia → Oneroa 도보 → Mudbrick 점심 12:30(예약) → 버스로 Onetangi → 18:00 페리 → Britomart 디너. 시간표는 AT PDF(11/6 적용) 기준, Muriwai·쇼핑 항목 제거. DB 미반영.
// 2026-10-28: day 12 저녁에 선물 쇼핑 2단계(Commercial Bay·Aotea Gifts 22시, Woolworths Quay St 22시) 추가, 복귀 페리 17:30 으로 앞당김. DB 미반영.
// 네트워크 오류/지연 시 폴백으로만 사용. 이 데이터를 보는 동안에는 수정 불가.
export const MOCK_SCHEDULES: DaySchedule[] = [
  {
    "id": 0,
    "day": 0,
    "date": "10월 31일",
    "day_of_week": "토",
    "title": "출발",
    "subtitle": "인천 → Brisbane → Queenstown",
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
        "time": "11.01 일요일 오전 06:20 Brisbane 도착, 09:05 콴타스 항공 타고 Queenstown으로 출발",
        "emoji": "🔄",
        "title": "Brisbane 경유 (환승)",
        "description": "이후 3시간 30분동안 비행"
      },
      {
        "time": "11.01 15:35 Queenstown 도착",
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
    "title": "Queenstown 도착",
    "subtitle": null,
    "region": "south",
    "drive_info": null,
    "is_rest_day": false,
    "activities": [
      {
        "time": "11.01 15:35 Queenstown 도착",
        "emoji": "🛬",
        "title": "Queenstown 도착"
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
        "title": "[추천] Queenstown Gardens 산책",
        "description": "워터프론트 끝에서 이어지는 반도 공원, 한 바퀴 30분 · 시차 풀기에 딱 · 호수 건너 리마커블스 조망"
      },
      {
        "time": "저녁",
        "emoji": "🍽️",
        "title": "저녁 식사 (시내 식당 아무 곳이나)",
        "description": "워터프론트가 아니어도 됨 · 숙소(69 Frankton Rd) 근처나 시내에서 가볍게 · 다음 날 07:07 픽업이라 늦지 않게"
      },
      {
        "time": "저녁 식사 후 (중요)",
        "emoji": "🛒",
        "title": "내일 Milford Sound 투어 장보기",
        "description": "시내 마트 Four Square(Shotover St) · FreshChoice(Gorge Rd) 중 가까운 곳, 1번 버스 길에 Frankton 쪽 Woolworths 도 있음 · 일요일이지만 영업 · 살 것: 아침 대용(빵·요거트·바나나), 버스에서 먹을 간식(견과·초콜릿·과일), 큰 생수 2병, 따뜻한 음료(커피·차, 보온병 있으면), 샌드플라이 방충제(Bushman 등), 멀미약(약국 Unichem/Life Pharmacy), 선크림, 보조배터리 충전 확인 · 투어에 피크닉 점심·생수·간식은 포함이지만 Te Anau 휴식 때 카페는 자비"
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
      },
      {
        "text": "장보기는 저녁 먹고 숙소 가는 길에 · 마트에서 산 것은 밤에 가방에 미리 넣어 두기 (06:55 출발)"
      },
      {
        "text": "Milford 는 비·바람·샌드플라이가 기본 → 우비 또는 방수·방풍 재킷, 방충제, 겹쳐 입을 옷은 꼭 챙기기"
      }
    ],
    "accommodation": {
      "url": "https://www.booking.com/hotel/nz/alexis-motor-lodge.ko.html?checkin=2026-11-01&checkout=2026-11-05&group_adults=2&no_rooms=1&group_children=0",
      "name": "Queenstown (1/4박)",
      "note": "예약 완료 · 10/29까지 무료취소 가능",
      "options": [
        "Alexis Motor Lodge & Apartments",
        "69 Frankton Road, Queenstown"
      ]
    },
    "links": [
      {
        "url": "https://queenstownnz.co.nz",
        "label": "Queenstown 관광"
      }
    ]
  },
  {
    "id": 2,
    "day": 2,
    "date": "11월 2일",
    "day_of_week": "월",
    "title": "Milford Sound 당일투어",
    "subtitle": null,
    "region": "south",
    "drive_info": "약 13시간 투어 · 07:07 픽업 → 20시쯤 복귀",
    "is_rest_day": false,
    "activities": [
      {
        "time": "06:55",
        "emoji": "🚶",
        "title": "Copthorne Lakeview 앞으로 이동 (88 Frankton Rd)",
        "description": "숙소 바로 건너편, 도보 1~2분 · 픽업 5분 전엔 건물 밖에서 대기"
      },
      {
        "time": "07:07",
        "emoji": "🚌",
        "title": "투어버스 픽업 · 소규모 그룹 가이드 투어 (영어)",
        "description": "GetYourGuide 예약 GYGWZALM8Q3V · 성인 2명 · 기사는 여러 숙소를 돌며 ±10분 변동, 늦은 손님은 못 기다림"
      },
      {
        "time": "차창",
        "emoji": "🏞️",
        "title": "Lake Wakatipu · Devils Staircase",
        "description": "호수 남쪽 끝을 따라가는 절벽길 · 버스 안에서 경치 감상"
      },
      {
        "time": "휴식 30분",
        "emoji": "☕",
        "title": "Te Anau",
        "description": "Fiordland 입구 마을 · 커피·화장실·간식 (카페는 자비) · 이후 Milford까지 상점 없음"
      },
      {
        "time": "사진 10분",
        "emoji": "🌾",
        "title": "Eglinton Valley",
        "description": "빙하가 깎은 U자 계곡, 황금빛 터삭 초원"
      },
      {
        "time": "산책 30분",
        "emoji": "🪞",
        "title": "Mirror Lakes",
        "description": "바람 없으면 Earl Mountains이 거울처럼 비침 · 짧은 보드워크 자유 산책"
      },
      {
        "time": "15분",
        "emoji": "💧",
        "title": "Lake Gunn",
        "description": "너도밤나무 숲 사이 호수 · 사진·휴식"
      },
      {
        "time": "5분",
        "emoji": "🦜",
        "title": "Hollyford River",
        "description": "케아(고산 앵무새) 등 야생동물 관찰 포인트"
      },
      {
        "time": "통과",
        "emoji": "🚇",
        "title": "Homer Tunnel",
        "description": "1.2km 바위 터널 · 나오면 바로 피오르드 절벽"
      },
      {
        "time": "체류 105분",
        "emoji": "🚢",
        "title": "Milford Sound 부티크 크루즈 (1시간 30분)",
        "description": "피오르드 절벽·폭포·물개·돌고래 · 피크닉 점심(생수·간식 포함) · 커피·차"
      },
      {
        "time": "오후",
        "emoji": "🔁",
        "title": "같은 길로 Queenstown 복귀",
        "description": "돌아오는 길 4시간 안팎 · 낮잠·멀미약"
      },
      {
        "time": "20시쯤",
        "emoji": "🏠",
        "title": "Copthorne Lakeview 하차 → 숙소 도보 복귀",
        "description": "총 소요 약 13시간 · 픽업과 같은 장소"
      }
    ],
    "tips": [
      {
        "text": "숙소 그대로! 짐 안 옮겨도 됨"
      },
      {
        "text": "출발 전 챙길 것(Day 1 에 산 것): 생수·간식·아침 대용·방충제·멀미약·보온 음료 · 우비/방수 재킷은 입거나 가방에"
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
        "text": "준비물: 편한 운동화 · 선글라스 · 카메라 · 우비/방수·방풍 재킷 · 방충제(샌드플라이) · 겹쳐 입을 옷 — Milford 날씨는 예측 불가"
      },
      {
        "text": "포함: 호텔 픽업·하차, 소규모 가이드 투어, 부티크 크루즈 90분, 피크닉 점심 · 미포함: Te Anau 카페"
      },
      {
        "text": "멀미약 챙기기 (버스 구간 구불구불)"
      }
    ],
    "accommodation": {
      "url": "https://www.booking.com/hotel/nz/alexis-motor-lodge.ko.html?checkin=2026-11-01&checkout=2026-11-05&group_adults=2&no_rooms=1&group_children=0",
      "name": "Queenstown (2/4박)",
      "note": null,
      "options": [
        "Alexis Motor Lodge & Apartments",
        "69 Frankton Road, Queenstown"
      ]
    },
    "links": [
      {
        "url": "https://www.getyourguide.com/ko-kr/booking/HUQRTCBRIUTYL8S73HZUAW262VI2EOH2",
        "label": "GetYourGuide 예약 상세 (픽업 변경)"
      },
      {
        "url": "https://milford-sound.co.nz",
        "label": "Milford Sound"
      }
    ]
  },
  {
    "id": 3,
    "day": 3,
    "date": "11월 3일",
    "day_of_week": "화",
    "title": "곤돌라 & Kiwi Park",
    "subtitle": "Queenstown",
    "region": "south",
    "drive_info": "공항 ↔ 시내 차로 10분",
    "is_rest_day": false,
    "activities": [
      {
        "time": "오전 9:30",
        "emoji": "🚡",
        "title": "Skyline Gondola (Brecon St 베이스)",
        "description": "첫 곤돌라 09:30 · Bob's Peak 전망대에서 Queenstown·Lake Wakatipu 전경 · 숙소에서 도보 25~30분 또는 1번 버스 → Stanley St 허브 하차 후 Brecon St 도보 10분"
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
        "title": "Fergburger (42 Shotover St)",
        "description": "곤돌라 베이스에서 도보 5분 · 매일 07:00~02:30 · 점심 줄 20~40분 각오 → 늦어도 13:10엔 출발"
      },
      {
        "time": "13:14",
        "emoji": "🚌",
        "title": "1번 버스로 공항 이동 (Stanley St 버스허브 B → 공항 약 20분)",
        "description": "Fergburger에서 허브까지 도보 3분 · 15분 간격(12:59 · 13:14 · 13:29) · 성인 Bee Card $2.50 / 현금 $10 (카드 결제 불가) · 급하면 택시·우버 약 15분(NZ$35~45) 으로 Apex(32 Lucas Place) 직행"
      },
      {
        "time": "14:00",
        "emoji": "🚗",
        "title": "렌트카 픽업 · Apex Queenstown 공항점 (32 Lucas Place)",
        "description": "현대 투싼 2WD급 중형 SUV · 예약번호 4202766 · 터미널에서 차로 2분, 걸어서 5분 · 여기부터 남섬 드라이브 시작!",
        "image": "/images/apex-queenstown-pickup.png"
      },
      {
        "time": "15:00",
        "emoji": "🥝",
        "title": "Kiwi Park (51 Brecon St, 곤돌라 베이스 바로 아래)",
        "description": "공항에서 차로 10분 · 주차는 Skyline 입체주차장(297면, 도보 2분, Kiwi Park 티켓 실물 제시 시 20% 할인) · 여름 운영 09:30~18:30, 마지막 입장 17:45 · 성인 NZ$68 · 예약 시 Kiwi Encounter 시간 선택(15:00 / 16:15 / 17:00, 15분 전 도착) · 컨서베이션 쇼 15:30 · 17:30 (30분) · 관람 1.5~2시간"
      },
      {
        "time": "17:00",
        "emoji": "🌙",
        "title": "숙소 복귀 후 시내에서 자유롭게",
        "description": "Kiwi Park → Alexis Motor Lodge 차로 5분 · 해 지는 시간 20:25 쯤이라 저녁 드라이브도 여유"
      },
      {
        "time": "저녁 (선택)",
        "emoji": "🏞️",
        "title": "[추천] Bob's Cove 저녁 드라이브",
        "description": "Glenorchy 방향 20분, 30분 루프 트랙 · 에메랄드빛 호수와 산 반영 · 일몰 20:25 라 17시 이후도 여유 · 첫 운전 날이라 45분 걸리는 Glenorchy 대신 여기 추천"
      },
      {
        "time": "저녁 (선택)",
        "emoji": "📸",
        "title": "[추천] Lake Hayes 반영 사진",
        "description": "숙소에서 15분 · 바람 없는 저녁에 산이 호수에 비침 · Bob's Cove와 반대 방향이라 둘 중 하나"
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
        "text": "Skyline·Kiwi Park 둘 다 온라인 예약 권장 — 루지는 첫 탑승 시간, Kiwi Park는 Kiwi Encounter 시간을 고름(Kiwi Park는 48시간 전까지 전액 환불) · Skyline 주간 운영시간표는 방문 주에 다시 확인"
      },
      {
        "text": "Kiwi Park는 곤돌라 승강장 바로 아래(도보 2분) → 비로 루지가 멈추면 순서만 바꾸면 됨: 오전 Kiwi Park(10:00 인카운터) → 점심 → 픽업 → 오후 곤돌라·루지"
      },
      {
        "text": "Kiwi House 안은 사진·휴대폰 사용 금지 · 파크는 언덕에 자갈길·경사 → 운동화 · 버스는 현금 또는 Bee Card 만 (카드 결제 불가)"
      }
    ],
    "accommodation": {
      "url": "https://www.booking.com/hotel/nz/alexis-motor-lodge.ko.html?checkin=2026-11-01&checkout=2026-11-05&group_adults=2&no_rooms=1&group_children=0",
      "name": "Queenstown (3/4박)",
      "note": null,
      "options": [
        "Alexis Motor Lodge & Apartments",
        "69 Frankton Road, Queenstown"
      ]
    },
    "links": [
      {
        "url": "https://queenstown.skyline.co.nz/",
        "label": "Skyline (예약·요금)"
      },
      {
        "url": "https://queenstown.skyline.co.nz/opening-hours/",
        "label": "Skyline 주간 운영시간"
      },
      {
        "url": "https://kiwibird.co.nz/",
        "label": "Kiwi Park (운영시간·쇼 시간)"
      },
      {
        "url": "https://kiwibird.co.nz/products/",
        "label": "Kiwi Park 입장권 예약"
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
    "title": "Queenstown 자유일",
    "subtitle": null,
    "region": "south",
    "drive_info": null,
    "is_rest_day": true,
    "activities": [
      {
        "time": "오전 10:00",
        "emoji": "♨️",
        "title": "Onsen Hot Pools (호수뷰) - 예약 확정"
      },
      {
        "time": "11:30",
        "emoji": "🚤",
        "title": "[추천] Shotover Jet",
        "description": "Onsen Hot Pools과 같은 Arthurs Point, 차로 2분 · 협곡 사이 25분 제트보트, 360도 스핀 · 성인 NZ$199 안팎 · 사전 예약 필수 · 온천 → 제트 → Arrowtown 순이면 이동 최소"
      },
      {
        "time": "점심 (선택)",
        "emoji": "🍽️",
        "title": "[추천] Amisfield 비스트로 점심",
        "description": "Lake Hayes 옆, 뉴질랜드 최상급 레스토랑 · 코스 NZ$200~ · 예약 필수 · 저녁 Botswana 와 겹치니 점심으로"
      },
      {
        "time": "오후",
        "emoji": "🏘️",
        "title": "Arrowtown (선택)",
        "description": "온천에서 Malaghans Rd 로 15~20분(시내에서는 20분) · 1860년대 금광 마을, Buckingham St 산책·카페, 중국인 정착촌 유적 · Gibbston Valley 와이너리와 같은 방향이라 묶기 좋음, Glenorchy는 반대 방향이라 둘 중 하나만"
      },
      {
        "time": "오후",
        "emoji": "🏔️",
        "title": "Glenorchy 드라이브 (선택)",
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
        "title": "[추천] Kawarau Bridge Bungy (선택)",
        "description": "AJ Hackett 원조 번지(43m) · 안 뛰어도 무료 전망대에서 구경 · Gibbston Valley 와이너리 가는 길목"
      },
      {
        "time": "오후",
        "emoji": "🍷",
        "title": "[추천] Gibbston Valley 와이너리: Kinross · Gibbston Valley Winery",
        "description": "Kinross 는 여러 와이너리를 한 셀러도어에서 시음 · Gibbston Valley 는 와인 동굴 투어+치즈 · Arrowtown에서 15분 · 운전자는 시음 자제"
      },
      {
        "time": "저녁",
        "emoji": "🥩",
        "title": "Botswana Butchery (예약)"
      }
    ],
    "tips": [
      {
        "text": "Onsen Hot Pools 오전 10시 예약 확정 · 여유 있게 조금 일찍 도착"
      },
      {
        "text": "[추천] Arrowtown은 Day 5 아침 Crown Range 가는 길목이라 그때 들러도 자연스러움 → 오늘은 온천·Shotover Jet·Kawarau 번지·Gibbston Valley 와이너리에 집중 가능"
      }
    ],
    "accommodation": {
      "url": "https://www.booking.com/hotel/nz/alexis-motor-lodge.ko.html?checkin=2026-11-01&checkout=2026-11-05&group_adults=2&no_rooms=1&group_children=0",
      "name": "Queenstown (4/4박)",
      "note": null,
      "options": [
        "Alexis Motor Lodge & Apartments",
        "69 Frankton Road, Queenstown"
      ]
    },
    "links": [
      {
        "url": "https://onsen.co.nz",
        "label": "Onsen Hot Pools"
      },
      {
        "url": "https://arrowtown.com",
        "label": "Arrowtown"
      },
      {
        "url": "https://glenorchy.nz",
        "label": "Glenorchy"
      },
      {
        "url": "https://www.shotoverjet.com",
        "label": "[추천] Shotover Jet 예약"
      },
      {
        "url": "https://www.amisfield.co.nz",
        "label": "[추천] Amisfield 비스트로"
      },
      {
        "url": "https://www.bungy.co.nz",
        "label": "[추천] AJ Hackett Kawarau 번지"
      }
    ]
  },
  {
    "id": 5,
    "day": 5,
    "date": "11월 5일",
    "day_of_week": "목",
    "title": "Wanaka로 이동",
    "subtitle": null,
    "region": "south",
    "drive_info": "Queenstown → Crown Range Summit 약 1시간 → Wanaka 30분 (정차 제외 1시간 30분)",
    "is_rest_day": false,
    "activities": [
      {
        "time": "아침",
        "emoji": "🍳",
        "title": "Queenstown에서 아침 식사",
        "description": "Vudu Cafe & Larder(16 Rees St) 또는 Bespoke Kitchen(9 Isle St) · 출발 전에 든든히, 점심은 Wanaka 도착 후"
      },
      {
        "time": "10:00",
        "emoji": "👋",
        "title": "체크아웃 · Wanaka로 출발",
        "description": "짐 싣고 출발 · 경로: Frankton → Arrowtown 방면 → Crown Range Rd"
      },
      {
        "time": "오전",
        "emoji": "🏘️",
        "title": "[추천] Arrowtown (Day 4 에 안 갔으면)",
        "description": "Queenstown에서 20분, Crown Range 입구 바로 옆이라 동선 그대로 · Buckingham St 산책·카페 1시간"
      },
      {
        "time": "",
        "emoji": "🏔️",
        "title": "Crown Range Road 드라이브 (지그재그 구간)",
        "description": "Arrowtown 지나 바로 시작하는 급경사 지그재그 · 저속 주행 · 지그재그 꼭대기 Crown Range Lookout에서 Lake Wakatipu 분지 한 번 내려다보기"
      },
      {
        "time": "",
        "emoji": "📸",
        "title": "Crown Range Summit (1,076m) 정차",
        "description": "뉴질랜드에서 가장 높은 포장도로 고개 · 정상 주차장에서 사진 · 바람 세고 추우니 겉옷 · 11월에도 아침 결빙 경고가 뜰 수 있어 출발 전 NZTA 도로 상황 확인"
      },
      {
        "time": "",
        "emoji": "🚗",
        "title": "Cardrona 계곡 따라 Wanaka로 하강",
        "description": "Cardrona 마을 지나 30분 · 정차 없이 통과"
      },
      {
        "time": "낮",
        "emoji": "🧩",
        "title": "Puzzling World (선택)",
        "description": "Wanaka 초입, 착시 미술관 + 대형 미로. 1시간 코스"
      },
      {
        "time": "점심",
        "emoji": "🍽️",
        "title": "Wanaka 점심: Big Fig",
        "description": "호숫가 Ardmore St · 접시에 담아 주는 슬로우푸드, 줄 있어도 회전 빠름 · 대안: Kai Whakapai(호숫가 모퉁이 카페), Federal Diner(Helwick St)"
      },
      {
        "time": "오후",
        "emoji": "📸",
        "title": "Wanaka Tree",
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
        "title": "[추천] Mt Iron Track",
        "description": "시내에서 3분, 1.5시간 루프 · 완만한 오르막 끝에 Wanaka 호수·시내 전경 · Roys Peak 폐쇄 기간 대체로 가장 쉬운 전망 코스"
      },
      {
        "time": "저녁",
        "emoji": "🍽️",
        "title": "Wanaka 시내 레스토랑"
      },
      {
        "time": "저녁",
        "emoji": "🎬",
        "title": "[추천] Cinema Paradiso",
        "description": "소파·옛날 차 좌석에 앉아 보는 동네 영화관 · 중간 휴식에 갓 구운 쿠키 · 상영표 확인 후 예매"
      }
    ],
    "tips": [
      {
        "text": "Crown Range 는 겨울·이른 봄 체인 필수 구간 · 11월 초엔 보통 열려 있지만 아침 결빙·강풍 경고는 NZTA Journey Planner 로 출발 전 확인"
      },
      {
        "text": "지그재그 구간에서 추월·갓길 정차 금지 · 전망은 지정 Lookout 과 Summit 주차장에서만"
      }
    ],
    "accommodation": {
      "url": "https://www.booking.com/hotel/nz/aspiringlofts-wanaka.ko.html?checkin=2026-11-05&checkout=2026-11-07&group_adults=2&no_rooms=1&group_children=0",
      "name": "Wanaka (1/2박)",
      "note": "예약 완료 · 조식 포함 · 11/1 전까지 무료취소 가능",
      "options": [
        "Aspiringlofts",
        "42 Manuka Crescent, Wanaka"
      ]
    },
    "links": [
      {
        "url": "https://lakewanaka.co.nz",
        "label": "Wanaka 관광"
      },
      {
        "url": "https://www.puzzlingworld.co.nz",
        "label": "Puzzling World"
      },
      {
        "url": "https://www.paradiso.net.nz",
        "label": "[추천] Cinema Paradiso 상영표"
      },
      {
        "url": "https://www.journeys.nzta.govt.nz/",
        "label": "NZTA 도로 상황 (Crown Range)"
      }
    ]
  },
  {
    "id": 6,
    "day": 6,
    "date": "11월 6일",
    "day_of_week": "금",
    "title": "Wanaka · Diamond Lake 트레킹",
    "subtitle": null,
    "region": "south",
    "drive_info": "Wanaka ↔ Diamond Lake 주차장 18.5km, 차로 20~25분 (포장도로)",
    "is_rest_day": false,
    "activities": [
      {
        "time": "08:00",
        "emoji": "🍳",
        "title": "숙소 조식 후 출발 준비",
        "description": "Aspiringlofts 조식 포함 · 물 1L/인·간식·선크림·모자·바람막이 챙기기 · 트랙엔 식수·매점 없음"
      },
      {
        "time": "08:40",
        "emoji": "🚗",
        "title": "Mt Aspiring Rd 로 Diamond Lake 주차장 이동 (18.5km, 20~25분)",
        "description": "Wanaka 시내 → Ardmore St 서쪽 → Wanaka–Mt Aspiring Rd · Glendhu Bay(호수 뷰) 지나 5분 더 가면 왼쪽 'Diamond Lake' 표지판 → 도로 바로 옆 주차장 · 끝까지 포장도로라 렌트카 OK · 자리가 적어 09시 전 도착 권장, 만차면 도로변 750m 아래 보조 주차 · 간이 화장실 1개"
      },
      {
        "time": "09:05",
        "emoji": "🥾",
        "title": "주차장 → Diamond Lake 호숫가 (10분, 평지)",
        "description": "호수 한 바퀴 Circuit 은 45분(2.5km) · 시간 아끼려면 생략하고 전망대 계단으로 바로"
      },
      {
        "time": "09:35",
        "emoji": "🪜",
        "title": "Diamond Lake Lookout (주차장에서 약 30분, 급경사 계단)",
        "description": "호수를 위에서 내려다보는 첫 전망 · DOC 기준 왕복 1시간 2km"
      },
      {
        "time": "10:05",
        "emoji": "📸",
        "title": "Lake Wanaka Lookout (주차장에서 약 1시간)",
        "description": "이 코스의 대표 뷰 — Lake Wanaka·Glendhu Bay·설산이 한눈에 · DOC 기준 왕복 2시간 5km · 체력·날씨 애매하면 여기까지만 하고 돌아와도 본전은 충분"
      },
      {
        "time": "10:50",
        "emoji": "⛰️",
        "title": "Rocky Mountain 정상 775m (주차장에서 약 1시간 30분)",
        "description": "Lookout 위에서 Eastern·Western 두 루트로 갈라짐 → 한쪽으로 올라 반대쪽으로 내려오는 루프 · DOC 기준 왕복 3시간 7km · 정상은 바람 세고 그늘 없음 · 구름이 낮게 깔리면 길 잃기 쉬우니 그때는 생략"
      },
      {
        "time": "12:30",
        "emoji": "🚗",
        "title": "하산 → Wanaka 복귀 · 점심",
        "description": "사진·휴식 포함하면 실제 3.5~4.5시간 걸렸다는 후기가 많음 → 오후 일정은 여유 있게 · 점심은 Wanaka 시내(Big Fig 또는 호숫가 카페)"
      },
      {
        "time": "오후",
        "emoji": "🚴",
        "title": "호수 산책 / 카약 / 자전거 (선택)"
      },
      {
        "time": "오후 (선택)",
        "emoji": "🚗",
        "title": "[추천] Lake Hāwea Lookout → The Neck 드라이브",
        "description": "Haast 방향 15분, Lake Hāwea 전망대 → The Neck → Wanaka 동쪽 호숫가로 돌아오는 40분 루프 · Blue Pools까지 가면 편도 1시간(다리 복구 완료, 샌드플라이 기피제 필수)"
      },
      {
        "time": "오후",
        "emoji": "💜",
        "title": "Wanaka Lavender Farm",
        "description": "라벤더 밭 + 동물 먹이주기(양·알파카 등) + 라벤더 아이스크림·기념품 숍. 시내에서 차 7분, 입장료 있음. 만개 시즌은 12~2월이라 11월 초엔 꽃이 덜할 수 있음"
      },
      {
        "time": "늦은 오후",
        "emoji": "🍷",
        "title": "Rippon 와이너리 셀러도어",
        "description": "호수를 내려다보는 포도밭 뷰로 유명한 Wanaka 대표 와이너리(비오디나미 농법). 피노 누아·리슬링 시음, 예약 권장. 시내에서 차 5분"
      },
      {
        "time": "",
        "emoji": "📖",
        "title": "카페에서 책 읽기"
      },
      {
        "time": "저녁",
        "emoji": "🍳",
        "title": "Wanaka 레스토랑 or 숙소 요리"
      }
    ],
    "tips": [
      {
        "text": "Diamond Lake·Rocky Mountain 은 DOC 보전지역이라 Roys Peak(11/10까지 양 출산기 폐쇄)와 달리 열려 있음 · 출발 전 DOC 페이지 alerts 와 MetService Wanaka 날씨만 확인"
      },
      {
        "text": "운동화 이상(등산화면 더 좋음) · 계단·바위 구간 있음 · 비 온 뒤엔 미끄러움 · 겨울·눈사태 주의는 11월엔 해당 없음"
      },
      {
        "text": "오후 Rippon 시음은 홈페이지 예약 후 방문 · 운전자는 시음 자제 — 음주운전 단속 기준 엄격!"
      },
      {
        "text": "식당 후보: Big Fig(슬로우푸드), Francesca's Italian Kitchen, Kika(파인다이닝, 예약)"
      }
    ],
    "accommodation": {
      "url": "https://www.booking.com/hotel/nz/aspiringlofts-wanaka.ko.html?checkin=2026-11-05&checkout=2026-11-07&group_adults=2&no_rooms=1&group_children=0",
      "name": "Wanaka (2/2박)",
      "note": null,
      "options": [
        "Aspiringlofts",
        "42 Manuka Crescent, Wanaka"
      ]
    },
    "links": [
      {
        "url": "https://www.doc.govt.nz/documents/parks-and-recreation/tracks-and-walks/otago/wanaka-outdoor-pursuits-brochure.pdf",
        "label": "DOC Wanaka 트랙 소책자 (공식 소요시간)"
      },
      {
        "url": "https://planmywalk.nz/tracks/rocky-mountain-track",
        "label": "Plan My Walk · Rocky Mountain Track (경보·날씨)"
      },
      {
        "url": "https://www.rippon.co.nz",
        "label": "Rippon 와이너리"
      },
      {
        "url": "https://www.wanakalavenderfarm.com",
        "label": "Wanaka Lavender Farm"
      }
    ]
  },
  {
    "id": 7,
    "day": 7,
    "date": "11월 7일",
    "day_of_week": "토",
    "title": "Tekapo로 이동 · Clay Cliffs · Pukaki 연어",
    "subtitle": null,
    "region": "south",
    "drive_info": "Wanaka → Lindis Pass → Omarama(Clay Cliffs) → Twizel → Lake Pukaki → Tekapo 운전 약 3시간 10분 + 정차 (총 5~6시간)",
    "is_rest_day": false,
    "activities": [
      {
        "time": "09:00",
        "emoji": "👋",
        "title": "체크아웃 · Wanaka 출발",
        "description": "Wanaka → SH6 Tarras 방면 → SH8A → SH8 · 주유는 Wanaka 에서 미리 (다음 주유소는 Omarama·Twizel)"
      },
      {
        "time": "10:10",
        "emoji": "🌾",
        "title": "Lindis Pass 정상 (971m) 정차",
        "description": "황금빛 터삭 초원 · 정상 주차장에서 5~10분 사진 · 바람 셈"
      },
      {
        "time": "10:50",
        "emoji": "🏜️",
        "title": "Clay Cliffs (필수)",
        "description": "Omarama 에서 약 10km·15분: SH8 → Quailburn Rd(포장) → Henburn Rd(자갈, 마지막 몇 km) → 게이트 정직함(honesty box)에 차량당 NZ$5 현금(최근 $10 안내 사례도 있어 동전·소액 지폐 준비) → 길 끝 주차장 · 주차장에서 절벽 입구까지 도보 10~15분, 안쪽 협곡까지 보고 나오면 40분~1시간 · 사유지, 화장실 없음 · 비 온 뒤엔 자갈길이 거칠어 천천히(2026-04 후기: 도로 정비 전엔 험함)"
      },
      {
        "time": "12:15",
        "emoji": "⛽",
        "title": "Omarama → Twizel 통과 (30분)",
        "description": "화장실·주유·커피는 Twizel 에서 · 여기부터 Lake Pukaki 까지 10분"
      },
      {
        "time": "12:30",
        "emoji": "📸",
        "title": "Lake Pukaki Viewpoint (필수)",
        "description": "SH8 에서 SH80(Mt Cook 방면) 갈림길 직전, Lake Pukaki Information Centre 주차장 · 밀키블루 호수 너머 Mt Cook 정면 · 'View of Mt Cook' 전망 포인트가 주차장 바로 옆"
      },
      {
        "time": "12:40",
        "emoji": "🍣",
        "title": "점심: Mt Cook Alpine Salmon 사시미",
        "description": "방문자센터 옆 매장, 매일 10:00~16:30 · 사시미 100g NZ$15 안팎, 훈제연어·연어알도 판매 · 매장 밖 피크닉 테이블에서 Mt Cook 보며 먹기 · 오후 늦으면 사시미 품절 가능 → 점심 시간대 도착이 딱 좋음 · 간식·음료는 Twizel 에서 보충"
      },
      {
        "time": "13:40",
        "emoji": "🚗",
        "title": "Lake Pukaki → Tekapo (SH8, 45분)",
        "description": "Pukaki 동쪽 끝 Pukaki Canal 길 따라 → Tekapo · 도중 'Lake Pukaki 동쪽 전망' 표지판 정차는 선택"
      },
      {
        "time": "14:30",
        "emoji": "🏨",
        "title": "Tekapo 숙소 체크인 (Shepherd's View)",
        "description": "체크인 가능 시간은 예약 메일 확인 · 이르면 짐만 맡기고 호수로"
      },
      {
        "time": "오후",
        "emoji": "⛪",
        "title": "Church of the Good Shepherd",
        "description": "Church of the Good Shepherd"
      },
      {
        "time": "",
        "emoji": "💎",
        "title": "Lake Tekapo 밀키블루 호숫가 산책"
      },
      {
        "time": "선택",
        "emoji": "☕",
        "title": "[추천] Mt John Astro Café",
        "description": "Mackenzie Basin·Lake Tekapo 360도 전망 · 정상 도로 차량 NZ$14(09~16시, 카드만) · 카페는 14시 마감이라 오늘은 도착이 늦어 못 감 → Day 9 아침 체크아웃 전(09시 오픈)에 가거나, 오늘은 16시 전 정상 도로만 올라가 전망만"
      },
      {
        "time": "저녁",
        "emoji": "🍣",
        "title": "고다이로 일식 or 숙소 요리"
      },
      {
        "time": "일몰·밤",
        "emoji": "⛪",
        "title": "[추천] Church of the Good Shepherd 일몰·밤 재방문",
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
        "text": "Clay Cliffs 입장료는 현금(차량당 $5, 최근 $10 안내 사례) · Henburn Rd 자갈 구간은 천천히, 렌트카 약관의 비포장도로 조항 한 번 확인"
      },
      {
        "text": "연어 매장은 16:30 마감 · 점심을 여기서 먹을 거라 Wanaka 출발 09시를 지키면 12시 반쯤 도착"
      },
      {
        "text": "11/9 가 신월 → 오늘·내일 밤은 달빛 없는 최적 조건. 별 투어는 이틀에 나눠 예약하면 날씨 보험"
      }
    ],
    "accommodation": {
      "url": "https://www.booking.com/hotel/nz/shepherd-39-s-view.ko.html?checkin=2026-11-07&checkout=2026-11-09&group_adults=2&no_rooms=1&group_children=0",
      "name": "Tekapo (1/2박)",
      "note": "예약 완료 · 10/22까지 무료취소 가능",
      "options": [
        "Shepherd's View - Lake Tekapo",
        "1 Bill Apes Lane, Lake Tekapo"
      ]
    },
    "links": [
      {
        "url": "https://www.waitakinz.com/explore/clay-cliffs",
        "label": "Clay Cliffs 안내 (Waitaki 관광)"
      },
      {
        "url": "https://mtcookalpinesalmon.com",
        "label": "Mt Cook Alpine Salmon"
      },
      {
        "url": "https://laketekapotourism.co.nz",
        "label": "Tekapo 관광"
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
    "title": "Tekapo 자유일 & 별 관측",
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
        "title": "[추천] Peter's Lookout",
        "description": "Mt Cook 도로(SH80) 초입 · Pukaki 호수 너머 Mt Cook 정면, 5분 정차"
      },
      {
        "time": "오전~오후",
        "emoji": "🏔️",
        "title": "Mt Cook Hooker Valley Track (선택)",
        "description": "차로 편도 1시간, 왕복 3시간 평탄한 트레킹. 뉴질랜드 대표 절경!"
      },
      {
        "time": "오후 (선택)",
        "emoji": "🧊",
        "title": "[추천] Tasman Glacier View Track",
        "description": "Hooker Valley에서 차로 10분 · 왕복 40분, 계단 오르면 빙산 떠 있는 Tasman Lake · Hooker Valley는 7/28 새 189m 현수교 개통으로 전 구간 통행 가능"
      },
      {
        "time": "오후 (선택)",
        "emoji": "🚤",
        "title": "[추천] Glacier Explorers 빙산 보트",
        "description": "Tasman Lake에서 빙산 사이 보트 2.5시간 · 성인 NZ$209 안팎 · 11월 운영, 예약 필수(48시간 내 취소 50%) · Hooker Valley와 묶으면 Mt Cook 하루 꽉 참"
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
      "name": "Tekapo (2/2박)",
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
        "label": "Hooker Valley Track"
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
    "title": "Christchurch로 이동",
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
        "title": "[추천] Barker's of Geraldine",
        "description": "Fairlie에서 30분, 길목 · 잼·처트니·시럽 시식, 선물용으로 좋음 · 옆 Talbot Forest 치즈도"
      },
      {
        "time": "오후",
        "emoji": "🏪",
        "title": "Riverside Market (푸드홀) 구경"
      },
      {
        "time": "",
        "emoji": "🌿",
        "title": "Botanic Gardens 산책"
      },
      {
        "time": "",
        "emoji": "🛶",
        "title": "Avon River 펀팅 (선택)"
      },
      {
        "time": "",
        "emoji": "⛪",
        "title": "Cardboard Cathedral"
      },
      {
        "time": "",
        "emoji": "🎨",
        "title": "[추천] New Regent Street · 헤리티지 트램",
        "description": "파스텔 스페인풍 거리(New Regent St), 트램이 지나가는 사진 스팟 · 트램은 시내 한 바퀴 루프"
      },
      {
        "time": "",
        "emoji": "🏚️",
        "title": "[추천] Quake City (선택)",
        "description": "2011 지진 기념관, 작지만 울림 있음 · 1시간 · Riverside Market에서 도보 5분"
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
      "name": "Christchurch (1박)",
      "note": "예약 완료 · 11/3까지 무료취소 가능",
      "options": [
        "Urban Retreat in Central City Christchurch",
        "g10/20 Bath Street, Christchurch"
      ]
    },
    "links": [
      {
        "url": "https://riverside.nz",
        "label": "Riverside Market"
      },
      {
        "url": "https://christchurchnz.com",
        "label": "Christchurch"
      }
    ]
  },
  {
    "id": 10,
    "day": 10,
    "date": "11월 10일",
    "day_of_week": "화",
    "title": "Auckland 이동",
    "subtitle": null,
    "region": "north",
    "drive_info": "국내선 JQ232 09:55 → 11:15 (1시간 20분)",
    "is_rest_day": false,
    "activities": [
      {
        "time": "09:00 반납",
        "emoji": "🚗",
        "title": "렌트카 반납 · Apex Christchurch 공항점 (28 Ron Guthrey Rd)",
        "description": "Russley Rd 에서 진입 · 반납 후 Apex 무료 셔틀로 터미널 이동 · 주유는 Russley Rd 남쪽 2~3km 주유소",
        "image": "/images/apex-christchurch-dropoff.png"
      },
      {
        "time": "09:55 출발",
        "emoji": "✈️",
        "title": "제트스타 JQ232 Christchurch → Auckland",
        "description": "에어버스 A320 · 이코노미(스타터 운임) · 비행 1시간 20분 · Christchurch 국내선 터미널"
      },
      {
        "time": "11:15 도착",
        "emoji": "🛬",
        "title": "Auckland 도착",
        "description": "Auckland 국내선 터미널"
      },
      {
        "time": "점심",
        "emoji": "🍽️",
        "title": "시내에서 식사"
      },
      {
        "time": "오후",
        "emoji": "🌹",
        "title": "[추천] Parnell Rose Gardens",
        "description": "숙소(Beach Rd)에서 도보 15분 · 11월이 장미 만개 시즌 · 축제(보통 11월 둘째 일요일)는 도착 전에 끝났을 가능성 큼, 꽃은 그대로"
      },
      {
        "time": "오후",
        "emoji": "🗼",
        "title": "Sky Tower 전망대"
      },
      {
        "time": "",
        "emoji": "⛵",
        "title": "Viaduct Harbour 산책"
      },
      {
        "time": "일몰",
        "emoji": "🌋",
        "title": "[추천] Mt Eden 일몰",
        "description": "시내에서 차·버스 10분, 분화구 정상 · Sky Tower·하버 전경 · 정상까지 걸어서 15분"
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
        "description": "숙소 근처 Gore St · Auckland 대표 수제 아이스크림, 줄 서는 곳"
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
      "name": "Auckland (1/3박)",
      "note": "예약 완료 · 무료취소 불가",
      "options": [
        "Imagine Beach Road",
        "31 Beach Road, Auckland"
      ]
    },
    "links": [
      {
        "url": "https://skycityauckland.co.nz",
        "label": "Sky Tower"
      },
      {
        "url": "https://aucklandnz.com",
        "label": "Auckland"
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
    "title": "Hobbiton & Waitomo",
    "subtitle": "가이드 투어 당일치기",
    "region": "north",
    "drive_info": "가이드 투어 약 11시간 · 숙소 픽업·하차 (렌트카 불필요)",
    "is_rest_day": false,
    "activities": [
      {
        "time": "픽업 (시간은 확정 메일)",
        "emoji": "🚌",
        "title": "숙소 로비에서 투어 픽업 (Imagine Beach Road)",
        "description": "픽업 시간은 예약 후 24~48시간 내 확정 메일로 안내 · 최소 10분 전 로비 대기 · 투어 시작 전 미리 올 수도 있음 · 10/1~4/30 에는 07:30 출발편도 운영 · 최대 16명 소그룹, 영어 운전사 겸 가이드"
      },
      {
        "time": "오전",
        "emoji": "🚐",
        "title": "Auckland → Hobbiton 이동 (약 2시간)",
        "description": "교통·가이드 포함, 운전 안 해도 됨"
      },
      {
        "time": "",
        "emoji": "🧙",
        "title": "Hobbiton 영화 세트장 가이드 투어 (2시간 30분)",
        "description": "44개 호빗집, 파티트리 · 세트장 입장+가이드 투어 포함"
      },
      {
        "time": "",
        "emoji": "🍺",
        "title": "Green Dragon Inn에서 무료 음료 1잔",
        "description": "투어에 포함 · 맥주·사이다·진저비어 중 선택"
      },
      {
        "time": "점심",
        "emoji": "🥪",
        "title": "Waitomo 카페 점심 (1시간, 포함)",
        "description": "클래식 키위 스타일 가벼운 카페 점심 · 채식·비건 등 식이 제한은 미리 요청"
      },
      {
        "time": "오후",
        "emoji": "✨",
        "title": "Waitomo Glowworm Caves 가이드 투어 (45분, 입장 포함)",
        "description": "보트 타고 동굴 속 반딧불 · 동굴 안 사진 촬영 금지 · 현지 일정 1시간"
      },
      {
        "time": "저녁",
        "emoji": "🌙",
        "title": "Auckland 복귀 · 숙소 하차 후 시내 디너",
        "description": "픽업과 같은 곳(Imagine Beach Road)에 내려줌 · 총 약 11시간"
      }
    ],
    "tips": [
      {
        "text": "숙소 그대로! 짐 안 옮김"
      },
      {
        "text": "예약 완료 · GetYourGuide 예약번호 GYGN6BZYBG9H · 성인 2명(Naeun Kim 명의) · ₩634,432 결제 · PIN 은 예약 메일 참조"
      },
      {
        "text": "픽업 시간 확정 메일(예약 후 24~48시간)을 꼭 확인 · Auckland 다운타운 호텔만 픽업 · 로비에서 10분 전 대기"
      },
      {
        "text": "포함: 호텔 픽업·복귀, 교통, 운전사 겸 가이드, Hobbiton 입장+가이드 투어, Green Dragon 음료 1잔, 카페 점심, Waitomo 입장+45분 가이드 투어 · 미포함: 팁(선택)"
      },
      {
        "text": "준비물: 편한 신발 · 드론 반입 금지 · 우천에도 진행하니 날씨에 맞는 옷 · 힘들진 않지만 걷는 구간 있음"
      },
      {
        "text": "이 날은 렌트카 필요 없음 (북섬 렌트카는 미예약) → Day 12 도 차 없이 페리·버스·택시 기준"
      }
    ],
    "accommodation": {
      "url": "https://www.booking.com/hotel/nz/imagine-beach-road.ko.html?checkin=2026-11-10&checkout=2026-11-13&group_adults=2&no_rooms=1&group_children=0",
      "name": "Auckland (2/3박)",
      "note": null,
      "options": [
        "Imagine Beach Road",
        "31 Beach Road, Auckland"
      ]
    },
    "links": [
      {
        "url": "https://www.getyourguide.com/ko-kr/booking/0LT6TIZQOB9A5LDUP204VLY62GNEJARX",
        "label": "GetYourGuide 예약 상세 (픽업 시간 확인)"
      },
      {
        "url": "https://hobbitontours.com",
        "label": "Hobbiton"
      },
      {
        "url": "https://waitomo.com",
        "label": "Waitomo 동굴"
      }
    ]
  },
  {
    "id": 12,
    "day": 12,
    "date": "11월 12일",
    "day_of_week": "목",
    "title": "Waiheke Island 하루",
    "subtitle": "페리 + 섬 버스 + 도보 (패키지 없음)",
    "region": "north",
    "drive_info": "숙소 → Downtown Ferry Terminal 도보 12분 · 페리 40분 · 섬 안은 AT 버스(50A/50B)와 도보",
    "is_rest_day": false,
    "activities": [
      {
        "time": "08:30",
        "emoji": "🍳",
        "title": "가벼운 아침 · 챙길 것",
        "description": "선크림·모자·수영복·작은 수건·물 · 섬은 카드 결제가 보편이라 현금은 조금만"
      },
      {
        "time": "08:50",
        "emoji": "🚶",
        "title": "숙소 → Downtown Ferry Terminal (도보 12분)",
        "description": "Beach Rd → Britomart 지나 Quay St · Fullers360 은 Pier 11 · 표는 Fullers 앱·웹 또는 현장 키오스크에서 'Waiheke Standard' 왕복 성인 NZ$65 — 특정 편 지정 없이 당일 아무 편 탑승(1년 유효) · Off-Peak $48.50 는 13시 이후 출발만이라 해당 없음"
      },
      {
        "time": "09:30",
        "emoji": "⛴️",
        "title": "Fullers360 → Matiatia (40분, 10:10 도착)",
        "description": "목요일 직항 09:30·10:00·10:30 (09:00·11:00 은 Devonport 경유 +10분) · 대안 Island Direct(Pier 13, 왕복 $59) 09:15·10:15 · 뱃머리 오른쪽에서 Harbour Bridge·Rangitoto 조망"
      },
      {
        "time": "10:15",
        "emoji": "🚶",
        "title": "Matiatia → Oneroa (도보 20분 또는 버스 5분)",
        "description": "Ocean View Rd 따라 1.5km 완만한 오르막 · 버스는 선착장 앞 50A/50B 아무거나, 신용·체크카드 탭(현금·EFTPOS 불가) · 자연 코스를 원하면 Matiatia 해안 산책로(Owhanake 루프 1.5~2시간, 간조 시간 확인)로 대체 가능"
      },
      {
        "time": "10:40",
        "emoji": "🏖️",
        "title": "Oneroa 마을 · Oneroa Beach (1시간)",
        "description": "카페 커피, 갤러리·숍 구경, 해변 산책 · 섬의 중심 마을"
      },
      {
        "time": "11:50",
        "emoji": "🚶",
        "title": "Oneroa → Mudbrick (도보 20~25분 오르막 또는 택시 5분)",
        "description": "126 Church Bay Rd · 걸어가면 언덕에서 Matiatia 만 전망이 덤 · 더우면 마을에서 택시"
      },
      {
        "time": "12:30",
        "emoji": "🍽️",
        "title": "Mudbrick Vineyard 점심 (예약 필수)",
        "description": "레스토랑(12시부터 테이스팅 메뉴·알라카르트) 또는 같은 부지의 The Archive 비스트로(캐주얼, 같은 예약 캘린더) · 식후 셀러도어 시음 · 테라스에서 Auckland 스카이라인 조망 · 2시간"
      },
      {
        "time": "14:40",
        "emoji": "🚌",
        "title": "Oneroa 정류장 → Onetangi (50A/50B 약 25분)",
        "description": "Mudbrick 에서 Oneroa 로 내려와(내리막 15분) 탑승 · 카드 탭"
      },
      {
        "time": "15:10",
        "emoji": "🏝️",
        "title": "Onetangi Beach (1시간 30분)",
        "description": "섬에서 가장 긴 2km 백사장 · 수영은 11월 수온 17℃ 안팎이라 발만 담가도 좋음 · The Strand 의 Charley Farley's 에서 맥주 한 잔"
      },
      {
        "time": "16:00",
        "emoji": "🍷",
        "title": "[선택] Tantalus Estate 시음",
        "description": "72 Onetangi Rd, 해변에서 도보 20분 또는 버스 한두 정거장 · 와인과 크래프트 맥주(Alibi) · 저녁 쇼핑 시간을 지키려면 30분 내로"
      },
      {
        "time": "16:30",
        "emoji": "🚌",
        "title": "Onetangi → Matiatia (버스 30분, 17:05 도착)",
        "description": "50A/50B 아무거나 · 카드 탭"
      },
      {
        "time": "17:30",
        "emoji": "⛴️",
        "title": "Fullers360 Matiatia Pier 1 → Auckland (18:10 도착)",
        "description": "목요일 17:00·17:30·18:00 중 선택 · 선물 쇼핑 시간을 위해 17:30 권장(16:00 은 Devonport 경유) · 더 놀다 오면 쇼핑은 Aotea·마트(22시)만 가능"
      },
      {
        "time": "18:15",
        "emoji": "🛍️",
        "title": "선물 쇼핑 ①: Commercial Bay · Aotea Gifts (페리터미널 바로 앞)",
        "description": "Commercial Bay 상점은 목요일 19시까지, 그 안의 Aotea Gifts(뉴질랜드 최대 기념품 체인)는 22시까지 · 가족·지인용: 마누카 꿀(UMF 10+ 선물 포장), 포섬·메리노 양말/장갑/목도리, 그린스톤(포우나무) 목걸이, 라놀린·마누카 크림, 키위·실버펀 마그넷/열쇠고리, Whittaker's 선물 세트 · 공항 면세점보다 종류 많고 대체로 더 쌈"
      },
      {
        "time": "19:15",
        "emoji": "🥂",
        "title": "마지막 밤 디너: Britomart",
        "description": "Commercial Bay 에서 5분 · Amano(이탈리안, 예약 권장) 또는 Cafe Hanoi · 숙소까지 도보 10분"
      },
      {
        "time": "20:30",
        "emoji": "🛒",
        "title": "선물 쇼핑 ②: Woolworths Quay St (76 Quay St, 숙소 도보 2분, 22시까지)",
        "description": "지인용 대량 구매는 마트가 가성비: Whittaker's 초콜릿 블록(L&P·키위 맛 등), 마누카 꿀 소용량, Pic's 땅콩버터, Pineapple Lumps·키위 젤리, 뉴질랜드 티·커피, 양 캐릭터 과자 · 카트 가득 사도 숙소가 2분이라 들고 가기 편함"
      },
      {
        "time": "21:30",
        "emoji": "🧳",
        "title": "짐 정리 · 선물 포장",
        "description": "내일 11:45 비행 → 08:15 숙소 출발(공항 30분) · 꿀·크림은 위탁 수하물에, 위탁 25kg/인 무게 확인 · 못 산 건 공항에서"
      }
    ],
    "tips": [
      {
        "text": "예약 2건: ① Mudbrick 점심 12:30 2명 — 24시간 전까지 온라인(mudbrick.co.nz/book/restaurant), 전화 +64 9 372 9050 · ② Amano 디너(선택) · 페리는 예약 불필요(Standard 왕복은 아무 편)"
      },
      {
        "text": "선물 리스트를 미리 적어 두고 Aotea(공예·기념품) → 마트(식품) 순으로 · 뉴질랜드는 관광객 세금 환급 제도가 없어 영수증 환급은 없음 · Chemist Warehouse(Queen St)는 마누카 꿀·화장품이 싸지만 영업시간 확인"
      },
      {
        "text": "Mudbrick 이 꽉 차면 Cable Bay Vineyards(Matiatia 에서 도보 15분) 로 대체 · 둘 다 점심 12~14시대가 붐빔"
      },
      {
        "text": "섬 버스는 Auckland 시내와 같은 AT 버스 — 신용·체크카드 탭 또는 AT HOP, 현금·EFTPOS 불가 · 요금은 몇 달러 수준, 15~30분 간격"
      },
      {
        "text": "패키지(홉온홉오프·와인투어) 없이 버스+도보로 충분 · 와이너리를 3곳 이상 돌고 싶을 때만 택시"
      },
      {
        "text": "페리 시간표는 AT 공식 PDF(2026-11-06 적용) 기준 · 당일 Fullers 앱에서 결항·변경 한 번 확인"
      }
    ],
    "accommodation": {
      "url": "https://www.booking.com/hotel/nz/imagine-beach-road.ko.html?checkin=2026-11-10&checkout=2026-11-13&group_adults=2&no_rooms=1&group_children=0",
      "name": "Auckland (3/3박)",
      "note": "다음 날 오전 11:45 비행, 공항까지 차로 약 30분",
      "options": [
        "Imagine Beach Road",
        "31 Beach Road, Auckland"
      ]
    },
    "links": [
      {
        "url": "https://at.govt.nz/media/xgjjms32/auckland-transport-waiheke-island-ferry-timetable.pdf",
        "label": "Waiheke 페리 시간표 (AT 공식 PDF, 11/6~)"
      },
      {
        "url": "https://www.fullers.co.nz/destinations-and-experiences/destinations/waiheke-island/",
        "label": "Fullers360 Waiheke (요금·앱)"
      },
      {
        "url": "https://mudbrick.co.nz/book/restaurant/",
        "label": "Mudbrick 점심 예약"
      },
      {
        "url": "https://www.tourismwaiheke.co.nz/explore/bus-service/hop-card",
        "label": "Waiheke 섬 버스 결제 안내"
      },
      {
        "url": "https://tantalus.co.nz",
        "label": "Tantalus Estate"
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
        "title": "Auckland 공항 출발"
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
