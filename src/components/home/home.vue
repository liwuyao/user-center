<template>
	<div class="home">
		<v-head></v-head>
		<div style="flex: 1;height: 100%;display: inline-block;display: flex;flex-direction: row;">
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
        },
        data(){
        	return{
        		getClientKey: [],
        	}
        },
	}
</script>

<style scoped>
	.home{
		height: 100%;
		display: flex;
		overflow: hidden;
		flex-direction: column;
	}
</style>