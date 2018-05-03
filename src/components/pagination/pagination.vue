<template>
	<div class="pagination" style="position: relative;">
		<div style="overflow: hidden;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);">
			<el-pagination
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page='message.pageNum'
	      :page-sizes="[10, 20]"
	      :page-size="message.pageSize"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="message.total">
	    </el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'pagination',
		props: ['message'],
	    data() {
	      return {
	      		config:{
	      			pageNum:1,
		        	pageSize:20,
		        	size:20,
		        	total:26
	      		},
	      		currentpage:1,
	   			pageMessage:{
	   				pageIndex:'1',
	   				pageSize:'20'
	   			}
	      };
	    },
	    created(){
	    	this.config = this.message;
    	},
	   	methods: {
	     	handleSizeChange(val) {
	        this.pageMessage.pageSize =String(val);
	        this.$emit('pageChange',this.pageMessage);
	      },
	     	handleCurrentChange(val) {
	     		this.pageMessage.pageIndex =String(val);
	        	this.$emit('pageChange',this.pageMessage);
	      }
	    }
	}
	
</script>

<style scoped>
</style>