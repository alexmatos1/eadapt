<script setup>
import { ref, computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { BookOpen, Users, TrendingUp, Award } from 'lucide-vue-next';
import coursesJson from '@/entities/course.json';
import enrollmentsJson from '@/entities/enrollment.json';
import certificatesJson from '@/entities/certificate.json';

const courses = ref([])
const enrollments = ref([])
const certificates = ref([])

onMounted(() => {
  // Simulando carregamento dos dados locais
  courses.value = coursesJson
  enrollments.value = enrollmentsJson
  certificates.value = certificatesJson
})

const stats = computed(() => [
  {
    title: 'Total de Cursos',
    value: courses.value.length,
    icon: BookOpen,
    color: '#3b82f6',
    description: `${courses.value.filter(c => c.status === 'published').length} publicados`
  },
  {
    title: 'Alunos Matriculados',
    value: enrollments.value.length,
    icon: Users,
    color: '#10b981',
    description: `${enrollments.value.filter(e => e.status === 'active').length} ativos`
  },
  {
    title: 'Taxa de Conclusão',
    value: `${enrollments.value.length > 0 
      ? Math.round((enrollments.value.filter(e => e.status === 'completed').length / enrollments.value.length) * 100)
      : 0}%`,
    icon: TrendingUp,
    color: '#8b5cf6',
    description: 'Média geral'
  },
  {
    title: 'Certificados Emitidos',
    value: certificates.value.length,
    icon: Award,
    color: '#f97316',
    description: 'Este mês'
  }
])

const getInitial = (name) => {
  if (!name) return 'A'
  return name[0].toUpperCase()
}
</script>

<template>
  <div class="dashboard-container">
    <div class="header">
      <div>
        <h1>Dashboard Administrativo</h1>
        <p>Visão geral da plataforma de aprendizagem</p>
      </div>
      <RouterLink to="/CourseManagement" class="btn-manage">
        Gerenciar Cursos
      </RouterLink>
    </div>

    <div class="stats-grid">
      <div v-for="(stat, index) in stats" :key="index" class="card">
        <div class="card-icon" :style="{ backgroundColor: stat.color + '20' }">
          <component :is="stat.icon" class="icon" :style="{ color: stat.color }"/>
        </div>
        <div class="card-content">
          <p class="card-title">{{ stat.title }}</p>
          <p class="card-value">{{ stat.value }}</p>
          <p class="card-desc">{{ stat.description }}</p>
        </div>
      </div>
    </div>

    <div class="recent-grid">
      <div class="card">
        <h3>Cursos Recentes</h3>
        <div v-if="courses.length === 0" class="empty">Nenhum curso criado ainda</div>
        <div v-else>
          <div v-for="course in courses.slice(0,5)" :key="course.id" class="item">
            <img :src="course.cover_image || 'https://via.placeholder.com/100'" :alt="course.title" class="item-img" />
            <div class="item-info">
              <p class="item-title">{{ course.title }}</p>
              <p class="item-category">{{ course.category || 'Geral' }}</p>
            </div>
            <span :class="['status', course.status === 'published' ? 'published' : 'draft']">
              {{ course.status === 'published' ? 'Publicado' : 'Rascunho' }}
            </span>
          </div>
        </div>
      </div>

      <div class="card">
        <h3>Atividade Recente</h3>
        <div v-if="enrollments.length === 0" class="empty">Nenhuma atividade recente</div>
        <div v-else>
          <div v-for="enroll in enrollments.slice(0,5)" :key="enroll.id" class="item">
            <div class="avatar">{{ getInitial(enroll.user_name) }}</div>
            <div class="item-info">
              <p class="item-title">Matrícula em {{ courses.find(c => c.id === enroll.course_id)?.title || 'Curso' }}</p>
              <p class="item-category">Progresso: {{ enroll.progress_percentage || 0 }}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header h1 {
  font-size: 2rem;
  font-weight: bold;
}
.header p {
  color: #555;
}
.btn-manage {
  background: linear-gradient(to right, #2563eb, #4f46e5);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  text-decoration: none;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}
.card {
  background: white;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  position: relative;
}
.card-icon {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon {
  width: 1.5rem;
  height: 1.5rem;
}
.card-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.card-title {
  font-size: 0.85rem;
  color: #666;
}
.card-value {
  font-size: 1.5rem;
  font-weight: bold;
}
.card-desc {
  font-size: 0.75rem;
  color: #999;
}
.recent-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.recent-grid .card h3 {
  margin-bottom: 1rem;
}
.item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  border-radius: 6px;
  background: #f9f9f9;
}
.item-img {
  width: 60px;
  height: 60px;
  border-radius: 6px;
  object-fit: cover;
}
.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.item-title {
  font-weight: bold;
  color: #333;
}
.item-category {
  font-size: 0.75rem;
  color: #666;
}
.status {
  font-size: 0.7rem;
  font-weight: bold;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}
.published {
  background: #d1fae5;
  color: #065f46;
}
.draft {
  background: #fef3c7;
  color: #92400e;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #2563eb;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}
.empty {
  text-align: center;
  color: #999;
  padding: 1rem 0;
}
</style>
