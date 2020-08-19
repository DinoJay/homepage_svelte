import * as d3 from 'd3';

const timeFormat = d3.timeFormat('%d/%m/%Y');

export default [
  {
    type: 'education',
    startDate: '01/09/1999',
    endDate: '01/07/2005',
    title: 'High School',
    description: 'Heeemsen',
    detail: 'No Fun in school, there are so many better things to do',
    offsetY: -40,
    width: 95
  },
  {
    type: 'education',
    startDate: '01/09/2005',
    endDate: '01/07/2008',
    title: 'Mediocre Abitur',
    mobileHidden: true,
    detail:
      'With a lot of luck I made it through school. Too much pressure, so little content. That is what is going on there. Thank God, I never go through that again.',
    description: 'Fachgymnasium Economy',
    offsetY: -100,
    width: 130
  },
  {
    type: 'education',
    startDate: '01/09/2008',
    endDate: '01/04/2010',
    title: 'Social Sciences',
    mobileHidden: true,
    detail:
      'I did not like math, I was not creative enough for art. So what should I choose, of course Sociology.',
    description: 'Uni Trier',
    width: 130,
    offsetY: -150
  },
  {
    type: 'personal',
    startDate: '01/09/2013',
    endDate: '01/06/2014',
    title: 'English',
    mobileHidden: true,
    offsetY: -75,
    offsetX: 150,
    description: 'switched to English as main language',
    detail:
      "From this moment, I started to read and write mainly in English. This does not mean that I'm completely fluent. My accent is shit but German sucks for its complexity!",
    width: 110
  },
  {
    type: 'personal',
    startDate: '01/09/2008',
    endDate: '30/09/2009',
    title: 'Technics 1210 MK2',
    description: 'my first pair of turntables',
    offsetY: -30,
    detail:
      'I bought my first turntables and started to collect records, mostly for djing. That means a lot of techy house which was en vogue at this time. I did not know any better!',
    width: 142
  },
  {
    type: 'personal',
    startDate: '01/09/2002',
    endDate: '01/09/2008',
    title: 'Adolescence',
    offsetY: -50,
    offsetX: 210,
    description: 'discovered PUNK',
    mobileHidden: true,
    detail:
      'First, I got into the music of PUNK which is loud, lofi, drunken and angry. Sometimes, it is reduced to a cliche. But under the hood there are so many great ideas of Do-It-Yourself and Anarchism!',
    width: 125
  },
  {
    type: 'education',
    startDate: '10/10/2010',
    endDate: '01/06/2013',
    title: 'Bachelor Computer Science',
    description: 'Uni Trier',
    offsetY: -90,
    detail:
      "I graduated from University of Trier with a Bachelor in Computer Science. The courses were mainly crap and old fashioned. I almost my motivation to continue further if there wasn't my thesis.",
    width: 143
  },
  {
    type: 'work',
    startDate: '01/06/2011',
    endDate: '01/09/2011',
    title: 'Construction Helper',
    description: 'Helmet Factory Nienburg',
    offsetY: 50,
    detail:
      'Paid my dues by working in a helmet factory. I was paid really poorly',
    width: 111
  },
  {
    type: 'work',
    startDate: '01/11/2013',
    endDate: '01/02/2014',
    title: 'Mister Jekyll',
    mobileHidden: true,
    offsetX: 230,
    offsetY: 40,
    description: 'Internship Web development',
    detail:
      'Did an internship in a web-dev shop. The experience was mediocre because I had to work with some weird PHP version',
    width: 111
  },
  {
    type: 'work',
    startDate: '01/03/2014',
    endDate: '01/09/2014',
    title: 'International Crisis Group',
    mobileHidden: true,
    detail:
      'After a desastrous breakup. This internship recollected me from the ground. I found the only mentor who was nice',
    description: 'Internship Business Intelligence',
    width: 140
  },
  {
    type: 'work',
    startDate: '01/08/2016',
    endDate: '01/10/2016',
    title: 'Nokia Bell Labs Internship',
    mobileHidden: true,
    offsetY: 30,
    detail:
      'Helped out a research group to do graph visualization. Unfortunately, the requirements were not quite clear and did not match the functionality of common graph libraries',
    // orientation: 'leftRight',
    // align: 'bottom',
    description: 'Data Visualization',
    width: 140
  },
  {
    type: 'work',
    startDate: '01/11/2016',
    endDate: '01/10/2020',
    title: 'PhD VUB',
    offsetY: 50,
    description: 'Data Visualization for informal learning',
    detail:
      "I embarked on the journey of doing a PhD. In the beginning I was still hopeful to make research on Visualization for learning. But then I realized that I was employed as Code Monkey. Not yet clear where this journey will. Let's see in 2020",
    width: 151
  },
  {
    type: 'education',
    startDate: '01/09/2014',
    endDate: '01/11/2016',
    title: 'Master VUB',
    detail:
      "Finally, managed to get my Master degree. Lot's of work. I can't really say what I learned there!",
    offsetY: -70,
    offsetX: 50,
    description: 'Web & Information Systems',
    width: 140
  },
  {
    type: 'geography',
    startDate: '26/04/1996',
    endDate: '01/10/2008',
    title: 'Drakenburg',
    description: 'lived in village in Lower Saxony',
    detail:
      'Born in Nienburg/Weser and spend my first 16 years in a tiny village next to another little town',
    orientation: 'topBottom',
    width: 140
  },
  {
    type: 'geography',
    startDate: '01/10/2008',
    endDate: '01/09/2013',
    title: 'Trier',
    description: 'Mosel Madness',
    detail:
      'To go as far as possible from my hometown. That was my plan when I finished high-school. There I was in this sleepy Mosel town. Yeah, I learned a lot',
    width: 140
  },
  {
    type: 'personal',
    startDate: '01/10/2010',
    endDate: '01/09/2013',
    title: 'Plattenladen',
    mobileHidden: true,
    offsetY: -90,
    offsetX: 100,
    description: 'Campus Radio, Uni Trier',
    detail:
      'With my old housemate Kiran we had a wonderful music show on the campus radio full of red wine and two young guys with too much time!',
    width: 200
  },
  {
    type: 'geography',
    startDate: '01/09/2013',
    endDate: '01/06/2014',
    title: 'Sweden',
    description: 'Erasmus - Linnaeus University',
    detail:
      'I wrote my Bachelor Thesis with a German Professor in Sweden and found also lots of love there. Quite tiring experience but definetely no money can buy this. ',
    width: 140
  },
  {
    type: 'geography',
    startDate: '01/06/2014',
    endDate: timeFormat(new Date()),
    title: 'Belgium',
    mobileHidden: true,
    offsetY: 40,
    description: 'Beer, Chocolate, Fries and Science',
    detail:
      "Through sheer accidental luck I ended up in Brussels. I still don't know what I'm doing here but it seems challenging and fun.",
    width: 140
  },
  {
    type: 'personal',
    startDate: '01/06/2014',
    endDate: timeFormat(new Date()),
    title: 'French!',
    offsetY: -30,
    description: 'a new language!',
    detail:
      'For the first time of my life I discovered what it means to be an immigrant, not knowing the language and having no friends. One gratifies life and sees immigrant now.',
    width: 140
  },
  {
    type: 'personal',
    startDate: '01/06/2017',
    endDate: timeFormat(new Date()),
    title: 'Dutch',
    offsetY: -20,
    description: 'my first time in a language school and I like it',
    detail:
      'I was surprised that school can be fun even if the pressure is not really there. Especially, talking with classmates is great fun. I also made a really good friend. Keep on going!',
    width: 140
  },
  {
    type: 'personal',
    startDate: '01/04/2018',
    endDate: timeFormat(new Date()),
    title: 'Kitchen/Funk Season 1',
    align: 'left',
    offsetY: -40,
    offsetX: 100,
    mobileHidden: true,
    description: 'XLair Radio',
    detail:
      'I started a new monthly radio show with my mate Faestos. The topic is the delicious juicyness of music. To be continued in September 2019',
    width: 120
  }
];
