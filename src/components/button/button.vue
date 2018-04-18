<template>
	<div class="button">
		<button class="button-elm-default">
			<i :class="message.icon"></i>
			{{message.name}}
		</button>
	</div>
</template>

<script>
	export default {
		name:'vButton',
		props: ['message'],
		data(){
			return{
			}
		},
		updated(){
		},
		methods:{
			test(){
	    	console.log(this.message)
	   		}
	   	}
	}
</script>

<style scoped>
	.button .button-elm-default{
		border: none;
		outline: none;
		padding: 9px 30px;
		border-radius: 5px;
		background: white;
		box-shadow: 0px 2px 10px -8px #888888;
	}
	/*.button-elm-default:active{
		background: red !important;
	}*/
	/*.button-box .active{
		background: #0199fe;
		color: white;
	}
	.button-box .active i{
		color: white;
	}*/
	.button .button-icon{
		color: #0199fe;
		margin-right: 10px;
	}
	.button-box .delete-icon{
		color: #f36549;
		margin-right: 10px;
	}
	.btn-box:hover .button-elm-default{
				background: #1888f7 !important;
				color: white;
			}
	.btn-box:hover .button-elm-default i{
				color: white;
			}
</style>