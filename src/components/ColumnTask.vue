<template>
    <AppDrop @drop="moveTaskOrColumn">
        <AppDrag
            class="task"
            :transferData="{
                type: 'task',
                fromTaskIndex: taskIndex,
                fromColumnIndex: columnIndex,
            }"
            @click="goToTask(task)"
        >
            <span class="w-full flex-no-shrink font-bold">
            {{ task.name }}
            </span>
            <p class="w-full flex-no-shrink mt-1 text-sm" v-if="task.description">
            {{ task.description }}
            </p>
        </AppDrag>
    </AppDrop>

</template>

<script>
import AppDrag from '@/components/AppDrag'
import AppDrop from '@/components/AppDrop'
import movingTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin'

export default {
  components: {
    AppDrag,
    AppDrop
  },
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
    }
  },
  methods: {
    goToTask (task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
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
