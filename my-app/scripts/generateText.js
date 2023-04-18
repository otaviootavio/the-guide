// Import required modules
const axios = require('axios');
const fs = require('fs');
const { writeFileSync } = require('fs');
const path = require('path');
require('dotenv').config();
const shortid = require('shortid');

function createFolderIfNotExist(folderName) {
  try {
    const folderPath = `output/${folderName}`;
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
    return folderPath;
  } catch (err) {
    console.error(err);
  }
}

async function generateTextUsingAPI(prompt) {
  const options = {
    method: 'POST',
    url: 'https://api.edenai.run/v2/text/generation',
    headers: {
      authorization: `Bearer ${process.env.EDEN_AI_API_KEY}`,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    data: {
      providers: 'cohere',
      text: `${prompt}`,
      temperature: 0.2,
      max_tokens: 250
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response);
    const { cohere } = response.data;
    if (cohere.error && cohere.status === 'fail') {
      console.error(`Error generating text: ${cohere.error.message}`);
      return null;
    }
    const generatedText = cohere.generated_text;
    return generatedText;
  } catch (error) {
    console.error(error);
    return null;
  }
}


function parseListFromFileContent(fileContent) {
  const lines = fileContent.split(/\r?\n/);
  const items = [];

  for (const line of lines) {
    const match = line.match(/^(.+?)\s*(?:\r?\n|$)/);
    if (match) {
      items.push(match[1]);
    }
  }

  return items;
}

async function generateInviteForTitle(itemTitle, folderPath) {
  const generatedText = await generateTextUsingAPI(`Generate a one paragraph invite to consume ${itemTitle}`);
  console.log(`Generated text for ${itemTitle}: ${generatedText}`);
  const inviteFileName = `${itemTitle}_${Buffer.from(generatedText, 'utf-8').toString('base64').substr(0, 5)}.md`;

  fs.writeFileSync(`./${folderPath}/${itemTitle}.md`, `# ${itemTitle}\n\n${generatedText}`);
  console.log(`File created at ${inviteFileName}`);
}

async function generateInvitesForItems(fileName) {
  const fileContent = fs.readFileSync(`./output/${fileName}`, 'utf8');
  const itemList = parseListFromFileContent(fileContent);
  const folderPath = createFolderIfNotExist(fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase());

  if (itemList.length === 0) {
    console.log('The item list is empty. \n');
    return;
  }

  for (const item of itemList) {
    const itemTitle = item.replace(/[^a-z0-9]/gi, '_').toLowerCase().replace(/^[^a-z0-9]+|[^a-z0-9]+$/gi, '');
    await generateInviteForTitle(itemTitle, folderPath);
  }
}

async function generateListAndInvites() {
  const prompt = "Generate a list of cool books to study computer science at graduation";
  const generatedList = await generateTextUsingAPI(prompt);
  if (generatedList) {
    const fileName = `result_${shortid.generate()}.md`;
    const fileContent = `#${prompt}\n\n${generatedList}`;
    writeFileSync(`./output/${fileName}`, fileContent);
    console.log(`File '${fileName}' generated successfully.`);
    await generateInvitesForItems(fileName);
  }
}

(async () => {
  await generateListAndInvites();
})();