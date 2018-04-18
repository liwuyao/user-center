<template>
	<div class="header">
		<div class="header-box">
			<div style="overflow: hidden;display: inline-block;height: 45px;position: absolute;right: 50px;top: 50%;transform: translate(0,-50%);">
			<img src="../../assets/head.jpg" style="width: 45px;height: 45px;border-radius:50% ;float: left;"/>
			<div style="display: inline-block;height: 100%;line-height: 45px;float: left;">
				<span style="margin: 0 15px;">Admin</span>
				<span>退出</span>
			</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'vheader'
	}
</script>
<style scoped>
	.header{
	}
	.header-box{
		position: relative;
		height: 66px;
		border-bottom: solid 1px #e6e6e6;
		box-shadow: 0px 2px 10px -8px #888888
	}
</style>