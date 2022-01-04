/*

Provide default values for user session data. These are automatically added
via the `autoStoreData` middleware. Values will only be added to the
session if a value doesn't already exist. This may be useful for testing
journeys where users are returning or logging in to an existing application.

============================================================================

Example usage:

"full-name": "Sarah Philips",

"options-chosen": [ "foo", "bar" ]

============================================================================

*/

let lpas = require('./local-authority-eng.json')
let availableAppeals = require('./availableAppeals.json')
let validationAppeals = require('./validationAppeals.json')
let caseOfficerQuestionnaires = require('./caseOfficerQuestionnaires.json')

let data = {

  cstSearch:
  [
    {
      "ref": "3755470",
      "address": "Copthalls, Clevedon Road, West Hill",
      "type": "HAS",
      "postcode": "BS48 1PN",
      "stage": "",
      "name": "Romelia Esposito"
    },
    {
      "ref": "5024459",
      "type": "HAS",
      "address": "Norette, Chewton Keynsham",
      "postcode": "BS31 2SU",
      "stage": "",
      "name": "Sierra Meaney"
    },
    {
      "ref": "5551277",
      "type": "HAS",
      "address": "19 Beauchamp Road, Bristol",
      "postcode": "BS7 8LQ",
      "stage": "",
      "name": "Marguerita Kirshner"
    },
    {
      "ref": "4909983",
      "type": "HAS",
      "address": "66 Grove Road, Fishponds",
      "postcode": "BS16 2BP",
      "stage": "",
      "name": "Virgilio Gaymon"
    },
    {
      "ref": "4788894",
      "type": "3388304",
      "address": "9 Savernake Road, Weston-Super-Mare",
      "postcode": "BS22 9HQ",
      "stage": "",
      "name": "Graciela Viator"
    },
    {
      "ref": "4612726",
      "type": "HAS",
      "address": "5 Monks Hill, Weston-Super-Mare",
      "postcode": "BS22 9RG",
      "stage": "",
      "name": "Yuonne Fucci"
    },
    {
      "ref": "4899402",
      "type": "HAS",
      "address": "29 St Michaels Park, Bristol",
      "postcode": "BS2 8BW",
      "stage": "",
      "name": "Frederic Schechter"
    },
    {
      "ref": "4293472",
      "type": "HAS",
      "address": "180 Bloomfield Road, Bristol",
      "postcode": "BS4 3QX",
      "stage": "",
      "name": "Ciara Cassin"
    },
    {
      "ref": "4162708",
      "type": "HAS",
      "address": "183 Hillside Road, Bristol",
      "postcode": "BS5 7PP",
      "stage": "",
      "name": "Idalia Mirza"
    },
    {
      "ref": "5261405",
      "type": "HAS",
      "address": "Flat 13, Greenbank View, Orchard Road, Kingswood",
      "postcode": "BS15 9QU",
      "stage": "",
      "name": "Freeda Alaimo"
    },
    {
      "ref": "4376041",
      "type": "HAS",
      "address": "15 Ravenswood Road, Bristol",
      "postcode": "BS6 6BN",
      "stage": "",
      "name": "Shandra Hosein"
    },
    {
      "ref": "4307663",
      "type": "HAS",
      "address": "6 Dunmore Street, Bristol",
      "postcode": "BS4 2BQ",
      "stage": "",
      "name": "Alejandrina Square"
    },
    {
      "ref": "3801537",
      "type": "HAS",
      "address": "Flat 14, Fountain Court, Abbotswood, Yate",
      "postcode": "BS37 4NL",
      "stage": "",
      "name": "Cindie Canterbury"
    },
    {
      "ref": "3852552",
      "type": "HAS",
      "address": "87 Hengrove Lane, Bristol",
      "postcode": "BS14 9DH",
      "stage": "",
      "name": "Nicolasa Arneson"
    },
    {
      "ref": "5172826",
      "type": "HAS",
      "address": "Cherry Orchards, Canford Lane, Bristol",
      "postcode": "BS9 3PE",
      "stage": "",
      "name": "Tanisha Jagger"
    },
    {
      "ref": "4553926",
      "type": "HAS",
      "address": "9 Charnhill Ridge, Mangotsfield",
      "postcode": "BS16 9JP",
      "stage": "",
      "name": "Luke Durio"
    },
    {
      "ref": "5182990",
      "type": "HAS",
      "address": "Hazeldene, Hazel Lane, Rudgeway",
      "postcode": "BS35 3QW",
      "stage": "",
      "name": "Yuriko Kangas"
    },
    {
      "ref": "4598682",
      "type": "HAS",
      "address": "136 Charlton Road, Keynsham",
      "postcode": "BS31 2JZ",
      "stage": "",
      "name": "Eliz Kerns"
    },
    {
      "ref": "4175968",
      "type": "HAS",
      "address": "17 Wilson Gardens, West Wick",
      "postcode": "BS24 7GL",
      "stage": "",
      "name": "Michele Heal"
    },
    {
      "ref": "4081024",
      "type": "HAS",
      "address": "Flat 6, Redfield House, Redfield Road, Patchway",
      "postcode": "BS34 6BR",
      "stage": "",
      "name": "Kenia Sheley"
    },
    {
      "ref": "4826096",
      "type": "HAS",
      "address": "55 Quantock Road, Bristol",
      "postcode": "BS3 4PQ",
      "stage": "",
      "name": "Howard Louie"
    },
    {
      "ref": "3382299",
      "type": "HAS",
      "address": "Apartment 214, Number One Bristol, Lewins Mead, Bristol",
      "postcode": "BS1 2NR",
      "stage": "",
      "name": "Carita Bazile"
    },
    {
      "ref": "4060892",
      "type": "HAS",
      "address": "257 Mendip Road, Yatton",
      "postcode": "BS49 4DG",
      "stage": "",
      "name": "Ronni Arrowsmith"
    },
    {
      "ref": "4690258",
      "type": "HAS",
      "address": "The Mead, Fullers Lane, Winscombe",
      "postcode": "BS25 1NE",
      "stage": "",
      "name": "Earlean Blecha"
    },
    {
      "ref": "4575470",
      "type": "HAS",
      "address": "1 Brook Farm, Claverham",
      "postcode": "BS49 4QE",
      "stage": "",
      "name": "Stormy Ruggerio"
    },
    {
      "ref": "3953082",
      "type": "HAS",
      "address": "7 Anson Road, Locking",
      "postcode": "BS24 7DF",
      "stage": "",
      "name": "Li Rasmusson"
    },
    {
      "ref": "4199140",
      "type": "HAS",
      "address": "21 Kennford, Tamar Road, Weston-Super-Mare",
      "postcode": "BS22 6LE",
      "stage": "",
      "name": "Leta Martir"
    },
    {
      "ref": "3882888",
      "type": "HAS",
      "address": "Silver Birches, Elmgrove Road, Fishponds",
      "postcode": "BS16 2AS",
      "stage": "",
      "name": "Seymour Pelt"
    },
    {
      "ref": "3940477",
      "type": "HAS",
      "address": "48 Larksleaze Road, Longwell Green",
      "postcode": "BS30 9BJ",
      "stage": "",
      "name": "Arnette Charlebois"
    },
    {
      "ref": "4298634",
      "type": "HAS",
      "address": "11 Jones Close, Yatton",
      "postcode": "BS49 4RA",
      "stage": "",
      "name": "Helena Riedel"
    },
    {
      "ref": "5117912",
      "type": "HAS",
      "address": "20 Greenfield Park, Portishead",
      "postcode": "BS20 6RQ",
      "stage": "",
      "name": "Vanita Conboy"
    },
    {
      "ref": "3788871",
      "type": "HAS",
      "address": "First Floor Flat, 54 Alma Road, Clifton",
      "postcode": "BS8 2DG",
      "stage": "",
      "name": "Nathanial Speicher"
    },
    {
      "ref": "3549182",
      "type": "HAS",
      "address": "17 Cerimon Gate, Stoke Gifford",
      "postcode": "BS34 8UN",
      "stage": "",
      "name": "Joana Castillon"
    },
    {
      "ref": "5161236",
      "type": "HAS",
      "address": "The Chestnuts, Norton Hawkfield",
      "postcode": "BS39 4HB",
      "stage": "",
      "name": "Earlene Kaplan"
    },
    {
      "ref": "5233762",
      "type": "HAS",
      "address": "Larkspur, Station Approach, Pensford",
      "postcode": "BS39 4AE",
      "stage": "",
      "name": "Valarie Arehart"
    },
    {
      "ref": "3986441",
      "type": "HAS",
      "address": "11 Hill Road, Worle",
      "postcode": "BS22 9HE",
      "stage": "",
      "name": "Marsha Flynn"
    },
    {
      "ref": "4103902",
      "type": "HAS",
      "address": "25A Lower Cock Road, Bristol",
      "postcode": "BS15 9RS",
      "stage": "",
      "name": "Minerva Goins"
    },
    {
      "ref": "3886570",
      "type": "HAS",
      "address": "57 Sunnyside Road, Weston-Super-Mare",
      "postcode": "BS23 3QD",
      "stage": "",
      "name": "Yvone Overlock"
    },
    {
      "ref": "4978965",
      "type": "HAS",
      "address": "Hillcrest, Main Road, Aust",
      "postcode": "BS35 4BA",
      "stage": "",
      "name": "Bobbi Sandoval"
    },
    {
      "ref": "4893181",
      "type": "HAS",
      "address": "Batsford, Failand Lane, Failand",
      "postcode": "BS8 3ST",
      "stage": "",
      "name": "Maile Antunez"
    },
    {
      "ref": "5274725",
      "type": "HAS",
      "address": "Basement Flat, 20 Victoria Square, Bristol",
      "postcode": "BS8 4ES",
      "stage": "",
      "name": "Cathrine Polasek"
    },
    {
      "ref": "3722898",
      "type": "HAS",
      "address": "1 Firs Court, Keynsham",
      "postcode": "BS31 2RD",
      "stage": "",
      "name": "Valrie Ramthun"
    },
    {
      "ref": "5108952",
      "type": "HAS",
      "address": "140 Greensbrook, Clutton",
      "postcode": "BS39 5PG",
      "stage": "",
      "name": "Ariane Bevacqua"
    },
    {
      "ref": "5385029",
      "type": "HAS",
      "address": "3 St Michaels Drive, Bristol",
      "postcode": "BS15 1FG",
      "stage": "",
      "name": "Miguelina Tanguay"
    },
    {
      "ref": "4430286",
      "type": "HAS",
      "address": "56 Albert Road, Keynsham",
      "postcode": "BS31 1AD",
      "stage": "",
      "name": "Deandre Forsgren"
    },
    {
      "ref": "3362461",
      "type": "HAS",
      "address": "766 Muller Road, Eastville",
      "postcode": "BS5 6XA",
      "stage": "",
      "name": "Nenita Blowers"
    },
    {
      "ref": "4129039",
      "type": "HAS",
      "address": "3A Flowers Hill, Bristol",
      "postcode": "BS4 5JJ",
      "stage": "",
      "name": "Carlena Dilday"
    },
    {
      "ref": "5276256",
      "type": "HAS",
      "address": "8 South View Terrace, Yatton",
      "postcode": "BS49 4AH",
      "stage": "",
      "name": "Shannan Lilley"
    },
    {
      "ref": "5366454",
      "type": "HAS",
      "address": "5 Chapel Close, Chew Stoke",
      "postcode": "BS40 8XX",
      "stage": "",
      "name": "Johnathon Mueller"
    },
    {
      "ref": "5275708",
      "type": "HAS",
      "address": "Prospect, Back Lane, Kingston Seymour",
      "postcode": "BS21 6UZ",
      "stage": "",
      "name": "Shenika Bozeman"
    },
    {
      "ref": "3515959",
      "type": "HAS",
      "address": "7 St Andrews Close, Nailsea",
      "postcode": "BS48 2UN",
      "stage": "",
      "name": "Chi Saine"
    },
    {
      "ref": "3442000",
      "type": "HAS",
      "address": "13 Somerset Way, Paulton",
      "postcode": "BS39 7YU",
      "stage": "",
      "name": "Renaldo Lu"
    },
    {
      "ref": "5047385",
      "type": "HAS",
      "address": "50 Fourth Avenue, Bristol",
      "postcode": "BS7 0RW",
      "stage": "",
      "name": "Ricardo Eccleston"
    },
    {
      "ref": "4188170",
      "type": "HAS",
      "address": "Moormead Farm, Nyland",
      "postcode": "BS27 3UD",
      "stage": "",
      "name": "Toby Rm"
    },
    {
      "ref": "4660944",
      "type": "HAS",
      "address": "51 Greenbank Avenue West, Bristol",
      "postcode": "BS5 6EP",
      "stage": "",
      "name": "Angelo Klein"
    },
    {
      "ref": "4260482",
      "type": "HAS",
      "address": "161 Luckwell Road, Bristol",
      "postcode": "BS3 3HB",
      "stage": "",
      "name": "Loren Cude"
    },
    {
      "ref": "4379801",
      "type": "HAS",
      "address": "34 Brean Down Avenue, Bristol",
      "postcode": "BS9 4JF",
      "stage": "",
      "name": "Elvin Barboza"
    },
    {
      "ref": "3532652",
      "type": "HAS",
      "address": "27 Hillview Avenue, Clevedon",
      "postcode": "BS21 6JQ",
      "stage": "",
      "name": "Heriberto Hatt"
    },
    {
      "ref": "3918593",
      "type": "HAS",
      "address": "11 Argyle Place, Bristol",
      "postcode": "BS8 4RH",
      "stage": "",
      "name": "Orville Strite"
    },
    {
      "ref": "3374006",
      "type": "HAS",
      "address": "Second Floor Flat 1, 3 Chantry Road, Bristol",
      "postcode": "BS8 2QF",
      "stage": "",
      "name": "Brian Cordes"
    },
    {
      "ref": "3534836",
      "type": "HAS",
      "address": "6 Sycamore Close, Whitehall",
      "postcode": "BS5 7DB",
      "stage": "",
      "name": "Lane Brockington"
    },
    {
      "ref": "5188029",
      "type": "HAS",
      "address": "26C High Street, Thornbury",
      "postcode": "BS35 2AH",
      "stage": "",
      "name": "Pasquale Kunkle"
    },
    {
      "ref": "5410735",
      "type": "HAS",
      "address": "89 Greenway Bush Lane, Bristol",
      "postcode": "BS3 1SG",
      "stage": "",
      "name": "Leonel Burgio"
    },
    {
      "ref": "4739943",
      "type": "HAS",
      "address": "Stoweylands, Main Road, Bishop Sutton",
      "postcode": "BS39 5TP",
      "stage": "",
      "name": "Cordell Thronson"
    },
    {
      "ref": "3647726",
      "type": "HAS",
      "address": "7 Grange Avenue, Little Stoke",
      "postcode": "BS34 6JY",
      "stage": "",
      "name": "Joel Mcjunkin"
    },
    {
      "ref": "4567441",
      "type": "HAS",
      "address": "122B Tower Road North, Bristol",
      "postcode": "BS30 8XN",
      "stage": "",
      "name": "Dale Byham"
    },
    {
      "ref": "4217319",
      "type": "HAS",
      "address": "Flat 2, 89 Lower Redland Road, Bristol",
      "postcode": "BS6 6SW",
      "stage": "",
      "name": "Alfonso Baker"
    },
    {
      "ref": "4174851",
      "type": "HAS",
      "address": "92 Berkeley Road, Bishopston",
      "postcode": "BS7 8HG",
      "stage": "",
      "name": "Agustin Rone"
    },
    {
      "ref": "4188377",
      "type": "HAS",
      "address": "19 The Grove, Rangeworthy",
      "postcode": "BS37 7PY",
      "stage": "",
      "name": "Lauren Daring"
    },
    {
      "ref": "5092860",
      "type": "HAS",
      "address": "15 Lydia Court, Bishopston",
      "postcode": "BS7 9LD",
      "stage": "",
      "name": "Aurelio Work"
    },
    {
      "ref": "3550089",
      "type": "HAS",
      "address": "3 Churchdown Walk, Bristol",
      "postcode": "BS11 9UT",
      "stage": "",
      "name": "Kendrick Beckler"
    },
    {
      "ref": "3979568",
      "type": "HAS",
      "address": "31 Heath Street, Bristol",
      "postcode": "BS5 6SN",
      "stage": "",
      "name": "Elliot Hawes"
    },
    {
      "ref": "4003608",
      "type": "HAS",
      "address": "22 Grittleton Road, Bristol",
      "postcode": "BS7 0UZ",
      "stage": "",
      "name": "Percy Keppler"
    },
    {
      "ref": "5495376",
      "type": "HAS",
      "address": "15 Rectory Close, Yate",
      "postcode": "BS37 5SB",
      "stage": "",
      "name": "Numbers Mccaw"
    },
    {
      "ref": "3933982",
      "type": "HAS",
      "address": "509A Bath Road, Brislington",
      "postcode": "BS4 3LA",
      "stage": "",
      "name": "Domingo Mcneese"
    },
    {
      "ref": "3912612",
      "type": "HAS",
      "address": "Ian Williams Ltd, Station Road, Warmley",
      "postcode": "BS30 8XG",
      "stage": "",
      "name": "Ramon Marcucci"
    },
    {
      "ref": "4116220",
      "type": "HAS",
      "address": "51 Stockwood Lane, Bristol",
      "postcode": "BS14 8SL",
      "stage": "",
      "name": "Geraldo Marte"
    },
    {
      "ref": "4871161",
      "type": "HAS",
      "address": "Flat 6, 1 Castle Road, Clevedon",
      "postcode": "BS21 7BX",
      "stage": "",
      "name": "Quincy Deshong"
    },
    {
      "ref": "4589862",
      "type": "HAS",
      "address": "Goudhurst, Hollow Road, Shipham",
      "postcode": "BS25 1TG",
      "stage": "",
      "name": "Bryan Casteel"
    },
    {
      "ref": "5049616",
      "type": "HAS",
      "address": "8 Hayward Road, Staple Hill",
      "postcode": "BS16 4NS",
      "stage": "",
      "name": "Armando Smelser"
    },
    {
      "ref": "4873943",
      "type": "HAS",
      "address": "10 Syston Way, Bristol",
      "postcode": "BS15 1UQ",
      "stage": "",
      "name": "Weldon Parham"
    },
    {
      "ref": "5092037",
      "type": "HAS",
      "address": "25 Crowthers Avenue, Yate",
      "postcode": "BS37 5SZ",
      "stage": "",
      "name": "Lucas Clement"
    },
    {
      "ref": "3703266",
      "type": "HAS",
      "address": "23 Alexandra Lodge, Stokefield Close, Thornbury",
      "postcode": "BS35 1BU",
      "stage": "",
      "name": "Lloyd Sly"
    },
    {
      "ref": "3852537",
      "type": "HAS",
      "address": "4 Thirlmere Road, Weston-Super-Mare",
      "postcode": "BS23 3UX",
      "stage": "",
      "name": "Hugh Michelson"
    },
    {
      "ref": "4539133",
      "type": "HAS",
      "address": "114 Broad Street, Staple Hill",
      "postcode": "BS16 5LU",
      "stage": "",
      "name": "Jonas Dusseault"
    },
    {
      "ref": "4240298",
      "type": "HAS",
      "address": "14 North Court, The Courtyard, Bradley Stoke",
      "postcode": "BS32 4NQ",
      "stage": "",
      "name": "Gail Winkles"
    },
    {
      "ref": "4851713",
      "type": "HAS",
      "address": "2 Davids Road, Bristol",
      "postcode": "BS14 9JJ",
      "stage": "",
      "name": "Jerrell Ristow"
    },
    {
      "ref": "5508426",
      "type": "HAS",
      "address": "8 Parnell Road, Clevedon",
      "postcode": "BS21 6DB",
      "stage": "",
      "name": "Sid Schriver"
    },
    {
      "ref": "4989664",
      "type": "HAS",
      "address": "29B Downs Park West, Bristol",
      "postcode": "BS6 7QH",
      "stage": "",
      "name": "Bruno Valiente"
    },
    {
      "ref": "5153698",
      "type": "HAS",
      "address": "52 Lampton Avenue, Bristol",
      "postcode": "BS13 0QD",
      "stage": "",
      "name": "Walker Sanderson"
    },
    {
      "ref": "5261623",
      "type": "HAS",
      "address": "Apartment 18, New Retort House, Lime Kiln Road, Bristol",
      "postcode": "BS1 5DZ",
      "stage": "",
      "name": "Nolan List"
    },
    {
      "ref": "5347050",
      "type": "HAS",
      "address": "14 Cherrywood Rise, Worle",
      "postcode": "BS22 6QW",
      "stage": "",
      "name": "Rodney Basham"
    },
    {
      "ref": "3668966",
      "type": "HAS",
      "address": "8 Hill Path, Banwell",
      "postcode": "BS29 6AB",
      "stage": "",
      "name": "Lazaro Groesbeck"
    },
    {
      "ref": "4006597",
      "type": "HAS",
      "address": "29 Uphill Road North, Weston-Super-Mare",
      "postcode": "BS23 4NG",
      "stage": "",
      "name": "Moses Cawthorne"
    },
    {
      "ref": "3589290",
      "type": "HAS",
      "address": "12 The Triangle, Clevedon",
      "postcode": "BS21 6NG",
      "stage": "",
      "name": "Val Heyd"
    },
    {
      "ref": "5061870",
      "type": "HAS",
      "address": "2 The Croft, Backwell",
      "postcode": "BS48 3LY",
      "stage": "",
      "name": "Shirley Fitzpatrick"
    },
    {
      "ref": "3476519",
      "type": "HAS",
      "address": "31 Marlwood Drive, Bristol",
      "postcode": "BS10 6SH",
      "stage": "",
      "name": "Mitch Harten"
    },
    {
      "ref": "3754207",
      "type": "HAS",
      "address": "114 Wootton Road, Bristol",
      "postcode": "BS4 4AT",
      "stage": "",
      "name": "Judson Sheppard"
    },
    {
      "ref": "4698774",
      "type": "HAS",
      "address": "21 Paxton, Stapleton",
      "postcode": "BS16 1WF",
      "stage": "",
      "name": "Santo Grainger"
    }
  ],

  cstNotes: [
    {
      "note": "Adv that the appeal was submitted in time and that the appeal is waiting for an Inspector to become available before it can start. Adv that their LPA will send a notification letter within 5 days of the start date and explained the appeal will not show on ACP until its started.",
      "datetime": "16 Jun 2021 11:14am",
      "username": "Mark Jones"
    },
    {
      "note": "Advised appellant of average appeal timescales.",
      "datetime": "07 Jun 2021 15:32pm",
      "username": "David Smith"
    }
  ],

  "cst-v5a-appellantname": "Maria Sharma",
  "cst-v5a-appellantemail": "maria.sharma@gmail.com",
  "cst-v5a-agentname": "",
  "cst-v5a-agentemail": "",
  "cst-v5a-siteaddress-line-1": "8 The Chase",
  "cst-v5a-siteaddress-line-2": "",
  "cst-v5a-siteaddress-town": "Findon",
  "cst-v5a-siteaddress-county": "",
  "cst-v5a-siteaddress-postcode": "BN14 0TT",
  "cst-v5a-planningdepartment": "BRD",
  "cst-v5a-decisiondate-day": 3,
  "cst-v5a-decisiondate-month": 9,
  "cst-v5a-decisiondate-year": 2021,
  "cst-v5a-descriptionofdevelopment": "Single storey extension to rear",
  "cst-v5a-files-supplementary": [
    {
      "name": "County Council Rights of Way",
      "file": "County Council Rights of Way.pdf",
      "adopted": "yes",
      "adopted_day": "21",
      "adopted_month": "10",
      "adopted_year": "2007",
      "adopted_stage": ""
    },
    {
      "name": "County Council Highways",
      "file": "County Council Highways.pdf",
      "adopted": "no",
      "adopted_day": "",
      "adopted_month": "",
      "adopted_year": "",
      "adopted_stage": "Final draft"
    }
  ],
  "cst-v5a-files-representations": [
    {
      "file": "JohnSmith.pdf",
      "withdrawn": false
    },
    {
      "file": "JaneDoe.pdf",
      "withdrawn": true
    }
  ],

  lpas,  
  availableAppeals,    
  validationAppeals,    
  caseOfficerQuestionnaires

}

module.exports = data;
