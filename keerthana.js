const fs = require('fs');
const readline = require('readline');

const dataFile = 'feedbackData.json';

// Initialize feedback data file if not exists
if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify([]));
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function loadFeedbacks() {
  const data = fs.readFileSync(dataFile, 'utf-8');
  return JSON.parse(data);
}

function saveFeedbacks(feedbacks) {
  fs.writeFileSync(dataFile, JSON.stringify(feedbacks, null, 2));
}

function showMenu() {
  console.log('\n=== Feedback Collection System ===');
  console.log('1. Submit Feedback');
  console.log('2. View All Feedback');
  console.log('3. Exit');
  rl.question('Choose an option (1-3): ', handleMenu);
}

function handleMenu(option) {
  switch (option.trim()) {
    case '1':
      collectFeedback();
      break;
    case '2':
      displayFeedbacks();
      break;
    case '3':
      console.log('Goodbye!');
      rl.close();
      break;
    default:
      console.log('Invalid option. Please choose 1, 2 or 3.');
      showMenu();
  }
}

function collectFeedback() {
  rl.question('Please enter your feedback (min 5 characters): ', (input) => {
    if (input.trim().length < 5) {
      console.log('Feedback too short! Try again.');
      collectFeedback();
      return;
    }

    const feedbacks = loadFeedbacks();
    const newEntry = {
      id: feedbacks.length + 1,
      feedback: input.trim(),
      date: new Date().toISOString()
    };
    feedbacks.push(newEntry);
    saveFeedbacks(feedbacks);

    console.log('Thank you for your feedback!\n');
    showMenu();
  });
}

function displayFeedbacks() {
  const feedbacks = loadFeedbacks();
  if (feedbacks.length === 0) {
    console.log('No feedback collected yet.');
  } else {
    console.log('\n=== All Feedback ===');
    feedbacks.forEach(fb => {
      console.log(`#${fb.id} [${fb.date}]: ${fb.feedback}`);
    });
  }
  showMenu();
}

// Start program
showMenu();

rl.on('close', () => {
  process.exit(0);
});





