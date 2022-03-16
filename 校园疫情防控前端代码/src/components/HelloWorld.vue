<template lang="">
  <div>
    <button @click="send">发送</button>
    <button @click="send1">发送2</button>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    methods: {
      send1() {
        axios({
          method: 'GET',
          url: 'http://localhost:8001/user',
          params: {
            username: 'hey',
            password: '123',
            type: 1
          },
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('Token')
          }
        })
      },
      send() {
        axios({
          method: 'POST',
          url: 'http://localhost:8001/api/login',
          data: {
            username: 'hey',
            password: '123',
            type: 1
          }
        }).then(response => {
          sessionStorage.setItem('Token', response.data.tokenStr)
          console.log(response.data);
        }, err => {
          console.log(err);
        })
      }
    },
  }
</script>
<style lang="">

</style>