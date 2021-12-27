const express = require('express');
const app = express();

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const MONGO_URL = "mongodb://localhost";
async function createconnection() {
  return new MongoClient(MONGO_URL).connect();
}

app.use(express.json());
//topics covered, tasks given, students absent(id of the students are mentioned), companies attended ------ everyday
const daily = [
  {
    Date: "2020-09-12T18:30:00.000Z",
    topics: 'placeat sit voluptatibus',
    tasks: 'minima in quasi',
    absent: [21, 87],
    id: '1',
    company: 'Bednar - Wehner'
  },
  {
    Date: "2020-09-13T18:30:00.000Z",
    topics: 'dicta vitae atque',
    tasks: 'placeat et quos',
    absent: [65, 15, 34, 86],
    id: '2',
    company: 'Bins LLC'
  },
  {
    Date: "2020-09-14T18:30:00.000Z",
    topics: 'et necessitatibus itaque',
    tasks: 'enim nobis non',
    absent: [
      4, 20, 33, 42,
      43, 63, 98
    ],
    id: '3',
    company: 'Kemmer and Sons'
  },
  {
    Date: "2020-09-15T18:30:00.000Z",
    topics: 'tempore quos et',
    tasks: 'id omnis ipsum',
    absent: [50, 51, 90],
    id: '4',
    company: 'Gottlieb, Haag and Terry'
  },
  {
    Date: "2020-09-16T18:30:00.000Z",
    topics: 'atque excepturi voluptas',
    tasks: 'iusto ratione officia',
    absent: [7, 41, 43, 56, 71, 90],
    id: '5',
    company: 'Pfannerstill - Baumbach'
  },
  {
    Date: "2020-09-17T18:30:00.000Z",
    topics: 'exercitationem aut est',
    tasks: 'rerum aut qui',
    absent: [
      3, 32, 52, 69,
      73, 75, 94
    ],
    id: '6',
    company: 'Glover and Sons'
  },
  {
    Date: "2020-09-18T18:30:00.000Z",
    topics: 'et qui perferendis',
    tasks: 'esse excepturi est',
    absent: [
      11, 13, 15, 32, 45,
      51, 64, 74, 97
    ],
    id: '7',
    company: 'McGlynn - Hettinger'
  },
  {
    Date: "2020-09-19T18:30:00.000Z",
    topics: 'unde quas quod',
    tasks: 'corrupti provident mollitia',
    absent: [41, 61, 66, 87],
    id: '8',
    company: 'Ortiz and Sons'
  },
  {
    Date: "2020-09-20T18:30:00.000Z",
    topics: 'ut ea rerum',
    tasks: 'vel voluptas molestiae',
    absent: [27, 51, 58, 59, 84],
    id: '9',
    company: 'Weissnat - Larson'
  },
  {
    Date: "2020-09-21T18:30:00.000Z",
    topics: 'iure et beatae',
    tasks: 'quia quia labore',
    absent: [29, 73, 97, 99],
    id: '10',
    company: 'Willms - Willms'
  },
  {
    Date: "2020-09-22T18:30:00.000Z",
    topics: 'dolores sed sint',
    tasks: 'aspernatur ullam a',
    absent: [32, 33, 39, 65, 80, 82],
    id: '11',
    company: 'Brown Group'
  },
  {
    Date: "2020-09-23T18:30:00.000Z",
    topics: 'vitae perspiciatis atque',
    tasks: 'ut qui cupiditate',
    absent: [9, 53, 66, 83, 96, 100],
    id: '12',
    company: 'Heathcote - Will'
  },
  {
    Date: "2020-09-24T18:30:00.000Z",
    topics: 'aspernatur labore eos',
    tasks: 'aut a accusantium',
    absent: [1, 22, 30, 44, 56],
    id: '13',
    company: 'Hayes Inc'
  },
  {
    Date: "2020-09-25T18:30:00.000Z",
    topics: 'rerum quod tenetur',
    tasks: 'modi perspiciatis beatae',
    absent: [
      8, 11, 30, 37, 40,
      46, 49, 51, 56, 81
    ],
    id: '14',
    company: 'Wyman - Rippin'
  },
  {
    Date: "2020-09-26T18:30:00.000Z",
    topics: 'et praesentium debitis',
    tasks: 'inventore illo eveniet',
    absent: [52, 72, 80, 85],
    id: '15',
    company: 'Kreiger, Hills and Prohaska'
  },
  {
    Date: "2020-09-27T18:30:00.000Z",
    topics: 'ut in nesciunt',
    tasks: 'vero quia dignissimos',
    absent: [
      3, 4, 19, 25, 32, 51,
      54, 65, 70, 71, 73, 76,
      97
    ],
    id: '16',
    company: 'Kozey, Simonis and Rath'
  },
  {
    Date: "2020-09-28T18:30:00.000Z",
    topics: 'dolorem dignissimos expedita',
    tasks: 'saepe ipsam harum',
    absent: [
      11, 14, 16, 19, 24, 27, 37,
      43, 44, 45, 51, 56, 59, 69,
      74, 75, 76, 83, 86, 98, 99
    ],
    id: '17',
    company: 'Jast, Klocko and Kerluke'
  },
  {
    Date: "2020-09-29T18:30:00.000Z",
    topics: 'quidem quis quas',
    tasks: 'cupiditate vel fuga',
    absent: [
      10, 19, 36, 41, 43,
      45, 56, 58, 68, 73,
      82, 84
    ],
    id: '18',
    company: 'Terry, Altenwerth and Champlin'
  },
  {
    Date: "2020-09-30T18:30:00.000Z",
    topics: 'blanditiis tenetur illum',
    tasks: 'quia nobis doloremque',
    absent: [
      7, 8, 12, 14, 20, 21, 29,
      30, 44, 59, 70, 71, 73, 77,
      80, 82, 84, 91
    ],
    id: '19',
    company: 'Keeling LLC'
  },
  {
    Date: "2020-09-30T18:30:00.000Z",
    topics: 'quibusdam deleniti quo',
    tasks: 'facilis consequatur odio',
    absent: [
      19, 24, 30, 39,
      52, 65, 71
    ],
    id: '20',
    company: 'Wehner, Runolfsson and Glover'
  },
  {
    Date: "2020-10-01T18:30:00.000Z",
    topics: 'et ut repudiandae',
    tasks: 'veritatis mollitia rerum',
    absent: [12, 31, 50, 65, 72, 90],
    id: '21',
    company: 'Tillman, VonRueden and Sporer'
  },
  {
    Date: "2020-10-02T18:30:00.000Z",
    topics: 'ea officia harum',
    tasks: 'porro et sint',
    absent: [
      10, 13, 27, 33, 40,
      46, 64, 75, 77, 78,
      80, 85
    ],
    id: '22',
    company: 'Crooks, Keebler and Murazik'
  },
  {
    Date: "2020-10-03T18:30:00.000Z",
    topics: 'et accusantium voluptas',
    tasks: 'labore nobis culpa',
    absent: [
      18, 30, 33, 36, 42, 47,
      51, 54, 64, 65, 82, 83,
      95
    ],
    id: '23',
    company: 'Fadel, Medhurst and Sawayn'
  },
  {
    Date: "2020-10-04T18:30:00.000Z",
    topics: 'atque fugiat rerum',
    tasks: 'ullam et sunt',
    absent: [30, 45, 49, 94],
    id: '24',
    company: 'Reichel, Cronin and Nicolas'
  },
  {
    Date: "2020-10-05T18:30:00.000Z",
    topics: 'voluptatem ipsum ut',
    tasks: 'consequatur ea quibusdam',
    absent: [
      4, 7, 29, 52, 55, 58,
      60, 76, 78, 83, 89, 94,
      96
    ],
    id: '25',
    company: 'Morar - Kiehn'
  },
  {
    Date: "2020-10-06T18:30:00.000Z",
    topics: 'eius dolor ad',
    tasks: 'velit dolorum rerum',
    absent: [
      10, 11, 17, 25, 30,
      39, 47, 53, 68, 80,
      100
    ],
    id: '26',
    company: 'Witting and Sons'
  },
  {
    Date: "2020-10-07T18:30:00.000Z",
    topics: 'atque occaecati cumque',
    tasks: 'et ea minus',
    absent: [3, 11, 13, 44, 46, 89],
    id: '27',
    company: 'Lesch - Bogisich'
  },
  {
    Date: "2020-10-08T18:30:00.000Z",
    topics: 'ut aut enim',
    tasks: 'id ut est',
    absent: [
      39, 42, 49, 60,
      83, 93, 98
    ],
    id: '28',
    company: 'Weber LLC'
  },
  {
    Date: "2020-10-09T18:30:00.000Z",
    topics: 'similique asperiores aperiam',
    tasks: 'odio perferendis amet',
    absent: [12, 16, 25, 54],
    id: '29',
    company: 'Ullrich, Jacobs and Nader'
  },
  {
    Date: "2020-10-10T18:30:00.000Z",
    topics: 'optio distinctio ratione',
    tasks: 'consectetur quia sed',
    absent: [
      2, 31, 32, 55,
      59, 63, 68, 98
    ],
    id: '30',
    company: "Bogan, Mohr and O'Reilly"
  },
  {
    Date: "2020-10-11T18:30:00.000Z",
    topics: 'asperiores consequuntur rerum',
    tasks: 'voluptatem voluptate commodi',
    absent: [14, 32, 39, 48, 71, 80],
    id: '31',
    company: 'Medhurst Group'
  },
  {
    Date: "2020-10-12T18:30:00.000Z",
    topics: 'ducimus sint fuga',
    tasks: 'odit in quia',
    absent: [
      5, 57, 74, 75, 81,
      86, 89, 91, 96
    ],
    id: '32',
    company: 'Graham - Crist'
  },
  {
    Date: "2020-10-13T18:30:00.000Z",
    topics: 'autem adipisci aut',
    tasks: 'minima laborum assumenda',
    absent: [27, 28, 47],
    id: '33',
    company: 'Romaguera Inc'
  },
  {
    Date: "2020-10-14T18:30:00.000Z",
    topics: 'quasi commodi dolores',
    tasks: 'est officiis ex',
    absent: [27, 28, 47, 92],
    id: '34',
    company: 'Nader - Gulgowski'
  },
  {
    Date: "2020-10-15T18:30:00.000Z",
    topics: 'eos atque dignissimos',
    tasks: 'unde ut quod',
    absent: [
      15, 41, 47, 52,
      53, 71, 79
    ],
    id: '35',
    company: 'Carroll, Bergnaum and Corwin'
  },
  {
    Date: "2020-10-16T18:30:00.000Z",
    topics: 'labore nihil fugit',
    tasks: 'odit ducimus numquam',
    absent: [18, 26, 69],
    id: '36',
    company: 'Abbott Inc'
  },
  {
    Date: "2020-10-17T18:30:00.000Z",
    topics: 'quo aut repudiandae',
    tasks: 'asperiores rerum et',
    absent: [12, 35, 38, 96],
    id: '37',
    company: 'Rutherford, Strosin and Buckridge'
  },
  {
    Date: "2020-10-18T18:30:00.000Z",
    topics: 'quisquam aliquam asperiores',
    tasks: 'doloremque facilis sit',
    absent: [
      3, 31, 41, 42,
      49, 62, 94
    ],
    id: '38',
    company: 'Hickle, Cole and Sporer'
  },
  {
    Date: "2020-10-19T18:30:00.000Z",
    topics: 'velit in aspernatur',
    tasks: 'aut libero nostrum',
    absent: [6, 8, 10, 23, 89],
    id: '39',
    company: 'DuBuque, Jenkins and Borer'
  },
  {
    Date: "2020-10-20T18:30:00.000Z",
    topics: 'et excepturi perspiciatis',
    tasks: 'aut aut impedit',
    absent: [12, 13, 29, 53],
    id: '40',
    company: 'Keebler, Konopelski and Wehner'
  },
  {
    Date: "2020-10-21T18:30:00.000Z",
    topics: 'ut at nam',
    tasks: 'eos consequatur *****',
    absent: [10, 44, 98],
    id: '41',
    company: 'Altenwerth, Pacocha and Champlin'
  },
  {
    Date: "2020-10-22T18:30:00.000Z",
    topics: 'ex odit voluptas',
    tasks: 'beatae ex quis',
    absent: [
      23, 36, 42, 51, 52, 55,
      60, 66, 68, 72, 78, 85,
      90
    ],
    id: '42',
    company: 'Donnelly Inc'
  },
  {
    Date: "2020-10-23T18:30:00.000Z",
    topics: 'dolor porro accusamus',
    tasks: 'tempora assumenda quia',
    absent: [
      11, 14, 25, 54,
      58, 81, 99
    ],
    id: '43',
    company: "Graham, Gulgowski and O'Kon"
  },
  {
    Date: "2020-10-24T18:30:00.000Z",
    topics: 'aperiam iure et',
    tasks: 'ut natus quae',
    absent: [4, 18, 48, 65, 68, 98],
    id: '44',
    company: 'Conn LLC'
  },
  {
    Date: "2020-10-25T18:30:00.000Z",
    topics: 'autem illum dolore',
    tasks: 'veniam incidunt suscipit',
    absent: [
      3, 20, 26, 29, 37,
      47, 49, 58, 64, 76,
      95, 98
    ],
    id: '45',
    company: 'Murray LLC'
  },
  {
    Date: "2020-10-26T18:30:00.000Z",
    topics: 'ratione qui impedit',
    tasks: 'quas nemo molestiae',
    absent: [
      12, 17, 19, 24, 34, 37, 40,
      45, 50, 53, 61, 62, 65, 67,
      69, 70, 90, 94, 97, 100
    ],
    id: '46',
    company: 'Kuhlman - Smith'
  },
  {
    Date: "2020-10-27T18:30:00.000Z",
    topics: 'fugiat recusandae fuga',
    tasks: 'vel rerum inventore',
    absent: [
      1, 4, 18, 20, 22, 24, 34, 37,
      42, 43, 45, 47, 48, 51, 54, 59,
      60, 77, 79, 81, 84, 86, 97, 99,
      100
    ],
    id: '47',
    company: 'Towne, Grimes and Schneider'
  },
  {
    Date: "2020-10-28T18:30:00.000Z",
    topics: 'sed laudantium ab',
    tasks: 'dolor sed nisi',
    absent: [
      4, 5, 7, 15, 22, 25,
      44, 48, 49, 50, 51, 58,
      80, 82, 97, 98
    ],
    id: '48',
    company: 'Willms Inc'
  },
  {
    Date: "2020-10-29T18:30:00.000Z",
    topics: 'veritatis blanditiis perspiciatis',
    tasks: 'excepturi sed est',
    absent: [
      5, 35, 37, 42,
      43, 58, 62, 87
    ],
    id: '49',
    company: 'Hettinger - Hudson'
  },
  {
    Date: "2020-10-31T18:30:00.000Z",
    topics: 'ab et maiores',
    tasks: 'aut consequuntur perspiciatis',
    absent: [6, 7, 24, 48, 63, 71],
    id: '50',
    company: 'Moen - Herman'
  },
  {
    Date: "2020-11-01T18:30:00.000Z",
    topics: 'distinctio ullam dolores',
    tasks: 'inventore ut velit',
    absent: [39, 41, 42, 51, 57],
    id: '51',
    company: "O'Conner Inc"
  },
  {
    Date: "2020-11-02T18:30:00.000Z",
    topics: 'quia necessitatibus ut',
    tasks: 'magnam dolores quidem',
    absent: [
      8, 36, 39, 44,
      72, 74, 79
    ],
    id: '52',
    company: "O'Connell Group"
  },
  {
    Date: "2020-11-03T18:30:00.000Z",
    topics: 'quia voluptatibus quas',
    tasks: 'nihil et quas',
    absent: [9, 21, 51, 91],
    id: '53',
    company: 'Roberts Inc'
  },
  {
    Date: "2020-11-04T18:30:00.000Z",
    topics: 'voluptatem dolores numquam',
    tasks: 'earum est ex',
    absent: [36, 53, 77, 97],
    id: '54',
    company: 'Oberbrunner - Wolff'
  },
  {
    Date: "2020-11-05T18:30:00.000Z",
    topics: 'dolorem omnis est',
    tasks: 'dignissimos et magni',
    absent: [29, 50, 55],
    id: '55',
    company: "O'Reilly, Sauer and Hilpert"
  },
  {
    Date: "2020-11-06T18:30:00.000Z",
    topics: 'dignissimos vel et',
    tasks: 'eaque aperiam nobis',
    absent: [
      16, 44, 55, 77,
      84, 87, 88, 92
    ],
    id: '56',
    company: 'Luettgen, Blick and Kerluke'
  },
  {
    Date: "2020-11-07T18:30:00.000Z",
    topics: 'non qui vel',
    tasks: 'ut porro possimus',
    absent: [
      1, 6, 20, 21, 27,
      40, 69, 72, 90, 91,
      98
    ],
    id: '57',
    company: 'Leannon and Sons'
  },
  {
    Date: "2020-11-08T18:30:00.000Z",
    topics: 'blanditiis nam nemo',
    tasks: 'eos ducimus tenetur',
    absent: [
      3, 22, 25, 36, 40, 41, 42,
      51, 56, 57, 65, 74, 77, 83,
      84, 89, 90, 99
    ],
    id: '58',
    company: 'Auer Group'
  },
  {
    Date: "2020-11-09T18:30:00.000Z",
    topics: 'quam odit et',
    tasks: 'expedita facere sunt',
    absent: [
      7, 12, 33, 36, 40, 46,
      47, 52, 54, 55, 63, 68,
      72, 95, 96
    ],
    id: '59',
    company: 'Bogan - Parisian'
  },
  {
    Date: "2020-11-10T18:30:00.000Z",
    topics: 'et eveniet totam',
    tasks: 'est quaerat delectus',
    absent: [
      7, 40, 45, 48, 65,
      68, 75, 89, 94, 96
    ],
    id: '60',
    company: 'Abbott - Windler'
  }
];

