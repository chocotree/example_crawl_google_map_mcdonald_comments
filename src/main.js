const axios = require('axios');

console.clear();

const headers = {
	'user-agent':
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
	'Content-Type': 'text/plain',
};

const url1 = 'https://www.google.com.tw/maps/preview/review/listentitiesreviews?authuser=0&hl=zh-TW&gl=tw&pb=!1m2!1y3765758551715385081!2y17436170062305043679!2m2!1i0!2i10!3e1!4m5!3b1!4b1!5b1!6b1!7b1!5m2!1sVtjJYIDWHJq5wAPYlL7oDQ!7e81';
const url2 = 'https://www.google.com.tw/maps/preview/review/listentitiesreviews?authuser=0&hl=zh-TW&gl=tw&pb=!1m2!1y3765758551715385081!2y17436170062305043679!2m2!1i10!2i10!3e1!4m5!3b1!4b1!5b1!6b1!7b1!5m2!1sVtjJYIDWHJq5wAPYlL7oDQ!7e81';

/** @type {axios.AxiosRequestConfig} */
const axiosConfig = {
	method: 'get',
	url: url2,
	headers,
	responseType: 'text',
};

const logCommentData = (commentData) => {
	console.log('------------------------------------')
	console.log('用戶名稱:', commentData[0][1], '\n');
	console.log('評論時間:', commentData[1], '\n');
	console.log(`評論內容:\n${commentData[3]}`, '\n');
	console.log('評分星數:', commentData[4] + ' 顆星', '\n');
};

const apiGetTaipeitMcdonaldComments = () => {
	axios(axiosConfig).then((res) => {
		const resData = res.data.replace(")]}'", '');
		const dataObj = JSON.parse(resData);
		const commentDataList = dataObj[2];

		commentDataList.forEach(commentData => {
			logCommentData(commentData);
		})
	});
};

apiGetTaipeitMcdonaldComments();
