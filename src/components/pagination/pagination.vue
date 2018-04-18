<template>
	<div class="pagination" style="position: relative;">
		<div style="overflow: hidden;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);">
			<el-pagination
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page='currentpage'
	      :page-sizes="[10, 20]"
	      :page-size="20"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="400">
	    </el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'pagination',
	    data() {
	      return {
	      		currentpage:1,
	   			pageMessage:{
	   				pageIndex:'1',
	   				pageSize:'20'
	   			}
	      };
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