/*student details(name, photo, email, password), mentor assigned, no.of problems solved by the student in codekata,
   whether the student appeared for pacements or not */
const users = [
  {
    name: 'Rickey Lebsack V',
    image: 'https://cdn.fakercloud.com/avatars/vitorleal_128.jpg',
    email: 'Laura26@gmail.com',
    password: 'GLUrAVnpFrIV3z3',
    mentor: 'Drew Quitzon',
    codekata: 93,
    id: '1',
    appearedForPlacement: false
  },
  {
    name: 'Edwin Goldner',
    image: 'https://cdn.fakercloud.com/avatars/bcrad_128.jpg',
    email: 'Bennett56@yahoo.com',
    password: '95fMKaSfNagxpxw',
    mentor: 'Drew Quitzon',
    codekata: 15,
    id: '2',
    appearedForPlacement: true
  },
  {
    name: 'Leigh Yundt',
    image: 'https://cdn.fakercloud.com/avatars/deviljho__128.jpg',
    email: 'Gladyce.Mueller21@gmail.com',
    password: 'Sj71f_X5K5cQYm0',
    mentor: 'Drew Quitzon',
    codekata: 33,
    id: '3',
    appearedForPlacement: true
  },
  {
    name: 'Hector Lowe',
    image: 'https://cdn.fakercloud.com/avatars/findingjenny_128.jpg',
    email: 'Violet.Emard@gmail.com',
    password: 'TPJiXehnpAuyIRR',
    mentor: 'Drew Quitzon',
    codekata: 61,
    id: '4',
    appearedForPlacement: true
  },
  {
    name: 'Kelly Mraz',
    image: 'https://cdn.fakercloud.com/avatars/luxe_128.jpg',
    email: 'Deron.Wintheiser@hotmail.com',
    password: '71vuGsppUjg_yeT',
    mentor: 'Drew Quitzon',
    codekata: 45,
    id: '5',
    appearedForPlacement: false
  },
  {
    name: 'Maryann Olson',
    image: 'https://cdn.fakercloud.com/avatars/mekal_128.jpg',
    email: 'Angelina.Witting40@yahoo.com',
    password: 'OjZz_inZKmmmVMl',
    mentor: 'Drew Quitzon',
    codekata: 65,
    id: '6',
    appearedForPlacement: false
  },
  {
    name: 'Silvia Hudson',
    image: 'https://cdn.fakercloud.com/avatars/okseanjay_128.jpg',
    email: 'Vernie.Larson@gmail.com',
    password: 'FrTMJ1FTB2gfbyf',
    mentor: 'Drew Quitzon',
    codekata: 56,
    id: '7',
    appearedForPlacement: false
  },
  {
    name: 'Patti Lebsack',
    image: 'https://cdn.fakercloud.com/avatars/mauriolg_128.jpg',
    email: 'Shannon22@yahoo.com',
    password: 'flsE0GgFgR7Syhl',
    mentor: 'Drew Quitzon',
    codekata: 0,
    id: '8',
    appearedForPlacement: false
  },
  {
    name: 'Ruben Ernser III',
    image: 'https://cdn.fakercloud.com/avatars/daykiine_128.jpg',
    email: 'Kitty80@hotmail.com',
    password: 'TI7eY9L_1IXVd_7',
    mentor: 'Drew Quitzon',
    codekata: 11,
    id: '9',
    appearedForPlacement: false
  },
  {
    name: 'Ana Kutch',
    image: 'https://cdn.fakercloud.com/avatars/renbyrd_128.jpg',
    email: 'Eldon82@gmail.com',
    password: 'eS9YEPOTQG0x664',
    mentor: 'Drew Quitzon',
    codekata: 18,
    id: '10',
    appearedForPlacement: false
  },
  {
    name: 'Francis Sauer',
    image: 'https://cdn.fakercloud.com/avatars/davidcazalis_128.jpg',
    email: 'Josianne_Harber@yahoo.com',
    password: 'ZCXY9Po3HdEwJO3',
    mentor: 'Madeline Weimann',
    codekata: 82,
    id: '11',
    appearedForPlacement: true
  },
  {
    name: 'Eleanor Mayert',
    image: 'https://cdn.fakercloud.com/avatars/stayuber_128.jpg',
    email: 'Rodger_Hand62@gmail.com',
    password: 'TukiKN_bVk1YkY_',
    mentor: 'Madeline Weimann',
    codekata: 91,
    id: '12',
    appearedForPlacement: false
  },
  {
    name: 'Ms. Kristi Maggio',
    image: 'https://cdn.fakercloud.com/avatars/nvkznemo_128.jpg',
    email: 'Ubaldo.Stracke84@hotmail.com',
    password: 'EVtnQWKcsZJJtSV',
    mentor: 'Madeline Weimann',
    codekata: 24,
    id: '13',
    appearedForPlacement: false
  },
  {
    name: 'Teresa Gusikowski',
    image: 'https://cdn.fakercloud.com/avatars/mkginfo_128.jpg',
    email: 'Alycia_Funk@gmail.com',
    password: 'HmodkKkSeN60lFY',
    mentor: 'Madeline Weimann',
    codekata: 71,
    id: '14',
    appearedForPlacement: false
  },
  {
    name: 'Randall Schuster MD',
    image: 'https://cdn.fakercloud.com/avatars/colirpixoil_128.jpg',
    email: 'Meghan_Goyette@hotmail.com',
    password: 'pqTvlpiUNyuopY6',
    mentor: 'Madeline Weimann',
    codekata: 19,
    id: '15',
    appearedForPlacement: false
  },
  {
    name: 'Rogelio Greenfelder',
    image: 'https://cdn.fakercloud.com/avatars/marrimo_128.jpg',
    email: 'Owen32@yahoo.com',
    password: 'kt7ESR4mZFSwYxh',
    mentor: 'Madeline Weimann',
    codekata: 44,
    id: '16',
    appearedForPlacement: true
  },
  {
    name: 'Cory Larson DDS',
    image: 'https://cdn.fakercloud.com/avatars/martip07_128.jpg',
    email: 'Phoebe19@yahoo.com',
    password: 'jYvJb8DAYP7ok1o',
    mentor: 'Madeline Weimann',
    codekata: 1,
    id: '17',
    appearedForPlacement: false
  },
  {
    name: 'Norma Crooks',
    image: 'https://cdn.fakercloud.com/avatars/elenadissi_128.jpg',
    email: 'Erica35@gmail.com',
    password: 'RnSBNvU5bmfOtyI',
    mentor: 'Madeline Weimann',
    codekata: 22,
    id: '18',
    appearedForPlacement: true
  },
  {
    name: 'Colleen Kemmer',
    image: 'https://cdn.fakercloud.com/avatars/jehnglynn_128.jpg',
    email: 'Jaquelin.Willms@yahoo.com',
    password: '7yFhZODf1VhubA2',
    mentor: 'Madeline Weimann',
    codekata: 25,
    id: '19',
    appearedForPlacement: false
  },
  {
    name: 'Esther Turner',
    image: 'https://cdn.fakercloud.com/avatars/xripunov_128.jpg',
    email: 'Derick46@gmail.com',
    password: 'cVAHXlSpnsu7bIp',
    mentor: 'Madeline Weimann',
    codekata: 53,
    id: '20',
    appearedForPlacement: true
  },
  {
    name: 'Hubert Halvorson',
    image: 'https://cdn.fakercloud.com/avatars/yigitpinarbasi_128.jpg',
    email: 'Rupert88@yahoo.com',
    password: 'Q7lvwRw5YRqyiqr',
    mentor: 'Madeline Weimann',
    codekata: 6,
    id: '21',
    appearedForPlacement: false
  },
  {
    name: 'Patsy Willms',
    image: 'https://cdn.fakercloud.com/avatars/marcusgorillius_128.jpg',
    email: 'Genoveva.Feil21@gmail.com',
    password: 'HVJoK4Ri4bnsGmN',
    mentor: 'Madeline Weimann',
    codekata: 17,
    id: '22',
    appearedForPlacement: false
  },
  {
    name: 'Virginia Johnson',
    image: 'https://cdn.fakercloud.com/avatars/tristanlegros_128.jpg',
    email: 'Martin2@yahoo.com',
    password: 'NtOt6q8ljnKTmqT',
    mentor: 'Madeline Weimann',
    codekata: 82,
    id: '23',
    appearedForPlacement: false
  },
  {
    name: "Rick O'Hara",
    image: 'https://cdn.fakercloud.com/avatars/ashocka18_128.jpg',
    email: 'Edmond_Kulas73@hotmail.com',
    password: 'wz93vyRukEiIPpN',
    mentor: 'Madeline Weimann',
    codekata: 52,
    id: '24',
    appearedForPlacement: false
  },
  {
    name: 'Thelma Boehm',
    image: 'https://cdn.fakercloud.com/avatars/eduardostuart_128.jpg',
    email: 'Randi_Marks48@yahoo.com',
    password: 'iGodv6H7iqt1AiB',
    mentor: 'Pete Moen',
    codekata: 59,
    id: '25',
    appearedForPlacement: false
  },
  {
    name: 'Gregg Miller',
    image: 'https://cdn.fakercloud.com/avatars/yalozhkin_128.jpg',
    email: 'Marion.Hilll91@hotmail.com',
    password: '9qr55D5MS4vs6rt',
    mentor: 'Pete Moen',
    codekata: 25,
    id: '26',
    appearedForPlacement: false
  },
  {
    name: 'Michelle Feil',
    image: 'https://cdn.fakercloud.com/avatars/gregrwilkinson_128.jpg',
    email: 'Josefa66@gmail.com',
    password: 'Dyw7VejigOUPQ2L',
    mentor: 'Pete Moen',
    codekata: 22,
    id: '27',
    appearedForPlacement: false
  },
  {
    name: 'Tami Goyette',
    image: 'https://cdn.fakercloud.com/avatars/gearpixels_128.jpg',
    email: 'Theresa_Cruickshank@gmail.com',
    password: 'CdThRWPmV4ZIUzW',
    mentor: 'Pete Moen',
    codekata: 57,
    id: '28',
    appearedForPlacement: true
  },
  {
    name: 'Edmond Senger',
    image: 'https://cdn.fakercloud.com/avatars/belyaev_rs_128.jpg',
    email: 'Keira_Monahan50@hotmail.com',
    password: '3_7hsSXNJIpe5ut',
    mentor: 'Pete Moen',
    codekata: 71,
    id: '29',
    appearedForPlacement: true
  },
  {
    name: 'Ms. Amber Heller',
    image: 'https://cdn.fakercloud.com/avatars/webtanya_128.jpg',
    email: 'Joe_Nitzsche@hotmail.com',
    password: 'pJvCbzj_4sFd7yr',
    mentor: 'Pete Moen',
    codekata: 6,
    id: '30',
    appearedForPlacement: true
  },
  {
    name: 'Sandy Ortiz',
    image: 'https://cdn.fakercloud.com/avatars/sweetdelisa_128.jpg',
    email: 'Garnett.Russel@gmail.com',
    password: '4Omv90AGtd12CY_',
    mentor: 'Pete Moen',
    codekata: 46,
    id: '31',
    appearedForPlacement: false
  },
  {
    name: 'Jody Dooley',
    image: 'https://cdn.fakercloud.com/avatars/stefvdham_128.jpg',
    email: 'Telly24@yahoo.com',
    password: 'It0xta70GfiAr14',
    mentor: 'Pete Moen',
    codekata: 65,
    id: '32',
    appearedForPlacement: true
  },
  {
    name: 'Dawn Schaefer III',
    image: 'https://cdn.fakercloud.com/avatars/lepinski_128.jpg',
    email: 'Jules.Padberg@hotmail.com',
    password: '7EtqY21K6UpnsI3',
    mentor: 'Pete Moen',
    codekata: 83,
    id: '33',
    appearedForPlacement: false
  },
  {
    name: 'Bert Orn',
    image: 'https://cdn.fakercloud.com/avatars/msveet_128.jpg',
    email: 'Libby36@hotmail.com',
    password: 'NC3FSzCG9CKAJO4',
    mentor: 'Pete Moen',
    codekata: 17,
    id: '34',
    appearedForPlacement: true
  },
  {
    name: 'Lewis Green',
    image: 'https://cdn.fakercloud.com/avatars/gusoto_128.jpg',
    email: 'Frankie_Graham18@yahoo.com',
    password: 'WnMph8trrAgbo1B',
    mentor: 'Pete Moen',
    codekata: 53,
    id: '35',
    appearedForPlacement: true
  },
  {
    name: 'Marvin Reilly',
    image: 'https://cdn.fakercloud.com/avatars/greenbes_128.jpg',
    email: 'Nova_Cassin@gmail.com',
    password: 'gnI3HyWIc7ZLhkd',
    mentor: 'Pete Moen',
    codekata: 74,
    id: '36',
    appearedForPlacement: false
  },
  {
    name: 'Lydia Stracke',
    image: 'https://cdn.fakercloud.com/avatars/jeremymouton_128.jpg',
    email: 'Ellis33@yahoo.com',
    password: 'A00ckIm056JCNQh',
    mentor: 'Pete Moen',
    codekata: 88,
    id: '37',
    appearedForPlacement: false
  },
  {
    name: 'Wanda Kautzer',
    image: 'https://cdn.fakercloud.com/avatars/shadeed9_128.jpg',
    email: 'Vilma51@yahoo.com',
    password: 'eMN2aROWALwZbhM',
    mentor: 'Pete Moen',
    codekata: 67,
    id: '38',
    appearedForPlacement: true
  },
  {
    name: 'Lonnie Murray',
    image: 'https://cdn.fakercloud.com/avatars/wintopia_128.jpg',
    email: 'Georgiana.Conroy@gmail.com',
    password: 'UIzxA4n4lk2Y2RE',
    mentor: 'Pete Moen',
    codekata: 67,
    id: '39',
    appearedForPlacement: true
  },
  {
    name: 'Blake Bradtke',
    image: 'https://cdn.fakercloud.com/avatars/leonfedotov_128.jpg',
    email: 'Jalon_Rempel@yahoo.com',
    password: 'gvX7TAAQgQC7_LY',
    mentor: 'Pete Moen',
    codekata: 50,
    id: '40',
    appearedForPlacement: true
  },
  {
    name: 'Kayla Schroeder',
    image: 'https://cdn.fakercloud.com/avatars/dhooyenga_128.jpg',
    email: 'Eda70@yahoo.com',
    password: '8uX0Npu7QRYXSmf',
    mentor: 'Mrs. Shawn Nikolaus',
    codekata: 41,
    id: '41',
    appearedForPlacement: true
  },
  {
    name: 'Daisy Prohaska',
    image: 'https://cdn.fakercloud.com/avatars/anatolinicolae_128.jpg',
    email: 'Eulah_OReilly@yahoo.com',
    password: 'pNk_NZKRKzp7maV',
    mentor: 'Mrs. Shawn Nikolaus',
    codekata: 26,
    id: '42',
    appearedForPlacement: true
  },
  {
    name: 'Jessie Kub',
    image: 'https://cdn.fakercloud.com/avatars/mkginfo_128.jpg',
    email: 'Eloisa_Hermiston97@yahoo.com',
    password: 'uUz0vEdvWpvcyNa',
    mentor: 'Mrs. Shawn Nikolaus',
    codekata: 59,
    id: '43',
    appearedForPlacement: false
  },
  {
    name: 'Rex Wilderman',
    image: 'https://cdn.fakercloud.com/avatars/antonyzotov_128.jpg',
    email: 'Hortense.Sauer72@hotmail.com',
    password: 'cNkTFZ7Y2MlpyOG',
    mentor: 'Mrs. Shawn Nikolaus',
    codekata: 17,
    id: '44',
    appearedForPlacement: false
  },
  {
    name: 'Jonathon Kirlin',
    image: 'https://cdn.fakercloud.com/avatars/ariil_128.jpg',
    email: 'Tiffany_Fritsch@hotmail.com',
    password: 'hpwmQGdsB9G2mk1',
    mentor: 'Mrs. Shawn Nikolaus',
    codekata: 35,
    id: '45',
    appearedForPlacement: false
  },
  {
    name: 'Jasmine Predovic',
    image: 'https://cdn.fakercloud.com/avatars/borantula_128.jpg',
    email: 'Meta80@hotmail.com',
    password: 'lximCNbPR1jzVW8',
    mentor: 'Mrs. Shawn Nikolaus',
    codekata: 94,
    id: '46',
    appearedForPlacement: true
  },
  {
    name: 'Willie Wintheiser',
    image: 'https://cdn.fakercloud.com/avatars/gregrwilkinson_128.jpg',
    email: 'Berniece70@yahoo.com',
    password: 'UNhFjtF19cFnvMg',
    mentor: 'Mrs. Shawn Nikolaus',
    codekata: 12,
    id: '47',
    appearedForPlacement: false
  },
  {
    name: 'Pat Macejkovic',
    image: 'https://cdn.fakercloud.com/avatars/dallasbpeters_128.jpg',
    email: 'Lenny76@yahoo.com',
    password: 'VffT9sBccZTzyh8',
    mentor: 'Mrs. Shawn Nikolaus',
    codekata: 72,
    id: '48',
    appearedForPlacement: true
  },
  {
    name: 'Denise Howe',
    image: 'https://cdn.fakercloud.com/avatars/joelcipriano_128.jpg',
    email: 'Trenton.Jacobs@hotmail.com',
    password: 'V5XbrvuYZqDc2PJ',
    mentor: 'Mrs. Shawn Nikolaus',
    codekata: 11,
    id: '49',
    appearedForPlacement: true
  },
  {
    name: 'Mr. Lucia Rice',
    image: 'https://cdn.fakercloud.com/avatars/loganjlambert_128.jpg',
    email: 'Francesco58@gmail.com',
    password: '4NEsfiDJMMCdVZt',
    mentor: 'Mrs. Shawn Nikolaus',
    codekata: 83,
    id: '50',
    appearedForPlacement: true
  },
  {
    name: 'Jared Harber',
    image: 'https://cdn.fakercloud.com/avatars/vonachoo_128.jpg',
    email: 'Lina_Kozey@gmail.com',
    password: 'jfRiD6ReaoJTHfC',
    mentor: 'Mrs. Shawn Nikolaus',
    codekata: 87,
    id: '51',
    appearedForPlacement: false
  },
  {
    name: 'Mrs. Kari Bauch',
    image: 'https://cdn.fakercloud.com/avatars/pechkinator_128.jpg',
    email: 'Marlee_Crona99@hotmail.com',
    password: 'IOJOnrwJHTBIFIb',
    mentor: 'Mrs. Shawn Nikolaus',
    codekata: 53,
    id: '52',
    appearedForPlacement: false
  },
  {
    name: 'Mandy Farrell',
    image: 'https://cdn.fakercloud.com/avatars/n1ght_coder_128.jpg',
    email: 'Lambert.Deckow@hotmail.com',
    password: 'te7PuJdMCLhcG9x',
    mentor: 'Sylvia Mann',
    codekata: 33,
    id: '53',
    appearedForPlacement: false
  },
  {
    name: 'Malcolm Senger',
    image: 'https://cdn.fakercloud.com/avatars/gavr1l0_128.jpg',
    email: 'Travis.Waelchi90@hotmail.com',
    password: 'qXvIW_Nzc1AlE1t',
    mentor: 'Sylvia Mann',
    codekata: 12,
    id: '54',
    appearedForPlacement: true
  },
  {
    name: 'Emily Douglas',
    image: 'https://cdn.fakercloud.com/avatars/jlsolerdeltoro_128.jpg',
    email: 'Edna_Rohan50@yahoo.com',
    password: '_q2oMVzY2NIj9UD',
    mentor: 'Sylvia Mann',
    codekata: 48,
    id: '55',
    appearedForPlacement: true
  },
  {
    name: 'Amy Herman',
    image: 'https://cdn.fakercloud.com/avatars/anjhero_128.jpg',
    email: 'Emilia.Rolfson@hotmail.com',
    password: 'j0CUSdAxOokdo5s',
    mentor: 'Sylvia Mann',
    codekata: 19,
    id: '56',
    appearedForPlacement: false
  },
  {
    name: 'Marion Larkin',
    image: 'https://cdn.fakercloud.com/avatars/creartinc_128.jpg',
    email: 'Rolando_Howell41@hotmail.com',
    password: 'w1y7Dt8V4zE73bx',
    mentor: 'Sylvia Mann',
    codekata: 29,
    id: '57',
    appearedForPlacement: true
  },
  {
    name: 'Ron Kulas',
    image: 'https://cdn.fakercloud.com/avatars/davidcazalis_128.jpg',
    email: 'Aracely_Lynch87@yahoo.com',
    password: 'hYxnz8Y8HSBA6Jh',
    mentor: 'Sylvia Mann',
    codekata: 28,
    id: '58',
    appearedForPlacement: true
  },
  {
    name: 'Nicole Muller',
    image: 'https://cdn.fakercloud.com/avatars/linkibol_128.jpg',
    email: 'Katelin.McGlynn@yahoo.com',
    password: 'OnzXhO1uPp7RH_E',
    mentor: 'Sylvia Mann',
    codekata: 71,
    id: '59',
    appearedForPlacement: true
  },
  {
    name: 'Tracy Rau',
    image: 'https://cdn.fakercloud.com/avatars/dimaposnyy_128.jpg',
    email: 'Florine_Abernathy86@gmail.com',
    password: '8XBDF7tIGJI2F1A',
    mentor: 'Sylvia Mann',
    codekata: 42,
    id: '60',
    appearedForPlacement: true
  },
  {
    name: 'Willis Kemmer',
    image: 'https://cdn.fakercloud.com/avatars/nyancecom_128.jpg',
    email: 'Ivory44@yahoo.com',
    password: 'ZNa6BL57HF3eiLd',
    mentor: 'Sylvia Mann',
    codekata: 28,
    id: '61',
    appearedForPlacement: false
  },
  {
    name: 'Luz Adams',
    image: 'https://cdn.fakercloud.com/avatars/carlosgavina_128.jpg',
    email: 'Monte_Dickinson51@gmail.com',
    password: '2krTmE0bCGOeZZU',
    mentor: 'Sylvia Mann',
    codekata: 90,
    id: '62',
    appearedForPlacement: true
  },
  {
    name: 'Sherry Windler',
    image: 'https://cdn.fakercloud.com/avatars/sasha_shestakov_128.jpg',
    email: 'Rafaela98@gmail.com',
    password: 'Dvlyecnx2lnmZmu',
    mentor: 'Sylvia Mann',
    codekata: 35,
    id: '63',
    appearedForPlacement: true
  },
  {
    name: 'Maria Hammes',
    image: 'https://cdn.fakercloud.com/avatars/javorszky_128.jpg',
    email: 'Easter90@gmail.com',
    password: 'Ug9M2RUxKmDG8Qe',
    mentor: 'Sylvia Mann',
    codekata: 90,
    id: '64',
    appearedForPlacement: true
  },
  {
    name: 'Ebony Kreiger',
    image: 'https://cdn.fakercloud.com/avatars/YoungCutlass_128.jpg',
    email: 'Jalen.Tromp1@hotmail.com',
    password: '9pdWUL4N28YYCrG',
    mentor: 'Sylvia Mann',
    codekata: 75,
    id: '65',
    appearedForPlacement: false
  },
  {
    name: 'Miss Ed Rutherford',
    image: 'https://cdn.fakercloud.com/avatars/unterdreht_128.jpg',
    email: 'Cyrus.Becker@gmail.com',
    password: 'vlyl19lbu7mlylr',
    mentor: 'Sylvia Mann',
    codekata: 80,
    id: '66',
    appearedForPlacement: false
  },
  {
    name: 'Elsie Wunsch',
    image: 'https://cdn.fakercloud.com/avatars/buryaknick_128.jpg',
    email: 'Evalyn_Swift49@hotmail.com',
    password: 'peLGF1F6jCyNtLz',
    mentor: 'Sylvia Mann',
    codekata: 8,
    id: '67',
    appearedForPlacement: true
  },
  {
    name: 'Hope Runolfsdottir',
    image: 'https://cdn.fakercloud.com/avatars/panghal0_128.jpg',
    email: 'Clare95@yahoo.com',
    password: 'LLtF4jGmN6fLcsN',
    mentor: 'Sylvia Mann',
    codekata: 44,
    id: '68',
    appearedForPlacement: false
  },
  {
    name: 'Connie Gutmann',
    image: 'https://cdn.fakercloud.com/avatars/beweinreich_128.jpg',
    email: 'Jaeden_Mayer37@hotmail.com',
    password: 'LnWCEZJb7lfZQDC',
    mentor: 'Sylvia Mann',
    codekata: 10,
    id: '69',
    appearedForPlacement: true
  },
  {
    name: 'Ms. Jay Block',
    image: 'https://cdn.fakercloud.com/avatars/mocabyte_128.jpg',
    email: 'Liliane_Hammes22@gmail.com',
    password: 'gAbr5mMCy7q4HTD',
    mentor: 'Sylvia Mann',
    codekata: 86,
    id: '70',
    appearedForPlacement: true
  },
  {
    name: 'Roberta Kautzer',
    image: 'https://cdn.fakercloud.com/avatars/constantx_128.jpg',
    email: 'Janae20@yahoo.com',
    password: 'qYu7EMkISFAuL9c',
    mentor: 'Sylvia Mann',
    codekata: 49,
    id: '71',
    appearedForPlacement: false
  },
  {
    name: "Dianne O'Keefe",
    image: 'https://cdn.fakercloud.com/avatars/yesmeck_128.jpg',
    email: 'Simeon.Hane11@yahoo.com',
    password: 'T7i8Z2fRhgMhbE0',
    mentor: 'Sylvia Mann',
    codekata: 1,
    id: '72',
    appearedForPlacement: true
  },
  {
    name: 'Emilio Hand',
    image: 'https://cdn.fakercloud.com/avatars/BrianPurkiss_128.jpg',
    email: 'Vena69@hotmail.com',
    password: 'R0gSwsRoDGoDufb',
    mentor: 'Grace Batz',
    codekata: 85,
    id: '73',
    appearedForPlacement: false
  },
  {
    name: 'Sophie Wiegand',
    image: 'https://cdn.fakercloud.com/avatars/bublienko_128.jpg',
    email: 'Agnes.Spinka60@hotmail.com',
    password: 'wgVjlbpbaChO4px',
    mentor: 'Grace Batz',
    codekata: 54,
    id: '74',
    appearedForPlacement: false
  },
  {
    name: 'Inez Harvey',
    image: 'https://cdn.fakercloud.com/avatars/caseycavanagh_128.jpg',
    email: 'Alta_Schuster@yahoo.com',
    password: 'TnckIb5po1yuG0f',
    mentor: 'Grace Batz',
    codekata: 79,
    id: '75',
    appearedForPlacement: false
  },
  {
    name: 'Guy Davis DVM',
    image: 'https://cdn.fakercloud.com/avatars/ionuss_128.jpg',
    email: 'Lucie32@gmail.com',
    password: '4iD70HjyJyLlZ6a',
    mentor: 'Grace Batz',
    codekata: 70,
    id: '76',
    appearedForPlacement: true
  },
  {
    name: 'Nancy Moore',
    image: 'https://cdn.fakercloud.com/avatars/collegeman_128.jpg',
    email: 'Liam.Robel@gmail.com',
    password: 'YhDWCED9753EMi2',
    mentor: 'Grace Batz',
    codekata: 42,
    id: '77',
    appearedForPlacement: true
  },
  {
    name: 'Norma Bosco',
    image: 'https://cdn.fakercloud.com/avatars/id835559_128.jpg',
    email: 'Alexandre99@hotmail.com',
    password: 'gH27MJJMQn3Oujs',
    mentor: 'Grace Batz',
    codekata: 51,
    id: '78',
    appearedForPlacement: true
  },
  {
    name: 'Gregory Harber',
    image: 'https://cdn.fakercloud.com/avatars/aiiaiiaii_128.jpg',
    email: 'Earnest.Becker@gmail.com',
    password: 'QzVSCWeMccntWzR',
    mentor: 'Grace Batz',
    codekata: 22,
    id: '79',
    appearedForPlacement: false
  },
  {
    name: 'Lucille Homenick',
    image: 'https://cdn.fakercloud.com/avatars/cdavis565_128.jpg',
    email: 'Palma.Jones17@gmail.com',
    password: 'sTPdjYGT36cmm3l',
    mentor: 'Grace Batz',
    codekata: 2,
    id: '80',
    appearedForPlacement: true
  },
  {
    name: 'Chester Hirthe',
    image: 'https://cdn.fakercloud.com/avatars/matt3224_128.jpg',
    email: 'Amber36@hotmail.com',
    password: 'dHIvyK9FL1MIidq',
    mentor: 'Grace Batz',
    codekata: 60,
    id: '81',
    appearedForPlacement: true
  },
  {
    name: 'Edwin Kemmer',
    image: 'https://cdn.fakercloud.com/avatars/slowspock_128.jpg',
    email: 'Matilde_Beier@gmail.com',
    password: 'Zeb3dyfbVtxjnqZ',
    mentor: 'Grace Batz',
    codekata: 11,
    id: '82',
    appearedForPlacement: false
  },
  {
    name: 'Ellis Schiller',
    image: 'https://cdn.fakercloud.com/avatars/joshmedeski_128.jpg',
    email: 'Rachelle.Mayer55@gmail.com',
    password: 'kJf8TjwMd0TY6hm',
    mentor: 'Dustin Tremblay',
    codekata: 41,
    id: '83',
    appearedForPlacement: false
  },
  {
    name: 'Francis Friesen',
    image: 'https://cdn.fakercloud.com/avatars/joki4_128.jpg',
    email: 'Jace_Rutherford14@hotmail.com',
    password: 'ybTF1AuUno5__nU',
    mentor: 'Dustin Tremblay',
    codekata: 91,
    id: '84',
    appearedForPlacement: false
  },
  {
    name: 'Miriam Zulauf',
    image: 'https://cdn.fakercloud.com/avatars/maiklam_128.jpg',
    email: 'Clementine_MacGyver23@yahoo.com',
    password: '9SydN4NbE3qdfSb',
    mentor: 'Dustin Tremblay',
    codekata: 0,
    id: '85',
    appearedForPlacement: false
  },
  {
    name: 'Dr. Charlotte Lakin',
    image: 'https://cdn.fakercloud.com/avatars/sasha_shestakov_128.jpg',
    email: 'Esther39@yahoo.com',
    password: 'doZ1BW3Bn9YR4C_',
    mentor: 'Dustin Tremblay',
    codekata: 37,
    id: '86',
    appearedForPlacement: true
  },
  {
    name: 'Gene Hane',
    image: 'https://cdn.fakercloud.com/avatars/findingjenny_128.jpg',
    email: 'Harley_Beier@hotmail.com',
    password: 'hIM3_o_lV6P1xxt',
    mentor: 'Dustin Tremblay',
    codekata: 41,
    id: '87',
    appearedForPlacement: false
  },
  {
    name: 'Salvador Armstrong I',
    image: 'https://cdn.fakercloud.com/avatars/nbirckel_128.jpg',
    email: 'Pansy89@yahoo.com',
    password: 'CZZs6VqCWkqL4uD',
    mentor: 'Dustin Tremblay',
    codekata: 53,
    id: '88',
    appearedForPlacement: false
  },
  {
    name: 'Stephen Bahringer',
    image: 'https://cdn.fakercloud.com/avatars/eugeneeweb_128.jpg',
    email: 'Alexandro_Lowe@gmail.com',
    password: 'uO_rufZMMn3jLDW',
    mentor: 'Dustin Tremblay',
    codekata: 3,
    id: '89',
    appearedForPlacement: false
  },
  {
    name: 'Nicolas Gutmann',
    image: 'https://cdn.fakercloud.com/avatars/buryaknick_128.jpg',
    email: 'Ardith_Haley45@yahoo.com',
    password: 'uPPmISPxzNrV7YJ',
    mentor: 'Dustin Tremblay',
    codekata: 68,
    id: '90',
    appearedForPlacement: false
  },
  {
    name: 'Javier Wolff',
    image: 'https://cdn.fakercloud.com/avatars/catarino_128.jpg',
    email: 'Virgie.Carroll@hotmail.com',
    password: 'ZyGnEdUDG7KEOUK',
    mentor: 'Dustin Tremblay',
    codekata: 26,
    id: '91',
    appearedForPlacement: true
  },
  {
    name: 'Brooke Abernathy III',
    image: 'https://cdn.fakercloud.com/avatars/knilob_128.jpg',
    email: 'Emmanuel.Zieme78@gmail.com',
    password: 'XKr3QKfmzHJ0jwA',
    mentor: 'Dustin Tremblay',
    codekata: 78,
    id: '92',
    appearedForPlacement: false
  },
  {
    name: 'Susan Lynch',
    image: 'https://cdn.fakercloud.com/avatars/marclgonzales_128.jpg',
    email: 'Amiya_Lockman@yahoo.com',
    password: '2DMdVhK2F_kjGKe',
    mentor: 'Dustin Tremblay',
    codekata: 18,
    id: '93',
    appearedForPlacement: false
  },
  {
    name: 'Mrs. Shelly Stanton',
    image: 'https://cdn.fakercloud.com/avatars/ky_128.jpg',
    email: 'Izaiah_Hintz47@hotmail.com',
    password: 'MRZ81UFfen43v4h',
    mentor: 'Dustin Tremblay',
    codekata: 28,
    id: '94',
    appearedForPlacement: false
  },
  {
    name: 'Mrs. Rachael Aufderhar',
    image: 'https://cdn.fakercloud.com/avatars/ryanmclaughlin_128.jpg',
    email: 'Jasen31@yahoo.com',
    password: 'Y6mk1sAf48GrETT',
    mentor: 'Dustin Tremblay',
    codekata: 66,
    id: '95',
    appearedForPlacement: false
  },
  {
    name: 'Catherine Leannon',
    image: 'https://cdn.fakercloud.com/avatars/rmlewisuk_128.jpg',
    email: 'Nicole_Predovic67@gmail.com',
    password: 'iukZstjvU8SHTiy',
    mentor: 'Dustin Tremblay',
    codekata: 94,
    id: '96',
    appearedForPlacement: true
  },
  {
    name: 'Cynthia Reichert',
    image: 'https://cdn.fakercloud.com/avatars/BillSKenney_128.jpg',
    email: 'Sonia_Klein@gmail.com',
    password: 'SXbGBn8sDDK5D_q',
    mentor: 'Dustin Tremblay',
    codekata: 76,
    id: '97',
    appearedForPlacement: true
  },
  {
    name: 'Mattie Hegmann',
    image: 'https://cdn.fakercloud.com/avatars/andysolomon_128.jpg',
    email: 'Elsa.Upton@hotmail.com',
    password: 'Reg01ddyEspwUQ1',
    mentor: 'Dustin Tremblay',
    codekata: 15,
    id: '98',
    appearedForPlacement: true
  },
  {
    name: 'Bobby Von',
    image: 'https://cdn.fakercloud.com/avatars/_scottburgess_128.jpg',
    email: 'Toby.Shields84@gmail.com',
    password: 'ujkeel02vrJqXSq',
    mentor: 'Dustin Tremblay',
    codekata: 44,
    id: '99',
    appearedForPlacement: false
  },
  {
    name: 'Dr. Jana Carter',
    image: 'https://cdn.fakercloud.com/avatars/ccinojasso1_128.jpg',
    email: 'Esta.Ratke78@hotmail.com',
    password: 'BVKLGKmDCxhjs4w',
    mentor: 'Dustin Tremblay',
    codekata: 86,
    id: '100',
    appearedForPlacement: true
  }
];



