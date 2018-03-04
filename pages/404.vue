<template>
  <div >
    <div class="container">
      <img src="../static/img/404.png" class="err"></div>
      <div style="font-size: 24px; width: 30%; position:absolute; top:50%; left: 35%;">不好意思  页面出错了</div>
      <a href="/" style="text-decoration:none; color:#333;position: absolute; left: 35%; top: 55%; ">请回到首页......</a>
    </div>
  </div>
</template>

<script>
 export default{
   
 }
</script>

<style>
  *{margin: 0; padding: 0;}
  .container{position: absolute;  left: 0; top: 0; right: 0; bottom: 0;}
  .container .err{  width: 30%; height: 30%; position:absolute; top:20%; left: 35%;}
</style>