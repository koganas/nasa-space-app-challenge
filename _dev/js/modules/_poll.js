// POLL PLUGIN
class poll {
  constructor(question, answers, options) {
    const defaultOptions = {};
    this.options = Object.assign({}, defaultOptions, options);
    this.history = [];
    this.possibleAnswers = answers;
  }

  clear() {
    this.history = [];
  }

  get results() {
    let numberOfVotes = this.history.length,
      votesResults = [];

    Object.keys(this.possibleAnswers).forEach(answerId => {
      let answerIdCounter = 0;
      let voters = [];
      this.history.forEach(vote => {
        if (answerId == vote.id) {
          answerIdCounter++;
          voters.push(vote.name);
        }
      });
      let percentOfAllVotes = answerIdCounter / numberOfVotes * 100;
      let formatedPercent = isNaN(percentOfAllVotes)
        ? 0
        : parseFloat(percentOfAllVotes)
            .toFixed(3)
            .slice(0, -1);
      votesResults.push({
        votes: answerIdCounter,
        voters: voters,
        percent: formatedPercent
      });
    });

    return votesResults;
  }

  vote(answerId, name = "Anonymouse") {
    if (this.possibleAnswers[answerId]) {
      let getCurrentDate = new Date().toLocaleString();
      this.history.push({ id: answerId, name: name, date: getCurrentDate });
      return true;
    } else throw new Error("Incorrect answer's id");
  }
}

const _poll = {

  init() {
    this.mountPoll();
  },

  mountPoll() {
    
    let q1 = new poll("Qual o percentual aproximado da população litorânea mundial?", {
      0: { title: "40%" },
      1: { title: "50%" },
      2: { title: "20%" },
      3: { title: "70%" }
    })
    let q2 = new poll("O que é aquecimento global?", {
      0: { title: "Efeito dos raios ultra ultravioleta na Terra" },
      1: { title: "Uma teoria da conspiração" },
      2: { title: "Movimento em prol de solidariedade e colaboração mundial" },
      3: { title: "Aumento da temperatura média dos oceanos e da atmosfera da Terra" }
    })

    // Add some random votes
    for(let i = 0; i<2; i++) {
      q1.vote(1);
      q2.vote(3);
    }
    for(let i = 0; i<3; i++) {
      q1.vote(0);
      q2.vote(2);
    }
    for(let i = 0; i<5; i++) {
      q1.vote(2);
      q2.vote(0);
    }
    for(let i = 0; i<7; i++) {
      q1.vote(3);
      q2.vote(1);
    }

    // Poll interface script
    let polls = document.querySelectorAll('.poll-container');
        /*pollButtons = document.querySelectorAll('.poll-panel-btn'),
        pollPanel = document.querySelector('.poll-panel');*/

    polls.forEach( (elm, i) => {
/*     pollButtons = elm.querySelectorAll('.poll-panel-btn'); 
      pollPanel = elm.querySelector('.poll-panel');*/

      elm.querySelectorAll('.poll-panel-btn').forEach( button => {
        button.onclick = () => {
          if (button.getAttribute('disabled') != 'disabled') {
            button.parentNode.classList.add('poll-voted');
            button.classList.add('--user-choice');
            q1.vote(button.dataset.vote);
            elm.querySelectorAll('.poll-panel-btn').forEach(b => {
              b.setAttribute('disabled', 'disabled');
              let percent = q1.results[b.dataset.vote].percent + '%';
              b.style.width = percent;
              b.dataset.result = percent;
            });
          }
        };
      });

    });

  }

};

export default _poll;