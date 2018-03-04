<template>
  <transition name="fade">
    <div class="alertContent" v-if="Flag">
      {{message}}
    </div>
  </transition>
</template>

<script>
  export default{
    data:function(){
      return {
        Flag:false,
        message:'',
        transitionFlag:false,
      }
    },
    methods:{
      setMessage: function(message){
        this.Flag = true;
        this.message = message;
        var self = this;
        console.log(message);
        setTimeout(function(){
          self.Flag = false;
        },800)
      }
    }
  }
</script>

<style>
  .alertContent{
    position: fixed;
    background-color: rgba(0,0,0,0.9);
    height: 0.4028rem;
    width: 70%;
    /*left: 20%;
    right:20%;*/
    color: #fff;
    z-index: 9999;
    text-align: center;
    line-height: 0.4028rem;
    font-size: 0.1024rem;
    border-radius: 0.4028rem;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }
</style>