<template>
    <div class="task"
    draggable
    @dragstart="pickUpTask($event, taskIndex, columnIndex)"
    @dragover.prevent
    @dragenter.prevent
    @drop.stop="moveTaskOrColumn($event, columnTasks, columnIndex, taskIndex)"
    @click="goToTask(task)">
        <span class="w-full flex-no-shrink font-bold">
        {{ task.name }}
        </span>
        <p class="w-full flex-no-shrink mt-1 text-sm" v-if="task.description">
        {{ task.description }}
        </p>
    </div>
</template>

<script>
import movingTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin'

export default {
  mixins: [
    movingTasksAndColumnsMixin
  ],
  props: {
    task: {
      type: Object,
      required: true
    },
    taskIndex: {
      type: Number,
      required: true
    },
    columnTasks: {
      type: Array,
      require: true
    }
  },
  methods: {
    goToTask (task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
    },
    pickUpTask (event, taskIndex, fromColumnIndex) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.setData('type', 'task')
      event.dataTransfer.setData('from-task-index', taskIndex)
      event.dataTransfer.setData('from-column-index', fromColumnIndex)
    }
  }
}
</script>

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}
.task-bg {
  @apply pin absolute;
  background: rgba(0,0,0,0.5);
}
</style>
