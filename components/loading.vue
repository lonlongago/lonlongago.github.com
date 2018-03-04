<template>
    <div class="loader">
    	<div style="background: rgba(0,0,0,0.7); position: fixed;  left: 0;right: 0;top: 0;bottom: 0;"></div>
        <div class="loader-inner line-scale-pulse-out-rapid">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>

<script>
export default{
}
</script>

<style>
.loader {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    box-sizing: border-box;
    z-index: 9000;
    display: flex;
	  flex: 0 1 auto;
	  flex-direction: column;
	  flex-grow: 1;
	  flex-shrink: 0;
	  flex-basis: 25%;
	  align-items: center;
	  justify-content: center; 
 }
@-webkit-keyframes line-scale-pulse-out-rapid {
  0% {
    -webkit-transform: scaley(1);
            transform: scaley(1); }

  80% {
    -webkit-transform: scaley(0.3);
            transform: scaley(0.3); }

  90% {
    -webkit-transform: scaley(1);
            transform: scaley(1); } }

@keyframes line-scale-pulse-out-rapid {
  0% {
    -webkit-transform: scaley(1);
            transform: scaley(1); }

  80% {
    -webkit-transform: scaley(0.3);
            transform: scaley(0.3); }

  90% {
    -webkit-transform: scaley(1);
            transform: scaley(1); } }

.line-scale-pulse-out-rapid > div {
  background-color: #fff;
  width: 0.03413rem;
  height: 0.2987rem;
  border-radius: 0.0171rem;
  margin: 0.0171rem;
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  display: inline-block;
  -webkit-animation: line-scale-pulse-out-rapid 0.9s 0s infinite cubic-bezier(.11, .49, .38, .78);
          animation: line-scale-pulse-out-rapid 0.9s 0s infinite cubic-bezier(.11, .49, .38, .78); }
  .line-scale-pulse-out-rapid > div:nth-child(2), .line-scale-pulse-out-rapid > div:nth-child(4) {
    -webkit-animation-delay: 0.25s !important;
            animation-delay: 0.25s !important; }
  .line-scale-pulse-out-rapid > div:nth-child(1), .line-scale-pulse-out-rapid > div:nth-child(5) {
    -webkit-animation-delay: 0.5s !important;
            animation-delay: 0.5s !important; }

</style>