const axios = require('axios');
const {
	delay,
	createFileDirectory,
	writeJsonFile,
	formatCommentData,
} = require('./lib');

console.clear();

const headers = {
	'user-agent':
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
	'Content-Type': 'text/plain',
};

const getCommentUrl = (countStart = 0) => {
	return `https://www.google.com.tw/maps/preview/review/listentitiesreviews?authuser=0&hl=zh-TW&gl=tw&pb=!1m2!1y3765758551715385081!2y17436170062305043679!2m2!1i${countStart}!2i10!3e2!4m5!3b1!4b1!5b1!6b1!7b1!5m2!1sTf7JYOquJpji-AbVspzwDQ!7e81`;
};

/** @type {axios.AxiosRequestConfig} */
const axiosConfig = {
	method: 'get',
	headers,
	responseType: 'text',
};

/**
 * @param {{fileName: string; url: string;}} options
 */
const apiGetTaipeitMcdonaldComments = async (options) => {
	const res = await axios({ ...axiosConfig, url: options.url });

	const resData = res.data.replace(")]}'", '');
	const dataObj = JSON.parse(resData);
	const commentDataList = dataObj[2];

	const commentList = commentDataList.map((commentData) =>
		formatCommentData(commentData)
	);

	return commentList;
};

const loopWithDelay = async () => {
	createFileDirectory();
	const allComents = [];

	const fileName = 'taipei_mcdonald';
	let count = 0;
	for (let i = 0; i < 10; i++) {
		const commentList = await apiGetTaipeitMcdonaldComments({
			fileName: fileName + (i + 1),
			url: getCommentUrl(count),
		});
		count += 10;

		allComents.push(commentList);

		writeJsonFile({
			fileName: fileName + (i + 1),
			data: commentList,
		});
		await delay(2123 + Math.floor(Math.random() * 200));
	}

	writeJsonFile({
		fileName: 'allComments',
		data: allComents,
	});
};

loopWithDelay();
