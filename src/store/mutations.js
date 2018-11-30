import {
	SET_USER_INFO,
	SOCKET_USER_MESSAGE,
	LOG_OUT,
	SHOW_USER_JOIN,
	SHOW_USER_LEAVE,
	RECORD_ORDER_DETAIL
} from './mutation-types'
import {Message as $message} from 'element-ui'

const messageTip = (groupInfo) => {
	$message({
		message: groupInfo.message,
		center: true,
		dangerouslyUseHTMLString: true
	})
}

export default {
	[RECORD_ORDER_DETAIL] (state, orderDetail) {
		state.orderDetail = orderDetail
	},

	[SET_USER_INFO] (state, userInfo) {
		state.userInfo = userInfo
	},

	[SOCKET_USER_MESSAGE] (state, userMsg) {
		state.chatMessages.push(userMsg)
	},

	[LOG_OUT] (state) {
		state.userInfo = {}
	},

	[SHOW_USER_LEAVE] (state, groupInfo) {
		state.groupUsersInfo = groupInfo
		messageTip(groupInfo)
	},

	[SHOW_USER_JOIN] (state, groupInfo) {
		state.groupUsersInfo = groupInfo
		messageTip(groupInfo)
	}

}