//posting the data
app.post("/", async (request, response) => {
  const userData = request.body;
  const client = await createconnection();
  const result1 = await client.db("zen").collection("dailydata").insertMany(daily);
  const result2 = await client.db("zen").collection("usersdata").insertMany(users);
  response.send([result1, result2]);
})
//the topics and tasks which are thought in the month of October
app.get("/taskntopic", async (request, response) => {
  const client = await createconnection();
  const result = await client.db("zen").collection("dailydata")
    .aggregate([
      {
        $match: {
          Date: {
            $gte: "2020-10-01T18:30:00.000Z",
            $lte: "2020-10-31T18:30:00.000Z"
          }
        }
      },
      {
        $project: {
          Date: 1,
          topics: 1,
          tasks: 1
        }
      }
    ])
    .toArray();

  response.send(result);
})
//the company drives which appeared between 15 oct-2020 and 31-oct-2020
app.get("/companies-oct-15-30", async (request, response) => {
  const client = await createconnection();
  const result = await client.db("zen").collection("dailydata")
    .aggregate([
      {
        $match: {
          Date: {
            $gte: "2020-10-15T18:30:00.000Z",
            $lte: "2020-10-31T18:30:00.000Z"
          }
        }
      },
      {
        $project: {
          Date: 1,
          company: 1
        }
      }
    ])
    .toArray();
  response.send(result);
})

