<template>
    <div class="column"
        draggable
        @dragstart.self="pickUpColumn($event, columnIndex)"
        @drop="moveTaskOrColumn($event, column.tasks, columnIndex)"
        @dragover.prevent
        @dragenter.prevent>
        <div class="flex items-center mb-2 font-bold">
            {{ column.name }}
        </div>
        <div class="list-reset">
            <ColumnTask
                v-for="(task, taskIndex) of column.tasks"
                :key="task.id"
                :board="board"
                :task="task"
                :taskIndex="taskIndex"
                :columnTasks="column.tasks"
                :columnIndex="columnIndex"
            />
            <input type="text" class="block p-2 w-full bg-transparent" placeholder="+ Enter new task" @keyup.enter="createTask($event, column.tasks)"/>
        </div>
    </div>
</template>

<script>
import ColumnTask from '@/components/ColumnTask'

export default {
  components: {
    ColumnTask
  },
  props: {
    board: {
      type: Object,
      require: true
    },
    column: {
      type: Object,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    createTask (event, tasks) {
      // This should dispatch and action and not commit directly to the mutator
      this.$store.commit('CREATE_TASK', {
        name: event.target.value,
        tasks
      })
      event.target.value = ''
    },
    pickUpColumn (event, fromColumnIndex) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.setData('type', 'column')
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
.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
</style>
