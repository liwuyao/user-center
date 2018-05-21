<template>
	<div class="search-bar">
		<div class="search-bar-elm">
			<input v-model="inputMessage" :placeholder="placeholder"></input>
			<button class="search-btn" v-on:click="searchBtn()" style="cursor: pointer;">
				<i class="iconfont icon-el-icon-karakal-search"></i>
				查询
			</button>
		</div>
	</div>
</template>

<script>
	export default {
	  name: 'searchBar',
	  props: ['name','placeholder','config'],
	  data(){
	  	return{
	  		inputMessage:"",
	  	}
	  },
	  watch: {
	  	'config.changeTime':function(){
	  		console.log('clear')
	  		if(this.config.clear){
	  			this.inputMessage = '';
	  		}
	  	}
	  },
	  methods:{
	  	searchBtn(){
	  		  var content = {};
	  		  	  if(this.name){
	  		  	  	if(this.inputMessage){
	  		  	  		content[this.name] = this.inputMessage;
	  		  	  	}else{
	  		  	  		content[this.name] = null;
	  		  	  	}
	  		  	  	 this.$emit('search',content);
	  		  	  }
	  	}
	  }
	}
</script>

<style scoped>
	.search-bar .search-bar-elm{
		display: inline-block;
		overflow: hidden;
		border-radius:5px ;
		box-shadow: 0px 2px 10px -8px #888888;
	}
	.search-bar .search-bar-elm input{
		border: none;
		outline: none;
		height: 35px;
		width: 250px;
		padding-left:20px ;
		float: left;
	}
	.search-bar .search-bar-elm button{
		border: none;
		outline: none;
		float: left;
		height: 35px;
		width: 100px;
		background: #0199fe;
		color: white;
	}
	.search-btn:active{
		background:  #0e60b0 !important;
	}
</style>