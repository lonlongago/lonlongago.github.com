<template>
  <transition name="fade">
    <div class="confirmContent" v-if="Flag">
      <div class="remin">
        <span class="ti">提示</span>
        <span class="clean">{{message}}</span>
        <div class="butt">
          <div class="btn1" @click="ensure()">确定</div>
          <div class="btn2" @click="cancel()">取消</div>
        </div>
      </div>
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
        fn:'',
      }
    },
    methods:{
      setMessage: function(bol,message,fn){
        this.Flag = true;
        this.message = message;
        this.fn = fn;
        var self = this;
        console.log(message);
      },
      ensure:function(){
        this.fn();
        this.Flag = false;
      },
      cancel:function(){
        this.Flag = false;
      }
    }
  }
</script>

<style>
  .confirmContent{
    position: fixed;
    width: 70%;
    /*left: 20%;
    right:20%;*/
    color: #fff;
    z-index: 9999;
    text-align: center;
    font-size: 0.128rem;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .confirmContent .remin{width: 2.185rem;height: 1.148rem;position: fixed;box-shadow:0 0 20px silver;border-radius:3px;margin:0 auto;top: 50%;left: 50%;margin-left: -1.0925rem;margin-top: -0.574rem;background: white;-webkit-transform:translate3d(0px,0,0px);-moz-transform:translate3d(0px,0,0px);transform:translate3d(0px,0,0px);transition:all 0.3s;}
  .confirmContent .remin .ti{height: .226rem;line-height: .226rem;text-align: center;width: 100%;font-size: .15rem;font-family: "微软雅黑";display: inline-block;margin-top: .1rem;}
  .confirmContent .remin .clean{height: .4523rem;line-height: .4523rem;display:inline-block;text-align:center;width: 100%;font-size: .1365rem;font-family: "微软雅黑";}
  .confirmContent .remin .butt{height: .2176rem;width: 2rem;text-align: center;margin-left: .1195rem;display: inline-flex;}
  .confirmContent .remin .butt .btn1{height: 100%;width: .9173rem;background-color:#2ECC40;border-radius: 3px;color: white;font-size: .1365rem;line-height: .2176rem;margin-right: .0939rem;}
  .confirmContent .remin .butt .btn2{height: 100%;width: .9173rem;background-color:#008080;border-radius: 3px;line-height: .2176rem;color: white;font-size: .1365rem;}
  .confirm_shadow{ position: fixed; top: 0; left: 0; bottom: 0; right: 0;}
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }
</style>