//the company drives and students who are appeared for the placement
app.get("/companies-students", async (request, response) => {
  const client = await createconnection();
  const result1 = await client.db("zen").collection("dailydata")
    .aggregate([
      {
        $project: {
          company: 1,
          _id: 0
        }
      }
    ])
    .toArray();
  const result2 = await client.db("zen").collection("usersdata")
    .aggregate([
      {
        $match: {
          appearedForPlacement: true
        }
      },
      {
        $project: {
          name: 1,
          _id: 0
        }
      }
    ])
    .toArray();
  let result1array = result1.map((obj) => obj.company);
  let result2array = result2.map((obj) => obj.name);
  response.send([`companies: [${result1array}]`, `students: [${result2array}]`]);
})
//number of problems solved by the user in codekata
app.get("/codekata", async (request, response) => {
  const client = await createconnection();
  const result = await client.db("zen").collection("usersdata")
    .aggregate([
      {
        $project: {
          name: 1,
          codekata: 1,
          _id: 0
        }
      }
    ])
    .toArray();
  response.send(result);
});
//the mentors with who has the mentee's count more than 15
app.get("/mentee-gt-15", async (request, response) => {
  const client = await createconnection();
  const result = await client.db("zen").collection("usersdata")
    .aggregate([{
      $group: {
        _id: "$mentor",
        count: {
          $sum: 1
        }
      }
    },
    {
      $match: {
        count: {
          $gt: 15
        }
      }
    },
    {
      $project: {
        mentee: "$_id",
        _id: 0,
        menteeCount: "$count"
      }
    }])
    .toArray();
  response.send(result);
});
//number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020
app.get("/absentees", async (request, response) => {
  const client = await createconnection();
  const result = await client.db("zen").collection("dailydata")
    .aggregate([
      {
        $match: {
          Date: {
            $gte: "2020-10-15T18:30:00.000Z",
            $lte: "2020-10-31T18:30:00.000Z"
          }
        }
      },
      {
        "$unwind": "$absent"
      },
      {
        $group: {
          _id: "$Date",
          absentees: {
            "$sum": 1
          }
        }
      },
      {
        $project: {
          date: "$_id",
          absentees: 1,
          _id: 0
        }
      },
      {
        $sort: {
          date: 1
        }
      }
    ])
    .toArray();
  response.send(result);
});
app.listen(6000, () => console.log("The server is started"));
