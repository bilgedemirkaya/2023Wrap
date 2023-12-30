import express from 'express';
import OpenAI from 'openai';
import cors from 'cors';

const app = express();
const port = 3000;

// Configure the OpenAI library with your API key
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

app.use(express.json());
app.use(cors());

app.post('/generate-image', async (req, res) => {
  try {
    /* const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: req.body.prompt, // Use the prompt received from the frontend
      n: 1,
      size: "1024x1024",
    });
 */
    let imageUrl = 'https://www.earthboundtrading.com/media/catalog/product/3/3/33427-tarot-11667-hero.jpg?quality=90&bg-color=255,255,255&fit=bounds&height=&width=&canvas=';

    /* if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        imageUrl = response.data[0].url;
      } else {
        // Handle the case where the data is not in the expected format
        console.error('Unexpected response format:', response.data);
        // Consider throwing an error or returning a default value
        imageUrl = 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-jbXjd4ZhZ1Y8k4Z2PGd3JR3P/user-RUIaqFMzfbEKhBSQQ7To9Kk6/img-zMzNgYDBTEPtSGdsgPoneeo6.png?st=2023-12-28T17%3A13%3A03Z&se=2023-12-28T19%3A13%3A03Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-12-28T05%3A05%3A41Z&ske=2023-12-29T05%3A05%3A41Z&sks=b&skv=2021-08-06&sig=7HSsFy2bx335v3x1LipVAPLL3B09y67Foag/8TEh764%3D';
      } */

    res.json({ imageUrl });
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    res.status(500).send("Error generating image");
  }
});

app.post('/generate-prediction', async (req, res) => {
  try {
      const { predictionPrompt } = req.body;
      const completion = await openai.chat.completions.create({
          messages: [
              {
                  role: "system",
                  content: "You are an expert tarot card reader with a deep understanding of interpreting four-card spreads. Please provide your insights in a JSON format. Your response should include an 'introduction' where you analyze the year based on the selected emotions, the 'cards' array containing the details and name of each card in the spread, and a 'predictionText' offering insights into my future. Ensure the JSON output strictly follows this structure, do not change field names of the JSON: { 'introduction': '', 'cards': [{'details': '', 'name': ''}], 'predictionText': ''}.",
              },
              { role: "user", content: predictionPrompt },
          ],
          model: "gpt-4",
      });

      // Assuming the prediction is returned in completion.data.choices[0].message.content
      res.json({ prediction: completion.choices[0].message.content });
  } catch (error) {
      console.error('Error with OpenAI API:', error);
      res.status(500).send('Error generating prediction');
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
