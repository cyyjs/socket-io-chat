<template>
  <div class="chat">
    <div class="list" ref="list">
      <div v-for="(msg, index) in msgList" :key="index">
        <div class="right" v-if="msg.userID === userID">
          <span class="msg">{{msg.content}}:{{msg.port}}</span>
        我</div>
        <div class="left" v-else>{{msg.userName}} <span class="msg">{{msg.content}}:{{msg.port}}</span></div>
      </div>
    </div>
    <div class="btns">
      <input placeholder="请输入内容，按回车发送" type="text" v-model="msg" @keyup.enter="send">
      <button @click="send">发送</button>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
const socket = io('http://127.0.0.1:6001', {
// const socket = io('http://manyserver.com', {
  path: '/chat'
})

export default {
  data () {
    return {
      msgList: [],
      userID: '',
      nickname: '',
      socket: null,
      msg: ''
    }
  },
  watch: {
    msgList () {
      this.$nextTick(() => {
        this.$refs.list.scrollTo(0, this.$refs.list.scrollHeight)
      })
    }
  },
  methods: {
    send () {
      if (!this.msg) {
        return
      }
      let data = {
        userID: this.userID,
        userName: this.nickname,
        content: this.msg
      }
      socket.emit('msg', data)
      this.msgList.push(data)
      this.msg = ''
    }
  },
  mounted () {
    this.nickname = localStorage.getItem('nickname')
    socket.on('connect', () => {
      socket.on('msg', data => {
        this.msgList.push(data)
      })
      this.userID = socket.id
      this.socket = socket
      socket.emit('msg', {
        userID: this.userID,
        userName: this.nickname,
        content: '已加入'
      })
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.chat{
  .list{
    width: 400px;
    padding: 0 20px;
    padding-top: 20px;
    max-height: 200px;
    overflow: auto;
    margin: auto;
    &>div{
      margin-bottom: 20px;
      &:last-child{
        margin: 0;
      }
    }
    .right {
      text-align: right;
    }
    .left {
      text-align: left;
    }
    .msg{
      background-color: #fff;
      padding: 5px 10px;
      border-radius: 5px;
    }
  }
  .btns{
    padding: 20px;
    input{
      line-height: 28px;
      width: 300px;
      border-radius: 5px;
      border: 0;
      margin-right: 10px;
      outline: none;
      padding: 2px 10px;
    }
    button{
      cursor: pointer;
      line-height: 28px;
      width: 100px;
      border: 0;
      border-radius: 5px;
      background-color: rgb(81, 171, 245);
      color: #fff;
      &:focus{
        outline: none;
      }
    }
  }
}
</style>
