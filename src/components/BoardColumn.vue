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
import movingTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin'

export default {
  components: {
    ColumnTask
  },
  mixins: [
    movingTasksAndColumnsMixin
  ],
  props: {
    column: {
      type: Object,
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
