<template>
	<div class="flex-col page">
		<div class="flex-col shrink-0 section space-y-72">
			<div class="flex-col justify-start items-start shrink-0 text-wrapper">
				<span class="text_2">HELLO! {{ my_info.name }}</span>
			</div>
			<div class="flex-col group_2">
				
				<div v-for="items in userList.filter(data => (
				data.type === 'group' 
				|| data.type === 'user'
				|| data.type === 'room' 
				&& roomList[roomList.findIndex((i) => i.name === data.name)].member.findIndex((i) => i === my_info.name) !== -1 ))" 
				:key="items.name" 
				@click="set_talk_with(items)">

					<div class="flex-row items-center group_3 space-x-16" v-if="items.name != my_info.name" :style="{'background-color': items.name === talk_with_info.name ? 'rgba(24, 98, 153, 0.12)':'white'}">
						<el-avatar shape="square" size="small" style="background-color: #186299;">{{
							items.name }}</el-avatar>
						<span class="font_1">{{ items.name }}</span>
						<el-tag v-if="items.type === 'room'" size="small">群聊</el-tag>
					</div>
				</div>
			</div>
			<div class="flex-col items-center">
				<el-button size="small" @click="newRoom">+创建群组</el-button>
				<span class="text_5">计算机网络课程设计</span>
				<span class="text_7">Designed Dy Xuan</span>
			</div>
		</div>
		<div class="flex-col flex-auto section_2">
			<div class="flex-row header">
				<div class="flex-col justify-start items-start flex-auto text-wrapper_2">
					<span class="font_1 text">{{ talk_with_info.name }}</span>
				</div>
			</div>
			<div class="talkblock">
				<p v-if="false">{{ talk_with_info }}</p>
				<p v-if="false">{{ roomList }}</p>
				<div v-for="items in msgList" :key="items">
					<div v-if="items.receiver === my_info.name && items.sender === talk_with_info.name || items.type === 'my' && items.receiver === talk_with_info.name || talk_with_info.type === 'group' && items.msgtype === 'group' || talk_with_info.type === 'room' && items.msgtype === 'room' && talk_with_info.name === items.roomName">
						<p v-if="false">{{ items }}</p>
						<div class="flex-row justify-end" v-if="items.type === 'my'">
							<div class="flex-col justify-start items-center text-wrapper_4">
								<span class="font_2 text_4">{{ items.msg }}</span>
							</div>
							<el-avatar shape="square" size="small"
								style="background-color: #186299;">{{ my_info.name }}</el-avatar>
						</div>
						<div class="flex-row" v-else>
							<el-avatar shape="square" size="small" style="background-color: #186299;">{{
								items.sender }}</el-avatar>
							<div class="flex-col justify-start items-center text-wrapper_3">
								<span class="font_2 text_3">{{ items.msg }}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="flex-col justify-start items-end tab-bar">
				<el-input type="textarea" v-model="input" rows="4" maxlength="30"></el-input>
				<div class="flex-col justify-start items-center text-wrapper_5" @click="send"><span class="text_6">发送</span>
				</div>
			</div>
		</div>
		<el-dialog style="width:60rem;" :visible.sync="dialogTableVisible" title="创建聊天室" append-to-body>
			<div class="dialog">
				<p>请输入群组名称</p>
				<el-input v-model="roomName" maxlength="6"></el-input>				
				<p>请选择用户</p>
				<el-checkbox-group v-model="selectUser" class="selecttable">
					<el-checkbox-button v-for="items in userList.filter(data => (data.type === 'user' && data.name !== my_info.name))" :key="items" :label="items.name"></el-checkbox-button>
				</el-checkbox-group>
				<el-button @click="buildRoom">创建</el-button>
			</div>      
		</el-dialog>
	</div>
</template>

<script>
import store from '../store/index'
export default {
	name: 'mainPage',
	data() {
		return {
			input: '',
			dialogTableVisible:false,
			selectUser:[],
			roomName:'',
		}
	},
	computed: {
		userList() {
			return store.state.userList;
		},
		talk_with_info() {
			return store.state.userInfo;
		},
		my_info() {
			return store.state.myInfo;
		},
		msgList() {
			return store.state.chatMessageList;
		},
		roomList()
		{
			return store.state.roomList;
		}
	},
	methods: {
		send() {
			let time = new Date();
			//封装一个信息包
			let data = {
					type: "my",//该消息来自自己
					msgtype:'user',
					roomName:'not a room',
					sender: this.my_info.name,
					receiver: this.talk_with_info.name,
					time: time.toLocaleString(),
					msg: this.input,
				};
			if (this.talk_with_info.type == 'user') {				
				//更新对方的消息记录
				this.$socket.emit('privateChat', data);
				//更新自己的消息记录
				store.commit('SOCKET_updateChatMessageList', data);
			}
			else {
				if (this.talk_with_info.type === 'group') {
					data.msgtype="group";
					this.$socket.emit('groupChat',data);
					/* 自己的信息直接push到数组中 */
					store.commit('SOCKET_updateChatMessageList',data);
				}
				else//rooms
				{
					data.msgtype = 'room';
					data.roomName = this.talk_with_info.name;
					this.$socket.emit('roomChat',data);
					store.commit('SOCKET_updateChatMessageList',data);
				}
			}			
			this.input = '';
		},
		set_talk_with(talk_with_info) {
			store.commit('setUserInfo', talk_with_info);
		},
		newRoom()
		{
			this.dialogTableVisible = true;
		},
		buildRoom()
		{
			if(this.roomName === ''|| this.selectUser.length === 0)
			{
				this.$message.error("请完善信息");
				return;
			}
			this.$socket.emit("login",{name: this.roomName,type:"room",owner: this.my_info.name},(res) =>
			{
				if(res)
				{
					this.selectUser.push(this.my_info.name);
					let data={
						name: this.roomName,
						member: this.selectUser	
					};
					this.$socket.emit("addRoom",data);
					this.$message.success("成功创建");
					this.selectUser = [];
					this.roomName = '';
					this.dialogTableVisible = false;
				}
				else
				{
					this.$message.error("群组名重复，请重新输入");
				}
			})

		}
	},
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
	height: 28rem;
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
	padding-top: 1rem;
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
	height: 1.63rem;
}

.font_2 {
	padding: 0 0.5rem;
	font-size: 0.69rem;
	font-family: Noto Sans SC;
	line-height: 0.5rem;
	color: #000000;
	white-space:nowrap;
}

.text_3 {
	font-size: 0.63rem;
}

.text-wrapper_4 {
	margin: 0.13rem 0.5rem 0.13rem 0;
	padding: 0.5rem 0;
	background-color: #f7e27933;
	border-radius: 0.63rem;
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
	resize: none;
	/* 这个是去掉 textarea 下面拉伸的那个标志，如下图 */
}

.text-wrapper_5 {
	margin-right: 0.69rem;
	padding: 0.38rem 0.6rem;
	background-color: #186299;
	border-radius: 0.25rem;
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
	overflow-x: scroll;
	display: flex;
	flex-direction: column;
	gap: 1rem;
}
::-webkit-scrollbar {
  display: none;
}
.selecttable
{
	display: flex;
	flex-direction: row;
	gap: 0.5rem;
}
.dialog
{
	display: flex;
	flex-direction: column;
}
</style>

