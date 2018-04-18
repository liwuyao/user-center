<template>
	<div class="home">
		<v-head></v-head>
		<div style="flex: 1;overflow: hidden;">
			<v-content></v-content>
		</div>
	</div>
</template>

<script>
	import vHead from './header';
	import vFoot from './footer';
	import vContent from './content';
	export default {
		name: 'home',
		components:{
           vHead,vFoot,vContent 
        }
	}
</script>

<style scoped>
	.home{
		height: 100%;
		display: flex;
		flex-direction: column;
	}
</style>