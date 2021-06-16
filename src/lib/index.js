const fs = require('fs');

const logCommentData = (commentData) => {
	console.log('------------------------------------');
	console.log('用戶名稱:', commentData[0][1], '\n');
	console.log('評論時間:', commentData[1], '\n');
	console.log('評論日期:', commentData[27], '\n');
	console.log(`評論內容:\n${commentData[3]}`, '\n');
	console.log('評分星數:', commentData[4] + ' 顆星', '\n');
};

const delay = async (ms = 3000) =>
	new Promise((resolve) => setTimeout(resolve, ms));

const formatCommentDate = timeStamp => {
	const date = new Date(timeStamp);
	return date.toLocaleDateString('zh-TW', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	})
}

const formatCommentData = (commentData) => {
	return {
		commentUserName: commentData[0][1],
		commentTime: commentData[1],
		commentDate: formatCommentDate(commentData[27]),
		commentContent: commentData[3],
		commentRank: `${commentData[4]} 顆星`,
	};
};

const directoryName = './comment_datas';

const createFileDirectory = async () => {
	await fs.mkdirSync(directoryName);
}

const writeJsonFile = async (
	options = {
		fileName: '',
		data: {},
	}
) => {
	if (!options.fileName) {
		return;
	}

	const jsonStr = JSON.stringify(options.data, null, 4);
	await fs.writeFileSync(
		`./${directoryName}/${options.fileName}.json`,
		jsonStr,
		{
			encoding: 'utf-8',
		}
	);
	console.log(`save ${options.fileName}`);
};

module.exports = {
	delay,
	formatCommentData,
	createFileDirectory,
	writeJsonFile,
	logCommentData,
};
