<template>
	<div class="select">
		<template>
		  <el-select v-model="value" :placeholder="placeholder" v-on:change="changes()">
		    <el-option
		      v-for="item in options"
		      :key="item.value"
		      :label="item.label"
		      :value="item.value"
		      >
		    </el-option>
		  </el-select>
		</template>
	</div>
</template>

<script>
	export default {
	  name: 'selectButton',
	  props: ['message','placeholder','defaultVal'],
	  data() {
	      return {
	        options: [],
	        value:''
		    }
		},
	 	created(){
	 		if(this.defaultVal){
	 			this.value = this.defaultVal;
	 		}
	    	this.options = this.message;
	    },
	    watch: {
	    	defaultVal:function(){
	    		this.value = this.defaultVal;
	    	}
	    },
	  	methods:{
	    	changes(){
	    		this.$emit('select',this.value);
	    	}
	    }
	  }
</script>

<style>
	.select{
		box-shadow: 0px 2px 10px -8px #888888;
	}
	.select .el-select input{
		height: 35px !important;
		line-height: 35px !important;
	}
</style>