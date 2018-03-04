<template>
	<div v-show="flag" class="confirmBlock">
      <div class="confirm_parent">
        <div class="confirm_sub">
           <p class="words"> {{message}}</p>          
           <div @click="trueFn" class="true">确认</div>
           <div @click="clearFn" class="flast">取消</div>
        </div>
      </div>
    </div>
</template>

<script>
	export default{
	    props: {
	    },
		data:function(){
		    return {
		        flag: false,
		        message: '',
		        Fn: '',
		    }
		},
		methods: {
		    setConfirm: function(message,Fn) {
		        this.flag = true;
		        this.message = message;
		        this.Fn = Fn;
		    },
		    trueFn() {
			    if (this.Fn) {
			        this.Fn();       
			    }
		        this.flag = false;
		    },
		    clearFn() {
		        this.flag = false;
		    },
        },
	}
</script>

<style>
</style>