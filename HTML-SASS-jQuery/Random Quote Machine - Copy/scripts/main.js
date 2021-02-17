// Data
const quotes = [
  ["Nelson Mandela", "The greatest glory in living lies not in never falling, but in rising every time we fall."],
  ["Walt Disney", "The way to get started is to quit talking and begin doing."],
  ["Steve Jobs", "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking."],
  ["Eleanor Roosevelt", "If life were predictable it would cease to be life, and be without flavor."],
  ["James Cameron", "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success."],
  ["Mother Teresa", "Spread love everywhere you go. Let no one ever come to you without leaving happier."],
  ["Margaret Mead", "Always remember that you are absolutely unique. Just like everyone else."],
  ["Benjamin Franklin", "Tell me and I forget. Teach me and I remember. Involve me and I learn."],
  ["Aristotle", "It is during our darkest moments that we must focus to see the light."],
  ["Anne Frank", "Whoever is happy will make others happy too."],
  ["Abraham Lincoln", "In the end, it's not the years in your life that count. It's the life in your years."],
  ["Helen Keller", "Life is either a daring adventure or nothing at all."],
  ["Dr. Seuss", "You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose."],
  ["Steve Jobs", "If you really look closely, most overnight successes took a long time."],
  ["Tony Robbins", "People who succeed have momentum. The more they succeed, the more they want to succeed and the more they find a way to succeed. Similarly, when someone is failing, the tendency is to get on a downward spiral that can even become a self-fulfilling prophecy."]
];

const quotesLength = quotes.length;


// Random color function, excluding light colors
const randomColor = () => "#" + Math.floor(Math.random() * (256 * 256 * 256 - 256 * 100))
  .toString(16).padStart(6, "0");

function changeQuote(first = false) {
  let color = randomColor();
  let randIndex = Math.floor(Math.random() * quotesLength);

  $(".bg-change").css("background-color", color);
  $(".quote-container").css("color", color);

  if (first) {
    $("#text").hide().html("<i class=\"fa fa-quote-left\"></i>" + quotes[randIndex][1]).fadeIn(1000);
    $("#author").hide().text("- " + quotes[randIndex][0]).fadeIn(1000);
  } else {
    $(".quote-container > p").fadeOut(500, () => {
      $("#text").html("<i class=\"fa fa-quote-left\"></i>" + quotes[randIndex][1]).fadeIn(500);
      $("#author").text("- " + quotes[randIndex][0]).fadeIn(500);
    });
  }
}


$(document).ready(() => {
  changeQuote(true);

  $("#new-quote").click(() => {
    changeQuote();
  });
});
