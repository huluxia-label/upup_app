<template>
	<view class="content">
		<view v-if="!data">
			<view class="uni-form-item uni-column">
				<view class="title">用户名</view>
				<input class="uni-input" v-model="username" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">密码</view>
				<input class="uni-input" v-model="password" type="password" />
			</view>
			<button @tap="handleLogin">登录</button>
		</view>
		<view v-else style="padding: 12rpx 42rpx">
			<image mode="aspectFit" style="width: 240rpx" :src="data.user.avatar" />
			<view style="color: green">{{ data.user.nick }}</view>
		</view>
		<view style="display: flex; margin-top: 12rpx" v-if="data">
			<button style="margin-right: 16rpx" @tap="handleSignOut">退出登录</button>
			<button @tap="handleSinginAction">一键签到</button>
		</view>
		<scroll-view :class="{ show: easeShow }" @tap="handleCloseModal" class="ease-modal" :scroll-y="true">
			<text>{{ msg }}</text>
		</scroll-view>
	</view>
</template>

<script lang="ts">
import Vue from 'vue';
import { Login, GetCategoryList, HandleSignin } from '@/api';
import { mapState } from 'vuex'
import { UserAPI } from '@/interface';
export default Vue.extend({
	data() {
		return {
			username: "",
			password: "",
			msg: "",
			closeIsReady: false
		}
	},
	computed: {
		data() {
			return (this.$store as any).state.user
		},
		cats() {
			return (this.$store as any).state.cats
		},
		easeShow(): boolean {
			const x = this.msg
			const b = !!x
			return b
		}
	},
	async onLoad() {
		if (!this.cats) this.getCats()
	},
	methods: {
		/**
		 * 登录
		 */
		async handleLogin() {
			const { username, password } = this
			if (username && password) {
				const ctx = await Login(username, password)
				if (ctx) {
					const data = ctx as UserAPI
					if (!!data.status) {
						this.$store.commit('CHANGE_USER_PROFILE', data)
					} else {
						uni.showModal({
							title: "登录失败"
						})
					}
				}
			} else {
				this.username = ""
				this.password = ""
			}
		},
		/**
		 * 退出登录
		 */
		async handleSignOut() {
			this.$store.commit('CHANGE_USER_PROFILE', null)
			uni.showToast({
				title: "已退出"
			})
		},
		/**
		 * 签到
		 */
		async handleSinginAction() {
			const cats = this.cats
			const token = this.data['_key']
			if (!cats) return
			const newCats = cats.categories.filter((item: any)=> item)
			newCats.forEach(async (item: any)=> {
				const u = await HandleSignin(item.categoryID, token) as any
				const flag = u && u.status
				let text = `正在签到: ${ item.title }, 签到状态: ${ flag ? '成功' : '失败' } \n`
				this.msg += text
			})
			this.closeIsReady = true
		},
		/**
		 * 获取分类
		 */
		async getCats() {
			const x = await GetCategoryList()
			if (x) {
				this.$store.commit('CHANGE_CATS', x)
			}
		},
		/**
		 * 关闭弹窗
		 */
		async handleCloseModal() {
			const x = this.closeIsReady
			if (x) {
				this.msg = ""
				this.closeIsReady = false
			}
		}
	}
});
</script>

<style>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.uni-input {
	min-height: 48px;
	border: 1px solid #ccc;
	margin: 18rpx 0;
}
.logo {
	height: 200rpx;
	width: 200rpx;
	margin: 200rpx auto 50rpx auto;
}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}
.ease-modal {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 520rpx;
	background: #333;
	color: #fff;
	border-top-left-radius: 32rpx;
	border-top-right-radius: 32rpx;
	box-sizing: border-box;
	padding: 24rpx;
	transition: all .4s;
	transform: translateY(-1200px);
	font-size: 24rpx;
}
.ease-modal.show {
	transform: translateY(0)
}
</style>
