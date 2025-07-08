import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'
import type { Course, StageKey } from '../types'

// 课程数据
export const useCourseStore = defineStore('course', () => {
  // 状态
  const courses = ref<Course[]>([
    // 免费课程
    {
      id: 1,
      title: 'Python基础入门教程',
      cover: '/images/tiyan-python-cover.jpg',
      stage: 'free',
      camp: 'skill',
      tags: ['Python', '基础', '编程入门'],
      isFree: true,
      price: 0,
      learnerCount: 1250,
      rating: 4.8,
      reviewCount: 156,
      duration: '12 小时',
      level: '入门级',
      instructor: '张教授',
      badge: '新手推荐'
    },
    {
      id: 2,
      title: 'HTML5与CSS3快速上手',
      cover: '/images/tiyan-xuhuan-cover.jpg',
      stage: 'free',
      camp: 'skill',
      tags: ['HTML', 'CSS', 'Web开发'],
      isFree: true,
      price: 0,
      learnerCount: 890,
      rating: 4.6,
      reviewCount: 98,
      duration: '8 小时',
      level: '入门级',
      instructor: '李老师'
    },
    {
      id: 3,
      title: 'JavaScript ES6基础',
      cover: '/images/tiyan-photoshop-cover.jpg',
      stage: 'free',
      camp: 'skill',
      tags: ['JavaScript', 'ES6', '前端'],
      isFree: true,
      price: 0,
      learnerCount: 1100,
      rating: 4.7,
      reviewCount: 142,
      duration: '15 小时',
      level: '入门级',
      instructor: '王工程师'
    },
    {
      id: 4,
      title: 'Git版本控制系统',
      cover: '/images/rumen-python-cover.jpg',
      stage: 'free',
      camp: 'skill',
      tags: ['Git', '版本控制', '开发工具'],
      isFree: true,
      price: 0,
      learnerCount: 750,
      rating: 4.5,
      reviewCount: 89,
      duration: '6 小时',
      level: '入门级',
      instructor: '刘老师'
    },

    // 入门课程
    {
      id: 5,
      title: 'Python Web开发入门',
      cover: '/images/rumen-python-cover.jpg',
      stage: 'basic',
      camp: 'skill',
      tags: ['Python', 'Django', 'Web开发'],
      isFree: false,
      price: 199,
      learnerCount: 680,
      rating: 4.9,
      reviewCount: 78,
      duration: '25 小时',
      level: '入门级',
      instructor: '陈高级工程师',
      badge: '热门课程'
    },
    {
      id: 6,
      title: 'Vue 3全栈开发',
      cover: '/images/rumen-xuhuan-cover.jpg.jpg',
      stage: 'basic',
      camp: 'skill',
      tags: ['Vue', '前端框架', '全栈'],
      isFree: false,
      price: 299,
      learnerCount: 520,
      rating: 4.8,
      reviewCount: 67,
      duration: '30 小时',
      level: '入门级',
      instructor: '赵架构师'
    },
    {
      id: 7,
      title: 'React现代化开发',
      cover: '/images/rumen-photoshop-cover.jpg.jpg',
      stage: 'basic',
      camp: 'skill',
      tags: ['React', 'Hooks', '前端'],
      isFree: false,
      price: 289,
      learnerCount: 430,
      rating: 4.7,
      reviewCount: 54,
      duration: '28 小时',
      level: '入门级',
      instructor: '孙专家'
    },
    {
      id: 8,
      title: 'MySQL数据库设计',
      cover: '/images/jingjin-python-cover.jpg',
      stage: 'basic',
      camp: 'skill',
      tags: ['MySQL', '数据库', 'SQL'],
      isFree: false,
      price: 179,
      learnerCount: 390,
      rating: 4.6,
      reviewCount: 45,
      duration: '20 小时',
      level: '入门级',
      instructor: '周DBA'
    },

    // 精进课程
    {
      id: 9,
      title: 'Python高级编程与设计模式',
      cover: '/images/jingjin-python-cover.jpg',
      stage: 'advanced',
      camp: 'skill',
      tags: ['Python', '设计模式', '高级编程'],
      isFree: false,
      price: 399,
      learnerCount: 280,
      rating: 4.9,
      reviewCount: 34,
      duration: '35 小时',
      level: '中级',
      instructor: '李资深工程师',
      badge: '进阶必学',
      isVip: true
    },
    {
      id: 10,
      title: '微服务架构实战',
      cover: '/images/jingjin-xuhuan-cover.jpg.jpg',
      stage: 'advanced',
      camp: 'career',
      tags: ['微服务', '架构', 'Spring Cloud'],
      isFree: false,
      price: 499,
      learnerCount: 210,
      rating: 4.8,
      reviewCount: 28,
      duration: '40 小时',
      level: '中级',
      instructor: '张架构师',
      isVip: true
    },
    {
      id: 11,
      title: 'Kubernetes容器编排',
      cover: '/images/jingjin-photoshop-cover.jpg.jpg',
      stage: 'advanced',
      camp: 'career',
      tags: ['Kubernetes', 'Docker', '容器化'],
      isFree: false,
      price: 459,
      learnerCount: 180,
      rating: 4.7,
      reviewCount: 22,
      duration: '32 小时',
      level: '中级',
      instructor: '王运维专家'
    },
    {
      id: 12,
      title: 'AI机器学习算法深度解析',
      cover: '/images/shizhan-python-cover.jpg',
      stage: 'advanced',
      camp: 'enterprise',
      tags: ['机器学习', 'AI', '算法'],
      isFree: false,
      price: 599,
      learnerCount: 150,
      rating: 4.9,
      reviewCount: 19,
      duration: '45 小时',
      level: '高级',
      instructor: '陈AI专家',
      badge: '前沿技术'
    },

    // 实战课程
    {
      id: 13,
      title: '电商系统全栈项目实战',
      cover: '/images/shizhan-python-cover.jpg',
      stage: 'project',
      camp: 'career',
      tags: ['全栈', '电商', '项目实战'],
      isFree: false,
      price: 799,
      learnerCount: 120,
      rating: 5.0,
      reviewCount: 15,
      duration: '60 小时',
      level: '实战级',
      instructor: '赵CTO',
      badge: '项目实战'
    },
    {
      id: 14,
      title: '大数据处理平台搭建',
      cover: '/images/shizhan-xuhuan-cover.jpg.jpg',
      stage: 'project',
      camp: 'enterprise',
      tags: ['大数据', 'Spark', 'Hadoop'],
      isFree: false,
      price: 899,
      learnerCount: 95,
      rating: 4.9,
      reviewCount: 12,
      duration: '55 小时',
      level: '实战级',
      instructor: '孙大数据专家',
      isVip: true
    },
    {
      id: 15,
      title: '企业级DevOps流水线',
      cover: '/images/shizhan-photoshop-cover.jpg.jpg',
      stage: 'project',
      camp: 'enterprise',
      tags: ['DevOps', 'CI/CD', '自动化'],
      isFree: false,
      price: 699,
      learnerCount: 85,
      rating: 4.8,
      reviewCount: 10,
      duration: '50 小时',
      level: '实战级',
      instructor: '李DevOps工程师'
    },
    {
      id: 16,
      title: '智能聊天机器人开发',
      cover: '/images/tiyan-python-cover.jpg',
      stage: 'project',
      camp: 'enterprise',
      tags: ['AI', 'NLP', '聊天机器人'],
      isFree: false,
      price: 999,
      learnerCount: 78,
      rating: 4.9,
      reviewCount: 9,
      duration: '65 小时',
      level: '实战级',
      instructor: '王AI架构师',
      badge: '最新技术',
      isVip: true
    }
  ])

  // 当前选中的阶段
  const currentStage = ref<StageKey>('free')

  // 搜索关键词
  const searchKeyword = ref('')

  // 选中的标签
  const selectedTags = ref<string[]>([])

  // 是否只显示会员专享课程
  const showVipOnly = ref(false)

  // 计算属性：根据阶段筛选课程
  const coursesByStage = computed(() => {
    return courses.value.filter(course => course.stage === currentStage.value)
  })

  // 计算属性：根据搜索条件筛选课程
  const filteredCourses = computed(() => {
    let result = coursesByStage.value

    // 会员专区筛选 - 优先级最高
    if (showVipOnly.value) {
      result = result.filter(course => course.isVip === true)
    }

    // 关键词搜索
    if (searchKeyword.value) {
      const keyword = searchKeyword.value.toLowerCase()
      result = result.filter(
        course =>
          course.title.toLowerCase().includes(keyword) ||
          course.tags.some(tag => tag.toLowerCase().includes(keyword)) ||
          course.instructor?.toLowerCase().includes(keyword)
      )
    }

    // 标签筛选
    if (selectedTags.value.length > 0) {
      result = result.filter(course => selectedTags.value.some(tag => course.tags.includes(tag)))
    }

    return result
  })

  // 计算属性：获取当前阶段的所有标签
  const currentStageTags = computed(() => {
    const tags = new Set<string>()
    coursesByStage.value.forEach(course => {
      course.tags.forEach(tag => tags.add(tag))
    })
    return Array.from(tags)
  })

  // 计算属性：热门标签（根据课程数量排序）
  const popularTags = computed(() => {
    const tagCounts = new Map<string, number>()
    coursesByStage.value.forEach(course => {
      course.tags.forEach(tag => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
      })
    })

    return Array.from(tagCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(entry => entry[0])
  })

  // 营区数据
  const campData = computed(() => [
    {
      id: 'skill',
      title: '技能提升营',
      description: '掌握核心技术技能',
      icon: 'fas fa-code',
      courses: courses.value.filter(c => c.camp === 'skill'),
      color: '#1E7F98'
    },
    {
      id: 'career',
      title: '职业发展营',
      description: '提升职场竞争力',
      icon: 'fas fa-chart-line',
      courses: courses.value.filter(c => c.camp === 'career'),
      color: '#2A9BB8'
    },
    {
      id: 'enterprise',
      title: '企业级训练营',
      description: '企业级技术解决方案',
      icon: 'fas fa-building',
      courses: courses.value.filter(c => c.camp === 'enterprise'),
      color: '#166d84'
    }
  ])

  // Actions
  const setCurrentStage = (stage: StageKey) => {
    currentStage.value = stage
    // 切换阶段时清空搜索和标签
    searchKeyword.value = ''
    selectedTags.value = []
  }

  // 只设置阶段，不清空筛选条件
  const setCurrentStageOnly = (stage: StageKey) => {
    currentStage.value = stage
  }

  const setSearchKeyword = (keyword: string) => {
    searchKeyword.value = keyword
  }

  const toggleTag = (tag: string) => {
    // 单选模式：点击已选中的标签取消选中，点击未选中的标签则只选中它
    const index = selectedTags.value.indexOf(tag)
    if (index > -1) {
      // 如果已选中，则取消选中（清空数组）
      selectedTags.value = []
    } else {
      // 如果未选中，则清空数组后只选中这个标签
      selectedTags.value = [tag]
    }
  }

  const clearFilters = () => {
    searchKeyword.value = ''
    selectedTags.value = []
    showVipOnly.value = false
  }

  const setShowVipOnly = (vipOnly: boolean) => {
    showVipOnly.value = vipOnly
    // 开启会员专区时清空其他筛选条件
    if (vipOnly) {
      searchKeyword.value = ''
      selectedTags.value = []
    }
  }

  // 获取课程详情
  const getCourseById = (id: number) => {
    return courses.value.find(course => course.id === id)
  }

  // 添加新课程
  const addCourse = (course: Omit<Course, 'id'>) => {
    const newId = Math.max(...courses.value.map(c => c.id)) + 1
    courses.value.push({ ...course, id: newId })
  }

  return {
    // 状态
    courses,
    currentStage: readonly(currentStage), // 只读访问，防止外部直接修改
    searchKeyword,
    selectedTags,
    showVipOnly,

    // 计算属性
    coursesByStage,
    filteredCourses,
    currentStageTags,
    popularTags,
    campData,

    // Actions
    setCurrentStage,
    setCurrentStageOnly,
    setSearchKeyword,
    toggleTag,
    clearFilters,
    setShowVipOnly,
    getCourseById,
    addCourse
  }
})
