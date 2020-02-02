export default {
  props: {
    board: {
      type: Object,
      require: true
    },
    columnIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
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
