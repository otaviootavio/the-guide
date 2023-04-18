// Importando os módulos necessários
const axios = require('axios');
const fs = require('fs');
const { writeFileSync } = require('fs');
const path = require('path');
require('dotenv').config();
const shortid = require('shortid');


function createFolderReturnPath(text){
  try {
    if (!fs.existsSync(`output/${text}`)) {
      fs.mkdirSync(`output/${text}`);
      return (`output/${text}`);
    }
  } catch (err) {
    console.error(err);
  }
}

async function generateText(text) {
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
      text: `${text}`,
      temperature: 0.2,
      max_tokens: 250
    }
  };

  try {
    const response = await axios.request(options);
    const generatedText = response.data.cohere.generated_text.trim();
    return generatedText;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function parseMovieList(fileContent) {
  const lines = fileContent.split(/\r?\n/);
  const movies = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(/^(.+?)\s*(?:\r?\n|$)/);

    if (match) {
      movies.push(match[1]);
    }
  }

  return movies;
}

async function generateReview(fileName) {
  const fileContent = fs.readFileSync(`./output/${fileName}`, 'utf8');
  const movieList = parseMovieList(fileContent);
  const movieTitle = movieList[4].replace(/[^a-z0-9]/gi, '_').toLowerCase();
  const pathFolder = createFolderReturnPath(fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase())

  if (movieList.length === 0) {
    console.log('The movie list is empty. \n');
    return;
  }
  console.log(`This is the title: ${movieTitle} \n`);

  // Generate text using the first movie title in the list
  const generatedText = await generateText(`Generate a one paragraph invite to consume ${movieTitle}`);
  console.log(`Generated text: ${generatedText}`);
  const reviewFileName = `${movieTitle}_${Buffer.from(generatedText,'utf-8')
    .toString('base64')
    .substr(0, 5)}.md`;

  fs.writeFileSync(`./${pathFolder}/${movieTitle}.md`, `# ${movieTitle}\n\n${generatedText}`);
  console.log(`File created at ${reviewFileName}`);
}

async function generateTextToFile() {
  const text = "Generate a list of cool books to study computer science at graduation";
  const generatedText = await generateText(text);
  if (generatedText) {
    const fileName = `result_${shortid.generate()}.md`;
    const fileContent = `#${text}\n\n${generatedText}`;
    writeFileSync(`./output/${fileName}`, fileContent);
    console.log(`File '${fileName}' generated successfully.`);
    await generateReview(fileName);
  }
}

(async () => {
  await generateTextToFile();
})();

