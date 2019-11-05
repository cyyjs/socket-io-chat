<template>
  <div class="chat">
    <div class="" v-if="show">
      <input ref="nickinput" type="text" v-model.trim="nickname" placeholder="请输入昵称">
      <button @click="save">保存</button>
    </div>
    <Chat :nickname="nickname" v-else></Chat>
  </div>
</template>

<script>
// @ is an alias to /src
import Chat from '@/components/Chat.vue'

export default {
  name: 'home',
  components: {
    Chat
  },
  data () {
    return {
      show: true,
      nickname: ''
    }
  },
  methods: {
    save () {
      if (!this.nickname) {
        this.$refs.nickinput.focus()
        return
      }
      localStorage.setItem('nickname', this.nickname)
      this.show = false
    }
  },
  mounted () {
    this.nickname = localStorage.getItem('nickname')
    if (this.nickname) {
      this.show = false
    }
  }
}
</script>

<style scoped lang="scss">
.chat{
  background-color: #eee;
  padding: 20px;
}
</style>
