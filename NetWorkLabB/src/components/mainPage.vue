<template>
	<div class="flex-col page">
		<div class="flex-col shrink-0 section space-y-72">
			<div class="flex-col justify-start items-start shrink-0 text-wrapper"><span class="text_2">HELLO!</span>
			</div>
			<div class="flex-col group_2">
				<div class="flex-row items-center group_3 space-x-16">
					<img class="image_2"
						src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/62f8bcea5a7e3f03100a0ed5/62f8bd5e689f2800114ed71c/16827623392213350819.png" />
					<span class="font_1">用户123</span>
				</div>
				<div class="flex-row items-center group_3 space-x-16">
					<img class="image_2"
						src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/62f8bcea5a7e3f03100a0ed5/62f8bd5e689f2800114ed71c/16827623392213350819.png" />
					<span class="font_1">用户123</span>
				</div>
				<div class="flex-row items-center group_3 space-x-16">
					<img class="image_2"
						src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/62f8bcea5a7e3f03100a0ed5/62f8bd5e689f2800114ed71c/16827623392213350819.png" />
					<span class="font_1">用户123</span>
				</div>
				<div class="flex-row items-center group_3 space-x-16">
					<img class="image_2"
						src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/62f8bcea5a7e3f03100a0ed5/62f8bd5e689f2800114ed71c/16827623392213350819.png" />
					<span class="font_1">用户123</span>
				</div>
				<div class="flex-row items-center group_3 space-x-16">
					<img class="image_2"
						src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/62f8bcea5a7e3f03100a0ed5/62f8bd5e689f2800114ed71c/16827623392213350819.png" />
					<span class="font_1">用户123</span>
				</div>
				<div class="flex-row items-center group_3 space-x-16">
					<img class="image_2"
						src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/62f8bcea5a7e3f03100a0ed5/62f8bd5e689f2800114ed71c/16827623392213350819.png" />
					<span class="font_1">用户123</span>
				</div>
				<div class="flex-row items-center group_3 space-x-16">
					<img class="image_2"
						src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/62f8bcea5a7e3f03100a0ed5/62f8bd5e689f2800114ed71c/16827623392213350819.png" />
					<span class="font_1">用户123</span>
				</div>
			</div>
			<div class="flex-col items-center">
				<span class="text_5">计算机网络课程设计</span>
				<span class="text_7">Designed Dy Xuan</span>
			</div>
		</div>
		<div class="flex-col flex-auto section_2">
			<div class="flex-row header">
				<div class="flex-col justify-start items-start flex-auto text-wrapper_2">
					<span class="font_1 text">用户123</span>
				</div>
			</div>
			<div class="talkblock">
				<div class="flex-row">
					<img class="image"
						src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/62f8bcea5a7e3f03100a0ed5/62f8bd5e689f2800114ed71c/16827623392189318290.png" />
					<div class="flex-col justify-start items-center text-wrapper_3">
						<span class="font_2 text_3">Lets Talk</span>
					</div>
				</div>
				<div class="flex-row justify-end">
					<div class="flex-col justify-start items-center text-wrapper_4">
						<span class="font_2 text_4">Lets Talk</span>
					</div>
					<img class="image"
						src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/62f8bcea5a7e3f03100a0ed5/62f8bd5e689f2800114ed71c/16827623392201200427.png" />
				</div>
			</div>
			<div class="flex-col justify-start items-end tab-bar">
				<el-input type="textarea" v-model="input" rows="4" maxlength="100"></el-input>
				<div class="flex-col justify-start items-center text-wrapper_5"><span class="text_6">发送</span></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'mainPage',
	data() {
		return {
			input:'',
		}
	}
}
</script>
<style scoped>
.page {
	background-color: #ffffff;
	width: 50rem;
	overflow-y: auto;
	overflow-x: hidden;
	height: 35rem;
	display: flex;
	flex-direction: row;
}

.header {
	height: 1.88rem;
}

