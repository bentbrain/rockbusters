function Artists() {
  const artists = [
    "112",
    "21 Savage",
    "24kGoldn",
    "50 Cent",
    "6ix9ine",
    "98 Degrees",
    "A Taste of Honey",
    "a-ha",
    "Aaliyah",
    "ABBA",
    "AC/DC",
    "Ace of Base",
    "Adassa",
    "Adele",
    "Aerosmith",
    "Afrojack",
    "Air Supply",
    "Akon",
    "Al Green",
    "Al Wilson",
    "Alan O'Day",
    "Alannah Myles",
    "Ali",
    "Alice Cooper",
    "Alicia Keys",
    "All-4-One",
    "Amadou and Mariam",
    "America",
    "Amii Stewart",
    "Amy Grant",
    "Anderson .Paak",
    "Andy Gibb",
    "Andy Kim",
    "Andy Williams",
    "Anita Ward",
    "Anne Murray",
    "April Stevens",
    "Arcade Fire",
    "Archie Bell & the Drells",
    "Aretha Franklin",
    "Ariana Grande",
    "Art Garfunkel",
    "Ashanti",
    "Atlantic Starr",
    "Atomic Kitten",
    "Average White Band",
    "Avril Lavigne",
    "B. J. Thomas",
    "B.o.B.",
    "B2K",
    "Baauer",
    "Bachman-Turner Overdrive",
    "Bad Bunny",
    "Bad English",
    "Bananarama",
    "Barbra Streisand",
    "Barenaked Ladies",
    "Barry Manilow",
    "Barry McGuire",
    "Barry White",
    "Bay City Rollers",
    "Bee Gees",
    "Belinda Carlisle",
    "Berlin",
    "Bert Kaempfert",
    "Bette Midler",
    "Beyoncé",
    "Big Star",
    "Bill Conti",
    "Bill Haley and His Comets",
    "Bill Hayes",
    "Bill Medley",
    "Bill Withers",
    "Billie Eilish",
    "Billy Davis, Jr.",
    "Billy Idol",
    "Billy Joel",
    "Billy Ocean",
    "Billy Paul",
    "Billy Preston",
    "Billy Ray Cyrus",
    "Billy Swan",
    "Billy Vera and the Beaters",
    "Black Flag",
    "Black Sabbath",
    "BLACKstreet",
    "Blondie",
    "Blue Swede",
    "Bo Donaldson & the Heywoods",
    "Bob Seger",
    "Bobbie Gentry",
    'Bobby "Boris" Pickett and the Crypt-Kickers',
    "Bobby Brown",
    "Bobby Darin",
    "Bobby Goldsboro",
    "Bobby Lewis",
    "Bobby McFerrin",
    "Bobby Vee",
    "Bobby Vinton",
    "Bon Jovi",
    "Bone Thugs-N-Harmony",
    "Bonnie Tyler",
    "Booker T. and the MG’s",
    "Boston",
    "Box Tops",
    "Boyz II Men",
    "Bradley Cooper",
    "Brandy",
    "Bread",
    "Brenda Lee",
    "Brian Hyland",
    "Britney Spears",
    "Brooks & Dunn",
    "Bruce Channel",
    "Bruce Hornsby and the Range",
    "Bruno Mars",
    "Bryan Adams",
    "BTS",
    "Buddy Knox",
    "Buffalo Springfield",
    "C.W. McCall",
    "C+C Music Factory",
    "Calle 13",
    "Calvin Harris",
    "Camila Cabello",
    "Captain & Tennille",
    "Cardi B",
    "Carl Douglas",
    "Carly Rae Jepsen",
    "Carly Simon",
    "Carole King",
    "Carolina Gaitán",
    "Carrie Underwood",
    "Cast of Encanto",
    "Céline Dion",
    "Chamillionaire",
    "Chance the Rapper",
    "Charli XCX",
    "Charlie Gracie",
    "Charlie Puth",
    "Charlie Rich",
    "Cheap Trick",
    "Cher",
    "Chic",
    "Chicago",
    "Childish Gambino",
    "Chris Brown",
    "Christina Aguilera",
    "Christopher Cross",
    "Chubby Checker",
    "Chuck Berry",
    "Ciara",
    "Clay Aiken",
    "Club Nouveau",
    "Colby O'Donis",
    "Coldplay",
    "Color Me Badd",
    "Commodores",
    "Connie Francis",
    "Conway Twitty",
    "Coolio",
    "Crazy Town",
    "Cream",
    "Creed",
    "Creedence Clearwater Revival",
    "Crosby, Stills & Nash",
    "Cult Jam",
    "Culture Club",
    "Cutting Crew",
    "Cyndi Lauper",
    "D4L",
    "DaBaby",
    "Daddy Yankee",
    "Daft Punk",
    "Dale & Grace",
    "Daniel Caesar",
    "Daniel Powter",
    "Danny & the Juniors",
    "Daryl Hall and John Oates",
    'Dave "Baby" Cortez',
    "David Bowie",
    "David Rose",
    "David Seville",
    "David Soul",
    "Dawn",
    "De La Soul",
    "Dean Martin",
    "Death Cab for Cutie",
    "Debbie Gibson",
    "Debbie Reynolds",
    "Debby Boone",
    "Def Leppard",
    "Del Shannon",
    "Deniece Williams",
    "Desiigner",
    "Destiny's Child",
    "Dev",
    "Devo",
    "Dexys Midnight Runners",
    "Diana Ross",
    "Diane Guerrero",
    "Dion",
    "Dion and the Belmonts",
    "Dionne Warwick",
    "Dire Straits",
    "Divine",
    "Dixie Chicks",
    "DJ Khaled",
    "Doja Cat",
    "Dolly Parton",
    "Domenico Modugno",
    "Don McLean",
    "Donna Summer",
    "Donny Osmond",
    "Donovan",
    "Dr. Dre",
    "Drake",
    "Dru Hill",
    "Duran Duran",
    "Eagles",
    "Earth, Wind & Fire",
    "Ed Sheeran",
    "Eddie Kendricks",
    "Eddie Rabbitt",
    "Edwin Starr",
    "Elton John",
    "Elvis Presley",
    "Emerson Lake & Palmer",
    "EMF",
    "Eminem",
    "Enrique Iglesias",
    "Eric Clapton",
    "Ernie K-Doe",
    "Eurythmics",
    "Exile",
    "Exposé",
    "Extreme",
    "Faith Evans",
    "Falco",
    "Fantasia",
    "Far East Movement",
    "Feeder",
    "Fergie",
    "Fine Young Cannibals",
    "Flaming Lips",
    "Fleetwood Mac",
    "Flo Rida",
    "Fontane Sisters",
    "Foreigner",
    "Four Aces",
    "Four Tops",
    "Frank Sinatra",
    "Frankie Avalon",
    "Frankie Lymon and the Teenagers",
    "Frankie Valli",
    "Freddie and the Dreamers",
    "Freddy Fender",
    "Freedom Williams",
    "Fugazi",
    "Fun",
    "Future",
    "Gary Lewis & the Playboys",
    "Gary U.S. Bonds",
    "Gene Chandler",
    "Genesis",
    "George Harrison",
    "George McCrae",
    "George Michael",
    "Georgia Gibbs",
    "Gilbert O'Sullivan",
    "Gipp",
    "Giveon",
    "Gladys Knight",
    "Gladys Knight and the Pips",
    "Glass Animals",
    "Glen Campbell",
    "Glenn Medeiros",
    "Gloria Estefan",
    "Gloria Gaynor",
    "Gogi Grant",
    "GoonRock",
    "Gordon Lightfoot",
    "Gotye",
    "Grand Funk Railroad",
    "Grandmaster Flash and the Furious Five",
    "Green Day",
    "Gregory Abbott",
    "Gucci Mane",
    "Guns N' Roses",
    "Guy Mitchell",
    "Gwen Stefani",
    "Halsey",
    "Hamilton, Joe Frank & Reynolds",
    "Hanson",
    "Harry Chapin",
    "Harry Nilsson",
    "Harry Styles",
    "Heart",
    "Helen Reddy",
    "Henry Mancini",
    "Herb Alpert",
    "Herman's Hermits",
    "Hi-Five",
    "Hollywood Argyles",
    "Honey Cone",
    "Huey Lewis and the News",
    "Hugh Masekela",
    "Hüsker Dü",
    "Iann Dior",
    "Iggy and the Stooges",
    "Iggy Azalea",
    "Ini Kamoze",
    "INXS",
    "Irene Cara",
    "Isaac Hayes",
    "J Balvin",
    "Ja Rule",
    "Jack Harlow",
    "James Blunt",
    "James Ingram",
    "James Taylor",
    "Jamie Foxx",
    "Jan & Dean",
    "Jan Hammer",
    "Janelle Monáe",
    "Janet Jackson",
    "Janis Joplin",
    "Jason Derulo",
    "Jawsh 685",
    "Jay Sean",
    "Jay-Z",
    "Jeannie C. Riley",
    "Jennifer Lopez",
    "Jennifer Warnes",
    "Jim Croce",
    "Jim Lowe",
    "Jimmie Rodgers",
    "Jimmy Dean",
    "Jimmy Gilmer & the Fireballs",
    "Jimmy Soul",
    "Joan Jett and the Blackhearts",
    "Joan Weber",
    "Joe",
    "Joe Cocker",
    "Joe Dowell",
    "Joey Dee and the Starliters",
    "John Denver",
    "John Fred and His Playboy Band",
    "John Legend",
    "John Lennon",
    "John Mellencamp",
    "John Oates",
    "John Parr",
    "John Sebastian",
    "John Travolta",
    "John Waite",
    "Johnnie Taylor",
    "Johnny Horton",
    "Johnny Mathis",
    "Johnny Nash",
    "Johnny Preston",
    "Johnny Rivers",
    "Jon Bon Jovi",
    "Jonas Brothers",
    "Joy Division",
    "Juicy J",
    "Justin Bieber",
    "Justin Timberlake",
    "Juvenile",
    "K-Ci & JoJo",
    "Kanye West",
    "Karyn White",
    "Katy Perry",
    "Kay Starr",
    "KC and the Sunshine Band",
    "Kelly Clarkson",
    "Kelly Rowland",
    "Kendrick Lamar",
    "Kenny Loggins",
    "Kenny Rogers",
    "Kesha",
    "Kid Cudi",
    "Kiki Dee",
    "Kim Carnes",
    "Kim Petras",
    "Kim Wilde",
    "Kimbra",
    "Kingston Trio",
    "Kool and the Gang",
    "Kool Moe Dee",
    "Kraftwerk",
    "Krayzie Bone",
    "Kris Kross",
    "Kyla",
    "Kyu Sakamoto",
    "L.L. Cool J",
    "L.V.",
    "Labelle",
    "Lady Gaga",
    "Ladysmith Black Mambazo",
    "Larry Verne",
    "Lauren Bennett",
    "Laurie London",
    "Lauryn Hill",
    "Lawrence Welk",
    "Led Zeppelin",
    "Leo Sayer",
    "Leona Lewis",
    "Les Baxter",
    "Lesley Gore",
    "Lewis Capaldi",
    "Lil Jon",
    "Lil Nas X",
    "Lil Uzi Vert",
    "Lil Wayne",
    "Lil' Kim",
    "Linda McCartney",
    "Linda Ronstadt",
    "Lionel Richie",
    "Lipps, Inc.",
    "Lisa Lisa and Cult Jam",
    "Lisa Loeb and Nine Stories",
    "Little Anthony and the Imperials",
    "Little Eva",
    "Little Peggy March",
    "Lizzo",
    "Lloyd Price",
    "LMFAO",
    "Loleatta Holloway",
    "Londonbeat",
    "Lonestar",
    "Looking Glass",
    "Lorde",
    "Lorne Greene",
    "Los del Río",
    "Los Lobos",
    "Lou Christie",
    "Lou Reed",
    "Louis Armstrong",
    "Love",
    "Ludacris",
    "Luis Fonsi",
    "Lulu",
    "Lynyrd Skynyrd",
    "M",
    "M.I.A",
    "Mac Davis",
    "Macklemore & Ryan Lewis",
    "Madonna",
    "Magic!",
    "Manfred Mann",
    "Manfred Mann's Earth Band",
    "Mariah Carey",
    "Marilyn Martin",
    "Marilyn McCoo",
    "Mario",
    "Mark Dinning",
    "Mark Ronson",
    "Marky Mark and the Funky Bunch",
    "Maroon 5",
    "Martha Wash",
    "Martika",
    "Marty Robbins",
    "Marvin Gaye",
    "Mary J. Blige",
    "Mary MacGregor",
    "Mary Wells",
    "Mase",
    "Matchbox Twenty",
    "Maureen McGovern",
    "Maurice Williams and the Zodiacs",
    "Mauro Castillo",
    "Maxi Priest",
    "McGuire Sisters",
    "Meat Loaf",
    "Meco",
    "Megan Thee Stallion",
    "Meghan Trainor",
    "Melanie",
    "Men at Work",
    "Metallica",
    "MFSB",
    "Miami Sound Machine",
    "Michael Bolton",
    "Michael Damian",
    "Michael Jackson",
    "Michael McDonald",
    "Michael Sembello",
    "Migos",
    "Mike + The Mechanics",
    "Miley Cyrus",
    "Milli Vanilli",
    "Mims",
    "Minnie Riperton",
    "Mitch Miller",
    "Modest Mouse",
    "Monica",
    "Montell Jordan",
    "Morris Stoloff",
    "Mr. Acker Bilk",
    "Mr. Big",
    "Mr. Mister",
    "Mumford & Sons",
    "Murphy Lee",
    "My Chemical Romance",
    "Mýa",
    "Mystikal",
    "Nancy Sinatra",
    "Nate Dogg",
    "Nate Ruess",
    "Nayer",
    "Ne-Yo",
    "Neil Diamond",
    "Neil Sedaka",
    "Nelly",
    "Nelly Furtado",
    "Nelson",
    "Nelson Riddle",
    "New Kids on the Block",
    "New Order",
    "Next",
    "Nick Gilder",
    "Nickelback",
    "Nicki Minaj",
    "Nine Inch Nails",
    "Nino Tempo",
    "Nirvana",
    "NSYNC",
    "Odia Coates",
    "Ohio Players",
    "Olivia",
    "Olivia Newton-John",
    "Olivia Rodrigo",
    "OMI",
    "One Direction",
    "Otis Redding",
    "OutKast",
    "Outkast",
    "Owl City",
    "Paper Lace",
    "Parliament-Funkadelic",
    "Pat Boone",
    "Patti Austin",
    "Patti LaBelle",
    "Paul & Paula",
    "Paul Anka",
    "Paul Mauriat",
    "Paul McCartney",
    "Paul Simon",
    "Paul Wall",
    "Paula Abdul",
    "Pavement",
    "Peabo Bryson",
    "Peaches & Herb",
    "Pearl Jam",
    "Percy Faith",
    "Percy Sledge",
    "Pere Ubu",
    "Pérez Prado",
    "Perry Como",
    "Pet Shop Boys",
    "Peter & Gordon",
    "Peter Cetera",
    "Peter Gabriel",
    "Peter, Paul and Mary",
    "Petey Pablo",
    "Petula Clark",
    "Pharrell",
    "Phil Collins",
    "Pink",
    "Pink Floyd",
    "Pitbull",
    "Pixies",
    "Plain White T's",
    "Player",
    "PM Dawn",
    "Poco",
    "Poison",
    "Polo G",
    "Portishead",
    "Post Malone",
    "Prince",
    "Public Enemy",
    "Puff Daddy",
    "Puffy AmiYumi",
    "Quavo",
    "Queen",
    "Question Mark & the Mysterians",
    "R. Kelly",
    "R.E.M.",
    "Radiohead",
    "Rae Sremmurd",
    "Rage Against the Machine",
    "Rascal Flatts",
    "Ray Charles",
    "Ray Dalton",
    "Ray Parker Jr.",
    "Ray Stevens",
    "Rayvon",
    "Ready for the World",
    "Red Hot Chili Peppers",
    "Regina Belle",
    "REO Speedwagon",
    "Rhenzy Feliz",
    "Rhythm Heritage",
    'Ricardo "RikRok" Ducent',
    "Richard Marx",
    "Rick Astley",
    "Rick Dees",
    "Rick Springfield",
    "Ricky Martin",
    "Ricky Nelson",
    "Right Said Fred",
    "Rihanna",
    "Ringo Starr",
    "Rob Thomas",
    "Robert John",
    "Robert Palmer",
    "Roberta Flack",
    "Robin Thicke",
    "Rod Stewart",
    "Roddy Ricch",
    "Roger Troutman",
    "Roger Williams",
    "Rose Royce",
    "Roxette",
    "Roxy Music",
    "Roy Orbison",
    "Ruby & the Romantics",
    "Run-D.M.C.",
    "Rupert Holmes",
    "Ryan Lewis",
    "Sam and Dave",
    "Sam Cooke",
    "Sam Smith",
    "Sammy Davis, Jr.",
    "Santana",
    "Santo & Johnny",
    "Savage Garden",
    "Seal",
    "Sean Kingston",
    "Sean Paul",
    "Selena Gomez",
    "Shaggy",
    "Shakira",
    "Shaun Cassidy",
    "Shawn Mendes",
    "Shawnna",
    "Sheb Wooley",
    "Sheena Easton",
    "Shelley Fabares",
    "Sheriff",
    "Shocking Blue",
    "Sia",
    "Siedah Garrett",
    "Silhouettes",
    "Silk",
    "Silk Sonic",
    "Silver Convention",
    "Simon and Garfunkel",
    "Simple Minds",
    "Simply Red",
    "Sinéad O'Connor",
    "Sir Mix-a-Lot",
    "Sisqó",
    "Sleater-Kinney",
    "Sleepy Brown",
    "Slim Thug",
    "Sly and the Family Stone",
    "Smashing Pumpkins",
    "Snoop Dogg",
    "Snow",
    "Sonic Youth",
    "Sonny and Cher",
    "Sonny James",
    "Soulja Boy Tell 'Em",
    "Soulja Slim",
    "Spice Girls",
    "SSgt Barry Sadler",
    "Stanley Brothers",
    "Starland Vocal Band",
    "Stars on 45",
    "Starship",
    "Static Major",
    "Steam",
    "Steely Dan",
    "Stephanie Beatriz",
    "Steve Lacy",
    "Steve Lawrence",
    "Steve Miller Band",
    "Steve Winwood",
    "Stevie B",
    "Stevie Wonder",
    "Sting",
    "Stories",
    "Strawberry Alarm Clock",
    "Styx",
    "Supertramp",
    "Surface",
    "Survivor",
    "Swae Lee",
    "Sweet Sensation",
    "SWV",
    "T-Pain",
    "T.I.",
    "Tab Hunter",
    "Taio Cruz",
    "Talking Heads",
    "Taylor Dayne",
    "Taylor Hicks",
    "Taylor Swift",
    "Tears for Fears",
    "Television",
    "Tems",
    "Tennessee Ernie Ford",
    "Terence Trent D'Arby",
    "Terror Squad",
    "Terry Jacks",
    "The Allman Brothers Band",
    "The Andrews Sisters",
    "The Angels",
    "The Animals",
    "The Archies",
    "The Association",
    "The Band",
    "The Bangles",
    "The Beach Boys",
    "The Beastie Boys",
    "The Beatles",
    "The Bee Gees",
    "The Bellamy Brothers",
    "The Black Eyed Peas",
    "The Boswell Sisters",
    "The Browns",
    "The Buckinghams",
    "The Byrds",
    "The Carpenters",
    "The Cataracs",
    "The Chainsmokers",
    "The Champs",
    "The Chemical Brothers",
    "The Chi-Lites",
    "The Chiffons",
    "The Chipmunks",
    "The Chordettes",
    "The Clash",
    "The Coasters",
    "The Crickets",
    "The Crystals",
    "The Dave Clark Five",
    "The Decemberists",
    "The Dillards",
    "The Dixie Cups",
    "The Doobie Brothers",
    "The Doors",
    "The Drifters",
    "The Eagles",
    "The Edgar Winter Group",
    "The Elegants",
    "The Emotions",
    "The Escape Club",
    "The Essex",
    "The Everly Brothers",
    "The Fifth Dimension",
    "The Flamingos",
    "The Fleetwoods",
    "The Flying Burrito Brothers",
    "The Four Seasons",
    "The Four Tops",
    "The Gang of Four",
    "The Grateful Dead",
    "The Guess Who",
    "The Heights",
    "The Highwaymen",
    "The Hollies",
    "The Hues Corporation",
    "The Human League",
    "The Ink Spots",
    "The Isley Brothers",
    "The J. Geils Band",
    "The Jackson 5",
    "The Jam",
    "The Jefferson Airplane",
    "The Jesus and Mary Chain",
    "The Judds",
    "The Kid Laroi",
    "The Kingston Trio",
    "The Kinks",
    "The Knack",
    "The Lemon Pipers",
    "The Louvin Brothers",
    "The Love Unlimited Orchestra",
    "The Lovin' Spoonful",
    "The Lovin’ Spoonful",
    "The Mamas & the Papas",
    "The Mamas and the Papas",
    "The Manhattans",
    "The Marcels",
    "The Marvelettes",
    "The MC5",
    "The McCoys",
    "The Mekons",
    "The Mills Brothers",
    "The Miracles",
    "The Monkees",
    "The Moody Blues",
    "The Moonglows",
    "The New Power Generation",
    "The New Vaudeville Band",
    "The New York Dolls",
    "The Notorious B.I.G.",
    "The O'Jays",
    "The O’Jays",
    "The Ohio Players",
    "The Orioles",
    "The Osmonds",
    "The Partridge Family",
    "The Pet Shop Boys",
    "The Platters",
    "The Police",
    "The Product G&B",
    "The Raiders",
    "The Ramones",
    "The Rascals/The Young Rascals",
    "The Replacements",
    "The Revolution",
    "The Righteous Brothers",
    "The Rolling Stones",
    "The Rooftop Singers",
    "The Sex Pistols",
    "The Shadows",
    "The Shangri-Las",
    "The Shirelles",
    "The Singing Nun",
    "The Smiths",
    "The Soul Stirrers",
    "The Spinners",
    "The Staple Singers",
    "The Strokes",
    "The Supremes",
    "The Sylvers",
    "The Teddy Bears",
    "The Temptations",
    "The Three Degrees",
    "The Tokens",
    "The Tornados",
    "The Troggs",
    "The Turtles",
    "The Tymes",
    "The Velvet Underground",
    "The Ventures",
    "The Weavers",
    "The Weeknd",
    "The White Stripes",
    "The Who",
    "The Wild Pair",
    "The Yardbirds",
    "Thelma Houston",
    "Three Dog Night",
    "Tiffany",
    "Timbaland",
    "Timmy T",
    "Tina Turner",
    "Tinariwen",
    "TLC",
    "Tommy Edwards",
    "Tommy James and the Shondells",
    "Tommy Page",
    "Tommy Roe",
    "Toni Basil",
    "Toni Braxton",
    "Tony Orlando and Dawn",
    "Toots and the Maytals",
    "Toto",
    "Traffic",
    "Travis Scott",
    "Tupac Shakur/2Pac",
    "TV on the Radio",
    "Twista",
    "Ty Dolla $ign",
    "U–V",
    "U2",
    "UB40",
    "USA for Africa",
    "Usher",
    "Van Halen",
    "Van McCoy and the Soul City Symphony",
    "Vanessa Williams",
    "Vangelis",
    "Vanilla Ice",
    "Vertical Horizon",
    "Vicki Lawrence",
    "Walter Murphy and the Big Apple Band",
    "Wanz",
    "Wayne Fontana and the Mindbenders",
    "Weezer",
    "Wham!",
    "Whitesnake",
    "Whitney Houston",
    "Wilbert Harrison",
    "Wilco",
    "Wild Cherry",
    "Will Smith",
    "Will to Power",
    "will.i.am",
    "Wilson Phillips",
    "Wings",
    "Wiz Khalifa",
    "Wizkid",
    "Wyclef Jean",
    "X",
    "XXXTentacion",
    "Yes",
    "Yo La Tengo",
    "Yvonne Elliman",
    "ZZ Top",
  ];
  return artists;
}

export default Artists;