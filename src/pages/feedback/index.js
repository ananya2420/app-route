import { Fragment, useState } from 'react';
import { buildFeedbackPath, extractFeedback } from '../../lib/feedback';

function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState(null); // Initialize as null

  // Fetch specific feedback data when "Show Details" is clicked
  function loadFeedbackHandler(id) {
    console.log("Loading feedback for ID: ", id); // Debugging log

    // Fetch the specific feedback by ID
    fetch(`/api/feedback/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Feedback Data: ", data); // Log to check the fetched data
        setFeedbackData(data.feedback); // Update state with the fetched feedback
      })
      .catch((error) => {
        console.error('Error fetching feedback:', error);
      });
  }

  return (
    <Fragment>
      {/* Display feedback details if available */}
      {feedbackData && (
        <div>
          <p><strong>Email:</strong> {feedbackData.email}</p>
          <p><strong>Feedback:</strong> {feedbackData.text}</p>
        </div>
      )}

      <ul>
        {/* Display feedback list */}
        {props.feedbackItem.length > 0 ? (
          props.feedbackItem.map((item) => (
            <li key={item.id}>
              {item.text}
              <button onClick={() => loadFeedbackHandler(item.id)}>
                Show Details
              </button>
            </li>
          ))
        ) : (
          <li>No matching feedback found.</li>
        )}
      </ul>
    </Fragment>
  );
}

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  // Filter the data to show only specific feedback
  const filteredData = data.filter(
    (item) => item.text === 'Do this work?' || item.text === 'Do this work again?'
  );

  return {
    props: {
      feedbackItem: filteredData,
    },
    revalidate: 10, // Optional: Incremental Static Regeneration (ISR)
  };
}

export default FeedbackPage;
