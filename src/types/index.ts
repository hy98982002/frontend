// 课程阶段枚举 - 统一管理所有可能的阶段
export const STAGES = {
  free: '体验',
  basic: '入门', 
  advanced: '精进',
  project: '实战',
  landing: '项目落地'
} as const

export type StageKey = keyof typeof STAGES
export type StageValue = typeof STAGES[StageKey]

// 阶段样式映射
export const STAGE_STYLES = {
  free: { textClass: 'text-success', bgClass: 'bg-success-subtle', label: '免费' },
  basic: { textClass: 'text-primary', bgClass: 'bg-primary-subtle', label: '入门' },
  advanced: { textClass: 'text-info', bgClass: 'bg-info-subtle', label: '精进' },
  project: { textClass: 'text-warning', bgClass: 'bg-warning-subtle', label: '实战' },
  landing: { textClass: 'text-danger', bgClass: 'bg-danger-subtle', label: '项目落地' }
} as const

// 课程接口
export interface Course {
  id: number
  title: string
  cover: string
  stage: StageKey
  camp?: 'skill' | 'career' | 'enterprise' // 营区归属
  tags: string[] // 子标签数组，用于过滤
  price?: number
  originalPrice?: number
  learnerCount: number
  rating?: number
  reviewCount?: number
  duration?: string // 课程时长
  level?: string // 难度级别
  badge?: string // 课程徽章
  description?: string
  instructor?: string
  isHot?: boolean
  isFree?: boolean
}

// 教师接口
export interface Teacher {
  id: number
  name: string
  avatar: string
  title: string
  specialty: string
  experience: string
  description?: string
}

// 营区数据接口
export interface CampData {
  title: string
  subtitle: string
  stageOrder: StageKey[] // 该营区显示的阶段顺序
  courses: Course[]
}

// 子标签接口
export interface SubTag {
  id: string
  name: string
  isActive?: boolean
}

// 专区按钮接口
export interface ZoneButton {
  id: string
  name: string
  target: string
  isActive?: boolean
}

// 轮播图接口
export interface CarouselItem {
  id: number
  image: string
  title: string
  subtitle: string
  link?: string
}

// API响应接口
export interface ApiResponse<T = any> {
  status: number
  data: T
  msg: string
}

// 分页接口
export interface PaginationData<T = any> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// 筛选条件接口
export interface CourseFilter {
  stage?: StageKey
  camp?: string
  tags?: string[]
  search?: string
  minPrice?: number
  maxPrice?: number
  isFree?: boolean
}

// 导航菜单项接口
export interface NavMenuItem {
  id: string
  label: string
  href?: string
  children?: NavMenuItem[]
} 