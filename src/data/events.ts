export type EventStatus = 'live' | 'upcoming' | 'ended'

export interface SportEvent {
  id: string
  name: string
  date: string
  location: string
  coverImage: string
  photoLiveUrl: string
  status: EventStatus
  description: string
  photoCount: number
  sportType: string
}

export const events: SportEvent[] = [
  {
    id: '1',
    name: '广东省第十二届大学生运动会"华瑞健杯"定向越野比赛',
    date: '2025年5月10-12日',
    location: '广州 · 花都赤坭镇蓝田紫林度假区',
    coverImage: '/event-cover-marathon.jpg',
    photoLiveUrl: 'https://live.photoplus.cn/xxxxxxxx',
    status: 'ended',
    description: '广东省大学生运动会定向越野比赛，由华瑞健定向承办，汇聚全省高校定向精英，在花都山水间展开激烈角逐。',
    photoCount: 3280,
    sportType: '定向越野',
  },
  {
    id: '2',
    name: '华瑞健定向五一训练营（肇庆站）',
    date: '2025年5月1-5日',
    location: '广东 · 肇庆',
    coverImage: '/event-cover-basketball.jpg',
    photoLiveUrl: 'https://live.photoplus.cn/xxxxxxxx',
    status: 'ended',
    description: '五一假期定向越野系统集训，包含短距离、中距离、长距离及接力赛训练，专业教练全程指导。',
    photoCount: 2156,
    sportType: '定向越野',
  },
  {
    id: '3',
    name: '华瑞健定向暑期集训营（深圳南山）',
    date: '2025年7月8-11日',
    location: '深圳 · 南山区（深圳五园/塘朗山公园）',
    coverImage: '/event-cover-football.jpg',
    photoLiveUrl: 'https://live.photoplus.cn/xxxxxxxx',
    status: 'upcoming',
    description: '暑期定向越野系统集训，3天定向训练+1天徒步，适合6-60岁健康人士参与。师生比例1:5，配备专业男女教练。',
    photoCount: 0,
    sportType: '定向越野',
  },
  {
    id: '4',
    name: '华瑞健定向俱乐部周末训练',
    date: '2025年4月19日 · 09:00',
    location: '深圳 · 中山公园',
    coverImage: '/event-cover-tennis.jpg',
    photoLiveUrl: 'https://live.photoplus.cn/xxxxxxxx',
    status: 'live',
    description: '每周六/日定期定向训练，专业教练带队，提升定向技能和体能。单次体验课29.9元/人。',
    photoCount: 486,
    sportType: '定向越野',
  },
  {
    id: '5',
    name: '无线电测向基础班（第二期）',
    date: '2025年4月20日 · 09:00',
    location: '深圳 · 中心公园',
    coverImage: '/event-cover-tennis.jpg',
    photoLiveUrl: 'https://live.photoplus.cn/xxxxxxxx',
    status: 'ended',
    description: '无线电测向基础培训，学习80m测向技术和交叉定点法，科技与传统户外运动的完美结合。',
    photoCount: 892,
    sportType: '无线电测向',
  },
  {
    id: '6',
    name: '广东省第十九届定向锦标赛',
    date: '2025年7月18-20日',
    location: '东莞 · 滨海湾',
    coverImage: '/event-cover-marathon.jpg',
    photoLiveUrl: 'https://live.photoplus.cn/xxxxxxxx',
    status: 'upcoming',
    description: '广东省定向越野最高级别赛事，华瑞健定向组织参赛队伍进行赛前系统性训练。',
    photoCount: 0,
    sportType: '定向越野',
  },
  {
    id: '7',
    name: '"三山MAX"天河火龙凤越野系列赛',
    date: '2025年6月21日 · 08:30',
    location: '广州 · 广东生态工程职业学院',
    coverImage: '/event-cover-basketball.jpg',
    photoLiveUrl: 'https://live.photoplus.cn/xxxxxxxx',
    status: 'ended',
    description: '"三山MAX"越野系列赛之定向运动公开赛，广州华瑞健为执行单位，以"生态+定向越野"为特色。',
    photoCount: 1567,
    sportType: '定向越野',
  },
  {
    id: '8',
    name: '华瑞健定向周末训练营（莲花山）',
    date: '2025年4月26日 · 09:00',
    location: '深圳 · 莲花山公园',
    coverImage: '/event-cover-football.jpg',
    photoLiveUrl: 'https://live.photoplus.cn/xxxxxxxx',
    status: 'upcoming',
    description: '周末定向训练营，在深圳市中心最美的公园中体验定向越野的乐趣，适合全家参与。',
    photoCount: 0,
    sportType: '定向越野',
  },
]

export const getEventById = (id: string): SportEvent | undefined => {
  return events.find((e) => e.id === id)
}

export const getLiveEvents = (): SportEvent[] => {
  return events.filter((e) => e.status === 'live')
}

export const getFeaturedEvents = (): SportEvent[] => {
  return events.slice(0, 3)
}

export const getAllEvents = (): SportEvent[] => {
  return events
}

export const getEventsByStatus = (status: EventStatus): SportEvent[] => {
  return events.filter((e) => e.status === status)
}

export const getEventsBySportType = (sportType: string): SportEvent[] => {
  if (sportType === '全部') return events
  return events.filter((e) => e.sportType === sportType)
}

export const getRelatedEvents = (currentId: string, limit = 3): SportEvent[] => {
  return events.filter((e) => e.id !== currentId).slice(0, limit)
}
