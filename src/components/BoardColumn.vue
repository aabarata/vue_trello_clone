<template>
    <AppDrop @drop="moveTaskOrColumn">
        <AppDrag
            class="column"
            :transferData="{
                type: 'column',
                fromColumnIndex: columnIndex,
            }"
        >
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
                    :column="column"
                    :columnIndex="columnIndex"
                />
                <input type="text" class="block p-2 w-full bg-transparent" placeholder="+ Enter new task" @keyup.enter="createTask($event, column.tasks)"/>
            </div>
        </AppDrag>
    </AppDrop>
</template>

<script>
import ColumnTask from '@/components/ColumnTask'
import AppDrag from '@/components/AppDrag'
import AppDrop from '@/components/AppDrop'
import movingTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin'

export default {
  components: {
    ColumnTask,
    AppDrag,
    AppDrop
  },
  mixins: [
    movingTasksAndColumnsMixin
  ],
  methods: {
    createTask (event, tasks) {
      // This should dispatch and action and not commit directly to the mutator
      this.$store.commit('CREATE_TASK', {
        name: event.target.value,
        tasks
      })
      event.target.value = ''
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
