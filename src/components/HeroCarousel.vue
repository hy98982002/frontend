<template>
  <section class="hero-carousel">
    <div id="heroCarousel" class="carousel slide carousel-fade" data-bs-ride="carousel">
      <!-- 轮播指示器 -->
      <div class="carousel-indicators">
        <button
          v-for="(_, index) in slides"
          :key="index"
          type="button"
          data-bs-target="#heroCarousel"
          :data-bs-slide-to="index"
          :class="{ active: index === 0 }"
          :aria-label="`轮播图 ${index + 1}`"
        ></button>
      </div>

      <!-- 轮播内容 -->
      <div class="carousel-inner">
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="carousel-item"
          :class="{ active: index === 0 }"
        >
          <div class="carousel-bg" :style="{ backgroundImage: `url(${slide.image})` }"></div>

          <div class="container-fluid p-0">
            <div class="row align-items-center carousel-content-row">
              <div class="col-lg-6 mx-auto">
                <!-- 课程说明卡片背景 -->
                <div class="hero-content-card">
                  <div class="hero-content">
                    <h1 class="hero-title" data-aos="fade-up">
                      {{ slide.title }}
                    </h1>
                    <p class="hero-subtitle" data-aos="fade-up" data-aos-delay="200">
                      {{ slide.subtitle }}
                    </p>
                    <div class="hero-buttons" data-aos="fade-up" data-aos-delay="400">
                      <a :href="slide.primaryButton.link" class="btn btn-tech-blue btn-lg me-3">
                        {{ slide.primaryButton.text }}
                      </a>
                      <a :href="slide.secondaryButton.link" class="btn btn-outline-light btn-lg">
                        {{ slide.secondaryButton.text }}
                      </a>
                    </div>

                    <!-- 特色标签 -->
                    <div class="hero-features mt-3" data-aos="fade-up" data-aos-delay="600">
                      <span
                        v-for="feature in slide.features"
                        :key="feature"
                        class="badge bg-white text-dark me-2 mb-2"
                      >
                        <i class="fas fa-check me-1"></i>{{ feature }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 轮播控制按钮 -->
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon"></span>
        <span class="visually-hidden">上一张</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon"></span>
        <span class="visually-hidden">下一张</span>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 轮播图数据
const slides = ref([
  {
    title: '掌握前沿AI技术',
    subtitle: '从机器学习到深度学习，全面掌握人工智能核心技术，开启智能时代职业新篇章',
    image: '/images/HeroCarousel-1.jpg',
    primaryButton: {
      text: '立即学习',
      link: '#courses'
    },
    secondaryButton: {
      text: '了解更多',
      link: '#about'
    },
    features: ['零基础入门', '实战项目', '就业指导', '终身学习']
  },
  {
    title: '成为Python全栈工程师',
    subtitle: '系统学习Python Web开发，掌握Django、Flask框架，打造完整的全栈开发能力',
    image: '/images/HeroCarousel-1.jpg',
    primaryButton: {
      text: '开始编程',
      link: '#courses'
    },
    secondaryButton: {
      text: '查看课程',
      link: '#courses'
    },
    features: ['系统课程', '项目实战', '代码评审', '技术社群']
  },
  {
    title: '现代前端开发精通',
    subtitle: 'Vue3、React18、TypeScript全面掌握，构建高性能现代化Web应用',
    image: '/images/HeroCarousel-1.jpg',
    primaryButton: {
      text: '立即体验',
      link: '#courses'
    },
    secondaryButton: {
      text: '免费试学',
      link: '#courses'
    },
    features: ['最新技术', '响应式设计', '性能优化', '实战项目']
  },
  {
    title: '企业级DevOps实践',
    subtitle: '掌握Docker、Kubernetes、CI/CD流水线，成为企业级运维专家',
    image: '/images/HeroCarousel-1.jpg',
    primaryButton: {
      text: '深度学习',
      link: '#courses'
    },
    secondaryButton: {
      text: '咨询专家',
      link: '#teachers'
    },
    features: ['容器化部署', '自动化运维', '监控告警', '高可用架构']
  }
])

onMounted(() => {
  // 可以在这里添加轮播图初始化逻辑
  console.log('轮播图组件已加载')
})
</script>

<style scoped>
.hero-carousel {
  position: relative;
  /* 按原始比例1340x400设置高度，并添加导航栏间距 */
  height: 400px;
  max-width: 1340px;
  margin: 80px auto 0 auto; /* 80px为导航栏高度 + 间距 */
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.carousel {
  height: 100%;
}

.carousel-item {
  height: 400px;
  position: relative;
}

.carousel-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.carousel-content-row {
  height: 400px;
  margin: 0;
}

/* 课程说明卡片容器 - 调整为更合理的比例 */
.hero-content-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 15px;
  padding: 30px 25px;
  margin: 0 auto;
  max-width: 500px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1), 0 4px 20px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 10;
  transform: translateY(0);
  transition: all 0.3s ease;
}

