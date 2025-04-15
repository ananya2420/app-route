import fs from 'fs';
import path from 'path';

export function buildFeedbackPath() {
  return path.join(process.cwd(), 'data', 'feedback.json');
}

export function extractFeedback(filePath) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}