.text-wrapper {
	padding: 0.88rem 0 0.25rem;
	background-color: #ffffff;
	overflow: hidden;
	width: 11.63rem;
	height: 2rem;
	border-right: solid 0.063rem #0000001a;
}

.text_2 {
	margin-left: 1rem;
	color: #186299;
	font-size: 0.88rem;
	font-family: Noto Sans SC;
	font-weight: 700;
	line-height: 0.69rem;
}

.text-wrapper_2 {
	padding: 0.5rem 0;
	background-color: #ffffff;
	overflow: hidden;
	height: 2rem;
	border-bottom: solid 0.063rem #0000001a;
}

.font_1 {
	font-size: 0.69rem;
	font-family: Noto Sans SC;
	line-height: 0.63rem;
	color: #000000;
}

.text {
	margin-left: 1rem;
	font-size: 0.75rem;
	line-height: 0.69rem;
}


.section {
	margin-bottom: -4.38rem;
	background-color: #ffffff;
	overflow: hidden;
	width: 11.63rem;
	height: 35rem;
	border-right: solid 0.063rem #0000001a;
}

.group_2 {
	border-top: solid 0.063rem #e4e7ed;
	height: 32rem;
}

.group_3 {
	padding: 0.25rem 0.75rem;
	overflow: hidden;
	border-bottom: solid 0.063rem #0000001a;
}

.space-x-16>*:not(:first-child) {
	margin-left: 1rem;
}

.image_2 {
	border-radius: 0.25rem;
	overflow: hidden;
	width: 1.81rem;
	height: 1.81rem;
}


.text_5 {
	color: #000000;
	font-size: 0.38rem;
	font-family: Noto Sans SC;
	line-height: 0.5rem;
	letter-spacing: 0.31rem;
}

.text_7 {
	color: #000000;
	font-size: 0.63rem;
	font-family: Microsoft Himalaya;
	line-height: 1rem;
}

.section_2 {
	height: 35rem;
}

.image {
	border-radius: 0.25rem;
	overflow: hidden;
	width: 1.69rem;
	height: 1.81rem;
}

.text-wrapper_3 {
	margin: 0.13rem 0 0.13rem 0.5rem;
	padding: 0.5rem 0;
	background-color: #1862991a;
	border-radius: 0.63rem;
	width: 5.06rem;
	height: 1.63rem;
}

.font_2 {
	font-size: 0.69rem;
	font-family: Noto Sans SC;
	line-height: 0.5rem;
	color: #000000;
}

.text_3 {
	font-size: 0.63rem;
}

.text-wrapper_4 {
	margin: 0.13rem 0.5rem 0.13rem 0;
	padding: 0.5rem 0;
	background-color: #f7e27933;
	border-radius: 0.63rem;
	width: 5.06rem;
	height: 1.63rem;
}

.text_4 {
	font-size: 0.63rem;
}

.tab-bar {
	background-color: #ffffff;
	overflow: hidden;
	border-top: solid 0.063rem #0000000d;
	position: relative;
	bottom: 0;
	height: 8rem;
}
.tab-bar>>>.el-textarea__inner {
    border: 0;
    resize: none;/* 这个是去掉 textarea 下面拉伸的那个标志，如下图 */
  }

.text-wrapper_5 {
	margin-right: 0.69rem;
	padding: 0.38rem 0;
	background-color: #186299;
	border-radius: 0.25rem;
	width: 3.38rem;
}

.text_6 {
	color: #ffffff;
	font-size: 0.75rem;
	font-family: Noto Sans SC;
	font-weight: 700;
	line-height: 0.72rem;
}

.talkblock {
	height: 25rem;
	background-image: url(https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/62f8bcea5a7e3f03100a0ed5/62f8bd5e689f2800114ed71c/16827623392164512850.png);
	background-size: 100% 100%;
	background-repeat: no-repeat;
	padding: 1rem 1.5rem;
}
</style>

