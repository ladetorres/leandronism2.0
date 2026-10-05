// Blog data structure
// Each blog post has a type: 'photo-essay', 'blog', 'playlist', or 'game'

export const blogData = [
  {
    id: 0,
    font: 'site',
    title: 'kaohsiung crashouts',
    colorPalette: [
      '#67BED9',
      '#3f5364',
      '#420000',
      '#56703b',
      '#f1370c',
      '#bc1400',
    ],
    paletteLine: `
    my palette of kaohsiung are of dim lustful nights and softly lit chinese lantern reds.
    end of spring afternoon skies are clear blue, and the warm sunsets sing in YouBike bell dings
    as i try to glide through the sidewalks before the sun sets behind my back.
    quiet red and oranges adorn the temples balconies. the hiking trail canopy buzzes with life in all shades of green.
    `,
    urlPath: '/blogs/kaohsiung-crashouts',
    subtitle: 'vignettes of self-realizations alone in southern taiwan',
    type: 'photo-essay',
    tags: [
      'photo essay',
      'self',
      'travel',
      'taiwan'
    ],
    backgroundColor: '#91c4e3',
    textColor: '#300000',
    dateTaken: 'April and May 2026',
    date: '2026-08-02',
    footerText: 'Photos from my Unsplash account',
    footerTextLink: 'https://unsplash.com/@ladetorres',
    // headerImage: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1200',
    headerImage: 'https://images.unsplash.com/photo-1777892665104-d66a5607c093?w=2400',
    featuredImage: 'https://images.unsplash.com/photo-1777891911233-a6d80985794c?w=1200',
      // headerImage: 'https://images.unsplash.com/photo-1777891911475-2b76c73e421e?w=2400',
    photosTemp: [],
    phonePhotosGallery: {
      'kaoshiung-crashing': [
        {
          fileName: 'fxn-seaside-tree',
          fileNameWithExt: 'fxn-seaside-tree.jpg',
          caption: 'snapped this while on a bus to Pingtung. surprisingly sharp and took only a little zoom to make the tree centered. sky looks perfect.',
          coordinates: '22.214°N, 120.683°E',
          location: 'Pingtung',
          focalLength: '35.0mm',
          fNumber: 'f/1.8',
          exposure: '1/14286'
        },
        {
          fileName: 'fxn-sunfong-lantern',
          fileNameWithExt: 'fxn-sunfong-lantern.JPG',
          caption: 'on a second floor balcony to see the sea of lanterns floating above the courtyard',
          coordinates: '22.636°N, 120.294°E',
          location: 'Kaohsiung',
          focalLength: '15.7mm',
          fNumber: 'f/2.8',
          exposure: '1/120'
        },
        {
          fileName: 'fxn-tainan-plane',
          fileNameWithExt: 'fxn-tainan-plane.JPG',
          caption: 'last day in tainan, walked along the streets and got lucky with a descending plane close enough for a photo',
          coordinates: '22.995°N, 120.202°E',
          location: 'Tainan',
          focalLength: '15.7mm',
          fNumber: 'f/2.8',
          exposure: '1/4366'
        },
        {
          fileName: 'fxn-roots-wall',
          fileNameWithExt: 'fxn-roots-wall.JPG',
          caption: 'overgrown roots hugging the walls of the anping tree house. the app filter did wash out the richer shades of brown it has in reality, but still, pretty',
          coordinates: '23.004°N, 120.160°E',
          location: 'Tainan',
          focalLength: '35.0mm',
          fNumber: 'f/1.8',
          exposure: '1/120'
        },
        {
          fileName: 'fxn-seaside-cliffs',
          fileNameWithExt: 'fxn-seaside-cliffs.jpg',
          caption: 'longpan park near the south tip of the island. the viewpoint is stunning, the rolling hills to the rocky beach is a dream',
          coordinates: '21.927°N, 120.848°E',
          location: 'Kenting',
          focalLength: '6.8mm',
          fNumber: 'f/1.8',
          exposure: '1/14286'
        },
        {
          fileName: 'fxn-silhouette-aquarium',
          fileNameWithExt: 'fxn-silhouette-aquarium.jpg',
          caption: 'beh hirap mag-selfie in public beh. this is my 4th attempt in front of the largest fish tank in the museum. again, i think i used the wrong filter, blue looked washed',
          coordinates: '22.046°N, 120.697°E',
          location: 'Pingtung',
          focalLength: '2.7mm',
          fNumber: 'f/1.9',
          exposure: '1/30'
        },
        {
          fileName: 'fxn-msuic-center',
          fileNameWithExt: 'fxn-msuic-center.JPG',
          caption: 'walked along the kaohsiung port at night with a friend. the purple here feels alive. so did i.',
          coordinates: '22.618°N, 120.290°E',
          location: 'Kaohsiung',
          focalLength: '6.8mm',
          fNumber: 'f/1.8',
          exposure: '1/30'
        },
        {
          fileName: 'fxn-kaohsiung-sky',
          fileNameWithExt: 'fxn-kaohsiung-sky.JPG',
          caption: 'got lucky with overall weather. occassional drizzle, some overcast days, some quite sunny.',
          coordinates: '22.620°N, 120.291°E',
          location: 'Kaohsiung',
          focalLength: '6.8mm',
          fNumber: 'f/1.8',
          exposure: '1/14286'
        },
        {
          fileName: 'fxn-hiking-shades',
          fileNameWithExt: 'fxn-hiking-shades.JPG',
          caption: 'morning hiked and returned to my airbnb to catch an 11am checkout. debated the whole 6am alarm if any of this was worth it (spoiler: it was). listened to TTPD The Anthology on the way up.',
          coordinates: '22.653°N, 120.265°E',
          location: 'Kaohsiung',
          focalLength: '2.2mm',
          fNumber: 'f/2.2',
          exposure: '1/2610'
        },
        {
          fileName: 'fxn-temple-symmetry',
          fileNameWithExt: 'fxn-temple-symmetry.jpg',
          caption: 'joined a day tour to Fo Guang Shan, walked the whole entire afternoon but too stingy for a proper lunch so i had tea and a brownie from starbucks. probably lost half a kilo that day.',
          coordinates: '22.757°N, 120.441°E',
          location: 'Chiayi',
          focalLength: '50.0mm',
          fNumber: 'f/1.8',
          exposure: '1/22727'
        },
        {
          fileName: 'fxn-station-patterns',
          fileNameWithExt: 'fxn-station-patterns.JPG',
          caption: 'the closest station from me, Kaohsiung Station is cunt. the roof decor is simple but packs a personality. the foodcourt is nice. wished for more benches tho.',
          coordinates: '22.640°N, 120.303°E',
          location: 'Kaohsiung',
          focalLength: '6.8mm',
          fNumber: 'f/1.8',
          exposure: '1/59'
        },
      ],
    },
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1777339371609-38910df9a686?w=1200',
        orientation: 'portrait',
        caption: `
        saw one sunset at sizihwan. biked for half an hour all the way from my hotel in lingya, music on my ears,
        slanted sun on my face, streets of kaohsiung on my track.
        stayed for an hour right before it got too dark. watched planes descend. watched couples hold hands by the
        benches. white couples and their kid. teens with their friends laughing. me and my camera hunting.
        `
      },
      {
        url: 'https://images.unsplash.com/photo-1784864181265-0cac4e1633ef?w=1200',
        orientation: 'portrait',
        caption: `
        joined a day tour. went all around the city. whole day i felt another joiner is taking
        interest in me. had opportunities all day long
        to strike a convo but i chickened out every time. on our last stop, i finally had the courage to at least
        say a formal 'hi!', but their car had already left. never met again.
        `
      },
      {
        url: 'https://images.unsplash.com/photo-1777891911475-2b76c73e421e?w=1200',
        orientation: 'portrait',
        caption: `
        half-hour ferry boat ride with a stranger. along the love river we sat near the back, almost a meter apart,
        wordless, their
        heavy, silent uninterest eventually filling the night.
        `
      },
      {
        url: 'https://images.unsplash.com/photo-1777891911590-c33d958af72e?w=1200',
        orientation: 'portrait',
        caption: `
sat on the bollards by the kaohsiung pier with a man i met up at the night market. my first time on a bike in taipei,
from the hotel,
street to street, waiting for crossing lights to green. cathartic. a 180 flip from my state the night prior.
amusing how i turned around the direction of this trip by allowing myself to finally enter a macrocosm i was always
welcome to, how people get fully vulnerable with a stranger in an alien land, how connections persist
past language barriers. my small, intimate circle expanded
one person wider. that's more than enough.
`
      },
      {
        url: 'https://images.unsplash.com/photo-1777891911370-f76e7f543a33?w=1200',
        orientation: 'portrait',
        caption: `
eluanbi park sits on taiwan's southern tip, barely 150kms from philippine's northernmost island. barely a two hour drive
if on land. one would infer that the lives of two people living this close (world geography scale -wise) would be similar,
why dear heavens, why is this not the case?
lucked out with geography, fucked up by the government.
`
      },
      // {
      //   url: 'https://images.unsplash.com/photo-1777891911298-ff8656ff39d0?w=1200',
      //   orientation: 'portrait',
      //   caption: 'coral reefs above the sea kineme'
      // },
      {
        url: 'https://images.unsplash.com/photo-1777891911361-2e086359c792?w=1200',
        orientation: 'portrait',
        caption: `
        travelling alone makes one. breaks one. it stripped me down to my core self and i get
        reminded of my primal qualities, the ones they linger after i am detached from work, from friends, from family.
        from societal expectations, gender norms.
        i am free, alive!
        to be a curious face of confusing nationality just pointing to pictures in a menu.
        i was no one.
        `
      },
      {
        url: 'https://images.unsplash.com/photo-1777892665141-00ce44846c76?w=1200',
        orientation: 'portrait',
        caption: `
        sunfong temple, five minutes by walk from my first accommodation, yet i
        only got to visit on my last night, half hour before closing. along with nerds with better cameras
        i wandered the temple grounds, went up the balconies, stared, marveled, humbled.
        thousands of lanterns, meticulously put up by passionate people of faith.
        just for a godless, soulless foreigner (me)
        to gawk at it, never fully in the moment, unable to appreciate the beauty, the meaning, the purpose.
        for a person who claims
        loves travelling, i am disappointingly shallow.
        `
      },
      {
        url: 'https://images.unsplash.com/photo-1777891911452-1556562595e0?w=1200',
        orientation: 'landscape',
        caption: `
three days and two nights in tainan. when opportunity comes knocking at 2pm, you
meet them freshly showered, pampered, cologned up and ready! a stunning, validating
session mid- side trip in the middle of a longer trip. a side-quest within a side-quest.
the kind that inspires great poets to ink masterpieces in pages from,
but they won't because the friends i tell stories to
can't write for shit.
        `
      }
    ],
    content: `
only got to take my heavy-ass dslr on select days. most of trip i took photos with my phone, flexing and milking all
i could from my dazzcam subscription,
as my camera is quite heavy to sling
comfortably on my body when strolling (and boy do i walked the hell out of this kaoshiung),
or on the front basket when I'm gliding on the YouBike.
ah taiwan.
the way i'd gladly book another trip just to bike and get lost in your alleys again.
    `
  },
  {
    id: 1,
    font: 'site',
    title: 'bothering to learn [anything] in the age of prompting',
    urlPath: '/blogs/pointlessness-of-learning',
    subtitle: 'finding reasons to learn developer skills in the time of automated work',
    type: 'blog',
    featuredImage: 'https://images.unsplash.com/photo-1768997658749-0d6d04e8f2c2?w=1200',
    backgroundColor: '#46629b',
    textColor: '#bfd4f1',
    tags: ['coding'],
    colorPalette: [
      '#C15F3C',
      '#747474',
      '#bcbcbc',
      '#0b2642',
    ],
    paletteLine: `
    category is pale orange and soulless grays.`,
    date: '2026-09-30',
    content: [
      {
        type: 'paragraph',
        text: `
          with my work visa ending [1], in my peripheral vision is on a specific bangkok-based company,
          known as the biggest company in that city that is willing to offer work visa and relocation.
          ` },
      // { type: 'quote', text: `this is a quote` },
      // { type: 'featured-line', text: `this is a featured line` },
      { type: 'divider' },
      {
        type: 'paragraph',
        text: `
          as someone who's line of work is shoved up and around the mythos of AI-assisted corporate productivity,
          i have learned
          to appreciate how much claude and cursor and coworking can finish a manual coding task.
      `},
      { type: 'divider' },
      {
        type: 'paragraph',
        text: `
          [1] [draft written June '26] potentially [updated answer on September] yeah definitely
      `},
    ],
  },
  {
    id: 2,
    font: 'site',
    title: 'my august playlist',
    urlPath: '/blogs/august-2026-playlist',
    subtitle: 'afternoon saigon showers and cozy cafe corners',
    type: 'playlist',
    featuredImage: 'https://images.unsplash.com/photo-1773647128386-5af56643c71a?w=1200',
    backgroundColor: '#394870',
    colorPalette: [
      '#5a636b',
      '#6183ad',
      '#035e20',
      '#edd69f',
      '#b09163',
      '#785532',
    ],
    paletteLine: `
    saigon in moody overcast mornings and sudden late afternoon shower grays. in middle is a three-hour
    stay in a not-so-quiet corner of a green and brown cafe two minutes from my apartment, accompanied by either
    a skippy light brown cup of latte or serious dark brown from a cà phê đen đá (iced black coffee).
    `,
    textColor: '#964519',
    tags: ['playlist', 'vietnam'],
    date: '2026-08-01',
    playlistEmbed: 'https://open.spotify.com/embed/playlist/5CnCrVgWU3wRbHj3yrWKIr',
    // playlistEmbed: 'https://open.spotify.com/embed/playlist/5CnCrVgWU3wRbHj3yrWKIr?si=c0829a03c7254518',
    songs: [
      { songIndex: 1, title: 'สลักจิต (feat. ดา เอ็นโดรฟิน)', artist: 'Pop Pongkool, Da Endorphine' },
      { songIndex: 4, title: '座位', artist: '承桓' },
      { songIndex: 9, title: 'เพื่อนดีเด่น (BEST FRIEND 4EVER)', artist: 'SERIOUS BACON' },
      { songIndex: 12, title: 'Yours Ever (feat. Q Flure)', artist: 'Cocktail, Q Flure' },
      { songIndex: 13, title: 'teddy bear', artist: 'Adelyn Paik' }
    ],
    content: `
august is peak rainy season in the city of saigon, perfect for a quiet stay in a brightly lit cafe corner table sipping
a strong ass black coffee on a 10am weekend. recently i've been listening to a lot of foreign (read: thai and mandarin) music,
expanding the list of bops i don't understand but i know by heart.
    `
  },
  {
    id: 3,
    font: 'site',
    title: 'pocket monster party',
    urlPath: '/blogs/pocket-monster-party',
    subtitle: 'A fan-made Pokémon type matchup simulator.',
    // subtitle: 'A fan-made Pokémon type matchup simulator. Not affiliated with or endorsed by Nintendo.',
    subSubtitle: `
    A simple Pokémon type battle simulator.
Select six Pokémon.
The computer selects six.
Choose your battlers wisely.
`,
    type: 'game',
    backgroundColor: '#fae1ab',
    textColor: '#964519',
    mobile: false,
    tags: ['game'],
    date: '2026-08-31',
    gamePath: '/games/PokemonParty.jsx',
    blogFeaturedImagePath: 'public/game-photos/pokemon-party/venusaur-shouting-portrait.png',
  },
  {
    id: 4,
    font: 'site',
    title: 'my september playlist',
    urlPath: '/blogs/september-2026-playlist',
    subtitle: 'for lazy mornings staring at the ceiling',
    type: 'playlist',
    featuredImage: 'https://images.unsplash.com/photo-1773647128428-2696bcbd41c7?w=1200',
    backgroundColor: '#394870',
    colorPalette: [
      '#f7eee6',
      '#decfc3',
      '#6b3503',
      '#202645',
      '#030226',
      '#A2AAAD',
    ],
    paletteLine: `
    my september is the palette of my own room, a studio of beige walls and wooden furniture, of my closet
    full of dark-colored clothes and white socks that need organization. and my ever loyal macbook, my partner in
    crime, my personal theater, my forge.
    `,
    textColor: '#964519',
    tags: ['playlist'],
    date: '2026-09-05',
    playlistEmbed: 'https://open.spotify.com/embed/playlist/26iBABzkvdLF8fLjX4tFwC',
    songs: [
      { songIndex: 1, title: 'Hampstead', artist: 'Ariana Grande' },
      { songIndex: 2, title: 'Humming', artist: 'Gracie Abrams' },
      { songIndex: 3, title: 'ส่วนต่าง (do it without me) - Piano Version', artist: 'BOWKYLION' },
      { songIndex: 7, title: 'Stuck in Place', artist: 'Emilee Moore' },
      { songIndex: 16, title: 'Why We Ever', artist: 'Hayley Williams' }
    ],
    content: `
overcast mornings make for slow weekends. rains persist and after a while of snuggling in cafes around the city,
some days you just feel like rotting in bed, cleaning your room, finally picking up that book you've had for years.
here is a short playlist of piano ballads, of women with something to convey.
    `
  },
  {
    id: 5,
    font: 'site',
    title: 'guess who?',
    urlPath: '/blogs/poke-guess-who',
    subtitle: 'A fan-made Guess Who? game with Pokémon characters.',
    // subtitle: 'A fan-made Pokémon type matchup simulator. Not affiliated with or endorsed by Nintendo.',
    subSubtitle: `
    A simple game board for the popular game Guess Who?
    characters replaced with Pokémon Characters
`,
    type: 'game',
    backgroundColor: '#fae1ab',
    textColor: '#964519',
    tags: ['game'],
    mobile: true,
    date: '2026-09-20',
    gamePath: '/games/PokemonGuessWho.jsx',
    blogFeaturedImagePath: 'public/game-photos/pokemon-guess-who/gengar-happy-portrait.png',
  },
  {
    id: 6,
    font: 'site',
    title: 'a witchy october playlist',
    urlPath: '/blogs/october-2026-playlist',
    subtitle: 'a messy playlist for AHS\' messy, hyped, cross-over 13th season',
    type: 'playlist',
    featuredImage: 'https://images.unsplash.com/photo-1728927471523-487819893bdc?w=1200',
    backgroundColor: '#394870',
    colorPalette: [
      '#ffffff',
      '#ff0000',
      '#85182f',
      '#0a0606',
      '#333333',
      '#4d4949',
    ],
    paletteLine: `
    palette is black and black and black, and asylum gray, coven red, murderous shades of what-the-fuck-is-this-dialogue 's.
    `,
    textColor: '#964519',
    tags: ['playlist'],
    date: '2026-09-27',
    playlistEmbed: 'https://open.spotify.com/embed/playlist/1xrbFpKpjdBWTg99dTYFsm',
    songs: [
      { songIndex: 1, title: 'Tainted Love', artist: 'Hannah Peel' },
      { songIndex: 2, title: 'Dominique', artist: 'The Singing Nun (Soeur Sourire)' },
      { songIndex: 3, title: 'House of the Rising Sun', artist: 'Lauren O\'Connell' },
      { songIndex: 5, title: 'I Can Dream About You - Single Version', artist: 'Dan Hartman' },
      { songIndex: 12, title: 'Criminal - From "American Horror Story"', artist: 'American Horror Story Cast, Sarah Paulson' }
    ],
    content: [
      {
        type: 'paragraph',
        text: `
          the coven is back! and so is constance, and james patrick march. and a new anti-christ. or maybe it's satan themself
    this time? and ryan murphy's group of nepo baby interns in his writing room holding jessica lange at gunpoint to say
    "the nips - the nipples!".
        `
      },
      {
        type: 'paragraph',
        text: `
          nevertheless, American Horror Story is a substantial part of the development
    of my psyche, and a core of my personality from high school and college. i am sat seeing lange and paulson back,
    my father and husband and son evan peters, my spirit animal madison, and everyone else trot for
    one last round of fan service
    (agree with me, Apocalypse is, too) prancing in my screen doing lazy remakes of their famous one-liners. milk
    this shit ryan murphy, we're with you til the end of this season!
        `
      },
    ]
  },
  {
    id: 7,
    font: 'site',
    title: 'hong kong venting',
    colorPalette: [
      '#568549',
      '#b59570',
      '#fc4812',
      '#e6020a',
      '#a30fd9',
      '#5a52f7',
    ],
    paletteLine: `
    hong kong is morning trail greens and all the colors of neon lights and sunset.
    `,
    urlPath: '/blogs/hongkong-venting',
    subtitle: 'an ode to a wonderfully green, egregiously expensive city',
    type: 'photo-essay',
    tags: [
      'photo essay',
      'travel',
      'hong kong'
    ],
    backgroundColor: '#91c4e3',
    textColor: '#300000',
    dateTaken: 'November and December \'25',
    date: '2026-10-09',
    footerText: 'Photos from my Unsplash account',
    footerTextLink: 'https://unsplash.com/@ladetorres',
    // headerImage: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1200',
    headerImage: 'https://images.unsplash.com/photo-1777892665104-d66a5607c093?w=2400',
    featuredImage: 'https://images.unsplash.com/photo-1769439381576-ac2fe277e652?w=1200',
      // headerImage: 'https://images.unsplash.com/photo-1777891911475-2b76c73e421e?w=2400',
    photosTemp: [],
    phonePhotosGallery: {
      'hongkong-venting': [
        {
          fileName: 'ip12-dragon-back',
          fileNameWithExt: 'ip12-dragon-back.jpg',
          caption: 'forgot the dslr to this hike, so all photos i have are from my then iphone 12. this is dragon\'s back, one of the easier hikes in hk, luckily the trailhead is reachable by public transport',
          coordinates: '22.236°N, 114.243°E',
          location: 'Shek O',
          focalLength: '4.2mm',
          fNumber: 'f/1.6',
          exposure: '1/3731'
        },
        {
          fileName: 'ip12-dragon-grass',
          fileNameWithExt: 'ip12-dragon-grass.jpg',
          caption: 'windy af. no big plants on a good half a kilometer (and yes, i hiked with an umbrella out), just grass swaying and swaying',
          coordinates: '22.236°N, 114.244°E',
          location: 'Shek O',
          focalLength: '4.2mm',
          fNumber: 'f/1.6',
          exposure: '1/2092'
        },
        {
          fileName: 'ip12-dragon-sign',
          fileNameWithExt: 'ip12-dragon-sign.jpg',
          caption: 'i don\'t know. this is a trail marker.',
          coordinates: '22.230°N, 114.243°E',
          location: 'Shek O',
          focalLength: '4.2mm',
          fNumber: 'f/1.6',
          exposure: '1/1618'
        },
        {
          fileName: 'ip12-dragon-grass2',
          fileNameWithExt: 'ip12-dragon-grass2.jpg',
          caption: 'i didn\'t meet another person on a trail for a good 30 minutes. because most of uphill climb is just grassy, the hundred meters or so in front and behind me is totally visible that i could see any incoming person if ever, under different circumstances this isolation would\'ve had me giving in to some unchaste thoughts, but luckily, this is only my second day. i still kinda like hk that day, mesmerized by the new environment. had this hike been later in my stay, i would\'ve given in and perform a breezy, jazzy solo in that altitude.',
          coordinates: '22.236°N, 114.244°E',
          location: 'Shek O',
          focalLength: '4.2mm',
          fNumber: 'f/1.6',
          exposure: '1/4000'
        },
        {
          fileName: 'ip12-dragon-pose',
          fileNameWithExt: 'ip12-dragon-pose.jpg',
          caption: 'stuck my phone between some tree branch, set on a ten second timer and posed. oversized elephant pants what an odd choice but paired well with the undersized tank top. one of the better photos i took.',
          coordinates: '22.236°N, 114.244°E',
          location: 'Shek O',
          focalLength: '4.2mm',
          fNumber: 'f/1.6',
          exposure: '1/5556'
        },
        {
          fileName: 'ip12-escalator-wide',
          fileNameWithExt: 'ip12-escalator-wide.jpg',
          caption: 'not much floor space means hk just keeps going up. there is a upscale mall in hk that i would\'ve spent more time in had i found it earlier. the brands look unique enough to go window shopping for an hour.',
          coordinates: '22.318°N, 114.169°E',
          location: 'Mong Kok',
          focalLength: '1.6mm',
          fNumber: 'f/2.4',
          exposure: '1/50'
        },
        {
          fileName: 'ip12-lion-rock',
          fileNameWithExt: 'ip12-lion-rock.jpg',
          caption: 'lion rock peak, featuring a white guy who asked me to take photos for him, and was kind enough to take photos for me. lion rock took me a little by surprise, not as chill as i hoped. listened to Red TV the way up. waited for sunset at the peak, and gazed at all the rich-ass buildings below me and their rich-ass people crammed in them',
          coordinates: '22.353°N, 114.186°E',
          location: 'Lion Rock',
          focalLength: '1.6mm',
          fNumber: 'f/2.4',
          exposure: '1/592'
        },
        {
          fileName: 'ip12-lion-camera',
          fileNameWithExt: 'ip12-lion-camera.jpg',
          caption: 'set my dslr on a timer too, and posed. me and the white dude had the peak to ourselves for a whole half hour. that\'s kinda nice.',
          coordinates: '22.353°N, 114.186°E',
          location: 'Lion Rock',
          focalLength: '4.2mm',
          fNumber: 'f/1.6',
          exposure: '1/154'
        },
        {
          fileName: 'ip12-lion-selfie',
          fileNameWithExt: 'ip12-lion-selfie.jpg',
          caption: 'white dude continued on the trail, while i went back the way i came in. data signal is shit in the mountain. google maps said it will take the same time, but it\'s getting dark and i don\'t want to be caught in an unfamiliar trail at sundown so we parted ways.',
          coordinates: '22.353°N, 114.186°E',
          location: 'Lion Rock',
          focalLength: '1.6mm',
          fNumber: 'f/2.4',
          exposure: '1/176'
        },
        {
          fileName: 'ip12-lion-sunset',
          fileNameWithExt: 'ip12-lion-sunset.jpg',
          caption: 'gorgeous colors. turning the flash on on a just brightens up the shot. again, this is pre-dazzcam, pre-iphone 16. just perseverance, bit of trial-and-error, and a shot of audacity',
          coordinates: '22.356°N, 114.196°E',
          location: 'Tsz Wan Shan',
          focalLength: '1.6mm',
          fNumber: 'f/2.4',
          exposure: '1/60'
        },
        {
          fileName: 'ip12-lion-dusk',
          fileNameWithExt: 'ip12-lion-dusk.jpg',
          caption: 'on my last ten minutes going down, i swear to my god, to yours, to they\'rses, that something big, something dark, fast and unmistakeable crossed the trail in front of me. it is too big to be cow or a monkey, but i made it out alive for it to be a jungle boo-boo monster. it was real, made me pause for 15 seconds before it disappeared into the twilight, and i\'m too tired to be scared so i just kept walking.',
          coordinates: '22.356°N, 114.197°E',
          location: 'Tsz Wan Shan',
          focalLength: '1.6mm',
          fNumber: 'f/2.4',
          exposure: '1/60'
        },
        {
          fileName: 'ip12-hk-mcdo',
          fileNameWithExt: 'ip12-hk-mcdo.jpg',
          caption: 'filipinos kinda dumb for choosing hk as their first or second travel country. unless disneyland, that i understand. but not otherwise. it\'s too expensive for our currency, while better options exist that still won\'t required tourist visas. here is a mcdo burger because i can\'t afford to eat proper food, or i\'m too checked-out to explore where the locals eat..',
          coordinates: '22.284°N, 114.158°E',
          location: 'Central',
          focalLength: '1.6mm',
          fNumber: 'f/2.4',
          exposure: '1/50'
        },
        {
          fileName: 'ip12-hkdl-frozen',
          fileNameWithExt: 'ip12-hkdl-frozen.jpg',
          caption: 'i grew up with pirated DVDs of disney animated movies, and had it been 2015 and not 2025 and my family was financially stable enough to have taken me to Disneyland, this woul\'ve been the trip of a lifetime. my niece and nephew didn\'t grow up with simba or woody or olaf, they are babysat by tung tung sahur whoever that is. regardless, i just hope the magic stayed with them.',
          coordinates: '22.312°N, 114.039°E',
          location: 'Disneyland',
          focalLength: '4.2mm',
          fNumber: 'f/1.6',
          exposure: '1/25'
        },
        {
          fileName: 'ip12-hkdl-world',
          fileNameWithExt: 'ip12-hkdl-world.jpg',
          caption: 'obviously most of the fun in hkdl rides can\'t be taken with a phone camera. the best one for me are frozen, the one with tony stark, and mystic manor.',
            coordinates: '22.313°N, 114.040°E',
          location: 'Disneyland',
          focalLength: '4.2mm',
          fNumber: 'f/1.6',
          exposure: '1/33'
        },
        {
          fileName: 'ip12-hk-victoria',
          fileNameWithExt: 'ip12-hk-victoria.jpg',
          caption: 'iphone 12 sucks. didn\'t do justice at all to the glimmering light\'s of the boats in victoria harbor.',
          coordinates: '22.296°N, 114.177°E',
          location: 'Tsim Sha Tsui',
          focalLength: '2.7mm',
          fNumber: 'f/2.2',
          exposure: '1/15'
        },
      ],
    },
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1768997658763-0c03cf77158c?w=1200',
        orientation: 'portrait',
        caption: `
        listed the big three night markets in my itinerary. two were a bust, i skipped the third. nothing of the attractive affordability of taiwan's,
        and nothing of thailand's charm. i just dedicated my one night hunting the remnants of hong kong's neon signs,
        found some blogs online that stated street names and i walked over 20kms that day, squeezing through alleys,
        running beating red lights. for what little neon signs i found, still worth it. sad not to see the full display of
        retro neon signs, the only thing that would've given this urban hell it's charm.
        `
      },
      {
        url: 'https://images.unsplash.com/photo-1768472586464-6bac52d2d981?w=1200',
        orientation: 'portrait',
        caption: `
        went again with family on december. disneyland (when paid for with premier access and food and transpo by your big sister)
        is a delight. had some decent shots with my dslr, but broke my tripod on the chaotic wave of guests to the front of the castle
        waiting for the Momentous fireworks. rides? awesome. food? disgusting. would come back? if paid for, yes!
        `
      },
      {
        url: 'https://images.unsplash.com/photo-1768997658721-e61ad124f60e?w=1200',
        orientation: 'portrait',
        caption: `
        okay i am disgusted, by myself, for falling into the temptation of visiting the famed Monster Building in
        Quarry Bay. this teeters into poverty porn territory, but i really want it on an architectural pov. it's a
        cloudy morning, i made sure to arrive early to avoid to rest of my kind, the center courtyard is empty. im surrounded
        on four sides by concrete cliffs of AC units and windows in a disharmonious melody. but this is living spaces that
        i (as you may perceive, but i don't, regardless) treat as a curiosity, an attraction.
        `
      },
      {
        url: 'https://images.unsplash.com/photo-1768997658749-0d6d04e8f2c2?w=1200',
        orientation: 'portrait',
        caption: `
        i walked the streets. looked up. on all four sides, i'm surrounded by storied buildings taller than jesus. land scarcity
        made the living spaces tight and barely livable, and i consider myself lucky as my airbnb rented room here, a third of my studio unit in vietnam,
        has a window that can see sunlight. i read vlogs of locals working multiple jobs, 9 or 10 hours a day just to afford
        living here. i felt like an ant. crawling. just surviving.
          `
      },
      {
        url: 'https://images.unsplash.com/photo-1769143376372-03e8f6bedbf6?w=1200',
        orientation: 'portrait',
        caption: `
          the city was grim, and even though i was not eating well (the anxiety from spending too much really killed my apetite),
          i still managed to walk my shit up lion rock. tangent: for three days i planned to visit victoria peak. planned for a dawn hike.
          tried to plan arriving there for sunset. maybe it's the disillusionment. maybe it's the hunger. skipped.
        `
      },
      // {
      //   url: 'https://images.unsplash.com/photo-1777891911298-ff8656ff39d0?w=1200',
      //   orientation: 'portrait',
      //   caption: 'coral reefs above the sea kineme'
      // },
      {
        url: 'https://images.unsplash.com/photo-1769143376315-b12d3251f636?w=1200',
        orientation: 'landscape',
        caption: `
        lion rock is a delight. the first time that i was out on a hiking trail by night (see: my story in one of my photos from my phone).
        the buildings of hong kong are tall, but the mountain stood taller. had some bumps finding the trail head,
        took a few wrong turns, but i made it up and out alive, grinning, knees weak. back drenched in sweat.
        `
      },
      {
        url: 'https://images.unsplash.com/photo-1769439337633-831290f3666b?w=1200',
        orientation: 'portrait',
        caption: `
          on my way up, i kept thinking about me, a filipino, joining a group tour with everyone else is white, with a local
          guide explaining how every sunday, the day off for filipino domestic helpers, the Statue Square will fill up
          with them in cardboard boxes and makeshift tents. hk economy good! filipino economy weak! and so, most live-in nannies
          in hong kong are either filipinos or indonesians, since we speak good english and their cheap salary is not so cheap to us.
          visiting hong kong as a tourist, solo, and filipino, is very weird. almost feels forbidden. but i kept on hiking.
        `
      },
      {
        url: 'https://images.unsplash.com/photo-1769439187190-60bb2e1c905c?w=1200',
        orientation: 'portrait',
        caption: `
        on my first morning, went to visit this shed. brought some change of clothes. sai wan shed is walkable from the last
        station (Kennedy Town) so off i went. point 1: really should've went on sunset. i was trying too hard to avoid the
        hypothetical crowd, but morning is no good. point 2: really shoul've swam. i was too lazy, too afraid, too unsure.
        point 3: i could've skipped going here too, unless i did point 1 and 2. tangent: i looked for an adapter on my way back. circle K
        had one, sells it for 400K VND / 1K PHP 😬 skipped that, found a local, nameless electronics shop that sells it for 35K VND / 90 PHP.
        my first win. one of few.
         `
      },
      {
        url: 'https://images.unsplash.com/photo-1769439381576-ac2fe277e652?w=1200',
        orientation: 'landscape',
        caption: `
          the night i'm supposed to hike victoria peak, i just went to walk the promenade, across kowloon.
          the first time i am on my trip and i wanted to go home so, so soon. i don't belong here. my solo
          hikes are fun but i cannot get any enjoyment from the city. barren and lifeless for all i care. artificial.
          enjoyable only if you can afford to. it's a clunky statement coming from someone who has the financial
          privilege to travel, i know.
        `
      },
      {
        url: 'https://images.unsplash.com/photo-1771122367105-6dcc641f718a?w=1200',
        orientation: 'landscape',
        caption: `
          some fun stuff in cat alley. can't tell if the street is alive just for the chance of a bunch of white tourists
          paying for an absurdly priced item.
        `
      },
      {
        url: 'https://images.unsplash.com/photo-1771122366984-bfbf2e6f44fd?w=1200',
        orientation: 'landscape',
        caption: `
          my last day in hong kong i spent going to the tiktok famous locations. lucky that i got to each without
          other people (it's a weekday morning, so that sure helped). moved around in kowloon, beating all the
          walking ETA from google maps because i am strapped for time and i need to check out by 11am.
          all bus timings on the map is off. lost at least half hour waiting on a bus stop, took me miracles to device
          plan B route of a plan B bus of a plan B location.
          never have i counted the minutes so hard in my life. for a city claimed to be so ✨ advanced ✨, their public bus timings
          are not that reliable. taipei eats this pretentious city hard. that morning though, i managed to visit all
          that i want to see. there is this nice basketball court and track area above a parking lot inside a
          residential complex. success'd. survived't.
        `
      },
      {
        url: 'https://images.unsplash.com/photo-1773559250354-0d7281984a89?w=1200',
        orientation: 'portrait',
        caption: `
          went inside a restaurant, where, i am the only one eating alone, and i'm the only one in my age range.
          i ordered a stupidly expensive plate of meat, assumed it already includes rice, and wolfed through half and ask
          them to put the remaining half in take out (which ,they added an extra 150 VND / 400 PHP on the bill).
          i am certain i am taken advantaged of, because i am a foreigner and i am agreeably stupid.
          went to mcdonald's after for a proper meal (see earlier pic).
        `
      },
      {
        url: 'https://images.unsplash.com/photo-1773559389011-91cd9a3f5124?w=1200',
        orientation: 'landscape',
        caption: `
          imagine a white businessman, moving to hong kong for six months for his work. his white company paying white
          dollars for him to stay in a high-end unit in a high-end area in the island. maybe drives a car. maybe just walks to his office.
          dines out in a nice place every night. goes to tokyo or bali for a weekend trip. just imagine. going back to his
          country, announcing to his peers how hong kong is a first-world country. how it has one of the most
          friendly transportation despite only taking the metro train twice. the tram thrice. what lingered in my head
          the whole time. that side of hong kong is not for me. all cities in the world has this, of course, rich in their bubble, their
          comfort on the backs of the poor, but in hong kong i felt the widest gap.
        `
      },
      {
        url: 'https://images.unsplash.com/photo-1774270149389-ff376a2d478b?w=1200',
        orientation: 'landscape',
        caption: `
          hiking? taipei has it in abundance. shopping? thailand has it. vietnam where your budget will last
          even longer. bangkok for the night life, philippines for the white sands, laos if you really want to be
          one with nature. hong kong just pales in comparison. i can't even say i want to be rich enough to afford
          appreciating this city.
        `
      },
      {
        url: 'https://images.unsplash.com/photo-1774270149435-136ccac59a13?w=1200',
        orientation: 'portrait',
        caption: `
          to end, i'm glad to cross out one city in my bucketlist, but boy i won't be back here by myself. if any, i'd spend
          a tight three day stay just hiking. walking the trails. spend as little time as i can in this rat-race city.
        `
      }
    ],
    content: [
      {
        type: 'paragraph',
        text: `
        six days: two work-from-homes, two weekends, two vacation leaves. i planned my whole stay around three imporant hikes (doing the math now, is, yes, optimistic),
        planned most of my days down to the nearest 15 minute mark: planned the walking timing, the trail distance,
        MRT stations.
      `
      },
      {
        type: 'paragraph',
        text: `
        i got bare-ass fucked on my first dinner out. arrived past nine at night, had issues with check-in with my dumbass airbnb host's check-in instructions (can't further complain,
        otherwise i can't afford a hotel), went out to buy food half past ten. all nearby restos closed, went to 7/11.
      `
      },
      {
        type: 'paragraph',
        text: `
        checked the prices in HKD, converted to peso.
      `
      },
      {
        type: 'paragraph',
        text: `
        stunned. the rush of acknowledgment when i mathed the math. to be clear, i did my research, i knew hong kong is expensive as fuck.
      `
      },
      {
        type: 'paragraph',
        text: `
        but didn't know that hong kong is expensive as hell.      `
      },
      {
        type: 'paragraph',
        text: `
        that 7/11 visit was the beginning of a nasty six day stay. let me elaborate.
        `
      },
    ]
  },
]

// Helper function to find blog by URL path
export const getBlogByPath = (urlPath) => {
  return blogData.find(blog => blog.urlPath === urlPath)
}

// Helper function to get all blogs by type
export const getBlogsByType = (type) => {
  return blogData.filter(blog => blog.type === type)
}

// Helper function to get recent blogs
export const getRecentBlogs = (count = 5) => {
  return [...blogData]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, count)
}
