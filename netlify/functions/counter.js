const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../visit-count.json');

exports.handler = async function () {
  try {
    let count = 0;

    // Check if file exists
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath);
      count = JSON.parse(data).count || 0;
    }

    count += 1;
    fs.writeFileSync(filePath, JSON.stringify({ count }));

    return {
      statusCode: 200,
      body: JSON.stringify({ totalVisits: count }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to update counter' }),
    };
  }
};