.hero-content-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15), 0 6px 25px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.hero-content {
  position: relative;
  z-index: 10;
  color: #2c3e50;
  text-shadow: none;
}

.hero-title {
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: #1a202c;
  text-shadow: none;
}

.hero-subtitle {
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  color: #4a5568;
  opacity: 1;
  text-shadow: none;
}

.hero-buttons {
  margin-bottom: 1.5rem;
}

.btn-tech-blue {
  background: linear-gradient(135deg, #1e7f98, #2a9bb8);
  border: none;
  border-radius: 25px;
  padding: 10px 25px;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(30, 127, 152, 0.3);
}

.btn-tech-blue:hover {
  background: linear-gradient(135deg, #166d84, #228ba1);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(30, 127, 152, 0.4);
}

.btn-outline-light {
  border: 2px solid #1e7f98;
  color: #1e7f98;
  background: transparent;
  border-radius: 25px;
  padding: 8px 23px;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.btn-outline-light:hover {
  background: #1e7f98;
  border-color: #1e7f98;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(30, 127, 152, 0.3);
}

.hero-features .badge {
  padding: 5px 10px;
  font-size: 0.8rem;
  font-weight: 500;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(30, 127, 152, 0.15);
  background: rgba(30, 127, 152, 0.1) !important;
  color: #1e7f98 !important;
  border: 1px solid rgba(30, 127, 152, 0.2);
  transition: all 0.3s ease;
}

.hero-features .badge:hover {
  background: rgba(30, 127, 152, 0.15) !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(30, 127, 152, 0.2);
}

/* 轮播控制器样式 */
.carousel-control-prev,
.carousel-control-next {
  width: 5%;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.carousel-control-prev:hover,
.carousel-control-next:hover {
  opacity: 1;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  width: 2.5rem;
  height: 2.5rem;
  background-size: 60%;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

/* 指示器样式 */
.carousel-indicators {
  bottom: 20px;
}

.carousel-indicators button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  background: transparent;
  transition: all 0.3s ease;
}

.carousel-indicators button.active {
  background: white;
  border-color: white;
  transform: scale(1.2);
}

/* 响应式设计 */
@media (max-width: 1400px) {
  .hero-carousel {
    max-width: 95%;
    margin: 80px auto 0 auto;
  }
}

@media (max-width: 768px) {
  .hero-carousel {
    height: 350px;
    margin: 70px 15px 0 15px;
    border-radius: 12px;
  }

  .carousel-item {
    height: 350px;
  }

  .carousel-content-row {
    height: 350px;
  }

  .hero-content-card {
    padding: 25px 20px;
    margin: 0 10px;
    border-radius: 12px;
    max-width: 90%;
  }

  .hero-title {
    font-size: 1.8rem;
  }

  .hero-subtitle {
    font-size: 0.9rem;
  }

  .btn-tech-blue,
  .btn-outline-light {
    padding: 8px 20px;
    font-size: 0.85rem;
    margin-bottom: 8px;
  }

  .hero-features .badge {
    font-size: 0.75rem;
    padding: 4px 8px;
  }
}

@media (max-width: 576px) {
  .hero-carousel {
    height: 300px;
    margin: 65px 10px 0 10px;
  }

  .carousel-item {
    height: 300px;
  }

  .carousel-content-row {
    height: 300px;
  }

  .hero-content-card {
    padding: 20px 15px;
    border-radius: 10px;
  }

  .hero-title {
    font-size: 1.5rem;
  }

  .hero-subtitle {
    font-size: 0.85rem;
  }
}

/* 动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-content > * {
  animation: fadeInUp 0.8s ease-out forwards;
}

.hero-content > *:nth-child(2) {
  animation-delay: 0.2s;
}

.hero-content > *:nth-child(3) {
  animation-delay: 0.4s;
}

.hero-content > *:nth-child(4) {
  animation-delay: 0.6s;
}
</style>
