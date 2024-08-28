const axios = require("axios");
const cheerio = require("cheerio");
const qs = require("querystring");
const fetch = require("node-fetch");

async function nvidia (query) {
    try {
    let key = "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";
    const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${key}`,
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.1 Mobile/15E148',
        },
        body: JSON.stringify({
        model: 'nvidia/nemotron-4-340b-instruct',
        messages: [
        {
        role: 'user',
        content: q,
        }
        ],
        temperature: '0.2',
        top_p: '0.9',
        max_tokens: '1024',
        stream: false
        }),
    });
    const data = await response.json();

    let res = data.choices[0]?.message?.content || '';
    return res;
        } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function Alicia(tobrut_tt_besar) {
  try {
    const tobrut = await axios.get('https://yw85opafq6.execute-api.us-east-1.amazonaws.com/default/boss_mode_15aug', {
      params: {
        text: `Generate humanized chatgpt text in Indonesian, you are an AI assistant named Alicia programmed with Alicia 3 version for the following text: ${tobrut_tt_besar}`,
        country: 'Asia',
        user_id: 'k2r4gMUJfN'
      }
    });

    return tobrut.data;
  } catch (error) {
    console.error(error);
  }
}

async function gemini(query) {
  const COOKIE_KEY = "g.a000kAizwbBdNbMHiOjpi3wG6gRWpkyc_b7CpDipldhMCt_UJIpDxrcWnqL7c6jCY-ooclL3NwACgYKAXgSARMSFQHGX2MiZAtXZ3cvSt7VxKSgDFmGzxoVAUF8yKqiRmRoIsjmTMIJrvT-Pm6l0076";
  const psidCookie = '__Secure-1PSID=' + COOKIE_KEY;
  const headers = {
    "Host": "gemini.google.com",
    "X-Same-Domain": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    "Origin": "https://gemini.google.com",
    "Referer": "https://gemini.google.com",
    'Cookie': psidCookie
  };

  const bardRes = await fetch("https://gemini.google.com/", { method: 'get', headers });
  const bardText = await bardRes.text();

  const [snlM0e, blValue] = [bardText.match(/"SNlM0e":"(.*?)"/)?.[1], bardText.match(/"cfb2h":"(.*?)"/)?.[1]];

  const bodyData = `f.req=[null,"[[\\"${encodeURIComponent(query)}\\"],null,[\\"\\",\\"\\",\\"\\"]]\"]&at=${snlM0e}`;
  const response = await fetch(`https://gemini.google.com/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate?bl=${blValue}&_reqid=229189&rt=c`, { method: 'post', headers, body: bodyData });
  const answer = JSON.parse(JSON.parse((await response.text()).split("\n").reduce((a, b) => (a.length > b.length ? a : b), ""))[0][2])[4][0][1];

  return answer;
}

async function blackboxAIChat(message) {
  try {
    const response = await axios.post('https://www.blackbox.ai/api/chat', {
      messages: [{ id: null, content: message, role: 'user' }],
      id: null,
      previewToken: null,
      userId: null,
      codeModelMode: true,
      agentMode: {},
      trendingAgentMode: {},
      isMicMode: false,
      isChromeExt: false,
      githubToken: null
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

module.exports = { blackboxAIChat, gemini, Alicia, nvidia }
