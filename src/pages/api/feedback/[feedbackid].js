import { buildFeedbackPath, extractFeedback } from '../../../lib/feedback';

function handler(req, res) {
  const feedbackId = req.query.feedbackId; // Get the feedback ID from the URL

  console.log("Feedback ID: ", feedbackId); // Log the ID to check if it's correct

  const filePath = buildFeedbackPath();
  const feedbackData = extractFeedback(filePath);

  const selectedFeedback = feedbackData.find(item => item.id === feedbackId);

  if (!selectedFeedback) {
    return res.status(404).json({ message: 'Feedback not found.' });
  }

  console.log("Selected Feedback: ", selectedFeedback); // Log the selected feedback

  res.status(200).json({ feedback: selectedFeedback });
}

export default handler;
