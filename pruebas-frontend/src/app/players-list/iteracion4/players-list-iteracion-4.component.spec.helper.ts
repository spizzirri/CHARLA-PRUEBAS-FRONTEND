export function getAListOfPlayersWhereOneOfThemIsFromUSA(){
   return {
    region: "WORLD",
    list:[
        {
        "name": "Carlsen, Magnus",
        "federation": "Norway",
        "ELO": "2847",
        "Byear": "1990"
        },
        {
        "name": "Caruana, Fabiano",
        "federation": "USA",
        "ELO": "2820",
        "Byear": "1992"
        },
        {
        "name": "Ding, Liren",
        "federation": "China",
        "ELO": "2799",
        "Byear": "1992"
        },
        {
        "name": "Nepomniachtchi, Ian",
        "federation": "Russia",
        "ELO": "2792",
        "Byear": "1990"
        }
    ]}
}

export function getAListOfSamplePlayers(){
    return {
        region: "ARGENTINA",
        list:[
            {
            "name": "Pichot, Alan",
            "federation": "Argentina",
            "ELO": "2630",
            "Byear": "1998"
            },
            {
            "name": "Mareco, Sandro",
            "federation": "Argentina",
            "ELO": "2629",
            "Byear": "1987"
            },
            {
            "name": "Martin, Sandro",
            "federation": "Argentina",
            "ELO": "2629",
            "Byear": "1987"
            }
        ]
    }
}

export function getAListOfPlayersWhereOneOfThemIsCalledAlanPichot(){
    return {
        region: "ARGENTINA",
        list:[
          {
            "name": "Pichot, Alan",
            "federation": "Argentina",
            "ELO": "2630",
            "Byear": "1998"
          },
          {
            "name": "Mareco, Sandro",
            "federation": "Argentina",
            "ELO": "2629",
            "Byear": "1987"
          },
          {
            "name": "Martin, Sandro",
            "federation": "Argentina",
            "ELO": "2629",
            "Byear": "1987"
          }
        ]
      }
 }