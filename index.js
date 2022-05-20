const axios = require("axios");

// 필수입니다.
const WEBHOOK_URL = process.env.WEBHOOK_URL;
const ALERT_PIPELINES = process.env.ALERT_PIPELINES;
// 옵션입니다.
const ALERT_PIPELINES_ALIAS = process.env.ALERT_PIPELINES_ALIAS
  ? process.env.ALERT_PIPELINES_ALIAS
  : ALERT_PIPELINES;
// 한 워크스페이스에서 여러 저장소를 사용할 때 옵션
const REPO = process.env.REPO;
const REPO_ALIAS = process.env.REPO_ALIAS ? process.env.REPO_ALIAS : "";
const REPO_COLORS = process.env.REPO_COLORS;

const baseUrl = "https://app.zenhub.com/workspace/o";
const permitEvent = "issue_transfer";
const stringToArray = (str) => (str || "").split(",").map((t) => t.trim());

const alertPipelineArray = stringToArray(ALERT_PIPELINES);
const repoArray = stringToArray(REPO);

const pipelinesMap = alertPipelineArray.reduce(
  (o, k, i) => ({ ...o, [k]: stringToArray(ALERT_PIPELINES_ALIAS)[i] }),
  {}
);
const repoMap = repoArray.reduce(
  (o, k, i) => ({ ...o, [k]: stringToArray(REPO_ALIAS)[i] }),
  {}
);
const repoColorMap = repoArray.reduce(
  (o, k, i) => ({ ...o, [k]: stringToArray(REPO_ALIAS)[i] }),
  {}
);

const getIssueInfo = (data) => {
  return `<${baseUrl}/${data.organization}/${data.repo}/issues/${data.issue_number}|#${data.issue_number} ${data.issue_title}>`;
};

const issueMessages = (data) => {
  return [
    {
      text: "[Zenhub 알림]",
      color: repoColorMap[data.repo] || "#FF00FF",
      fields: [
        {
          title: `${repoMap[data.repo] || ""} '${data.user_name}' 님의 `,
          value: `${getIssueInfo(data)} ISSUE 에 대한 ${
            pipelinesMap[data.to_pipeline_name]
          }`,
          short: false,
        },
      ],
    },
  ];
};

const base64decode = (base64text) => {
  return Buffer.from(base64text, "base64").toString("utf8");
};

const getURLSearchParamsToJSON = (string) => {
  const searchParams = new URLSearchParams(string);
  let object = {};
  searchParams.forEach((value, key) => {
    const keys = key.split("."),
      last = keys.pop();
    keys.reduce((r, a) => (r[a] = r[a] || {}), object)[last] = value;
  });
  return object;
};

exports.handler = (event, _, callback) => {
  if (!event.body) {
    callback("이벤트 경로 정보를 찾을 수 없습니다.");
  }
  const data = getURLSearchParamsToJSON(base64decode(event.body));
  const attachments = issueMessages(data);

  if (data.type && data.type === permitEvent) {
    if (alertPipelineArray.includes(data.to_pipeline_name)) {
      axios
        .post(WEBHOOK_URL, { attachments, link_names: 1 })
        .catch(console.log);
    }
  }
  callback(null, {
    statusCode: "200",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
};
