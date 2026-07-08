export interface Photo {
  id: number
  src: string
  alt: string
  sportType: string
  eventName: string
}

export const photos: Photo[] = [
  { id: 1, src: '/photo-grid-1.jpg', alt: '选手在树林中查看地图', sportType: '定向越野', eventName: '广东省大学生运动会定向赛' },
  { id: 2, src: '/photo-grid-2.jpg', alt: '点标打卡瞬间', sportType: '定向越野', eventName: '华瑞健五一训练营' },
  { id: 3, src: '/photo-grid-3.jpg', alt: '选手跨越溪流', sportType: '定向越野', eventName: '周末定向训练' },
  { id: 4, src: '/photo-grid-4.jpg', alt: '青少年定向培训', sportType: '定向越野', eventName: '暑期定向集训营' },
  { id: 5, src: '/photo-grid-5.jpg', alt: '地图与指北针', sportType: '定向越野', eventName: '无线电测向基础班' },
  { id: 6, src: '/photo-grid-6.jpg', alt: '夜间定向训练', sportType: '定向越野', eventName: '五一训练营（肇庆站）' },
  { id: 7, src: '/photo-grid-7.jpg', alt: '城市短距离定向', sportType: '定向越野', eventName: '三山MAX越野系列赛' },
  { id: 8, src: '/photo-grid-8.jpg', alt: '颁奖仪式', sportType: '定向越野', eventName: '广东省大学生运动会定向赛' },
  { id: 9, src: '/photo-grid-1.jpg', alt: '教练指导学员读图', sportType: '定向越野', eventName: '周末定向训练' },
  { id: 10, src: '/photo-grid-3.jpg', alt: '亲子定向活动', sportType: '定向越野', eventName: '暑期定向集训营' },
  { id: 11, src: '/photo-grid-5.jpg', alt: '赛前热身', sportType: '定向越野', eventName: '华瑞健五一训练营' },
  { id: 12, src: '/photo-grid-7.jpg', alt: '终点冲刺', sportType: '定向越野', eventName: '广东省第十九届定向锦标赛' },
  { id: 13, src: '/photo-grid-2.jpg', alt: '控制点附近寻点', sportType: '定向越野', eventName: '周末定向训练' },
  { id: 14, src: '/photo-grid-4.jpg', alt: '学员合影', sportType: '定向越野', eventName: '暑期定向集训营' },
  { id: 15, src: '/photo-grid-6.jpg', alt: '无线电测向训练', sportType: '无线电测向', eventName: '无线电测向基础班' },
  { id: 16, src: '/photo-grid-8.jpg', alt: '团队合影', sportType: '定向越野', eventName: '五一训练营（肇庆站）' },
]

export const getAllPhotos = (): Photo[] => photos

export const getPhotosBySportType = (type: string): Photo[] => {
  if (type === '全部') return photos
  return photos.filter((p) => p.sportType === type)
}

export const sportTypeFilters = ['全部', '定向越野', '无线电测向']
