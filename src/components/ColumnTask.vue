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
export default {
  props: {
    board: {
      type: Object,
      require: true
    },
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
    },
    columnIndex: {
      type: Number,
      required: true
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
    },
    moveTaskOrColumn (event, toTasks, toColumnIndex, toTaskIndex) {
      const type = event.dataTransfer.getData('type')
      if (type === 'task') {
        const sanitizedIndex = (toTaskIndex !== undefined) ? toTaskIndex : toTasks.length
        this.moveTask(event, toTasks, sanitizedIndex)
      } else {
        this.moveColumn(event, toColumnIndex)
      }
    },
    moveTask (event, toTasks, toTaskIndex) {
      const fromColumnIndex = event.dataTransfer.getData('from-column-index')
      const fromTasks = this.board.columns[fromColumnIndex].tasks
      const fromTaskIndex = event.dataTransfer.getData('from-task-index')
      this.$store.commit('MOVE_TASK', {
        fromTasks,
        toTasks,
        fromTaskIndex,
        toTaskIndex
      })
    },
    moveColumn (event, toColumnIndex) {
      const fromColumnIndex = event.dataTransfer.getData('from-column-index')
      this.$store.commit('MOVE_COLUMN', {
        fromColumnIndex,
        toColumnIndex
      })
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
