<template>
	<div>
		<div class="cephalosome">
	      <img @click="backFn" class="back" src="http://cdn.qcacg.com/img/app_index/classification_03.png" alt="" />
	      <span>{{msg}}</span>
	    </div>
	</div>
</template>

<script>
import Header from '~/components/Header'
import PathList from '~/components/conf'
import appPathList from '~/components/conf-app'
import SZXJ from '~/components/vueHttp'
import Alert from '~/components/Alert'
import axios from 'axios'
import Footer from '~/components/Footer'
// this.$refs.alert.setMessage(false,'message',function(){})
export default {
	props:['msg'],
	components:{
		
	},
	asyncData:function(){
		return {}
	},
	data : function() {
		return {}
	},
    mounted: function () { // ready -->
	  this.$nextTick(function () {
	  })
	},
	methods: {
		backFn:function(){
	      history.go(-1);
	    },
	},
}
</script>

<style>
</style>