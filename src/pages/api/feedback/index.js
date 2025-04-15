import { buildFeedbackPath, extractFeedback } from '../../../lib/feedback';

function handler(req, res) {
  const filePath = buildFeedbackPath();

  if (req.method === 'POST') {
    const email = req.body.email;
    const feedbackText = req.body.text;

    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      text: feedbackText,
    };

    const data = extractFeedback(filePath);
    data.push(newFeedback);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    res.status(201).json({ message: 'Success', feedback: newFeedback });
  } else {
    const data = extractFeedback(filePath);
    res.status(200).json({ feedback: data });
  }
}

export default handler;
