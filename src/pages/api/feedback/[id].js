// pages/api/feedback/[id].js
import { buildFeedbackPath, extractFeedback } from '../../../lib/feedback';

function handler(req, res) {
  const { feedbackId } = req.query; // Get feedbackId from the URL

  // Build file path and extract feedback data
  const filePath = buildFeedbackPath();
  const feedbackData = extractFeedback(filePath);

  // Find the specific feedback by ID
  const selectedFeedback = feedbackData.find((item) => item.id === feedbackId);

  if (!selectedFeedback) {
    return res.status(404).json({ message: 'Feedback not found.' });
  }

  // Return the selected feedback
  res.status(200).json({ feedback: selectedFeedback });
}

export default handler;
